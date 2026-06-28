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
