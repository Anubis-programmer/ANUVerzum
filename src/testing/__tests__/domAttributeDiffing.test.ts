import Anu from '../../index';
import { Component } from '../../index';
import { render, fireEvent } from '../index';

describe('an attribute whose value becomes undefined on re-render is removed', () => {
    class Toggle extends Component<Record<string, never>, { on: boolean }> {
        state = { on: true };
        render() {
            return Anu.createElement('div', {
                'aria-busy': this.state.on ? 'true' : undefined,
                onClick: () => this.setState({ on: false })
            });
        }
    }

    test('aria-busy is "true" initially and removed (null) after the toggle', () => {
        const { container } = render(Anu.createElement(Toggle, {}));
        const div = container.querySelector('div') as HTMLDivElement;

        expect(div.getAttribute('aria-busy')).toBe('true');

        fireEvent.click(div);

        expect(div.getAttribute('aria-busy')).toBeNull();
    });

    test('a null value removes the attribute too', () => {
        const { container, rerender } = render(
            Anu.createElement('div', { 'data-state': 'open' })
        );
        const div = container.querySelector('div') as HTMLDivElement;

        expect(div.getAttribute('data-state')).toBe('open');

        rerender(Anu.createElement('div', { 'data-state': null }));

        expect(div.getAttribute('data-state')).toBeNull();
    });
});

describe('a property-path prop whose value becomes undefined on re-render is cleared', () => {
    class InertToggle extends Component<Record<string, never>, { on: boolean }> {
        state = { on: false };
        render() {
            return Anu.createElement('button', {
                inert: this.state.on ? undefined : 'true',
                'data-x': this.state.on ? undefined : 'y',
                onClick: () => this.setState({ on: true })
            });
        }
    }

    test('inert is set initially and cleared after the toggle (property path)', () => {
        const { container } = render(Anu.createElement(InertToggle, {}));
        const button = container.querySelector('button') as HTMLButtonElement & { inert: unknown };

        expect(button.inert).toBe('true');
        expect(button.getAttribute('data-x')).toBe('y');

        fireEvent.click(button);

        expect(button.inert).toBeUndefined();
        expect(button.getAttribute('data-x')).toBeNull();
    });

    test('a property-path prop is cleared when the key is gone in next props', () => {
        const { container, rerender } = render(
            Anu.createElement('button', { inert: 'true' })
        );
        const button = container.querySelector('button') as HTMLButtonElement & { inert: unknown };

        expect(button.inert).toBe('true');

        rerender(Anu.createElement('button', {}));

        expect(button.inert).toBeUndefined();
    });
});

describe('camelCase aria* props are removed via their hyphenated attribute name', () => {
    test('ariaLabel gone from next props removes aria-label', () => {
        const { container, rerender } = render(
            Anu.createElement('button', { ariaLabel: 'Close' })
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button.getAttribute('aria-label')).toBe('Close');

        rerender(Anu.createElement('button', {}));

        expect(button.getAttribute('aria-label')).toBeNull();
    });

    test('ariaLabel becoming undefined removes aria-label too', () => {
        const { container, rerender } = render(
            Anu.createElement('button', { ariaLabel: 'Close' })
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        rerender(Anu.createElement('button', { ariaLabel: undefined }));

        expect(button.getAttribute('aria-label')).toBeNull();
    });
});

describe('camelCase boolean DOM props are set as properties, not stringified attributes', () => {
    test('readOnly={false} omits the attribute and reads false', () => {
        const { container } = render(Anu.createElement('input', { readOnly: false }));
        const input = container.querySelector('input') as HTMLInputElement;

        expect(input.hasAttribute('readonly')).toBe(false);
        expect(input.readOnly).toBe(false);
    });

    test('readOnly={true} sets the attribute and reads true', () => {
        const { container } = render(Anu.createElement('input', { readOnly: true }));
        const input = container.querySelector('input') as HTMLInputElement;

        expect(input.readOnly).toBe(true);
    });

    test('toggling readOnly from true to false clears it', () => {
        const { container, rerender } = render(
            Anu.createElement('input', { readOnly: true })
        );
        const input = container.querySelector('input') as HTMLInputElement;

        expect(input.readOnly).toBe(true);

        rerender(Anu.createElement('input', { readOnly: false }));

        expect(input.hasAttribute('readonly')).toBe(false);
        expect(input.readOnly).toBe(false);
    });

    test('string-valued camelCase props still reach setAttribute', () => {
        const { container } = render(
            Anu.createElement('input', { autoComplete: 'email' })
        );
        const input = container.querySelector('input') as HTMLInputElement;

        expect(input.getAttribute('autocomplete')).toBe('email');
    });
});

describe('camelCase CSS property keys in a style object are applied', () => {
    test('objectFit reaches the element as object-fit', () => {
        const { container } = render(
            Anu.createElement('img', { src: 'a', style: { objectFit: 'contain' } })
        );
        const img = container.querySelector('img') as HTMLImageElement;

        expect(img.style.objectFit).toBe('contain');
    });

    test('single-word and multi-word keys coexist', () => {
        const { container } = render(
            Anu.createElement('div', {
                style: { width: '50px', backgroundColor: 'red', zIndex: 5 }
            })
        );
        const div = container.querySelector('div') as HTMLDivElement;

        expect(div.style.width).toBe('50px');
        expect(div.style.backgroundColor).toBe('red');
        expect(div.style.zIndex).toBe('5');
    });

    test('a custom property (--token) is preserved verbatim', () => {
        const { container } = render(
            Anu.createElement('div', { style: { '--accent': 'blue' } })
        );
        const div = container.querySelector('div') as HTMLDivElement;

        expect(div.style.getPropertyValue('--accent')).toBe('blue');
    });
});

describe('reflected attributes not on the IDL path are forwarded', () => {
    test('loading is written alongside id and data-*', () => {
        const { container } = render(
            Anu.createElement('img', { src: 'a', id: 'theid', 'data-test': 'y', loading: 'lazy' })
        );
        const img = container.querySelector('img') as HTMLImageElement;

        expect(img.getAttribute('id')).toBe('theid');
        expect(img.getAttribute('data-test')).toBe('y');
        expect(img.getAttribute('loading')).toBe('lazy');
    });
});

describe('a typed DOM property cleared on re-render is reset, never stringified to "undefined"', () => {
    test.each([
        ['placeholder', 'input', 'Min length 3'],
        ['title', 'div', 'Tip'],
        ['name', 'input', 'email'],
        ['id', 'div', 'main']
    ])('%s becoming undefined resets the property to "" and removes the attribute', (prop, tag, initial) => {
        const { container, rerender } = render(Anu.createElement(tag, { [prop]: initial }));
        const el = container.querySelector(tag) as any;

        expect(el[prop]).toBe(initial);

        rerender(Anu.createElement(tag, { [prop]: undefined }));

        expect(el[prop]).toBe('');
        expect(el.getAttribute(prop)).toBeNull();
    });

    test('a string property removed from props entirely is reset too', () => {
        const { container, rerender } = render(Anu.createElement('input', { placeholder: 'Type here' }));
        const input = container.querySelector('input') as HTMLInputElement;

        rerender(Anu.createElement('input', {}));

        expect(input.placeholder).toBe('');
        expect(input.hasAttribute('placeholder')).toBe(false);
    });

    test('a null value clears a string property the same way', () => {
        const { container, rerender } = render(Anu.createElement('input', { placeholder: 'Type here' }));
        const input = container.querySelector('input') as HTMLInputElement;

        rerender(Anu.createElement('input', { placeholder: null }));

        expect(input.placeholder).toBe('');
        expect(input.hasAttribute('placeholder')).toBe(false);
    });

    test('an input value becoming undefined empties the field', () => {
        const { container, rerender } = render(Anu.createElement('input', { value: 'abc' }));
        const input = container.querySelector('input') as HTMLInputElement;

        rerender(Anu.createElement('input', { value: undefined }));

        expect(input.value).toBe('');
    });

    test('a cleared string property can be set again', () => {
        const { container, rerender } = render(Anu.createElement('input', { placeholder: 'One' }));
        const input = container.querySelector('input') as HTMLInputElement;

        rerender(Anu.createElement('input', { placeholder: undefined }));
        rerender(Anu.createElement('input', { placeholder: 'Two' }));

        expect(input.placeholder).toBe('Two');
    });

    test('a boolean property becoming undefined resets to false', () => {
        const { container, rerender } = render(Anu.createElement('button', { disabled: true }));
        const button = container.querySelector('button') as HTMLButtonElement;

        rerender(Anu.createElement('button', { disabled: undefined }));

        expect(button.disabled).toBe(false);
        expect(button.hasAttribute('disabled')).toBe(false);
    });

    test('a numeric reflected property becoming undefined falls back to its default', () => {
        const { container, rerender } = render(Anu.createElement('textarea', { rows: 5 }));
        const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

        expect(textarea.rows).toBe(5);

        rerender(Anu.createElement('textarea', { rows: undefined }));

        expect(textarea.rows).toBe(2);
        expect(textarea.hasAttribute('rows')).toBe(false);
    });

    test('a text node whose content becomes empty does not throw', () => {
        const { container, rerender } = render(Anu.createElement('p', {}, 'hello'));

        rerender(Anu.createElement('p', {}, ''));

        expect((container.querySelector('p') as HTMLElement).textContent).toBe('');
    });
});
