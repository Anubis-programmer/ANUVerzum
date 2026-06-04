import Anu, { Component, createContext, createPortal } from '../../index';
import { render, fireEvent } from '../index';

type Theme = { variant: string };

describe('createContext — tree-scoped semantics', () => {
    test('two sibling providers each scope their own value', () => {
        const Ctx = createContext<Theme>({ variant: 'default' });

        const { getByTestId } = render(
            Anu.createElement('div', {},
                Anu.createElement(Ctx.Provider, { variant: 'primary' },
                    Anu.createElement(Ctx.Consumer, {},
                        (c: { value: Partial<Theme> }) =>
                            Anu.createElement('span', { 'data-testid': 'a' }, c.value.variant)
                    )
                ),
                Anu.createElement(Ctx.Provider, { variant: 'secondary' },
                    Anu.createElement(Ctx.Consumer, {},
                        (c: { value: Partial<Theme> }) =>
                            Anu.createElement('span', { 'data-testid': 'b' }, c.value.variant)
                    )
                )
            )
        );

        expect(getByTestId('a').textContent).toBe('primary');
        expect(getByTestId('b').textContent).toBe('secondary');
    });

    test('nested providers resolve to the nearest ancestor', () => {
        const Ctx = createContext<Theme>({ variant: 'default' });

        const { getByTestId } = render(
            Anu.createElement(Ctx.Provider, { variant: 'outer' },
                Anu.createElement('div', {},
                    Anu.createElement(Ctx.Consumer, {},
                        (c: { value: Partial<Theme> }) =>
                            Anu.createElement('span', { 'data-testid': 'outer' }, c.value.variant)
                    ),
                    Anu.createElement(Ctx.Provider, { variant: 'inner' },
                        Anu.createElement(Ctx.Consumer, {},
                            (c: { value: Partial<Theme> }) =>
                                Anu.createElement('span', { 'data-testid': 'inner' }, c.value.variant)
                        )
                    )
                )
            )
        );

        expect(getByTestId('outer').textContent).toBe('outer');
        expect(getByTestId('inner').textContent).toBe('inner');
    });

    test('a consumer with no provider above it reads the createContext default', () => {
        const Ctx = createContext<Theme>({ variant: 'fallback' });

        const { getByTestId } = render(
            Anu.createElement(Ctx.Consumer, {},
                (c: { value: Partial<Theme> }) =>
                    Anu.createElement('span', { 'data-testid': 'x' }, c.value.variant)
            )
        );

        expect(getByTestId('x').textContent).toBe('fallback');
    });

    test('updating one provider notifies only its own subtree', () => {
        const Ctx = createContext<Theme>({ variant: 'default' });

        class App extends Component<{}, { left: string }> {
            state = { left: 'primary' };

            render() {
                return Anu.createElement('div', {},
                    Anu.createElement('button', {
                        onClick: () => this.setState({ left: 'changed' })
                    }, 'change'),
                    Anu.createElement(Ctx.Provider, { variant: this.state.left },
                        Anu.createElement(Ctx.Consumer, {},
                            (c: { value: Partial<Theme> }) =>
                                Anu.createElement('span', { 'data-testid': 'a' }, c.value.variant)
                        )
                    ),
                    Anu.createElement(Ctx.Provider, { variant: 'secondary' },
                        Anu.createElement(Ctx.Consumer, {},
                            (c: { value: Partial<Theme> }) =>
                                Anu.createElement('span', { 'data-testid': 'b' }, c.value.variant)
                        )
                    )
                );
            }
        }

        const { getByTestId, getByText } = render(Anu.createElement(App, {}));

        expect(getByTestId('a').textContent).toBe('primary');
        expect(getByTestId('b').textContent).toBe('secondary');

        fireEvent.click(getByText('change'));

        expect(getByTestId('a').textContent).toBe('changed');
        expect(getByTestId('b').textContent).toBe('secondary');
    });

    test('context is threaded through createPortal', () => {
        const Ctx = createContext<Theme>({ variant: 'default' });
        const portalContainer = document.createElement('div');
        document.body.appendChild(portalContainer);

        render(
            Anu.createElement(Ctx.Provider, { variant: 'via-portal' },
                createPortal(
                    Anu.createElement(Ctx.Consumer, {},
                        (c: { value: Partial<Theme> }) =>
                            Anu.createElement('span', { 'data-testid': 'p' }, c.value.variant)
                    ),
                    portalContainer
                )
            )
        );

        expect(portalContainer.querySelector('[data-testid="p"]')?.textContent).toBe('via-portal');

        portalContainer.remove();
    });

    test('two contexts do not interfere with each other', () => {
        const ColorCtx = createContext<{ color: string }>({ color: 'black' });
        const SizeCtx = createContext<{ size: string }>({ size: 'm' });

        const { getByTestId } = render(
            Anu.createElement(ColorCtx.Provider, { color: 'red' },
                Anu.createElement(SizeCtx.Provider, { size: 'xl' },
                    Anu.createElement(ColorCtx.Consumer, {},
                        (c: { value: { color?: string } }) =>
                            Anu.createElement(SizeCtx.Consumer, {},
                                (s: { value: { size?: string } }) =>
                                    Anu.createElement('span', { 'data-testid': 'out' }, `${c.value.color}-${s.value.size}`)
                            )
                    )
                )
            )
        );

        expect(getByTestId('out').textContent).toBe('red-xl');
    });
});
