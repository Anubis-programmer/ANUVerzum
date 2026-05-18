import { createElement } from '../elements';
import { Component } from './Component';
import { AnuElement, Props, ComponentConstructor } from '../elements';

type StoreShape = {
    getState: () => any;
    dispatch: (action: any) => any;
    subscribe: (listener: () => void) => void;
    unsubscribe: (listener: () => void) => void;
};

type MapStateToProps<TState = any, TOwnProps extends Record<string, any> = Record<string, any>, TStateProps extends Record<string, any> = Record<string, any>> = (
    state: TState,
    ownProps: TOwnProps
) => TStateProps;

type MapDispatchToProps<TDispatch = any, TOwnProps extends Record<string, any> = Record<string, any>, TDispatchProps extends Record<string, any> = Record<string, any>> = (
    dispatch: TDispatch,
    ownProps: TOwnProps
) => TDispatchProps;

const shallowEqual = (a: Record<string, any>, b: Record<string, any>): boolean => {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every((key) => a[key] === b[key]);
};

const providedStore = (context: Record<string, any> = {}) => {
    let providerContext = { ...context };

    return {
        getContext: (): Record<string, any> => providerContext,
        setContext: (ctx: Record<string, any>): void => {
            providerContext = { ...providerContext, ...ctx };
        }
    };
};

const providerStore = providedStore();

export interface ConnectorProviderProps extends Props {
    store: StoreShape;
}

class Provider extends Component<ConnectorProviderProps> {
    store: StoreShape;

    constructor(props: ConnectorProviderProps, context?: Record<string, any>) {
        super(props, context);
        this.store = props.store;
        this.context['store'] = props.store;
        this.context['parentSub'] = null;
        providerStore.setContext({ ...this.context });
    }

    render(): AnuElement | AnuElement[] | null {
        const children = this.props.children as AnuElement[] | undefined;

        try {
            if (!children || children.length !== 1) {
                throw new Error('Provider must have one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);

            return null;
        }
    }
}

class Subscription {
    store: StoreShape;
    parentSub: Subscription | null;
    onStateChange: () => void;
    subscribed: boolean;
    listeners: Array<() => void>;

    constructor(store: StoreShape, parentSub: Subscription | null, onStateChange: () => void) {
        this.store = store;
        this.parentSub = parentSub;
        this.onStateChange = onStateChange;
        this.subscribed = false;
        this.listeners = [];
    }

    notifyNestedSubs(): void {
        this.listeners.forEach((listener) => listener());
    }

    trySubscribe(): void {
        if (!this.subscribed) {
            if (this.parentSub !== null) {
                this.parentSub.addNestedSub(this.onStateChange);
            } else {
                this.store.subscribe(this.onStateChange);
            }

            this.subscribed = true;
        }
    }

    addNestedSub(listener: () => void): void {
        this.trySubscribe();
        this.listeners.push(listener);
    }

    tryUnsubscribe(): void {
        if (this.subscribed) {
            if (this.parentSub !== null) {
                this.parentSub.removeNestedSub(this.onStateChange);
            } else {
                this.store.unsubscribe(this.onStateChange);
            }

            this.subscribed = false;
        }
    }

    removeNestedSub(listener: () => void): void {
        const index = this.listeners.indexOf(listener);

        if (index >= 0) {
            this.listeners.splice(index, 1);
        }

        if (this.listeners.length === 0) {
            this.tryUnsubscribe();
        }
    }
}

const connectHOC =
    <
        TState = any,
        TOwnProps extends Record<string, any> = Record<string, any>,
        TStateProps extends Record<string, any> = Record<string, any>,
        TDispatchProps extends Record<string, any> = Record<string, any>
    >(
        mapStateToProps?: MapStateToProps<TState, TOwnProps, TStateProps> | null,
        mapDispatchToProps?: MapDispatchToProps<any, TOwnProps, TDispatchProps> | null
    ) =>
    (WrappedComponent: ComponentConstructor<TStateProps & TDispatchProps & TOwnProps>): ComponentConstructor => {
        class Connect extends Component<TOwnProps> {
            store: StoreShape;
            subscription: Subscription;
            _cachedPassedProps: (TStateProps & TDispatchProps & TOwnProps) | null = null;

            constructor(props: TOwnProps, context?: Record<string, any>) {
                super(props, context);
                this.context = { ...this.context, ...providerStore.getContext() };
                this.store = this.context['store'] as StoreShape;
                const parentSub = this.context['parentSub'] as Subscription | null;
                this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
                this.context['parentSub'] = this.subscription;
            }

            componentDidMount(): void {
                this.subscription.trySubscribe();
            }

            componentDidUpdate(): void {
                this.subscription.notifyNestedSubs();
            }

            onStateChange(): void {
                this.setState({});
            }

            componentWillUnmount(): void {
                this.subscription.tryUnsubscribe();
            }

            render(): AnuElement {
                const stateProps = mapStateToProps
                    ? mapStateToProps(this.store.getState(), this.props)
                    : ({} as TStateProps);
                const dispatchProps = mapDispatchToProps
                    ? mapDispatchToProps(this.store.dispatch, this.props)
                    : ({} as TDispatchProps);
                const nextPassedProps = {
                    ...this.props,
                    ...stateProps,
                    ...dispatchProps
                } as TStateProps & TDispatchProps & TOwnProps;

                if (
                    !this._cachedPassedProps ||
                    !shallowEqual(
                        this._cachedPassedProps as Record<string, any>,
                        nextPassedProps as Record<string, any>
                    )
                ) {
                    this._cachedPassedProps = nextPassedProps;
                }

                return createElement(WrappedComponent as any, this._cachedPassedProps as any);
            }
        }

        return Connect as unknown as ComponentConstructor;
    };

const Connector = {
    connect: connectHOC,
    Provider
};

export default Connector;
