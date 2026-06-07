import Anu from '../../index';
import { render } from '../index';

const reducer = (state: { n: number } = { n: 0 }) => state;

describe('Connector.Provider accepts any number of children (react-redux parity)', () => {
    test('renders multiple sibling children directly (no Fragment wrap)', () => {
        const store = Anu.store.createStore(reducer, { n: 0 });

        const { getByTestId } = render(
            Anu.createElement(Anu.Connector.Provider, { store },
                Anu.createElement('span', { 'data-testid': 'a' }, 'A'),
                Anu.createElement('span', { 'data-testid': 'b' }, 'B')
            )
        );

        expect(getByTestId('a').textContent).toBe('A');
        expect(getByTestId('b').textContent).toBe('B');
    });
});

describe('Anulytics.Provider accepts any number of children', () => {
    let postSpy: jest.SpyInstance;

    beforeEach(() => {
        postSpy = jest.spyOn(Anu.ServerAPI, 'post').mockResolvedValue({ response: {} } as any);
    });

    afterEach(() => {
        postSpy.mockRestore();
    });

    test('renders multiple sibling children directly', () => {
        const { getByTestId } = render(
            Anu.createElement(Anu.Anulytics.Provider, {
                analyticsUrl: 'http://example.test/analytics',
                onSuccess: () => {},
                onFail: () => {}
            },
                Anu.createElement('span', { 'data-testid': 'a' }, 'A'),
                Anu.createElement('span', { 'data-testid': 'b' }, 'B')
            )
        );

        expect(getByTestId('a').textContent).toBe('A');
        expect(getByTestId('b').textContent).toBe('B');
    });
});

describe('Fragment accepts any number of children (React.Fragment parity)', () => {
    test('renders nothing for zero children (no error)', () => {
        const { container } = render(Anu.createElement(Anu.Fragment, {}));

        expect(container.textContent).toBe('');
    });

    test('still renders multiple children', () => {
        const { getByTestId } = render(
            Anu.createElement(Anu.Fragment, {},
                Anu.createElement('span', { 'data-testid': 'a' }, 'A'),
                Anu.createElement('span', { 'data-testid': 'b' }, 'B')
            )
        );

        expect(getByTestId('a').textContent).toBe('A');
        expect(getByTestId('b').textContent).toBe('B');
    });
});
