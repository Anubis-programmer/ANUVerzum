import { createDomElement, updateDomProperties, SVG_ELEMENT_LIST } from './domUtils';
import { AnuElement, ElementType, Props, Ref } from './elements';

const HOST_COMPONENT = 'host';
const CLASS_COMPONENT = 'class';
const FUNCTION_COMPONENT = 'function';
const HOST_ROOT = 'root';

type FiberTag = typeof HOST_COMPONENT | typeof CLASS_COMPONENT | typeof FUNCTION_COMPONENT | typeof HOST_ROOT;

const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

type EffectTag = typeof PLACEMENT | typeof DELETION | typeof UPDATE;

const ENOUGH_TIME = 1;

type Fiber = {
    type?: ElementType;
    tag: FiberTag;
    key?: string | null;
    ref?: Ref<any> | null;
    stateNode?: any;
    props: Props;
    parent?: Fiber;
    child?: Fiber;
    sibling?: Fiber;
    alternate?: Fiber;
    effects?: Fiber[];
    effectTag?: EffectTag | null;
    partialState?: Record<string, any>;
    partialStateCallback?: (prevState: any, prevProps: any) => any;
    prevState?: Record<string, any>;
};

const updateQueue: Array<{
    from: FiberTag;
    dom?: Element;
    newProps?: Props;
    instance?: any;
    partialState?: Record<string, any>;
    partialStateCallback?: (prevState: any, prevProps: any) => any;
}> = [];

let nextUnitOfWork: Fiber | null | undefined = null;
let pendingCommit: Fiber | null = null;

const getRoot = (fiber: Fiber): Fiber => {
    let node = fiber;

    while (node.parent) {
        node = node.parent;
    }

    return node;
};

const resetNextUnitOfWork = (): void => {
    const update = updateQueue.shift();

    if (!update) {
        return;
    }

    if (update.from === CLASS_COMPONENT && !update.instance.__fiber) {
        return;
    }

    if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    if (update.partialStateCallback) {
        update.instance.__fiber.partialStateCallback = update.partialStateCallback;
    }

    const root = update.from === HOST_ROOT ? (update.dom as any)._rootContainerFiber : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root
    };
};

const workLoop = (deadline: IdleDeadline): void => {
    if (!nextUnitOfWork) {
        resetNextUnitOfWork();
    }

    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (pendingCommit) {
        commitAllWork(pendingCommit);
    }
};

const performWork = (deadline: IdleDeadline): void => {
    workLoop(deadline);

    if (nextUnitOfWork || updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
};

const performUnitOfWork = (wipFiber: Fiber): Fiber | undefined => {
    beginWork(wipFiber);

    if (wipFiber.child) {
        return wipFiber.child;
    }

    let unitOfWork: Fiber | undefined = wipFiber;

    while (unitOfWork) {
        completeWork(unitOfWork);

        if (unitOfWork.sibling) {
            return unitOfWork.sibling;
        }

        unitOfWork = unitOfWork.parent;
    }

    return undefined;
};

const beginWork = (wipFiber: Fiber): void => {
    if (wipFiber.tag === CLASS_COMPONENT) {
        updateClassComponent(wipFiber);
    } else if (wipFiber.tag === FUNCTION_COMPONENT) {
        updateFunctionComponent(wipFiber);
    } else {
        updateHostComponent(wipFiber);
    }
};

const updateHostComponent = (wipFiber: Fiber): void => {
    if (!wipFiber.stateNode) {
        wipFiber.stateNode = createDomElement(wipFiber as any);
    }

    const newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
};

const updateFunctionComponent = (wipFiber: Fiber): void => {
    let instance = wipFiber.stateNode || null;

    if (instance === null) {
        instance = wipFiber.stateNode = { props: wipFiber.props, render: wipFiber.type };
    } else if (wipFiber.props === instance.props && !wipFiber.partialState) {
        cloneChildFibers(wipFiber);

        return;
    }

    instance.props = wipFiber.props;
    instance.render = wipFiber.type;
    const newChildElements = instance.render(wipFiber.props);
    reconcileChildrenArray(wipFiber, newChildElements);
};

const createInstance = (fiber: Fiber): any => {
    const context = Object.assign({}, fiber.stateNode ? { ...fiber.stateNode.context } : {});
    const instance = new (fiber.type as any)(fiber.props, context);
    instance.__fiber = fiber;

    return instance;
};

const updateClassComponent = (wipFiber: Fiber): void => {
    let instance = wipFiber.stateNode || null;

    if (instance === null) {
        const stateNode = createInstance(wipFiber);
        stateNode.context = { ...stateNode.context };
        instance = wipFiber.stateNode = stateNode;

        wipFiber.stateNode.setState = wipFiber.stateNode.setState.bind(wipFiber.stateNode);

        if ((wipFiber.type as any).prototype.componentDidMount) {
            wipFiber.stateNode.componentDidMount = wipFiber.stateNode.componentDidMount.bind(wipFiber.stateNode);
        }

        if ((wipFiber.type as any).prototype.componentDidUpdate) {
            wipFiber.stateNode.componentDidUpdate = wipFiber.stateNode.componentDidUpdate.bind(wipFiber.stateNode);
        }

        if ((wipFiber.type as any).prototype.componentWillUnmount) {
            wipFiber.stateNode.componentWillUnmount = wipFiber.stateNode.componentWillUnmount.bind(wipFiber.stateNode);
        }
    } else if (wipFiber.props === instance.props && !wipFiber.partialState && !wipFiber.partialStateCallback) {
        cloneChildFibers(wipFiber);

        return;
    }

    let nextState: Record<string, any>;

    if (!wipFiber.partialStateCallback) {
        nextState = Object.assign({}, instance.state, wipFiber.partialState);
    } else {
        nextState = wipFiber.partialStateCallback(instance.state, wipFiber.props);
    }

    wipFiber.prevState = { ...instance.state };
    instance.props = wipFiber.props;
    instance.state = nextState;
    wipFiber.partialState = undefined;
    delete wipFiber.partialStateCallback;
    const newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
};

const arrify = (val: any): AnuElement[] => (!val ? [] : Array.isArray(val) ? val : [val]);

const getTag = (element: AnuElement): FiberTag => {
    if (typeof element.type === 'string') {
        return HOST_COMPONENT;
    }

    if (
        typeof element.type === 'function' &&
        !(element.type as any).isAnuComponent &&
        !(element.type as any).prototype?.render
    ) {
        return FUNCTION_COMPONENT;
    }

    return CLASS_COMPONENT;
};

const reconcileChildrenArray = (wipFiber: Fiber, newChildElements: any): void => {
    const elements = arrify(newChildElements);
    const oldFiberMap = new Map<string | number, Fiber>();
    let oldFiber: Fiber | undefined = wipFiber.alternate ? wipFiber.alternate.child : undefined;
    let oldIndex = 0;

    while (oldFiber) {
        const mapKey = oldFiber.key ?? oldIndex;
        oldFiberMap.set(mapKey, oldFiber);
        oldFiber = oldFiber.sibling;
        oldIndex++;
    }

    let prevFiber: Fiber | undefined;

    for (let i = 0; i < elements.length; i++) {
        const element: AnuElement = elements[i];
        const mapKey = element.key ?? i;
        const matchedOldFiber = oldFiberMap.get(mapKey);
        const sameType = matchedOldFiber !== undefined && element.type === matchedOldFiber.type;
        let newFiber: Fiber;

        if (sameType && matchedOldFiber) {
            newFiber = {
                type: matchedOldFiber.type,
                tag: matchedOldFiber.tag,
                key: matchedOldFiber.key,
                ref: element.ref,
                stateNode: matchedOldFiber.stateNode,
                props: element.props,
                parent: wipFiber,
                alternate: matchedOldFiber,
                partialState: matchedOldFiber.partialState,
                effectTag: UPDATE
            };

            if (matchedOldFiber.partialStateCallback) {
                newFiber.partialStateCallback = matchedOldFiber.partialStateCallback;
            }

            oldFiberMap.delete(mapKey);
        } else {
            if (matchedOldFiber) {
                matchedOldFiber.effectTag = DELETION;
                wipFiber.effects = wipFiber.effects || [];
                wipFiber.effects.push(matchedOldFiber);
                oldFiberMap.delete(mapKey);
            }

            newFiber = {
                type: element.type,
                tag: getTag(element),
                key: element.key,
                ref: element.ref,
                props: element.props,
                parent: wipFiber,
                effectTag: PLACEMENT
            };
        }

        if (i === 0) {
            wipFiber.child = newFiber;
        } else if (prevFiber) {
            prevFiber.sibling = newFiber;
        }

        prevFiber = newFiber;
    }

    oldFiberMap.forEach((fiber) => {
        fiber.effectTag = DELETION;
        wipFiber.effects = wipFiber.effects || [];
        wipFiber.effects.push(fiber);
    });
};

const getFirstHostNode = (fiber: Fiber): Node | null => {
    if (fiber.tag === HOST_COMPONENT) {
        return fiber.stateNode ? (fiber.stateNode as Node) : null;
    }

    let child: Fiber | undefined = fiber.child;

    while (child) {
        const node = getFirstHostNode(child);

        if (node) {
            return node;
        }

        child = child.sibling;
    }

    return null;
};

const getNextHostNode = (fiber: Fiber, domParent: HTMLElement): Node | null => {
    let sibling: Fiber | undefined = fiber.sibling;

    while (sibling) {
        const node = getFirstHostNode(sibling);

        if (node && (node as HTMLElement).parentNode === domParent) {
            return node;
        }
        
        sibling = sibling.sibling;
    }

    return null;
};

const cloneChildFibers = (parentFiber: Fiber): void => {
    const oldFiber = parentFiber.alternate;

    if (!oldFiber?.child) {
        return;
    }

    let oldChild: Fiber | undefined = oldFiber.child;
    let prevChild: Fiber | undefined;

    while (oldChild) {
        const newChild: Fiber = {
            type: oldChild.type,
            tag: oldChild.tag,
            key: oldChild.key,
            ref: oldChild.ref,
            stateNode: oldChild.stateNode,
            props: oldChild.props,
            partialState: oldChild.partialState,
            alternate: oldChild,
            parent: parentFiber
        };

        if (oldChild.partialStateCallback) {
            newChild.partialStateCallback = oldChild.partialStateCallback;
        }

        if (prevChild) {
            prevChild.sibling = newChild;
        } else {
            parentFiber.child = newChild;
        }

        prevChild = newChild;
        oldChild = oldChild.sibling;
    }
};

const completeWork = (fiber: Fiber): void => {
    if (fiber.tag === CLASS_COMPONENT) {
        fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
        const childEffects = fiber.effects || [];
        const thisEffect = fiber.effectTag != null ? [fiber] : [];
        const parentEffects = fiber.parent.effects || [];
        fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
        pendingCommit = fiber;
    }
};

type LifecycleEntry = {
    fn: (prevProps?: any, prevState?: any) => void;
    params: { prevProps?: any; prevState?: any };
};

const componentLifecyclesQueue: LifecycleEntry[] = [];

const flushComponentLifecyclesQueue = (): void => {
    while (componentLifecyclesQueue.length > 0) {
        const {
            fn,
            params: { prevProps, prevState }
        } = componentLifecyclesQueue.shift()!;
        fn(prevProps, prevState);
    }
};

const commitAllWork = (fiber: Fiber): void => {
    (fiber.effects || []).forEach((effect, index, effects) => {
        commitWork(effect);

        if (index === effects.length - 1) {
            flushComponentLifecyclesQueue();
        }
    });

    (fiber.stateNode as any)._rootContainerFiber = fiber;
    nextUnitOfWork = null;
    pendingCommit = null;
};

const commitWork = (effect: Fiber): void => {
    if (effect.tag === HOST_ROOT) {
        return;
    }

    let domParentFiber = effect.parent!;

    while (domParentFiber.tag === CLASS_COMPONENT || domParentFiber.tag === FUNCTION_COMPONENT) {
        domParentFiber = domParentFiber.parent!;
    }

    const domParent = domParentFiber.stateNode as HTMLElement;

    if (effect.effectTag === PLACEMENT) {
        if (effect.tag === HOST_COMPONENT) {
            const nextDomSibling = getNextHostNode(effect, domParent);

            if (nextDomSibling) {
                domParent.insertBefore(effect.stateNode, nextDomSibling);
            } else {
                domParent.appendChild(effect.stateNode);
            }

            if (effect.ref) {
                effect.ref.current = effect.stateNode;
            }
        } else if (effect.tag === CLASS_COMPONENT) {
            if (effect.stateNode.componentDidMount) {
                componentLifecyclesQueue.push({
                    fn: effect.stateNode.componentDidMount,
                    params: {}
                });
            }
        }
    } else if (effect.effectTag === UPDATE) {
        if (effect && effect.stateNode && effect.alternate && effect.alternate.props && effect.props) {
            if (effect.tag === HOST_COMPONENT) {
                updateDomProperties(
                    effect.stateNode,
                    effect.alternate.props,
                    effect.props,
                    (SVG_ELEMENT_LIST as string[]).indexOf(effect.type as string) > -1
                );

                if (effect.ref) {
                    effect.ref.current = effect.stateNode;
                }
            } else if (effect.tag === CLASS_COMPONENT) {
                if (effect.stateNode.componentDidUpdate) {
                    componentLifecyclesQueue.push({
                        fn: effect.stateNode.componentDidUpdate,
                        params: {
                            prevProps: effect.alternate?.props,
                            prevState: effect.prevState
                        }
                    });
                }
            }
        }
    } else if (effect.effectTag === DELETION) {
        if (effect.tag === CLASS_COMPONENT) {
            if (effect.stateNode.componentWillUnmount) {
                effect.stateNode.componentWillUnmount();
            }
            
            effect.stateNode.__fiber = null;
        }

        commitDeletion(effect, domParent);
    }
};

const collectNestedClassComponents = (fiber: Fiber): Fiber[] => {
    const result: Fiber[] = [];
    const stack: Fiber[] = [];
    let child = fiber.child;

    while (child) {
        stack.push(child);
        child = child.sibling;
    }

    while (stack.length > 0) {
        const node = stack.pop()!;
        let c = node.child;

        while (c) {
            stack.push(c);
            c = c.sibling;
        }

        if (node.tag === CLASS_COMPONENT) {
            result.push(node);
        }
    }

    return result.reverse();
};

const commitDeletion = (fiber: Fiber, domParent: HTMLElement): void => {
    const nested = collectNestedClassComponents(fiber);

    nested.forEach((node) => {
        if (node.stateNode.componentWillUnmount) {
            try {
                node.stateNode.componentWillUnmount();
            } catch (err) {
                console.error(err);
            }
        }

        node.stateNode.__fiber = null;
    });

    let node: Fiber | undefined = fiber;

    while (node) {
        if (node.tag === CLASS_COMPONENT || node.tag === FUNCTION_COMPONENT) {
            node = node.child;

            continue;
        }

        if (domParent.contains(node.stateNode)) {
            domParent.removeChild(node.stateNode);
        }

        while (node !== fiber && !node!.sibling) {
            node = node!.parent;
        }

        if (node === fiber) {
            return;
        }

        node = node!.sibling;
    }
};

export const createRef = <T = any>(): Ref<T> => ({
    current: null
});

export const scheduleUpdate = (
    instance: any,
    partialState: Record<string, any>,
    partialStateCallback?: (prevState: any, prevProps: any) => any
): void => {
    const updateFiber: (typeof updateQueue)[number] = {
        from: CLASS_COMPONENT,
        instance,
        partialState
    };

    if (partialStateCallback) {
        updateFiber.partialStateCallback = partialStateCallback;
    }

    updateQueue.push(updateFiber);

    requestIdleCallback(performWork);
};

export const render = (elements: AnuElement | AnuElement[], containerDom: Element): void => {
    updateQueue.push({
        from: HOST_ROOT,
        dom: containerDom,
        newProps: { children: Array.isArray(elements) ? elements : [elements] }
    });

    requestIdleCallback(performWork);
};
