import { deepEqual } from '../../misc/utils';
import { Component } from './Component';
import { AnuElement, Props } from '../elements';

export type ContextValue<T> = {
    value: Partial<T>;
    defaultContext: { value: T };
};

export type ConsumerProps<T> = Omit<Props, 'children'> & {
    children: (ctx: ContextValue<T>) => AnuElement | null;
};

export type Context<T extends Record<string, any> = Record<string, any>> = {
    Provider: new (props: Props & Partial<T>) => Component;
    Consumer: new (props: ConsumerProps<T>) => Component<ConsumerProps<T>>;
    ContextProvider: new (props: Props) => Component;
    ContextConsumer: new (props: Props) => Component;
};

export const createContext = <T extends Record<string, any> = Record<string, any>>(context: T): Context<T> => {
    const defaultContext: { value: T } = { value: context };

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
        value: Partial<T>;
        subscribers: Set<Component>;

        constructor(props: Props) {
            super(props);
            this.value = { ...getPureProps(props) };
            this.subscribers = new Set();
        }

        componentDidUpdate(): void {
            const pureProps = getPureProps(this.props);

            if (!deepEqual(this.value as Record<string, any>, pureProps as Record<string, any>)) {
                this.value = { ...pureProps };
                this.subscribers.forEach((consumer) => (consumer as any).setState());
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

    const resolveProvider = (consumer: Component): ContextProvider | null => {
        let fiber = (consumer as any).__fiber?.parent;

        while (fiber) {
            if (fiber.stateNode instanceof ContextProvider) {
                return fiber.stateNode as ContextProvider;
            }

            fiber = fiber.parent;
        }

        return null;
    };

    class ContextConsumer extends Component<Props> {
        private provider: ContextProvider | null = null;

        private subscribeTo(provider: ContextProvider | null): void {
            if (this.provider === provider) {
                return;
            }

            if (this.provider) {
                this.provider.subscribers.delete(this);
            }

            this.provider = provider;

            if (provider) {
                provider.subscribers.add(this);
            }
        }

        componentWillUnmount(): void {
            if (this.provider) {
                this.provider.subscribers.delete(this);
                this.provider = null;
            }
        }

        render(): AnuElement | AnuElement[] | null {
            const children = this.props.children as AnuElement[] | undefined;

            try {
                if (!children || children.length !== 1) {
                    throw new Error('Context Component must have exactly one child element!');
                }

                const provider = resolveProvider(this);
                this.subscribeTo(provider);

                const value = provider ? provider.value : defaultContext.value;
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
