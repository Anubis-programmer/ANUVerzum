import { createElement, cloneElement, Children, isValidElement } from '../elements';
import { Component } from './Component';
import { trackRouteChange } from './AnulyticsProvider';
import { AnuElement, Props, ComponentConstructor, FunctionComponent } from '../elements';
import { isNotNullish } from '../../misc/utils';

export interface RouteMatch {
    path: string | null;
    url: string;
    isExact: boolean;
    params: Record<string, string>;
}

export interface HistoryRouteProps extends Props {
    path?: string;
    exact?: boolean;
    component?: ComponentConstructor | FunctionComponent;
    render?: (opts: { match: RouteMatch }) => AnuElement | null;
    computedMatch?: RouteMatch | null;
}

export interface HistoryLinkProps extends Props {
    to: string;
    replace?: boolean;
    ariaLabel?: string;
}

export interface HistoryRedirectProps extends Props {
    to: string;
    push?: boolean;
}

const instances: Component[] = [];

const register = (comp: Component): void => {
    instances.push(comp);
};

const unregister = (comp: Component): void => {
    const index = instances.indexOf(comp);

    if (index >= 0) {
        instances.splice(index, 1);
    }
};

const hasHistoryAPI =
    typeof window !== 'undefined' &&
    typeof window.history !== 'undefined' &&
    typeof window.history.pushState === 'function';

const historyPush = (path: string): void => {
    trackRouteChange(path);

    if (hasHistoryAPI) {
        history.pushState({}, '', path);
    } else {
        console.warn('History API not available - running in non-browser environment');
    }

    instances.forEach((instance) => {
        instance.setState();
    });
};

const historyReplace = (path: string): void => {
    trackRouteChange(path);

    if (hasHistoryAPI) {
        history.replaceState({}, '', path);
    } else {
        console.warn('History API not available - running in non-browser environment');
    }

    instances.forEach((instance) => {
        instance.setState();
    });
};

interface CompiledPath {
    regex: RegExp;
    keys: string[];
}

const compilePath = (path: string, exact: boolean): CompiledPath => {
    const keys: string[] = [];
    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0) {
        return { regex: new RegExp(exact ? '^/?$' : '^/'), keys };
    }

    let body = '';

    for (const segment of segments) {
        if (segment === '*') {
            keys.push('*');
            body += '(?:/(.*))?';
        } else if (segment.startsWith(':')) {
            const optional = segment.endsWith('?');
            keys.push(segment.slice(1, optional ? -1 : undefined));
            body += optional ? '(?:/([^/]+))?' : '/([^/]+)';
        } else {
            body += `/${segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`;
        }
    }

    const suffix = exact ? '/?$' : '(?=/|$)';

    return { regex: new RegExp(`^${body}${suffix}`), keys };
};

const matchPath = (pathname: string, options: { exact?: boolean; path?: string }): RouteMatch | null => {
    const { exact = false, path } = options;

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true,
            params: {}
        };
    }

    const { regex, keys } = compilePath(path, exact);
    const match = regex.exec(pathname);

    if (!match) {
        return null;
    }

    const url = match[0];
    const params: Record<string, string> = {};

    keys.forEach((key, index) => {
        if (isNotNullish(match[index + 1])) {
            params[key] = match[index + 1];
        }
    });

    return { path, url, isExact: pathname === url, params };
};

const routeMatches = new Map<Component, RouteMatch>();

const setRouteMatch = (route: Component, match: RouteMatch): void => {
    routeMatches.set(route, match);
};

const clearRouteMatch = (route: Component): void => {
    routeMatches.delete(route);
};

const getMergedRouteParams = (): Record<string, string> => {
    const merged: Record<string, string> = {};
    routeMatches.forEach((match) => Object.assign(merged, match.params));

    return merged;
};

class HistoryRoute extends Component<HistoryRouteProps> {
    constructor(props: HistoryRouteProps) {
        super(props);
        this.handlePop = this.handlePop.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('popstate', this.handlePop);
        register(this);
    }

    componentWillUnmount(): void {
        unregister(this);
        clearRouteMatch(this);
        window.removeEventListener('popstate', this.handlePop);
    }

    handlePop(): void {
        this.setState();
    }

    render(): AnuElement | null {
        const { path, exact, component, render, computedMatch } = this.props;

        const match = computedMatch ?? matchPath(window.location.pathname, { path, exact });

        if (match !== null) {
            setRouteMatch(this, match);

            if (component) {
                return createElement(component, { match });
            }

            if (render) {
                return render({ match });
            }
        } else {
            clearRouteMatch(this);
        }

        return null;
    }
}

class HistorySwitch extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handlePop = this.handlePop.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('popstate', this.handlePop);
        register(this);
    }

    componentWillUnmount(): void {
        unregister(this);
        window.removeEventListener('popstate', this.handlePop);
    }

    handlePop(): void {
        this.setState();
    }

    render(): AnuElement | null {
        const pathname = window.location.pathname;

        for (const child of Children.toArray(this.props.children)) {
            if (!isValidElement(child)) {
                continue;
            }

            const match = matchPath(pathname, { path: child.props.path, exact: child.props.exact });

            if (match !== null) {
                return cloneElement(child, { computedMatch: match });
            }
        }

        return null;
    }
}

const isModifiedEvent = (event: MouseEvent): boolean =>
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const shouldProcessLinkClick = (event: MouseEvent, target?: string): boolean =>
    event.button === 0 && (!target || target === '_self') && !isModifiedEvent(event);

class HistoryLink extends Component<HistoryLinkProps> {
    constructor(props: HistoryLinkProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: MouseEvent): void {
        const { onClick, target, replace, to } = this.props;

        if (typeof onClick === 'function') {
            onClick(event);
        }

        if (!event.defaultPrevented && shouldProcessLinkClick(event, target)) {
            event.preventDefault();
            goTo(to, replace);
        }
    }

    render(): AnuElement {
        const { to, children, ariaLabel, ...restProps } = this.props;
        delete restProps.replace;

        return createElement(
            'a',
            {
                href: to,
                ariaLabel: `historyLink${ariaLabel ? `-${ariaLabel}` : ''}`,
                ...restProps,
                onClick: this.handleClick
            },
            children
        );
    }
}

class HistoryRedirect extends Component<HistoryRedirectProps> {
    componentDidMount(): void {
        const { to, push } = this.props;

        if (push) {
            historyPush(to);
        } else {
            historyReplace(to);
        }
    }

    render(): null {
        return null;
    }
}

export const goTo = (path = '/', replace?: boolean): void => {
    if (replace) {
        historyReplace(path);
    } else {
        historyPush(path);
    }
};

const getRouteParams = (key: string): string | null => getMergedRouteParams()[key] ?? null;

const getAllRouteParamNames = (): string[] => Object.keys(getMergedRouteParams());

const History = {
    Link: HistoryLink,
    Redirect: HistoryRedirect,
    Route: HistoryRoute,
    Switch: HistorySwitch,
    getRouteParams,
    getAllRouteParamNames
};

export default History;

export const __testing = {
    reset(): void {
        if (process.env.NODE_ENV !== 'test') {
            return;
        }
        
        instances.length = 0;
        routeMatches.clear();
    }
};
