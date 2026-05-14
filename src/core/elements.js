export const TEXT_ELEMENT = 'TEXT_ELEMENT';

const createTextElement = value => ({
    type: TEXT_ELEMENT,
    props: { nodeValue: value }
});

export const createElement = (type, config, ...args) => {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];
    props.children = rawChildren
        .filter(c => c !== null && c !== false)
        .map(c => (
            typeof c === 'function'
                ? createElement(c, { ...(c.props || {}) })
                : (
                    c instanceof Object
                        ? c
                        : createTextElement(c)
                )
        ));

    return { type, props };
};