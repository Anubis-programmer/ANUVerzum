import { createElement } from '../elements';
import { Component } from './Component';
import { AnuElement, Props, ComponentConstructor } from '../elements';

type StoreShape = {
    getState: () => any;
    dispatch: (action: any) => any;
    subscribe: (listener: () => void) => void;
    unsubscribe: (listener: () => void) => void;
};

type MapStateToProps<TState = any, TOwnProps extends Props = Props, TStateProps extends Props = Props> = (
    state: TState,
    ownProps: TOwnProps
) => TStateProps;

type MapDispatchToProps<TDispatch = any, TOwnProps extends Props = Props, TDispatchProps extends Props = Props> = (
    dispatch: TDispatch,
    ownProps: TOwnProps
) => TDispatchProps;

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
        TOwnProps extends Props = Props,
        TStateProps extends Props = Props,
        TDispatchProps extends Props = Props
    >(
        mapStateToProps?: MapStateToProps<TState, TOwnProps, TStateProps> | null,
        mapDispatchToProps?: MapDispatchToProps<any, TOwnProps, TDispatchProps> | null
    ) =>
    (WrappedComponent: ComponentConstructor<TStateProps & TDispatchProps & TOwnProps>): ComponentConstructor => {
        class Connect extends Component<TOwnProps> {
            store: StoreShape;
            subscription: Subscription;

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

            componentWillUnmount(): void {
                this.subscription.tryUnsubscribe();
            }

            componentDidUpdate(): void {
                this.subscription.notifyNestedSubs();
            }

            onStateChange(): void {
                this.setState({});
            }

            render(): AnuElement {
                const stateProps = mapStateToProps
                    ? mapStateToProps(this.store.getState(), this.props)
                    : ({} as TStateProps);
                const dispatchProps = mapDispatchToProps
                    ? mapDispatchToProps(this.store.dispatch, this.props)
                    : ({} as TDispatchProps);
                const passedProps = {
                    ...this.props,
                    ...stateProps,
                    ...dispatchProps
                } as TStateProps & TDispatchProps & TOwnProps;

                return createElement(WrappedComponent as any, passedProps as any);
            }
        }

        return Connect as unknown as ComponentConstructor;
    };

const Connector = {
    connect: connectHOC,
    Provider
};

export default Connector;
