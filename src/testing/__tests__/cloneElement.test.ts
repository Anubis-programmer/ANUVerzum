import Anu, { cloneElement, isValidElement, Children, createRef } from '../../index';
import { render } from '../index';

describe('cloneElement merges props with React semantics', () => {
    test('config props override the original props', () => {
        const original = Anu.createElement('input', { type: 'text', id: 'a' });
        const clone = cloneElement(original, { id: 'b', 'aria-invalid': true });

        expect(clone.props.type).toBe('text');
        expect(clone.props.id).toBe('b');
        expect(clone.props['aria-invalid']).toBe(true);
    });

    test('the original element is not mutated', () => {
        const original = Anu.createElement('input', { id: 'a' });
        cloneElement(original, { id: 'b' });

        expect(original.props.id).toBe('a');
    });

    test('original children are kept when no new children are passed', () => {
        const child = Anu.createElement('span', {}, 'x');
        const original = Anu.createElement('div', {}, child);
        const clone = cloneElement(original, { className: 'wrap' });

        expect(clone.props.children).toBe(child);
        expect(clone.props.className).toBe('wrap');
    });

    test('new children replace the originals when provided', () => {
        const original = Anu.createElement('div', {}, 'old');
        const clone = cloneElement(original, null, 'new');

        expect(clone.props.children).toBe('new');
    });

    test('multiple new children become an array', () => {
        const original = Anu.createElement('div', {}, 'old');
        const clone = cloneElement(original, null, 'a', 'b');

        expect(clone.props.children).toEqual(['a', 'b']);
    });

    test('key and ref are preserved when not overridden', () => {
        const ref = createRef();
        const original = Anu.createElement('input', { key: 'k', ref });
        const clone = cloneElement(original, { id: 'b' });

        expect(clone.key).toBe('k');
        expect(clone.ref).toBe(ref);
        expect(clone.props.key).toBeUndefined();
        expect(clone.props.ref).toBeUndefined();
    });

    test('key and ref are overridden when the config provides them', () => {
        const original = Anu.createElement('input', { key: 'k' });
        const newRef = createRef();
        const clone = cloneElement(original, { key: 'k2', ref: newRef });

        expect(clone.key).toBe('k2');
        expect(clone.ref).toBe(newRef);
    });

    test('an injected prop reaches the real DOM through the reconciler', () => {
        const slider = Anu.createElement('input', { type: 'range' });
        const described = cloneElement(slider, { 'aria-describedby': 'helper-1' });
        const { container } = render(Anu.createElement('div', null, described));

        expect(container.querySelector('input')!.getAttribute('aria-describedby')).toBe('helper-1');
    });
});

describe('isValidElement', () => {
    test('returns true for an element', () => {
        expect(isValidElement(Anu.createElement('div', null))).toBe(true);
    });

    test.each([['a string', 'x'], ['a number', 1], ['null', null], ['undefined', undefined], ['a plain object', { foo: 1 }]])(
        'returns false for %s',
        (_label, value) => {
            expect(isValidElement(value)).toBe(false);
        }
    );
});

describe('Children helpers normalize like React', () => {
    const els = [Anu.createElement('a', null), null, false, Anu.createElement('b', null), 'text'];

    test('toArray drops null/false and keeps elements and text', () => {
        expect(Children.toArray(els)).toHaveLength(3);
    });

    test('count matches toArray length', () => {
        expect(Children.count(els)).toBe(3);
    });

    test('map receives a stable index per normalized child', () => {
        const types = Children.map(els, (child) => (isValidElement(child) ? child.type : typeof child));

        expect(types).toEqual(['a', 'b', 'string']);
    });

    test('forEach iterates the normalized children', () => {
        const seen: number = Children.toArray(els).length;
        let counter = 0;
        Children.forEach(els, () => {
            counter++;
        });

        expect(counter).toBe(seen);
    });

    test('only returns the single element child', () => {
        const single = Anu.createElement('span', null);

        expect(Children.only(single)).toBe(single);
    });

    test('only throws when there is more than one child', () => {
        expect(() => Children.only(els)).toThrow('Children.only');
    });

    test('only throws when the single child is not an element', () => {
        expect(() => Children.only('just text')).toThrow('Children.only');
    });
});
