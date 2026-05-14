import { createElement } from '../elements';
import { Component } from './Component';
import { trackRouteChange } from './AnulyticsProvider';

const instances = [];

const register = comp => {
    instances.push(comp);
};

const unregister = comp => {
    const index = instances.indexOf(comp);

    if (index >= 0) {
        instances.splice(index, 1);
    }
};

const hasHistoryAPI = typeof window !== 'undefined' &&
    typeof window.history !== 'undefined' &&
    typeof window.history.pushState === 'function';

const historyPush = path => {
    trackRouteChange(path);

    if (hasHistoryAPI) {
        history.pushState({}, null, path);
    } else {
        console.warn('History API not available - running in non-browser environment');
    }

    instances.forEach(instance => {
        instance.setState();
    });
};

const historyReplace = path => {
    trackRouteChange(path);

    if (hasHistoryAPI) {
        history.replaceState({}, null, path);
    } else {
        console.warn('History API not available - running in non-browser environment');
    }

    instances.forEach(instance => {
        instance.setState();
    });
};

const matchPath = (pathname, options) => {
    const { exact = false, path } = options;

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true,
        };
    }

    const match = new RegExp(`^${path}`).exec(pathname);

    if (!match) {
        return null;
    }

    const url = match[0];
    const isExact = pathname === url;

    if (exact && !isExact) {
        return null;
    }

    return {
        path,
        url,
        isExact,
    };
};

class HistoryRoute extends Component {
    constructor(props) {
        super(props);
        this.handlePop = this.handlePop.bind(this);
    }

    componentDidMount() {
        window.addEventListener("popstate", this.handlePop);
        register(this);
    }

    componentWillUnmount() {
        unregister(this);
        window.removeEventListener("popstate", this.handlePop);
    }

    handlePop() {
        this.setState();
    }

    render() {
        const {
            path,
            exact,
            component,
            render,
        } = this.props;

        const match = matchPath(
            window.location.pathname,
            { path, exact }
        );

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

class HistoryLink extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        const { replace, to } = this.props;

        replace ? historyReplace(to) : historyPush(to);
    }

    render() {
        const { to, children, ...restProps } = this.props;
        const { ariaLabel } = restProps;

        return createElement('a', {
            href: to,
            ariaLabel: `historyLink${ariaLabel ? `-${ariaLabel}` : ''}`,
            onClick: this.handleClick,
            ...restProps
        }, children);
    }
}

class HistoryRedirect extends Component {
    componentDidMount() {
        const { to, push } = this.props;

        push ? historyPush(to) : historyReplace(to);
    }

    render() {
        return null;
    }
}

export const goTo = (path = '/', replace) => {
    replace ? historyReplace(path) : historyPush(path);
};

const History = {
    Link: HistoryLink,
    Redirect: HistoryRedirect,
    Route: HistoryRoute
};

export default History;