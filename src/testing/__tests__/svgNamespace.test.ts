import Anu from '../../index';
import { render } from '../index';

const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';

const SVG2_ELEMENTS: Array<[string, string]> = [
    ['anchor', 'a'],
    ['animate', 'animate'],
    ['animateMotion', 'animateMotion'],
    ['animateTransform', 'animateTransform'],
    ['circle', 'circle'],
    ['clipPath', 'clipPath'],
    ['defs', 'defs'],
    ['desc', 'desc'],
    ['discard', 'discard'],
    ['ellipse', 'ellipse'],
    ['feBlend', 'feBlend'],
    ['feColorMatrix', 'feColorMatrix'],
    ['feComponentTransfer', 'feComponentTransfer'],
    ['feComposite', 'feComposite'],
    ['feConvolveMatrix', 'feConvolveMatrix'],
    ['feDiffuseLighting', 'feDiffuseLighting'],
    ['feDisplacementMap', 'feDisplacementMap'],
    ['feDistantLight', 'feDistantLight'],
    ['feDropShadow', 'feDropShadow'],
    ['feFlood', 'feFlood'],
    ['feFuncA', 'feFuncA'],
    ['feFuncB', 'feFuncB'],
    ['feFuncG', 'feFuncG'],
    ['feFuncR', 'feFuncR'],
    ['feGaussianBlur', 'feGaussianBlur'],
    ['feImage', 'feImage'],
    ['feMerge', 'feMerge'],
    ['feMergeNode', 'feMergeNode'],
    ['feMorphology', 'feMorphology'],
    ['feOffset', 'feOffset'],
    ['fePointLight', 'fePointLight'],
    ['feSpecularLighting', 'feSpecularLighting'],
    ['feSpotLight', 'feSpotLight'],
    ['feTile', 'feTile'],
    ['feTurbulence', 'feTurbulence'],
    ['filter', 'filter'],
    ['foreignObject', 'foreignObject'],
    ['g', 'g'],
    ['image', 'image'],
    ['line', 'line'],
    ['linearGradient', 'linearGradient'],
    ['marker', 'marker'],
    ['mask', 'mask'],
    ['metadata', 'metadata'],
    ['mpath', 'mpath'],
    ['path', 'path'],
    ['pattern', 'pattern'],
    ['polygon', 'polygon'],
    ['polyline', 'polyline'],
    ['radialGradient', 'radialGradient'],
    ['rect', 'rect'],
    ['script', 'script'],
    ['set', 'set'],
    ['stop', 'stop'],
    ['svgStyle', 'style'],
    ['switch', 'switch'],
    ['symbol', 'symbol'],
    ['text', 'text'],
    ['textPath', 'textPath'],
    ['svgTitle', 'title'],
    ['tspan', 'tspan'],
    ['use', 'use'],
    ['view', 'view']
];

describe('SVG namespace', () => {
    test('<defs> and the resources inside it are created in the SVG namespace', () => {
        const { container } = render(
            Anu.createElement(
                'svg',
                { width: '100%', height: '100%' },
                Anu.createElement(
                    'defs',
                    {},
                    Anu.createElement(
                        'pattern',
                        { id: 'p', patternUnits: 'userSpaceOnUse', width: '60', height: '60' },
                        Anu.createElement('rect', { width: '30', height: '30', fill: 'blue' })
                    )
                ),
                Anu.createElement('rect', { width: '100%', height: '100%', fill: 'url(#p)' })
            )
        );

        const defs = container.querySelector('defs') as Element;

        expect(defs.namespaceURI).toBe(SVG_NS);
        expect(defs).toBeInstanceOf(SVGElement);
        expect((container.querySelector('pattern') as Element).namespaceURI).toBe(SVG_NS);
        expect((container.querySelector('pattern') as Element).getAttribute('patternUnits')).toBe('userSpaceOnUse');
    });

    test('re-rendering <defs> updates its attributes through the SVG path', () => {
        const { container, rerender } = render(
            Anu.createElement('svg', {}, Anu.createElement('defs', { className: 'a' }))
        );

        rerender(Anu.createElement('svg', {}, Anu.createElement('defs', { className: 'b', id: 'd' })));

        const defs = container.querySelector('defs') as Element;

        expect(defs.namespaceURI).toBe(SVG_NS);
        expect(defs.getAttribute('class')).toBe('b');
        expect(defs.getAttribute('id')).toBe('d');
    });

    test('any child of <svg> inherits the SVG namespace, including raw a/style/title and unknown tags', () => {
        const { container } = render(
            Anu.createElement(
                'svg',
                {},
                Anu.createElement('a', { href: '#x' }),
                Anu.createElement('title', {}, 't'),
                Anu.createElement('style', {}, 'rect{}'),
                Anu.createElement('my-shape', {}, Anu.createElement('circle', {}))
            )
        );

        const svg = container.querySelector('svg') as Element;

        Array.from(svg.querySelectorAll('*')).forEach((el) => {
            expect(el.namespaceURI).toBe(SVG_NS);
        });
        expect(svg.querySelectorAll('*')).toHaveLength(5);
    });

    test('the namespace is inherited through function and class components', () => {
        const Shape = () => Anu.createElement('circle', { r: '5' });

        class Group extends Anu.Component<{ children?: any }> {
            render() {
                return Anu.createElement('g', {}, this.props.children);
            }
        }

        const { container } = render(
            Anu.createElement('svg', {}, Anu.createElement(Group, {}, Anu.createElement(Shape, {})))
        );

        expect((container.querySelector('g') as Element).namespaceURI).toBe(SVG_NS);
        expect((container.querySelector('circle') as Element).namespaceURI).toBe(SVG_NS);
    });

    test('children of <foreignObject> are HTML, and a nested <svg> switches back to SVG', () => {
        const { container } = render(
            Anu.createElement(
                'svg',
                {},
                Anu.createElement(
                    'foreignObject',
                    {},
                    Anu.createElement(
                        'div',
                        { className: 'html' },
                        Anu.createElement('span', {}, 'x'),
                        Anu.createElement('svg', { className: 'inner' }, Anu.createElement('path', {}))
                    )
                )
            )
        );

        expect((container.querySelector('foreignObject') as Element).namespaceURI).toBe(SVG_NS);
        expect((container.querySelector('div') as Element).namespaceURI).toBe(HTML_NS);
        expect((container.querySelector('div') as HTMLElement).className).toBe('html');
        expect((container.querySelector('span') as Element).namespaceURI).toBe(HTML_NS);
        expect((container.querySelector('svg.inner') as Element).namespaceURI).toBe(SVG_NS);
        expect((container.querySelector('path') as Element).namespaceURI).toBe(SVG_NS);
    });

    test('a portal into an SVG node renders its children in the SVG namespace', () => {
        const target = document.createElementNS(SVG_NS, 'g');
        document.body.appendChild(target);

        render(Anu.createElement('div', {}, Anu.createPortal(Anu.createElement('rect', {}), target)));

        expect((target.firstElementChild as Element).namespaceURI).toBe(SVG_NS);
        target.remove();
    });

    test('rendering into an SVG container creates SVG children', () => {
        const svg = document.createElementNS(SVG_NS, 'svg');
        document.body.appendChild(svg);

        render(Anu.createElement('g', {}, Anu.createElement('rect', {})), { container: svg as unknown as HTMLElement });

        expect((svg.querySelector('g') as Element).namespaceURI).toBe(SVG_NS);
        expect((svg.querySelector('rect') as Element).namespaceURI).toBe(SVG_NS);
        svg.remove();
    });

    test('an SVG tag name outside any <svg> context is created as HTML', () => {
        const { container } = render(Anu.createElement('div', {}, Anu.createElement('circle', {})));

        expect((container.querySelector('circle') as Element).namespaceURI).toBe(HTML_NS);
    });

    test('updates on an inherited SVG element go through the attribute path', () => {
        const { container, rerender } = render(
            Anu.createElement('svg', {}, Anu.createElement('a', { className: 'one', href: '#a' }))
        );

        rerender(Anu.createElement('svg', {}, Anu.createElement('a', { className: 'two', href: '#b' })));

        const a = container.querySelector('a') as Element;

        expect(a.namespaceURI).toBe(SVG_NS);
        expect(a.getAttribute('class')).toBe('two');
        expect(a.getAttribute('href')).toBe('#b');
    });

    test.each(SVG2_ELEMENTS)('<%s> renders as an SVG-namespace <%s>', (jsxName, tagName) => {
        const { container } = render(Anu.createElement('svg', {}, Anu.createElement(jsxName, {})));
        const el = (container.querySelector('svg') as Element).firstElementChild as Element;

        expect(el.namespaceURI).toBe(SVG_NS);
        expect(el.localName).toBe(tagName);
    });
});
