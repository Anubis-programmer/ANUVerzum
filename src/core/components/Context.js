import { deepEqual } from '../../misc/utils';
import { Component } from './Component';

export const createContext = context => {
    const providerContext = {
        defaultContext: { value: context },
        value: {}
    };

    const getPureProps = props => {
        const pureProps = {};

        Object.keys(props).forEach(key => {
            if (key !== 'children') {
                pureProps[key] = props[key];
            }
        });

        return pureProps;
    }

    class ContextProvider extends Component {
        constructor(props) {
            super(props);
            providerContext.value = { ...getPureProps(props) };
        }

        componentDidUpdate() {
            const pureProps = getPureProps(this.props);

            if (!deepEqual(providerContext.value, pureProps)) {
                providerContext.value = { ...pureProps };

                this.setState();
            }
        }

        render() {
            const { children } = this.props;

            try {
                if (children.length !== 1) {
                    throw new Error('Context Component must have exactly one child element!');
                }

                return children;
            } catch (err) {
                console.error(err);
            }
        }
    }

    class ContextConsumer extends Component {
        constructor(props) {
            super(props);
        }

        componentDidUpdate() {
            if (providerContext.__notifySub) {
                this.setState();
            }
        }

        render() {
            const { children } = this.props;
            const { value, defaultContext } = providerContext;

            try {
                if (children.length !== 1) {
                    throw new Error('Context Component must have exactly one child element!');
                }

                const { type } = children[0];
                const childProps = { value, defaultContext };

                if (typeof type === 'function') {
                    return type(childProps);
                } else {
                    throw new Error('Context component child element must be a function!')
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return {
        Provider: ContextProvider,
        Consumer: ContextConsumer
    };
};