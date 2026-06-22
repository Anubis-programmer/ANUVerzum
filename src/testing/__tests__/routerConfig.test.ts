import Anu from '../../index';
import { render, act } from '../index';

const leaf = (text: string) => () => Anu.createElement('p', null, text);

const anchor = (container: Element): HTMLAnchorElement =>
    container.querySelector('a') as HTMLAnchorElement;

afterEach(() => {
    window.history.replaceState({}, '', '/');
});

describe('basename (history mode)', () => {
    test('a route matches when the live pathname carries the basename prefix', () => {
        Anu.History.configure({ basename: '/app' });
        window.history.replaceState({}, '', '/app/users');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
        );

        expect(container.textContent).toBe('list');
    });

    test('a basename-prefixed root path matches the bare root route', () => {
        Anu.History.configure({ basename: '/app' });
        window.history.replaceState({}, '', '/app');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/', exact: true, render: leaf('home') })
        );

        expect(container.textContent).toBe('home');
    });

    test('Link prepends the basename to its href', () => {
        Anu.History.configure({ basename: '/app' });

        const { container } = render(Anu.createElement(Anu.History.Link, { to: '/users' }, 'Go'));

        expect(anchor(container).getAttribute('href')).toBe('/app/users');
    });

    test('goTo prepends the basename when pushing', () => {
        Anu.History.configure({ basename: '/app' });
        const pushSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});

        Anu.History.goTo('/users');

        expect(pushSpy).toHaveBeenCalledWith({}, '', '/app/users');
        pushSpy.mockRestore();
    });

    test('a trailing slash in the configured basename is normalized away', () => {
        Anu.History.configure({ basename: '/app/' });
        window.history.replaceState({}, '', '/app/users');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
        );

        expect(container.textContent).toBe('list');
    });
});

describe('hash mode', () => {
    test('a route matches against the location hash, not the pathname', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '/anything#/users');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
        );

        expect(container.textContent).toBe('list');
    });

    test('an empty hash is treated as the root path', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '/');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/', exact: true, render: leaf('home') })
        );

        expect(container.textContent).toBe('home');
    });

    test('Link renders a fragment href', () => {
        Anu.History.configure({ mode: 'hash' });

        const { container } = render(Anu.createElement(Anu.History.Link, { to: '/users' }, 'Go'));

        expect(anchor(container).getAttribute('href')).toBe('#/users');
    });

    test('navigating swaps the rendered route', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '#/users');

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

    test('a hashchange event re-renders the matched route', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '#/users');

        const { container } = render(
            Anu.createElement(
                Anu.History.Switch,
                null,
                Anu.createElement(Anu.History.Route, { path: '/about', render: leaf('about') }),
                Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
            )
        );

        expect(container.textContent).toBe('list');

        act(() => {
            window.location.hash = '/about';
            window.dispatchEvent(new Event('hashchange'));
        });

        expect(container.textContent).toBe('about');
    });

    test('basename composes with hash mode inside the fragment', () => {
        Anu.History.configure({ mode: 'hash', basename: '/app' });
        window.history.replaceState({}, '', '#/app/users');

        const { container } = render(
            Anu.createElement(Anu.History.Route, { path: '/users', render: leaf('list') })
        );

        expect(container.textContent).toBe('list');
        expect(Anu.History.goTo).toBeDefined();
    });
});
