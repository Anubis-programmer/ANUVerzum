import { createDomElement, updateDomProperties, SVG_ELEMENT_LIST } from './domUtils';

const HOST_COMPONENT = 'host';
const CLASS_COMPONENT = 'class';
const FUNCTION_COMPONENT = 'function';
const HOST_ROOT = 'root';

const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

const ENOUGH_TIME = 1;

const updateQueue = [];
let nextUnitOfWork = null;
let pendingCommit = null;

const getRoot = fiber => {
    let node = fiber;

    while (node.parent) {
        node = node.parent;
    }

    return node;
};

const resetNextUnitOfWork = () => {
    const update = updateQueue.shift();

    if (!update) {
        return;
    }

    if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    if (update.partialStateCallback) {
        update.instance.__fiber.partialStateCallback = update.partialStateCallback;
    }

    const root =
        update.from === HOST_ROOT
            ? update.dom._rootContainerFiber
            : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root
    };
};

const workLoop = deadline => {
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

const performWork = deadline => {
    workLoop(deadline);

    if (nextUnitOfWork || updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
};

const performUnitOfWork = wipFiber => {
    beginWork(wipFiber);

    if (wipFiber.child) {
        return wipFiber.child;
    }

    let unitOfWork = wipFiber;

    while (unitOfWork) {
        completeWork(unitOfWork);

        if (unitOfWork.sibling) {
            return unitOfWork.sibling;
        }

        unitOfWork = unitOfWork.parent;
    }
};

const beginWork = wipFiber => {
    if (wipFiber.tag === CLASS_COMPONENT) {
        updateClassComponent(wipFiber);
    } else if (wipFiber.tag === FUNCTION_COMPONENT) {
        updateFunctionComponent(wipFiber);
    } else {
        updateHostComponent(wipFiber);
    }
};

const updateHostComponent = wipFiber => {
    if (!wipFiber.stateNode) {
        wipFiber.stateNode = createDomElement(wipFiber);
    }

    const newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
};

const createFunctionComponent = fiber => {
    const instance = fiber.type(fiber.props);
    instance.__fiber = fiber;

    return instance;
};

const updateFunctionComponent = wipFiber => {
    let instance = wipFiber.stateNode || null;

    if (instance === null) {
        instance = wipFiber.stateNode = createFunctionComponent(wipFiber);
    } else if (wipFiber.props === instance.props && !wipFiber.partialState) {
        cloneChildFibers(wipFiber);

        return;
    }

    instance.props = wipFiber.props;
    wipFiber.stateNode.render = wipFiber.type;
    const newChildElements = wipFiber.stateNode.render(wipFiber.props);
    reconcileChildrenArray(wipFiber, newChildElements);
};

const createInstance = fiber => {
    const context = Object.assign({}, fiber.stateNode ? { ...fiber.stateNode.context } : {});
    const instance = new fiber.type(fiber.props, context);
    instance.__fiber = fiber;

    return instance;
};

const updateClassComponent = wipFiber => {
    let instance = wipFiber.stateNode || null;

    if (instance === null) {
        const stateNode = createInstance(wipFiber);
        stateNode.context = { ...stateNode.context };
        instance = wipFiber.stateNode = stateNode;

        wipFiber.stateNode.setState = wipFiber.stateNode.setState.bind(wipFiber.stateNode);

        if (wipFiber.type.prototype.componentDidMount) {
            wipFiber.stateNode.componentDidMount = wipFiber.stateNode.componentDidMount.bind(wipFiber.stateNode);
        }

        if (wipFiber.type.prototype.componentDidUpdate) {
            wipFiber.stateNode.componentDidUpdate = wipFiber.stateNode.componentDidUpdate.bind(wipFiber.stateNode);
        }

        if (wipFiber.type.prototype.componentWillUnmount) {
            wipFiber.stateNode.componentWillUnmount = wipFiber.stateNode.componentWillUnmount.bind(wipFiber.stateNode);
        }
    } else if (wipFiber.props === instance.props && !wipFiber.partialState && !wipFiber.partialStateCallback) {
        cloneChildFibers(wipFiber);

        return;
    }

    const nextProps = { ...wipFiber.props };
    let nextState = {};

    if (!wipFiber.partialStateCallback) {
        nextState = Object.assign({}, instance.state, wipFiber.partialState);
    } else {
        nextState = wipFiber.partialStateCallback(instance.state, nextProps);
    }

    instance.props = nextProps;
    instance.state = nextState;
    wipFiber.partialState = null;
    delete wipFiber.partialStateCallback;
    let newChildElements = null;

    newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
};

const arrify = val => !val ? [] : Array.isArray(val) ? val : [val];

const reconcileChildrenArray = (wipFiber, newChildElements) => {
    const elements = arrify(newChildElements);
    let index = 0;
    let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    let newFiber = null;

    while (index < elements.length || oldFiber) {
        const prevFiber = newFiber;
        const element = index < elements.length && elements[index];
        const sameType = oldFiber && element && element.type === oldFiber.type;

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                tag: oldFiber.tag,
                stateNode: oldFiber.stateNode,
                props: element.props,
                parent: wipFiber,
                alternate: oldFiber,
                partialState: oldFiber.partialState,
                effectTag: UPDATE
            };

            if (oldFiber.partialStateCallback) {
                newFiber.partialStateCallback = oldFiber.partialStateCallback;
            }
        }

        if (element && !sameType) {
            let tag;

            if (typeof element.type === 'string') {
                tag = HOST_COMPONENT;
            } else if (
                typeof element.type === 'function' &&
                !element.type.isAnuComponent &&
                !element.type.prototype.hasOwnProperty('render')
            ) {
                tag = FUNCTION_COMPONENT;
            } else {
                tag = CLASS_COMPONENT;
            }

            newFiber = {
                type: element.type,
                tag,
                props: element.props,
                parent: wipFiber,
                effectTag: PLACEMENT
            };
        }

        if (oldFiber && !sameType) {
            oldFiber.effectTag = DELETION;
            wipFiber.effects = wipFiber.effects || [];
            wipFiber.effects.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index === 0) {
            wipFiber.child = newFiber;
        } else if (prevFiber && element) {
            prevFiber.sibling = newFiber;
        }

        index++;
    }
};

const cloneChildFibers = parentFiber => {
    const oldFiber = parentFiber.alternate;

    if (!oldFiber.child) {
        return;
    }

    let oldChild = oldFiber.child;
    let prevChild = null;

    while (oldChild) {
        const newChild = {
            type: oldChild.type,
            tag: oldChild.tag,
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

const completeWork = fiber => {
    if (fiber.tag === CLASS_COMPONENT) {
        fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
        const childEffects = fiber.effects || [];
        const thisEffect = fiber.effectTag !== null ? [fiber] : [];
        const parentEffects = fiber.parent.effects || [];
        fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
        pendingCommit = fiber;
    }
};

const componentLifecyclesQueue = [];

const flushComponentLifecyclesQueue = () => {
    while (componentLifecyclesQueue.length > 0) {
        const {
            fn,
            params: {
                prevProps,
                prevState
            }
        } = componentLifecyclesQueue.shift();

        fn(prevProps, prevState);
    }
};

const commitAllWork = fiber => {
    fiber.effects.forEach((effect, index, effects) => {
        commitWork(effect);

        if (index === effects.length - 1) {
            flushComponentLifecyclesQueue();
        }
    });

    fiber.stateNode._rootContainerFiber = fiber;
    nextUnitOfWork = null;
    pendingCommit = null;
};

const commitWork = effect => {
    if (effect.tag === HOST_ROOT) {
        return;
    }

    let domParentFiber = effect.parent;
    const isRefInProps = (props) => Object.keys(props).indexOf('ref') > -1;

    while (domParentFiber.tag === CLASS_COMPONENT || domParentFiber.tag === FUNCTION_COMPONENT) {
        domParentFiber = domParentFiber.parent;
    }

    const domParent = domParentFiber.stateNode;

    if (effect.effectTag === PLACEMENT) {
        if (effect.tag === HOST_COMPONENT) {
            domParent.appendChild(effect.stateNode);

            if (isRefInProps(effect.props)) {
                effect.props.ref.current = effect.stateNode;
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
        if (
            effect &&
            effect.stateNode &&
            effect.alternate &&
            effect.alternate.props &&
            effect.props
        ) {
            if (effect.tag === HOST_COMPONENT) {
                updateDomProperties(effect.stateNode, effect.alternate.props, effect.props, SVG_ELEMENT_LIST.indexOf(effect.type) > -1);

                if (isRefInProps(effect.props)) {
                    effect.props.ref.current = effect.stateNode;
                }
            } else if (effect.tag === CLASS_COMPONENT) {
                if (effect.stateNode.componentDidUpdate) {
                    componentLifecyclesQueue.push({
                        fn: effect.stateNode.componentDidUpdate,
                        params: {
                            prevProps: effect.stateNode.props,
                            prevState: effect.stateNode.state
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
        }

        commitDeletion(effect, domParent);
    }
};

const commitDeletion = (fiber, domParent) => {
    let node = fiber;

    while (node) {
        if (node.tag === CLASS_COMPONENT || node.tag === FUNCTION_COMPONENT) {
            node = node.child;

            continue;
        }

        if (domParent.contains(node.stateNode)) {
            domParent.removeChild(node.stateNode);
        }

        while (node !== fiber && !node.sibling) {
            node = node.parent;
        }

        if (node === fiber) {
            return;
        }

        node = node.sibling;
    }
};

export const createRef = () => ({
    current: null
});

export const scheduleUpdate = (instance, partialState, partialStateCallback) => {
    const updateFiber = {
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

export const render = (elements, containerDom) => {
    updateQueue.push({
        from: HOST_ROOT,
        dom: containerDom,
        newProps: { children: elements }
    });

    requestIdleCallback(performWork);
};