import { TEXT_ELEMENT, AnuElement, Props } from './elements';

export const getHTMLValidSvgTag = (fiberType: string): string => {
    switch (fiberType) {
        case 'anchor':
            return 'a';
        case 'svgStyle':
            return 'style';
        case 'svgTitle':
            return 'title';
        default:
            return fiberType;
    }
};

export const SVG_ELEMENT_LIST: readonly string[] = [
    'anchor',
    'animate',
    'animateMotion',
    'animateTransform',
    'circle',
    'clipPath',
    'desc',
    'discard',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'foreignObject',
    'g',
    'hatch',
    'hatchpath',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'mesh',
    'meshgradient',
    'meshpatch',
    'meshrow',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'set',
    'stop',
    'svgStyle',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'svgTitle',
    'tspan',
    'unknown',
    'use',
    'view'
];

export const updateDomProperties = (
    dom: HTMLElement | SVGElement | Text,
    prevProps: Props,
    nextProps: Props,
    isSvgElement = false
): void => {
    const isEvent = (name: string): boolean => name.startsWith('on');
    const isAttribute = (name: string): boolean =>
        !isEvent(name) && name !== 'children' && name !== 'style';
    const isNew =
        (prev: Props, next: Props) =>
        (key: string): boolean =>
            prev[key] !== next[key];
    const isGone =
        (prev: Props, next: Props) =>
        (key: string): boolean =>
            !(key in next);

    Object.keys(prevProps)
        .filter(isEvent)
        .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            (dom as HTMLElement).removeEventListener(eventType, prevProps[name]);
        });

    Object.keys(prevProps)
        .filter(isAttribute)
        .filter(isGone(prevProps, nextProps))
        .forEach((name) => {
            if (name === 'className') {
                (dom as HTMLElement).removeAttribute('class');
            } else if (name === 'htmlFor') {
                (dom as HTMLElement).removeAttribute('for');
            } else {
                (dom as HTMLElement).removeAttribute(name);
            }
        });

    Object.keys(nextProps)
        .filter(isAttribute)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            const el = dom as any;
            
            if (isSvgElement) {
                if (name === 'className') {
                    (dom as SVGElement).setAttribute('class', nextProps[name]);
                } else {
                    (dom as SVGElement).setAttribute(name, nextProps[name]);
                }
            } else {
                if (name.includes('-') || name === 'role') {
                    (dom as HTMLElement).setAttribute(name, nextProps[name]);
                } else {
                    el[name] = nextProps[name];
                }
            }
        });

    const prevStyle: Record<string, string> = (prevProps.style as Record<string, string>) || {};
    const nextStyle: Record<string, string> = (nextProps.style as Record<string, string>) || {};
    prevProps.style = prevStyle;
    nextProps.style = nextStyle;

    Object.keys(nextStyle)
        .filter((key) => prevStyle[key] !== nextStyle[key])
        .forEach((key) => {
            (dom as HTMLElement).style.setProperty(key, nextStyle[key]);
        });

    Object.keys(prevStyle)
        .filter((key) => !(key in nextStyle))
        .forEach((key) => {
            (dom as HTMLElement).style.setProperty(key, '');
        });

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            (dom as HTMLElement).addEventListener(eventType, nextProps[name]);
        });
};

export const createDomElement = (fiber: AnuElement & { type: string }): HTMLElement | SVGElement | Text => {
    const isTextElement = fiber.type === TEXT_ELEMENT;
    const isSvgElement = (SVG_ELEMENT_LIST as string[]).indexOf(fiber.type) > -1;
    let dom: HTMLElement | SVGElement | Text;

    if (isTextElement) {
        dom = document.createTextNode('');
    } else if (isSvgElement) {
        dom = document.createElementNS('http://www.w3.org/2000/svg', getHTMLValidSvgTag(fiber.type)) as SVGElement;
    } else {
        dom = document.createElement(fiber.type);
    }

    updateDomProperties(dom, {}, fiber.props, isSvgElement);

    return dom;
};
