import { TEXT_ELEMENT, AnuElement, Props } from './elements';
import { isNotNullish } from '../misc/utils';

const HTML_ATTRIBUTE_NAME_MAP: Record<string, string> = {
    acceptCharset: 'accept-charset',
    httpEquiv: 'http-equiv'
};

const toHtmlAttributeName = (name: string): string => {
    const mapped = HTML_ATTRIBUTE_NAME_MAP[name];

    if (isNotNullish(mapped)) {
        return mapped;
    }

    if (/^aria[A-Z]/.test(name)) {
        return `aria-${name.slice(4).toLowerCase()}`;
    }

    if (/^data[A-Z]/.test(name)) {
        return `data${name.slice(4).replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
    }

    return name.toLowerCase();
};

const ATTRIBUTE_ONLY_PROPS: ReadonlySet<string> = new Set(['loading', 'decoding', 'fetchpriority']);

const EVENT_TYPE_EXCEPTIONS: Record<string, string> = {
    onDoubleClick: 'dblclick'
};

const toEventType = (propName: string): string =>
    EVENT_TYPE_EXCEPTIONS[propName] ?? propName.toLowerCase().substring(2);

const toCssPropertyName =(key: string): string =>
    key.startsWith('--') ? key : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

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

export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export const isSvgDom = (dom: Node): boolean => dom.nodeType === 1 && (dom as Element).namespaceURI === SVG_NAMESPACE;

const childrenInheritSvgNamespace = (parentDom: Node | null | undefined): boolean =>
    isNotNullish(parentDom) && isSvgDom(parentDom) && (parentDom as Element).localName !== 'foreignObject';

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

    const removeDomProperty = (name: string): void => {
        const el = dom as any;
        if (isSvgElement) {
            (dom as SVGElement).removeAttribute(name === 'className' ? 'class' : name);
        } else if (name === 'className') {
            (dom as HTMLElement).removeAttribute('class');
        } else if (name === 'htmlFor') {
            (dom as HTMLElement).removeAttribute('for');
        } else if (name.includes('-') || name === 'role' || ATTRIBUTE_ONLY_PROPS.has(name)) {
            (dom as HTMLElement).removeAttribute(name);
        } else if (dom.nodeType === 1 && /[A-Z]/.test(name)) {
            (dom as HTMLElement).removeAttribute(toHtmlAttributeName(name));
        } else if (name in el && !Object.prototype.hasOwnProperty.call(el, name)) {
            const current = el[name];

            if (typeof current === 'boolean') {
                el[name] = false;
            } else if (typeof current === 'string') {
                el[name] = '';
            } else if (typeof current !== 'number') {
                el[name] = null;
            }

            if (dom.nodeType === 1) {
                (dom as HTMLElement).removeAttribute(name);
            }
        } else {
            delete el[name];
        }
    };

    Object.keys(prevProps)
        .filter(isEvent)
        .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach((name) => {
            (dom as HTMLElement).removeEventListener(toEventType(name), prevProps[name]);
        });

    Object.keys(prevProps)
        .filter(isAttribute)
        .filter(isGone(prevProps, nextProps))
        .forEach(removeDomProperty);

    Object.keys(nextProps)
        .filter(isAttribute)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            const el = dom as any;
            const value = nextProps[name];

            if (!isNotNullish(value)) {
                removeDomProperty(name);
                return;
            }

            if (isSvgElement) {
                if (name === 'className') {
                    (dom as SVGElement).setAttribute('class', value);
                } else {
                    (dom as SVGElement).setAttribute(name, value);
                }
            } else {
                if (name === 'className' || name === 'htmlFor') {
                    el[name] = value;
                } else if (name.includes('-') || name === 'role' || ATTRIBUTE_ONLY_PROPS.has(name)) {
                    (dom as HTMLElement).setAttribute(name, value);
                } else if (typeof value === 'boolean' && name in el) {
                    el[name] = value;
                } else if (dom.nodeType === 1 && /[A-Z]/.test(name)) {
                    (dom as HTMLElement).setAttribute(toHtmlAttributeName(name), value);
                } else {
                    el[name] = value;
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
            (dom as HTMLElement).style.setProperty(toCssPropertyName(key), String(nextStyle[key]));
        });

    Object.keys(prevStyle)
        .filter((key) => !(key in nextStyle))
        .forEach((key) => {
            (dom as HTMLElement).style.setProperty(toCssPropertyName(key), '');
        });

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            (dom as HTMLElement).addEventListener(toEventType(name), nextProps[name]);
        });
};

export const createDomElement = (
    fiber: AnuElement & { type: string },
    parentDom?: Node | null
): HTMLElement | SVGElement | Text => {
    const isTextElement = fiber.type === TEXT_ELEMENT;
    const isSvgElement = !isTextElement && (fiber.type === 'svg' || childrenInheritSvgNamespace(parentDom));
    let dom: HTMLElement | SVGElement | Text;

    if (isTextElement) {
        dom = document.createTextNode('');
    } else if (isSvgElement) {
        dom = document.createElementNS(SVG_NAMESPACE, getHTMLValidSvgTag(fiber.type)) as SVGElement;
    } else {
        dom = document.createElement(fiber.type);
    }

    updateDomProperties(dom, {}, fiber.props, isSvgElement);

    return dom;
};
