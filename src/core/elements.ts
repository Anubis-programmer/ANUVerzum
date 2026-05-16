export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const;

export type AnuChild = AnuElement | string | number | boolean | null | undefined;

export type AnuNode = AnuChild | AnuNode[];

export type AnuCSSProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>>;

export type Props = {
    children?: AnuNode;
    ref?: Ref<any>;
    key?: string | number;
    style?: AnuCSSProperties;
    [key: string]: any;
};

export type Ref<T> = { current: T | null };

export type FunctionComponent<P extends Props = Props> = (props: P) => AnuElement<any, any> | AnuElement<any>[] | null;

export type ComponentConstructor<P extends Props = Props> = new (props: P, context?: Record<string, any>) => any;

export type ElementType = string | FunctionComponent | ComponentConstructor;

export type AnuElement<P = Props, T extends ElementType = ElementType> = {
    type: T;
    props: P;
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
