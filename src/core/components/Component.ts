import { scheduleUpdate } from '../reconciler';
import { AnuElement, Props } from '../elements';

export abstract class Component<P extends Record<string, any> = Props, S extends Record<string, any> = Record<string, any>> {
    props: P;
    state: S;
    context: Record<string, any>;
    /** @internal Set by the reconciler. */
    __fiber?: any;

    static isAnuComponent?: boolean;

    constructor(props: P, context?: Record<string, any>) {
        this.props = props || ({} as P);
        this.context = { ...(this as any).context, ...context };
        this.state = (this as any).state || ({} as S);
    }

    setState(partialState: Partial<S> | ((prevState: S, prevProps: P) => S) = {}): void {
        let partialStateObject: Partial<S> = {};
        let partialStateCallback: ((prevState: S, prevProps: P) => S) | undefined;

        if (typeof partialState === 'object') {
            partialStateObject = { ...partialStateObject, ...partialState };
        } else if (typeof partialState === 'function') {
            partialStateCallback = partialState;
        }

        scheduleUpdate(this, partialStateObject, partialStateCallback);
    }

    abstract render(): AnuElement | AnuElement[] | string | number | boolean | null | undefined;

    componentDidMount(): void {}

    componentDidUpdate(_prevProps: P, _prevState: S): void {}

    componentWillUnmount(): void {}
}
