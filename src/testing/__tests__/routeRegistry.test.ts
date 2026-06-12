import Anu from '../../index';
import { render, act } from '../index';

const setPath = (pathname: string): void => {
    window.history.pushState({}, '', pathname);
};

const noop = () => null;

afterEach(() => {
    window.history.pushState({}, '', '/');
});

describe('getRouteParams reads the active route match by its :param name', () => {
    test('returns a captured :param by the name declared in the path', () => {
        setPath('/users/42');
        render(Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: noop }));

        expect(Anu.History.getRouteParams('id')).toBe('42');
    });

    test('returns null for a key the active route did not capture', () => {
        setPath('/users/42');
        render(Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: noop }));

        expect(Anu.History.getRouteParams('userId')).toBeNull();
    });

    test('exposes the splat remainder under "*"', () => {
        setPath('/files/a/b');
        render(Anu.createElement(Anu.History.Route, { path: '/files/*', render: noop }));

        expect(Anu.History.getRouteParams('*')).toBe('a/b');
    });

    test('getAllRouteParamNames lists the captured names', () => {
        setPath('/org/anu/repo/verzum');
        render(Anu.createElement(Anu.History.Route, { path: '/org/:orgId/repo/:repoId', render: noop }));

        expect(Anu.History.getAllRouteParamNames().sort()).toEqual(['orgId', 'repoId']);
    });
});

describe('getRouteParams merges across nested matched routes', () => {
    test('a parent and child route both contribute their params', () => {
        setPath('/users/42/posts/7');
        render(
            Anu.createElement(Anu.History.Route, {
                path: '/users/:userId',
                render: () =>
                    Anu.createElement(Anu.History.Route, { path: '/users/:userId/posts/:postId', render: noop })
            })
        );

        expect(Anu.History.getRouteParams('userId')).toBe('42');
        expect(Anu.History.getRouteParams('postId')).toBe('7');
    });
});

describe('the registry tracks the live match set', () => {
    test('navigating away from a route clears its params', () => {
        setPath('/users/42');
        render(Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: noop }));
        expect(Anu.History.getRouteParams('id')).toBe('42');

        act(() => {
            Anu.History.goTo('/other');
        });

        expect(Anu.History.getRouteParams('id')).toBeNull();
    });

    test('inside a Switch, only the selected route contributes params', () => {
        setPath('/users/99');
        render(
            Anu.createElement(
                Anu.History.Switch,
                null,
                Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: noop }),
                Anu.createElement(Anu.History.Route, { path: '/about', render: noop })
            )
        );

        expect(Anu.History.getRouteParams('id')).toBe('99');
        expect(Anu.History.getAllRouteParamNames()).toEqual(['id']);
    });

    test('unmounting the tree clears the registry', () => {
        setPath('/users/42');
        const { unmount } = render(
            Anu.createElement(Anu.History.Route, { path: '/users/:id', exact: true, render: noop })
        );
        expect(Anu.History.getRouteParams('id')).toBe('42');

        unmount();

        expect(Anu.History.getAllRouteParamNames()).toEqual([]);
    });
});
