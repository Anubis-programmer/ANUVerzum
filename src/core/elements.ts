export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const;

export type AnuChild = AnuElement | string | number | boolean | null | undefined;

export type AnuNode = AnuChild | AnuNode[];

export type AnuCSSProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>>;

export type Props = {
    children?: AnuNode;
    style?: AnuCSSProperties;
    [key: string]: any;
};

export type Ref<T> = { current: T | null };

export type FunctionComponent<P extends Props = Props> = (props: P) => AnuElement<any, any> | AnuElement<any, any>[] | string | number | boolean | null | undefined;

export type ComponentConstructor<P extends Props = Props> = new (props: P, context?: Record<string, any>) => any;

export const PORTAL_ELEMENT = Symbol('portal');
export type PortalElementType = typeof PORTAL_ELEMENT;
export type ElementType = string | FunctionComponent<any> | ComponentConstructor<any> | PortalElementType;

export type AnuElement<P = Props, T extends ElementType = ElementType> = {
    type: T;
    props: P;
    key: string | null;
    ref: Ref<any> | null;
};

const createTextElement = (value: string | number | boolean): AnuElement => ({
    type: TEXT_ELEMENT,
    props: { nodeValue: String(value) },
    key: null,
    ref: null
});

export const createElement = (type: ElementType, config: Props | null, ...args: any[]): AnuElement => {
    const key = config != null && config.key != null ? String(config.key) : null;
    const ref = config != null && config.ref != null ? config.ref : null;
    const props: Props = Object.assign({}, config);
    delete props.key;
    delete props.ref;

    if (args.length === 1) {
        props.children = args[0];
    } else if (args.length > 1) {
        props.children = args;
    }

    return { type, props, key, ref };
};

const flattenChildren = (children: AnuNode, acc: AnuChild[] = []): AnuChild[] => {
    if (Array.isArray(children)) {
        for (const child of children) {
            flattenChildren(child, acc);
        }
    } else if (children !== null && children !== undefined && typeof children !== 'boolean') {
        acc.push(children);
    }

    return acc;
};

export const toChildArray = (children: AnuNode): AnuChild[] => flattenChildren(children);

export const normalizeChildren = (children: AnuNode): AnuElement[] =>
    flattenChildren(children).map((c: any) =>
        typeof c === 'function'
            ? createElement(c, { ...(c.props || {}) })
            : c instanceof Object
              ? (c as AnuElement)
              : createTextElement(c as string | number)
    );
