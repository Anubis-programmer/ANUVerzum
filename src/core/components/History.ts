import { createElement } from '../elements';
import { Component } from './Component';
import { trackRouteChange } from './AnulyticsProvider';
import { AnuElement, Props, ComponentConstructor, FunctionComponent } from '../elements';

export interface RouteMatch {
    path: string | null;
    url: string;
    isExact: boolean;
}

export interface HistoryRouteProps extends Props {
    path?: string;
    exact?: boolean;
    component?: ComponentConstructor | FunctionComponent;
    render?: (opts: { match: RouteMatch }) => AnuElement | null;
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

const matchPath = (pathname: string, options: { exact?: boolean; path?: string }): RouteMatch | null => {
    const { exact = false, path } = options;

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true
        };
    }

    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(`^${escapedPath}`).exec(pathname);

    if (!match) {
        return null;
    }

    const url = match[0];
    const isExact = pathname === url;

    if (exact && !isExact) {
        return null;
    }

    return { path, url, isExact };
};

const singularize = (word: string): string => {
    if (word.endsWith('ies')) {
        return `${word.slice(0, -3)}y`;
    }

    if (word.endsWith('sses')) {
        return word.slice(0, -2);
    }

    if (word.endsWith('xes')) {
        return word.slice(0, -2);
    }

    if (word.endsWith('zes')) {
        return word.slice(0, -3);
    }

    if (word.endsWith('ches')) {
        return word.slice(0, -2);
    }

    if (word.endsWith('shes')) {
        return word.slice(0, -2);
    }

    if (word.endsWith('s')) {
        return word.slice(0, -1);
    }

    return word;
};

const parseUrlParams = (pathname: string): Record<string, string> => {
    const segments = pathname.split('/').filter(Boolean);
    const params: Record<string, string> = {};

    for (let i = 0; i < segments.length - 1; i += 2) {
        params[`${singularize(segments[i])}Id`] = segments[i + 1];
    }

    return params;
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
        window.removeEventListener('popstate', this.handlePop);
    }

    handlePop(): void {
        this.setState();
    }

    render(): AnuElement | null {
        const { path, exact, component, render } = this.props;

        const match = matchPath(window.location.pathname, { path, exact });

        if (match !== null) {
            if (component) {
                return createElement(component, { match });
            }

            if (render) {
                return render({ match });
            }
        }

        return null;
    }
}

class HistoryLink extends Component<HistoryLinkProps> {
    constructor(props: HistoryLinkProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: Event): void {
        event.preventDefault();
        const { replace, to } = this.props;

        if (replace) {
            historyReplace(to);
        } else {
            historyPush(to);
        }
    }

    render(): AnuElement {
        const { to, children, ariaLabel, ...restProps } = this.props;

        return createElement(
            'a',
            {
                href: to,
                ariaLabel: `historyLink${ariaLabel ? `-${ariaLabel}` : ''}`,
                onClick: this.handleClick,
                ...restProps
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

const getUrlParams = (key: string): string | null => {
    const params = parseUrlParams(window.location.pathname);
    return params[key] ?? null;
};

const getAllUrlParamNames = (): string[] =>
    Object.keys(parseUrlParams(window.location.pathname));

const History = {
    Link: HistoryLink,
    Redirect: HistoryRedirect,
    Route: HistoryRoute,
    getUrlParams,
    getAllUrlParamNames
};

export default History;
