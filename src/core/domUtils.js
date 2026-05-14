import { TEXT_ELEMENT } from "./elements";

const getHTMLValidSvgTag = fiberType => {
    switch (fiberType) {
        case 'anchor': {
            return 'a';
        }
        case 'svgStyle': {
            return 'style';
        }
        case 'svgTitle': {
            return 'title';
        }
        default: {
            return fiberType;
        }
    }
};

export const SVG_ELEMENT_LIST = [
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

export const updateDomProperties = (dom, prevProps, nextProps, isSvgElement = false) => {
    const isEvent = name => {
        if (!String.prototype.startsWith) {
            return name[0] === 'o' && name[1] === 'n';
        }

        return name.startsWith('on');
    };
    const isAttribute = name =>
        !isEvent(name) && name !== 'children' && name !== 'style' && name !== 'ref' && name !== 'key';
    const isNew = (prev, next) => key => prev[key] !== next[key];
    const isGone = (prev, next) => key => !(key in next);

    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    Object.keys(prevProps)
        .filter(isAttribute)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            if (name === 'className') {
                dom['class'] = null;
            } else if (name === 'htmlFor') {
                dom['for'] = null;
            } else {
                dom[name] = null;
            }
        });

    Object.keys(nextProps)
        .filter(isAttribute)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            if (isSvgElement) {
                if (name === 'className') {
                    dom.setAttribute('class', nextProps[name]);
                } else {
                    dom.setAttribute(name, nextProps[name]);
                }
            } else {
                if (name.includes('aria-') || name === 'role') {
                    dom.setAttribute(name, nextProps[name])
                } else {
                    dom[name] = nextProps[name];
                }
            }
        });

    prevProps.style = prevProps.style || {};
    nextProps.style = nextProps.style || {};

    Object.keys(nextProps.style)
        .filter(isNew(prevProps.style, nextProps.style))
        .forEach(key => {
            dom.style[key] = nextProps.style[key];
        });

    Object.keys(prevProps.style)
        .filter(isGone(prevProps.style, nextProps.style))
        .forEach(key => {
            dom.style[key] = '';
        });

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
};

export const createDomElement = fiber => {
    const isTextElement = fiber.type === TEXT_ELEMENT;
    const isSvgElement = SVG_ELEMENT_LIST.indexOf(fiber.type) > -1;
    let dom;

    if (isTextElement) {
        dom = document.createTextNode('');
    } else if (isSvgElement) {
        dom = document.createElementNS('http://www.w3.org/2000/svg', getHTMLValidSvgTag(fiber.type));
    } else {
        dom = document.createElement(fiber.type);
    }

    updateDomProperties(dom, {}, fiber.props, isSvgElement);

    return dom;
};