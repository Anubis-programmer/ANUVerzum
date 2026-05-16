export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const;

export type AnuChild = AnuElement | string | number | boolean | null | undefined;

export type Props = {
    children?: AnuChild | AnuChild[];
    ref?: Ref<any>;
    key?: string | number;
    style?: Partial<CSSStyleDeclaration & Record<string, string>>;
    [key: string]: any;
};

export type Ref<T> = { current: T | null };

export type FunctionComponent<P extends Props = Props> = (props: P) => AnuElement | AnuElement[] | null;

export type ComponentConstructor<P extends Props = Props> = new (props: P, context?: Record<string, any>) => any;

export type ElementType = string | FunctionComponent | ComponentConstructor;

export type AnuElement = {
    type: ElementType;
    props: Props;
};

const createTextElement = (value: string | number | boolean): AnuElement => ({
    type: TEXT_ELEMENT,
    props: { nodeValue: String(value) }
});

export const createElement = (type: ElementType, config: Props | null, ...args: any[]): AnuElement => {
    const props: Props = Object.assign({}, config);

    if (args.length > 0) {
        const rawChildren = ([] as any[]).concat(...args);
        props.children = rawChildren
            .filter((c: any) => c !== null && c !== false)
            .map((c: any) =>
                typeof c === 'function'
                    ? createElement(c, { ...(c.props || {}) })
                    : c instanceof Object
                      ? (c as AnuElement)
                      : createTextElement(c)
            );
    } else {
        props.children = props.children ?? [];
    }

    return { type, props };
};
