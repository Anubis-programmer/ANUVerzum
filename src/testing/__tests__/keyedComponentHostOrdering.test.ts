import Anu from '../../index';
import { render } from '../index';

const ChipFn = (p: { label: string }) => Anu.createElement('span', { className: 'chip' }, p.label);

class ChipClass extends Anu.Component<{ label: string }> {
    render() {
        return Anu.createElement('span', { className: 'chip' }, this.props.label);
    }
}

const orderOf = (parent: HTMLElement): string[] =>
    Array.from(parent.children).map((c) => (c.tagName === 'INPUT' ? 'INPUT' : c.textContent ?? ''));

describe('keyed component children mixed with a host sibling', () => {
    const makeBox = (Chip: any) =>
        class Box extends Anu.Component<{ items: string[] }> {
            render() {
                return Anu.createElement(
                    'div',
                    { className: 'box' },
                    this.props.items.map((it) => Anu.createElement(Chip, { key: it, label: it })),
                    Anu.createElement('input', { key: 'field' })
                );
            }
        };

    test('function-component child inserted before a host sibling lands before it', () => {
        const Box = makeBox(ChipFn);
        const { container, rerender } = render(Anu.createElement(Box, { items: ['a'] }));
        const box = container.querySelector('.box') as HTMLElement;
        const inputBefore = box.querySelector('input');

        expect(orderOf(box)).toEqual(['a', 'INPUT']);

        rerender(Anu.createElement(Box, { items: ['a', 'b'] }));

        expect(orderOf(box)).toEqual(['a', 'b', 'INPUT']);
        expect(box.querySelector('input')).toBe(inputBefore);
    });

    test('class-component child inserted before a host sibling lands before it', () => {
        const Box = makeBox(ChipClass);
        const { container, rerender } = render(Anu.createElement(Box, { items: ['a'] }));
        const box = container.querySelector('.box') as HTMLElement;

        rerender(Anu.createElement(Box, { items: ['a', 'b'] }));

        expect(orderOf(box)).toEqual(['a', 'b', 'INPUT']);
    });

    test('a component child inserted at the front precedes existing chips and the host sibling', () => {
        const Box = makeBox(ChipFn);
        const { container, rerender } = render(Anu.createElement(Box, { items: ['b'] }));
        const box = container.querySelector('.box') as HTMLElement;

        rerender(Anu.createElement(Box, { items: ['a', 'b'] }));

        expect(orderOf(box)).toEqual(['a', 'b', 'INPUT']);
    });

    test('multiple component children inserted in one update keep JSX order before the host sibling', () => {
        const Box = makeBox(ChipFn);
        const { container, rerender } = render(Anu.createElement(Box, { items: ['a'] }));
        const box = container.querySelector('.box') as HTMLElement;

        rerender(Anu.createElement(Box, { items: ['a', 'b', 'c', 'd'] }));

        expect(orderOf(box)).toEqual(['a', 'b', 'c', 'd', 'INPUT']);
    });

    test('control: a plain keyed host child reconciles in the same order', () => {
        class SpanBox extends Anu.Component<{ items: string[] }> {
            render() {
                return Anu.createElement(
                    'div',
                    { className: 'box' },
                    this.props.items.map((it) => Anu.createElement('span', { key: it, className: 'chip' }, it)),
                    Anu.createElement('input', { key: 'field' })
                );
            }
        }

        const { container, rerender } = render(Anu.createElement(SpanBox, { items: ['a'] }));
        const box = container.querySelector('.box') as HTMLElement;

        rerender(Anu.createElement(SpanBox, { items: ['a', 'b'] }));

        expect(orderOf(box)).toEqual(['a', 'b', 'INPUT']);
    });
});
