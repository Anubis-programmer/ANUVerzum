import Anu from '../../index';
import type { RouteMatch } from '../../core/components/History';
import { render, act } from '../index';

const setPath = (pathname: string): void => {
    window.history.pushState({}, '', pathname);
};

const leaf = (text: string) => () => Anu.createElement('p', null, text);

afterEach(() => {
    window.history.pushState({}, '', '/');
});

describe('Switch renders only the first matching route', () => {
    const buildSwitch = () =>
        Anu.createElement(
            Anu.History.Switch,
            null,
            Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: leaf('profile') }),
            Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') }),
            Anu.createElement(Anu.History.Route, { render: leaf('notfound') })
        );

    test('the most specific matching route wins when ordered first', () => {
        setPath('/users/42');
        const { container } = render(buildSwitch());

        expect(container.textContent).toBe('profile');
    });

    test('a less specific route matches when the specific one does not', () => {
        setPath('/users');
        const { container } = render(buildSwitch());

        expect(container.textContent).toBe('list');
    });

    test('the pathless fallback renders only when nothing else matches', () => {
        setPath('/does/not/exist');
        const { container } = render(buildSwitch());

        expect(container.textContent).toBe('notfound');
    });

    test('exactly one route renders (exclusivity)', () => {
        setPath('/users');
        const { container } = render(buildSwitch());

        expect(container.querySelectorAll('p')).toHaveLength(1);
    });
});

describe('Switch updates the rendered route on navigation', () => {
    test('navigating swaps which child renders', () => {
        setPath('/users');
        const { container } = render(
            Anu.createElement(
                Anu.History.Switch,
                null,
                Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: leaf('profile') }),
                Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
            )
        );

        expect(container.textContent).toBe('list');

        act(() => {
            Anu.History.goTo('/users/42');
        });

        expect(container.textContent).toBe('profile');
    });
});

describe('Switch injects the computed match into the selected route', () => {
    test('the chosen route receives params from the Switch match', () => {
        setPath('/users/99');
        let captured: RouteMatch | undefined;
        render(
            Anu.createElement(
                Anu.History.Switch,
                null,
                Anu.createElement(Anu.History.Route, {
                    path: '/users/:id',
                    exact: true,
                    render: ({ match }: { match: RouteMatch }) => {
                        captured = match;

                        return null;
                    }
                })
            )
        );

        expect(captured?.params).toEqual({ id: '99' });
    });
});
