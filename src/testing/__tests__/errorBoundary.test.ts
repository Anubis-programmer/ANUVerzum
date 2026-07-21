import Anu, { Component, ErrorInfo } from 'anu-verzum';
import { render } from 'anu-verzum/testing';

const h = Anu.createElement;

class Boom extends Component<{ message?: string }> {
    render(): never {
        throw new Error(this.props.message ?? 'kaboom');
    }
}

type BoundaryProps = {
    onCatch?: (error: Error, info: ErrorInfo) => void;
    fallback?: string;
    children?: any;
};

class Boundary extends Component<BoundaryProps, { error: Error | null }> {
    state = { error: null as Error | null };

    static getDerivedStateFromError(error: Error): { error: Error } {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.props.onCatch?.(error, info);
    }

    render(): any {
        if (this.state.error) {
            return h('p', { 'data-testid': 'fallback' }, this.props.fallback ?? 'Something broke.');
        }

        return this.props.children;
    }
}

describe('error boundaries', () => {
    test('a boundary renders fallback when a descendant throws during render', () => {
        const { getByTestId, queryByText } = render(h(Boundary, {}, h(Boom, {})));

        expect(getByTestId('fallback').textContent).toBe('Something broke.');
        expect(queryByText('Something broke.')).not.toBeNull();
    });

    test('componentDidCatch receives the error and a component stack', () => {
        const caught: Array<{ error: Error; info: ErrorInfo }> = [];

        render(h(Boundary, { onCatch: (error: Error, info: ErrorInfo) => caught.push({ error, info }) }, h(Boom, { message: 'nope' })));

        expect(caught).toHaveLength(1);
        expect(caught[0].error).toBeInstanceOf(Error);
        expect(caught[0].error.message).toBe('nope');
        expect(typeof caught[0].info.componentStack).toBe('string');
        expect(caught[0].info.componentStack).toContain('Boom');
    });

    test('chrome outside the failing region stays mounted (AppShell pattern)', () => {
        const { getByTestId, queryByTestId } = render(
            h(
                'div',
                {},
                h('header', { 'data-testid': 'header' }, 'Header'),
                h(Boundary, { fallback: 'Main crashed' }, h(Boom, {})),
                h('footer', { 'data-testid': 'footer' }, 'Footer')
            )
        );

        expect(getByTestId('header').textContent).toBe('Header');
        expect(getByTestId('footer').textContent).toBe('Footer');
        expect(getByTestId('fallback').textContent).toBe('Main crashed');
        expect(queryByTestId('boom')).toBeNull();
    });

    test('the nearest boundary catches; an outer boundary is unaffected', () => {
        const outerCaught: Error[] = [];
        const innerCaught: Error[] = [];

        const { getByTestId } = render(
            h(
                Boundary,
                { onCatch: (error: Error) => outerCaught.push(error), fallback: 'outer' },
                h('div', { 'data-testid': 'outer-content' }, h(Boundary, { onCatch: (error: Error) => innerCaught.push(error), fallback: 'inner' }, h(Boom, {})))
            )
        );

        expect(innerCaught).toHaveLength(1);
        expect(outerCaught).toHaveLength(0);
        expect(getByTestId('outer-content')).not.toBeNull();
        expect(getByTestId('fallback').textContent).toBe('inner');
    });

    test('an error thrown in a descendant componentDidMount is caught', () => {
        class MountBoom extends Component {
            componentDidMount(): void {
                throw new Error('mount-explode');
            }

            render(): any {
                return h('span', {}, 'mounting');
            }
        }

        const caught: Error[] = [];
        const { getByTestId } = render(h(Boundary, { onCatch: (error: Error) => caught.push(error), fallback: 'mount fallback' }, h(MountBoom, {})));

        expect(caught).toHaveLength(1);
        expect(caught[0].message).toBe('mount-explode');
        expect(getByTestId('fallback').textContent).toBe('mount fallback');
    });

    test('a render error with no boundary propagates', () => {
        expect(() => render(h('div', {}, h(Boom, { message: 'uncaught' })))).toThrow('uncaught');
    });

    test('a boundary can catch again after recovering from a previous error', () => {
        const caught: Error[] = [];

        const { getByTestId, rerender } = render(h(Boundary, { onCatch: (error: Error) => caught.push(error) }, h('span', { 'data-testid': 'ok' }, 'ok')));

        expect(getByTestId('ok').textContent).toBe('ok');
        expect(caught).toHaveLength(0);

        rerender(h(Boundary, { onCatch: (error: Error) => caught.push(error) }, h(Boom, { message: 'first' })));
        expect(getByTestId('fallback')).not.toBeNull();
        expect(caught).toHaveLength(1);
        expect(caught[0].message).toBe('first');
    });
});
