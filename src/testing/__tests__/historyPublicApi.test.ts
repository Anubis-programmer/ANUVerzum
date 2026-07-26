import Anu from '../../index';

afterEach(() => {
    window.history.replaceState({}, '', '/');
});

describe('History.getCurrentPath', () => {
    test('returns the pathname in history mode', () => {
        window.history.replaceState({}, '', '/products');

        expect(Anu.History.getCurrentPath()).toBe('/products');
    });

    test('strips the configured basename', () => {
        Anu.History.configure({ basename: '/app' });
        window.history.replaceState({}, '', '/app/users');

        expect(Anu.History.getCurrentPath()).toBe('/users');
    });

    test('reads the fragment in hash mode', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '/ignored#/users');

        expect(Anu.History.getCurrentPath()).toBe('/users');
    });

    test('an empty hash is the root path in hash mode', () => {
        Anu.History.configure({ mode: 'hash' });
        window.history.replaceState({}, '', '/');

        expect(Anu.History.getCurrentPath()).toBe('/');
    });
});

describe('History.getConfig', () => {
    test('reflects the defaults and the configured values', () => {
        expect(Anu.History.getConfig()).toEqual({ mode: 'history', basename: '' });

        Anu.History.configure({ mode: 'hash', basename: '/app/' });

        expect(Anu.History.getConfig()).toEqual({ mode: 'hash', basename: '/app' });
    });

    test('returns a copy — mutating it does not affect the router', () => {
        const snapshot = Anu.History.getConfig() as { mode: string; basename: string };
        snapshot.basename = '/hacked';

        expect(Anu.History.getConfig().basename).toBe('');
    });
});

describe('History.subscribe', () => {
    test('goTo notifies subscribers with the new path', () => {
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        Anu.History.goTo('/products');

        expect(seen).toEqual(['/products']);
        unsubscribe();
    });

    test('the notified path is basename-stripped', () => {
        Anu.History.configure({ basename: '/app' });
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        Anu.History.goTo('/users');

        expect(window.location.pathname).toBe('/app/users');
        expect(seen).toEqual(['/users']);
        unsubscribe();
    });

    test('replace-navigation notifies too', () => {
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        Anu.History.goTo('/settings', true);

        expect(seen).toEqual(['/settings']);
        unsubscribe();
    });

    test('unsubscribing stops notifications', () => {
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        Anu.History.goTo('/a');
        unsubscribe();
        Anu.History.goTo('/b');

        expect(seen).toEqual(['/a']);
    });

    test('a popstate event notifies subscribers (browser back/forward)', () => {
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        window.history.replaceState({}, '', '/back-target');
        window.dispatchEvent(new PopStateEvent('popstate'));

        expect(seen).toEqual(['/back-target']);
        unsubscribe();
    });

    test('a hashchange event notifies subscribers in hash mode', () => {
        Anu.History.configure({ mode: 'hash' });
        const seen: string[] = [];
        const unsubscribe = Anu.History.subscribe((path) => seen.push(path));

        window.history.replaceState({}, '', '#/about');
        window.dispatchEvent(new Event('hashchange'));

        expect(seen).toEqual(['/about']);
        unsubscribe();
    });

    test('unsubscribing during a notification pass is safe', () => {
        const seen: string[] = [];
        const unsubscribeA = Anu.History.subscribe((path) => {
            seen.push(`A:${path}`);
            unsubscribeB();
        });
        const unsubscribeB = Anu.History.subscribe((path) => seen.push(`B:${path}`));

        Anu.History.goTo('/first');
        Anu.History.goTo('/second');

        expect(seen).toEqual(['A:/first', 'B:/first', 'A:/second']);
        unsubscribeA();
    });

    test('the same listener registered twice is notified once', () => {
        const listener = jest.fn();
        const unsubscribe = Anu.History.subscribe(listener);
        const unsubscribeAgain = Anu.History.subscribe(listener);

        Anu.History.goTo('/once');

        expect(listener).toHaveBeenCalledTimes(1);
        unsubscribe();
        unsubscribeAgain();
    });
});

describe('History.matchPath', () => {
    test('matches a pattern with params against the current location', () => {
        window.history.replaceState({}, '', '/users/42');

        const match = Anu.History.matchPath('/users/:id');

        expect(match).not.toBeNull();
        expect(match!.params.id).toBe('42');
        expect(match!.isExact).toBe(true);
    });

    test('a prefix match reports isExact false; exact: true rejects it', () => {
        window.history.replaceState({}, '', '/users/42');

        const prefix = Anu.History.matchPath('/users');

        expect(prefix).not.toBeNull();
        expect(prefix!.isExact).toBe(false);
        expect(Anu.History.matchPath('/users', { exact: true })).toBeNull();
    });

    test('prefix matching is segment-boundary-anchored', () => {
        window.history.replaceState({}, '', '/users/42');

        expect(Anu.History.matchPath('/user')).toBeNull();
    });

    test('returns null when the pattern does not match', () => {
        window.history.replaceState({}, '', '/products');

        expect(Anu.History.matchPath('/users')).toBeNull();
    });

    test('matches against the basename-stripped path', () => {
        Anu.History.configure({ basename: '/app' });
        window.history.replaceState({}, '', '/app/users/42');

        const match = Anu.History.matchPath('/users/:id');

        expect(match).not.toBeNull();
        expect(match!.params.id).toBe('42');
    });
});
