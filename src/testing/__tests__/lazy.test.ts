import Anu, { lazy } from '../../index';
import { render, act } from '../index';

const Heavy = (props: { label: string }) => Anu.createElement('div', { id: 'heavy' }, props.label);

const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('lazy defers a component behind a dynamic import', () => {
    test('renders the fallback before the factory resolves', () => {
        const Lazy = lazy(() => new Promise(() => {}), {
            fallback: Anu.createElement('span', { id: 'spinner' }, 'loading')
        });
        const { container } = render(Anu.createElement(Lazy, {}));

        expect(container.querySelector('#spinner')!.textContent).toBe('loading');
        expect(container.querySelector('#heavy')).toBeNull();
    });

    test('renders nothing when no fallback is given and the module is unresolved', () => {
        const Lazy = lazy(() => new Promise(() => {}));
        const { container } = render(Anu.createElement(Lazy, {}));

        expect(container.textContent).toBe('');
    });

    test('swaps in the loaded component and forwards props once resolved', async () => {
        const Lazy = lazy(() => Promise.resolve({ default: Heavy }), {
            fallback: Anu.createElement('span', { id: 'spinner' })
        });
        const { container } = render(Anu.createElement(Lazy, { label: 'done' }));

        await act(async () => {
            await flushPromises();
        });

        expect(container.querySelector('#spinner')).toBeNull();
        expect(container.querySelector('#heavy')!.textContent).toBe('done');
    });

    test('accepts a factory that resolves to a bare component (no default)', async () => {
        const Lazy = lazy(() => Promise.resolve(Heavy));
        const { container } = render(Anu.createElement(Lazy, { label: 'bare' }));

        await act(async () => {
            await flushPromises();
        });

        expect(container.querySelector('#heavy')!.textContent).toBe('bare');
    });

    test('invokes onError when the factory rejects', async () => {
        const error = new Error('chunk load failed');
        let captured: unknown;
        const Lazy = lazy(() => Promise.reject(error), { onError: (e) => (captured = e) });
        render(Anu.createElement(Lazy, {}));

        await act(async () => {
            await flushPromises();
        });

        expect(captured).toBe(error);
    });
});
