import Anu from '../../index';
import { render } from '../index';

const Box = (props: { children?: any }) => Anu.createElement('div', null, props.children);

describe('createElement keeps props.children as the author wrote it (React parity)', () => {
    test('a lone text child stays a raw string, not a wrapped TEXT_ELEMENT array', () => {
        const el = Anu.createElement(Box, {}, 'New');

        expect(el.props.children).toBe('New');
    });

    test('a lone numeric child stays a raw number', () => {
        const el = Anu.createElement(Box, {}, 42);

        expect(el.props.children).toBe(42);
    });

    test('a lone element child stays the raw element, not an array', () => {
        const child = Anu.createElement('span', {}, 'x');
        const el = Anu.createElement(Box, {}, child);

        expect(el.props.children).toBe(child);
    });

    test('children introspection matches the symmetry of plain props', () => {
        const el = Anu.createElement(Box, { label: 'More' }, 'New');

        expect(el.props.label).toBe('More');
        expect(el.props.children).toBe('New');
    });

    test('multiple children become a raw array preserving author values', () => {
        const span = Anu.createElement('span', {}, 'b');
        const el = Anu.createElement(Box, {}, 'a', span, 0);

        expect(el.props.children).toEqual(['a', span, 0]);
    });

    test('no children leaves props.children undefined (React parity)', () => {
        const el = Anu.createElement(Box, {});

        expect(el.props.children).toBeUndefined();
    });

    test('raw children still render correctly through the reconciler', () => {
        const { container } = render(Anu.createElement(Box, {}, 'New'));

        expect(container.textContent).toBe('New');
    });

    test('a lone numeric child renders correctly', () => {
        const { container } = render(Anu.createElement(Box, {}, 0));

        expect(container.textContent).toBe('0');
    });
});
