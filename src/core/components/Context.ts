import { deepEqual } from '../../misc/utils';
import { Component } from './Component';
import { AnuElement, Props } from '../elements';

export type ContextValue<T> = {
    value: Partial<T>;
    defaultContext: { value: T };
};

export type ConsumerProps<T> = Props & {
    children: (ctx: ContextValue<T>) => AnuElement | null;
};

export type Context<T extends Record<string, any> = Record<string, any>> = {
    Provider: new (props: Props & Partial<T>) => Component;
    Consumer: new (props: ConsumerProps<T>) => Component<ConsumerProps<T>>;
    ContextProvider: new (props: Props) => Component;
    ContextConsumer: new (props: Props) => Component;
};

export const createContext = <T extends Record<string, any> = Record<string, any>>(context: T): Context<T> => {
    const providerContext: { defaultContext: { value: T }; value: Partial<T>; __notifySub?: boolean } = {
        defaultContext: { value: context },
        value: {}
    };

    const getPureProps = (props: Props): Partial<T> => {
        const pureProps: Record<string, any> = {};

        Object.keys(props).forEach((key) => {
            if (key !== 'children') {
                pureProps[key] = props[key];
            }
        });

        return pureProps as Partial<T>;
    };

    class ContextProvider extends Component<Props> {
        constructor(props: Props) {
            super(props);
            providerContext.value = { ...getPureProps(props) };
        }

        componentDidUpdate(): void {
            const pureProps = getPureProps(this.props);

            if (!deepEqual(providerContext.value as Record<string, any>, pureProps as Record<string, any>)) {
                providerContext.value = { ...pureProps };
                providerContext.__notifySub = true;
                this.setState();
            }
        }

        render(): AnuElement | AnuElement[] | null {
            const children = this.props.children as AnuElement[] | undefined;

            try {
                if (!children || children.length !== 1) {
                    throw new Error('Context Component must have exactly one child element!');
                }

                return children;
            } catch (err) {
                console.error(err);

                return null;
            }
        }
    }

    class ContextConsumer extends Component<Props> {
        componentDidUpdate(): void {
            if (providerContext.__notifySub) {
                providerContext.__notifySub = false;
                this.setState();
            }
        }

        render(): AnuElement | AnuElement[] | null {
            const children = this.props.children as AnuElement[] | undefined;
            const { value, defaultContext } = providerContext;

            try {
                if (!children || children.length !== 1) {
                    throw new Error('Context Component must have exactly one child element!');
                }

                const { type } = children[0];
                const childProps: ContextValue<T> = { value, defaultContext };

                if (typeof type === 'function') {
                    return (type as (ctx: ContextValue<T>) => AnuElement | AnuElement[] | null)(childProps);
                } else {
                    throw new Error('Context component child element must be a function!');
                }
            } catch (err) {
                console.error(err);

                return null;
            }
        }
    }

    return {
        Provider: ContextProvider,
        Consumer: ContextConsumer,
        ContextProvider,
        ContextConsumer
    } as unknown as Context<T>;
};
