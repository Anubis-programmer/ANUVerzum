import Anu from '../../index';
import type { RouteMatch } from '../../core/components/History';
import { render } from '../index';

const setPath = (pathname: string): void => {
    window.history.pushState({}, '', pathname);
};

const renderRoute = (props: Record<string, any>) => {
    let captured: RouteMatch | undefined;
    const { container } = render(
        Anu.createElement(Anu.History.Route, {
            ...props,
            render: ({ match }: { match: RouteMatch }) => {
                captured = match;

                return Anu.createElement('p', null, 'matched');
            }
        })
    );

    return { container, getMatch: () => captured };
};

afterEach(() => {
    window.history.pushState({}, '', '/');
});

describe('Route pattern matching captures named params', () => {
    test('a single :param segment is captured', () => {
        setPath('/users/42');
        const { getMatch } = renderRoute({ path: '/users/:id' });

        expect(getMatch()?.params).toEqual({ id: '42' });
    });

    test('a mid-path :param matches with a static tail', () => {
        setPath('/users/42/settings');
        const { container, getMatch } = renderRoute({ path: '/users/:id/settings', exact: true });

        expect(container.textContent).toBe('matched');
        expect(getMatch()?.params).toEqual({ id: '42' });
        expect(getMatch()?.isExact).toBe(true);
    });

    test('multiple :param segments are all captured', () => {
        setPath('/org/anu/repo/verzum');
        const { getMatch } = renderRoute({ path: '/org/:orgId/repo/:repoId' });

        expect(getMatch()?.params).toEqual({ orgId: 'anu', repoId: 'verzum' });
    });

    test('an optional :param? is omitted when absent', () => {
        setPath('/items');
        const { container, getMatch } = renderRoute({ path: '/items/:id?', exact: true });

        expect(container.textContent).toBe('matched');
        expect(getMatch()?.params).toEqual({});
    });

    test('an optional :param? is captured when present', () => {
        setPath('/items/9');
        const { getMatch } = renderRoute({ path: '/items/:id?', exact: true });

        expect(getMatch()?.params).toEqual({ id: '9' });
    });
});

describe('Route splat captures the remainder', () => {
    test('a trailing * captures the rest of the path under "*"', () => {
        setPath('/files/photos/2024/summer');
        const { getMatch } = renderRoute({ path: '/files/*' });

        expect(getMatch()?.params['*']).toBe('photos/2024/summer');
    });

    test('a trailing * also matches the bare prefix with no remainder', () => {
        setPath('/files');
        const { container, getMatch } = renderRoute({ path: '/files/*' });

        expect(container.textContent).toBe('matched');
        expect(getMatch()?.params['*']).toBeUndefined();
    });
});

describe('Route matching respects segment boundaries', () => {
    test('a partial segment does not match (/user vs /users)', () => {
        setPath('/users');
        const { container } = renderRoute({ path: '/user' });

        expect(container.textContent).toBe('');
    });

    test('a prefix path still matches deeper URLs (non-exact default)', () => {
        setPath('/users/42');
        const { container, getMatch } = renderRoute({ path: '/users' });

        expect(container.textContent).toBe('matched');
        expect(getMatch()?.isExact).toBe(false);
        expect(getMatch()?.url).toBe('/users');
    });

    test('exact rejects a deeper URL', () => {
        setPath('/users/42');
        const { container } = renderRoute({ path: '/users', exact: true });

        expect(container.textContent).toBe('');
    });

    test('a pathless Route matches anything with empty params', () => {
        setPath('/anything/here');
        const { container, getMatch } = renderRoute({});

        expect(container.textContent).toBe('matched');
        expect(getMatch()?.params).toEqual({});
        expect(getMatch()?.path).toBeNull();
    });
});
