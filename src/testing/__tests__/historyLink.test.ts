import Anu from '../../index';
import { render, fireEvent } from '../index';

const renderLink = (props: Record<string, any>, label = 'Go') =>
    render(Anu.createElement(Anu.History.Link, props, label));

const anchor = (container: Element): HTMLAnchorElement =>
    container.querySelector('a') as HTMLAnchorElement;

describe('History.Link rendering', () => {
    test('renders an <a> with the href taken from `to`', () => {
        const { container } = renderLink({ to: '/dashboard' });
        const a = anchor(container);

        expect(a).not.toBeNull();
        expect(a.getAttribute('href')).toBe('/dashboard');
        expect(a.textContent).toBe('Go');
    });

    test('does not leak the Link-only `replace` prop onto the DOM', () => {
        const { container } = renderLink({ to: '/x', replace: true });

        expect(anchor(container).hasAttribute('replace')).toBe(false);
    });

    test('forwards regular anchor attributes (e.g. target, className)', () => {
        const { container } = renderLink({ to: '/x', target: '_blank', className: 'nav' });
        const a = anchor(container);

        expect(a.getAttribute('target')).toBe('_blank');
        expect(a.getAttribute('class')).toBe('nav');
    });
});

describe('History.Link navigation via the History API', () => {
    let pushSpy: jest.SpyInstance;
    let replaceSpy: jest.SpyInstance;

    beforeEach(() => {
        pushSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
        replaceSpy = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
    });

    afterEach(() => {
        pushSpy.mockRestore();
        replaceSpy.mockRestore();
    });

    test('a plain left-click pushes the new path and prevents default', () => {
        const { container } = renderLink({ to: '/dashboard' });

        const dispatched = fireEvent.click(anchor(container));

        expect(pushSpy).toHaveBeenCalledWith({}, '', '/dashboard');
        expect(dispatched).toBe(false); // preventDefault() cancels the event
    });

    test('the `replace` prop routes through replaceState instead of pushState', () => {
        const { container } = renderLink({ to: '/dashboard', replace: true });

        fireEvent.click(anchor(container));

        expect(replaceSpy).toHaveBeenCalledWith({}, '', '/dashboard');
        expect(pushSpy).not.toHaveBeenCalled();
    });
});

describe('History.Link composes a user-provided onClick', () => {
    let pushSpy: jest.SpyInstance;

    beforeEach(() => {
        pushSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
        jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('calls the user onClick and still navigates', () => {
        const onClick = jest.fn();
        const { container } = renderLink({ to: '/x', onClick });

        fireEvent.click(anchor(container));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(pushSpy).toHaveBeenCalledWith({}, '', '/x');
    });

    test('a user onClick that calls preventDefault() cancels navigation', () => {
        const onClick = jest.fn((event: Event) => event.preventDefault());
        const { container } = renderLink({ to: '/x', onClick });

        fireEvent.click(anchor(container));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(pushSpy).not.toHaveBeenCalled();
    });
});

describe('History.Link defers to the browser for non-plain clicks', () => {
    let pushSpy: jest.SpyInstance;

    beforeEach(() => {
        pushSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('a modifier-key click (metaKey) is left to the browser', () => {
        const { container } = renderLink({ to: '/x' });

        fireEvent.click(anchor(container), { metaKey: true });

        expect(pushSpy).not.toHaveBeenCalled();
    });

    test('a non-left button click is left to the browser', () => {
        const { container } = renderLink({ to: '/x' });

        fireEvent.click(anchor(container), { button: 1 });

        expect(pushSpy).not.toHaveBeenCalled();
    });

    test('target="_blank" is left to the browser', () => {
        const { container } = renderLink({ to: '/x', target: '_blank' });

        fireEvent.click(anchor(container));

        expect(pushSpy).not.toHaveBeenCalled();
    });
});
