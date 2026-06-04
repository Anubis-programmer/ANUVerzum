import Anu from '../../index';
import { render } from '../index';

// A probe element wrapping a single dynamic child between literal brackets, so
// the rendered textContent reveals exactly what the child normalized to.
const probe = (child: any) => Anu.createElement('i', null, '[', child, ']');

describe('child normalization matches React (skip null/undefined/false/true)', () => {
    test.each([
        ['null', null],
        ['undefined', undefined],
        ['false', false],
        ['true', true],
        ['empty string', '']
    ])('renders nothing for %s', (_label, child) => {
        const { container } = render(probe(child));
        expect(container.textContent).toBe('[]');
    });

    test.each([
        ['number 0', 0, '[0]'],
        ['number 42', 42, '[42]'],
        ['a string', 'x', '[x]']
    ])('renders %s as text', (_label, child, expected) => {
        const { container } = render(probe(child));
        expect(container.textContent).toBe(expected);
    });

    test('`cond && <El/>` with an undefined cond renders nothing (no "undefined")', () => {
        const cond = undefined as undefined;
        const { container } = render(
            Anu.createElement('i', null, '[', cond && Anu.createElement('b', {}, 'x'), ']')
        );
        expect(container.textContent).toBe('[]');
    });

    test('`cond && <El/>` with a falsy cond renders nothing', () => {
        const { container } = render(
            Anu.createElement('i', null, '[', false && Anu.createElement('b', {}, 'x'), ']')
        );
        expect(container.textContent).toBe('[]');
    });

    test('`cond && <El/>` with a truthy cond renders the element', () => {
        const { container } = render(
            Anu.createElement('i', null, '[', true && Anu.createElement('b', {}, 'x'), ']')
        );
        expect(container.textContent).toBe('[x]');
    });
});
