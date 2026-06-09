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
