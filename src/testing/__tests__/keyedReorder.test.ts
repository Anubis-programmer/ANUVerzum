import Anu from '../../index';
import { render, act } from '../index';

const textsOf = (parent: HTMLElement): string[] => Array.from(parent.children).map((c) => c.textContent ?? '');

class List extends Anu.Component<{ items: string[] }> {
    render() {
        return Anu.createElement(
            'ul',
            {},
            this.props.items.map((it) => Anu.createElement('li', { key: it }, it))
        );
    }
}

describe('keyed children reorder', () => {
    test('re-rendering a keyed list in sorted order reorders the DOM', () => {
        const { container, rerender } = render(Anu.createElement(List, { items: ['Banana', 'apple', 'Cherry'] }));
        const ul = container.querySelector('ul') as HTMLElement;

        expect(textsOf(ul)).toEqual(['Banana', 'apple', 'Cherry']);

        rerender(Anu.createElement(List, { items: ['apple', 'Banana', 'Cherry'] }));

        expect(textsOf(ul)).toEqual(['apple', 'Banana', 'Cherry']);
    });

    test('reordering moves the existing DOM nodes instead of recreating them', () => {
        const { container, rerender } = render(Anu.createElement(List, { items: ['a', 'b', 'c'] }));
        const ul = container.querySelector('ul') as HTMLElement;
        const [liA, liB, liC] = Array.from(ul.children);

        rerender(Anu.createElement(List, { items: ['c', 'a', 'b'] }));

        expect(Array.from(ul.children)).toEqual([liC, liA, liB]);
    });

    test('moving an item to the front repositions it', () => {
        const { container, rerender } = render(Anu.createElement(List, { items: ['a', 'b', 'c', 'd'] }));
        const ul = container.querySelector('ul') as HTMLElement;

        rerender(Anu.createElement(List, { items: ['d', 'a', 'b', 'c'] }));

        expect(textsOf(ul)).toEqual(['d', 'a', 'b', 'c']);
    });

    test('reversing the list repositions every item', () => {
        const { container, rerender } = render(Anu.createElement(List, { items: ['a', 'b', 'c', 'd'] }));
        const ul = container.querySelector('ul') as HTMLElement;

        rerender(Anu.createElement(List, { items: ['d', 'c', 'b', 'a'] }));

        expect(textsOf(ul)).toEqual(['d', 'c', 'b', 'a']);
    });

    test('reorder combined with insertion and deletion in one update', () => {
        const { container, rerender } = render(Anu.createElement(List, { items: ['a', 'b', 'c'] }));
        const ul = container.querySelector('ul') as HTMLElement;
        const liA = ul.children[0];
        const liC = ul.children[2];

        rerender(Anu.createElement(List, { items: ['c', 'x', 'a'] }));

        expect(textsOf(ul)).toEqual(['c', 'x', 'a']);
        expect(ul.children[0]).toBe(liC);
        expect(ul.children[2]).toBe(liA);
    });

    test('reordered items keep their updated props', () => {
        class ClassedList extends Anu.Component<{ items: Array<{ id: string; cls: string }> }> {
            render() {
                return Anu.createElement(
                    'ul',
                    {},
                    this.props.items.map((it) => Anu.createElement('li', { key: it.id, className: it.cls }, it.id))
                );
            }
        }

        const { container, rerender } = render(
            Anu.createElement(ClassedList, {
                items: [
                    { id: 'a', cls: 'one' },
                    { id: 'b', cls: 'two' }
                ]
            })
        );
        const ul = container.querySelector('ul') as HTMLElement;

        rerender(
            Anu.createElement(ClassedList, {
                items: [
                    { id: 'b', cls: 'two-updated' },
                    { id: 'a', cls: 'one-updated' }
                ]
            })
        );

        expect(textsOf(ul)).toEqual(['b', 'a']);
        expect((ul.children[0] as HTMLElement).className).toBe('two-updated');
        expect((ul.children[1] as HTMLElement).className).toBe('one-updated');
    });

    test('reordering before a stable host sibling keeps the sibling in place', () => {
        class Box extends Anu.Component<{ items: string[] }> {
            render() {
                return Anu.createElement(
                    'div',
                    { className: 'box' },
                    this.props.items.map((it) => Anu.createElement('span', { key: it }, it)),
                    Anu.createElement('input', { key: 'field' })
                );
            }
        }

        const { container, rerender } = render(Anu.createElement(Box, { items: ['a', 'b'] }));
        const box = container.querySelector('.box') as HTMLElement;
        const input = box.querySelector('input');

        rerender(Anu.createElement(Box, { items: ['b', 'a'] }));

        expect(Array.from(box.children).map((c) => (c.tagName === 'INPUT' ? 'INPUT' : c.textContent))).toEqual([
            'b',
            'a',
            'INPUT'
        ]);
        expect(box.querySelector('input')).toBe(input);
    });

    test('control: the unkeyed list still renders the new order', () => {
        class UnkeyedList extends Anu.Component<{ items: string[] }> {
            render() {
                return Anu.createElement(
                    'ul',
                    {},
                    this.props.items.map((it) => Anu.createElement('li', {}, it))
                );
            }
        }

        const { container, rerender } = render(
            Anu.createElement(UnkeyedList, { items: ['Banana', 'apple', 'Cherry'] })
        );
        const ul = container.querySelector('ul') as HTMLElement;

        rerender(Anu.createElement(UnkeyedList, { items: ['apple', 'Banana', 'Cherry'] }));

        expect(textsOf(ul)).toEqual(['apple', 'Banana', 'Cherry']);
    });
});

describe('keyed class-component children reorder', () => {
    const mounts: string[] = [];
    const updates: string[] = [];
    const unmounts: string[] = [];

    beforeEach(() => {
        mounts.length = 0;
        updates.length = 0;
        unmounts.length = 0;
    });

    class Chip extends Anu.Component<{ label: string }, { clicks: number }> {
        constructor(props: { label: string }, context: any) {
            super(props, context);
            this.state = { clicks: 0 };
        }

        componentDidMount() {
            mounts.push(this.props.label);
        }

        componentDidUpdate() {
            updates.push(this.props.label);
        }

        componentWillUnmount() {
            unmounts.push(this.props.label);
        }

        render() {
            return Anu.createElement('span', {}, `${this.props.label}:${this.state.clicks}`);
        }
    }

    class ChipList extends Anu.Component<{ items: string[] }> {
        render() {
            return Anu.createElement(
                'div',
                { className: 'chips' },
                this.props.items.map((it) => Anu.createElement(Chip, { key: it, label: it }))
            );
        }
    }

    test('reordered component children move their host DOM and keep state', () => {
        const instances: Record<string, Chip> = {};
        const origDidMount = Chip.prototype.componentDidMount;
        Chip.prototype.componentDidMount = function (this: Chip) {
            instances[this.props.label] = this;
            origDidMount.call(this);
        };

        try {
            const { container, rerender } = render(Anu.createElement(ChipList, { items: ['a', 'b', 'c'] }));
            const chips = container.querySelector('.chips') as HTMLElement;

            act(() => {
                instances['c'].setState({ clicks: 5 });
            });

            expect(textsOf(chips)).toEqual(['a:0', 'b:0', 'c:5']);

            rerender(Anu.createElement(ChipList, { items: ['c', 'a', 'b'] }));

            expect(textsOf(chips)).toEqual(['c:5', 'a:0', 'b:0']);
            expect(unmounts).toEqual([]);
            expect(mounts).toEqual(['a', 'b', 'c']);
        } finally {
            Chip.prototype.componentDidMount = origDidMount;
        }
    });

    test('a moved component child fires componentDidUpdate, not componentDidMount', () => {
        const { container, rerender } = render(Anu.createElement(ChipList, { items: ['a', 'b'] }));
        const chips = container.querySelector('.chips') as HTMLElement;

        expect(mounts).toEqual(['a', 'b']);

        rerender(Anu.createElement(ChipList, { items: ['b', 'a'] }));

        expect(textsOf(chips)).toEqual(['b:0', 'a:0']);
        expect(mounts).toEqual(['a', 'b']);
        expect(updates).toEqual(expect.arrayContaining(['a', 'b']));
        expect(unmounts).toEqual([]);
    });
});
