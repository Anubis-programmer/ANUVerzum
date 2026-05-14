import { createElement } from '../elements';
import { Component } from './Component';

const providedStore = (context = {}) => {
    let providerContext = { ...context };

    return {
        getContext: () => providerContext,
        setContext: context => {
            providerContext = { ...providerContext, ...context };
        }
    };
};

const providerStore = providedStore();

class Provider extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = props.store;
        this.context.store = props.store;
        this.context.parentSub = null;
        providerStore.setContext({ ...this.context });
    }

    render() {
        const { children } = this.props;

        try {
            if (children.length !== 1) {
                throw new Error('Provider must have one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);
        }
    }
}

class Subscription {
    constructor(store, parentSub, onStateChange) {
        this.store = store;
        this.parentSub = parentSub;
        this.onStateChange = onStateChange;
        this.subscribed = false;
        this.listeners = [];
    }

    notifyNestedSubs() {
        this.listeners.forEach(listener => listener());
    }

    trySubscribe() {
        if (!this.subscribed) {
            if (this.parentSub !== null) {
                this.parentSub.addNestedSub(this.onStateChange);
            } else {
                this.store.subscribe(this.onStateChange);
            }

            this.subscribed = true;
        }
    }

    addNestedSub(listener) {
        this.trySubscribe();
        this.listeners.push(listener);
    }

    tryUnsubscribe() {
        if (this.subscribed) {
            if (this.parentSub !== null) {
                this.parentSub.removeNestedSub(this.onStateChange);
            } else {
                this.store.unsubscribe(this.onStateChange);
            }

            this.subscribed = false;
        }
    }

    removeNestedSub(listener) {
        this.tryUnsubscribe();
        const index = this.listeners.indexOf(listener);

        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }
}

const connectHOC = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
    class Connect extends Component {
        constructor(props, context) {
            super(props, context);
            this.context = { ...this.context, ...providerStore.getContext() };
            this.store = this.context.store;
            const parentSub = this.context.parentSub;
            this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
            this.context.parentSub = this.subscription;
        }

        componentDidMount() {
            this.subscription.trySubscribe();
        }

        componentWillUnmount() {
            this.subscription.tryUnsubscribe();
        }

        componentDidUpdate() {
            this.subscription.notifyNestedSubs();
        }

        onStateChange() {
            this.setState({});
        }

        render() {
            const stateProps = mapStateToProps
                ? mapStateToProps(this.store.getState(), this.props)
                : {};
            const dispatchProps = mapDispatchToProps
                ? mapDispatchToProps(this.store.dispatch, this.props)
                : {};
            const passedProps = {
                ...this.props,
                ...stateProps,
                ...dispatchProps
            };

            return createElement(
                WrappedComponent,
                passedProps
            );
        }
    }

    return Connect;
};

const Connector = {
    connect: connectHOC,
    Provider,
};

export default Connector;