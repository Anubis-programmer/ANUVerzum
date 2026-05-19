import Anu, { Component } from '../../index';
import { render, fireEvent, userEvent, waitFor, act } from '../index';

class Counter extends Component<{}, { count: number }> {
    state = { count: 0 };

    render() {
        return Anu.createElement('div', {},
            Anu.createElement('p', {}, `Count: ${this.state.count}`),
            Anu.createElement('button', {
                onClick: () => this.setState({ count: this.state.count + 1 })
            }, 'Increment')
        );
    }
}

const Greeting = ({ name }: { name: string }) =>
    Anu.createElement('h1', {}, `Hello, ${name}!`);

describe('render', () => {
    test('renders a function component', () => {
        const { getByText } = render(Anu.createElement(Greeting, { name: 'World' }));
        expect(getByText('Hello, World!')).toBeDefined();
    });

    test('renders a class component', () => {
        const { getByText } = render(Anu.createElement(Counter, {}));
        expect(getByText('Count: 0')).toBeDefined();
    });

    test('returns a container attached to document.body', () => {
        const { container } = render(Anu.createElement(Greeting, { name: 'test' }));
        expect(document.body.contains(container)).toBe(true);
    });
});

describe('queries', () => {
    test('getByRole finds button', () => {
        const { getByRole } = render(Anu.createElement(Counter, {}));
        const btn = getByRole('button');
        expect(btn).toBeDefined();
        expect(btn.textContent).toBe('Increment');
    });

    test('getByRole with name option', () => {
        const { getByRole } = render(Anu.createElement(Counter, {}));
        const btn = getByRole('button', { name: 'Increment' });
        expect(btn).toBeDefined();
    });

    test('queryByText returns null when not found', () => {
        const { queryByText } = render(Anu.createElement(Greeting, { name: 'test' }));
        expect(queryByText('Not here')).toBeNull();
    });

    test('getByText throws when not found', () => {
        const { getByText } = render(Anu.createElement(Greeting, { name: 'test' }));
        expect(() => getByText('Not here')).toThrow();
    });

    test('findByText resolves asynchronously', async () => {
        const { findByText } = render(Anu.createElement(Greeting, { name: 'World' }));
        const el = await findByText('Hello, World!');
        expect(el).toBeDefined();
    });
});

describe('fireEvent', () => {
    test('click triggers onClick and re-renders', () => {
        const { getByText, getByRole } = render(Anu.createElement(Counter, {}));
        expect(getByText('Count: 0')).toBeDefined();
        fireEvent.click(getByRole('button'));
        expect(getByText('Count: 1')).toBeDefined();
    });

    test('multiple clicks accumulate', () => {
        const { getByText, getByRole } = render(Anu.createElement(Counter, {}));
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));
        expect(getByText('Count: 3')).toBeDefined();
    });
});

describe('userEvent', () => {
    test('click fires full mouse event sequence', () => {
        const { getByText, getByRole } = render(Anu.createElement(Counter, {}));
        userEvent.click(getByRole('button'));
        expect(getByText('Count: 1')).toBeDefined();
    });
});

describe('rerender', () => {
    test('updates the component with new props', () => {
        const { getByText, rerender } = render(Anu.createElement(Greeting, { name: 'Alice' }));
        expect(getByText('Hello, Alice!')).toBeDefined();
        rerender(Anu.createElement(Greeting, { name: 'Bob' }));
        expect(getByText('Hello, Bob!')).toBeDefined();
    });
});

describe('waitFor', () => {
    test('polls until assertion passes', async () => {
        const { getByText } = render(Anu.createElement(Greeting, { name: 'World' }));
        await waitFor(() => {
            expect(getByText('Hello, World!')).toBeDefined();
        });
    });

    test('rejects when assertion never passes', async () => {
        const { queryByText } = render(Anu.createElement(Greeting, { name: 'World' }));
        await expect(
            waitFor(() => { expect(queryByText('MISSING')).not.toBeNull(); }, { timeout: 100, interval: 20 })
        ).rejects.toThrow();
    });
});

describe('act', () => {
    test('flushes state updates synchronously', () => {
        const { getByText, getByRole } = render(Anu.createElement(Counter, {}));
        act(() => {
            fireEvent.click(getByRole('button'));
        });
        expect(getByText('Count: 1')).toBeDefined();
    });

    test('wraps async callbacks', async () => {
        const { getByText } = render(Anu.createElement(Counter, {}));
        await act(async () => {
            await Promise.resolve();
        });
        expect(getByText('Count: 0')).toBeDefined();
    });
});
