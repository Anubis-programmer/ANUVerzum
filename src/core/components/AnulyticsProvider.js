import { Component} from './Component';
import ServerAPI from '../../server-api/server-api';

const EventTypes = {
    INITIALIZATION: 'initialization',
    USER_ACTION: 'userAction',
    STATE_CHANGE: 'stateChange',
    NAVIGATION: 'navigation',
    PAGE_LEAVE: 'pageLeave'
};

const AnulyticsState = (() => {
    const initStart = new Date().getTime();
    let _anulyticsInstanceExist = false;

    const setAnulyticsInstanceExist = instanceExist => {
        _anulyticsInstanceExist = instanceExist;
    }

    const getAnulyticsInstanceExist = () =>
        _anulyticsInstanceExist;

    let _anulytics = {
        startDate: initStart,
        events: [{
            [EventTypes.INITIALIZATION]: {
                eventType: window.location.pathname,
                timestamp: initStart,
                properties: {}
            }
        }],
        user: {}
    };

    return {
        getAnulyticsInstanceExist,
        setAnulyticsInstanceExist,
        addEvent: (key, val) => {
            _anulytics.events.push({ [key]: val });
        },
        trackEvent: ({
            type,
            keyCode = null,
            pageX = 0,
            pageY = 0,
            target: {
                id,
                name,
                nodeName,
                value
            } = {
                id: '',
                name: '',
                nodeName: '',
                value: ''
            }
        }, rawProps) => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            const props = typeof rawProps === 'object' && !Array.isArray(rawProps)
                ? rawProps
                : null;

            const event = {
                [EventTypes.USER_ACTION]: {
                    eventType: type,
                    timestamp: new Date().getTime(),
                    properties: {
                        id,
                        keyCode,
                        name,
                        nodeName,
                        value,
                        pageX,
                        pageY,
                        scrollTop,
                        scrollLeft,
                        url: window.location.pathname,
                        props
                    }
                }
            };

            _anulytics.events.push(event);
        },
        trackStateChange: (prevState, action, nextState) => {
            const event = {
                [EventTypes.STATE_CHANGE]: {
                    eventType: action.type,
                    timestamp: new Date().getTime(),
                    properties: {
                        url: window.location.pathname,
                        prevState,
                        action,
                        nextState
                    }
                }
            };

            _anulytics.events.push(event);
        },
        setUser: user => {
            _anulytics.user = user || {};
        },
        getAnulyticsData: () => _anulytics,
    };
})();

const _isBot =
    window.phantom ||
    window._phantom ||
    window.__nightmare ||
    window.navigator.webdriver ||
    window.Cypress;

const _isInstalled = () => {
    if (window.navigator.standalone) {
        return true;
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }

    return false;
};

export const trackEvent = (event, props) => {
    if (AnulyticsState.getAnulyticsInstanceExist()) {
        AnulyticsState.trackEvent(event, props);
    }
};

export const trackStateChange = (prevState, action, nextState) => {
    if (AnulyticsState.getAnulyticsInstanceExist()) {
        AnulyticsState.trackStateChange(prevState, action, nextState);
    }
};

export const trackRouteChange = path => {
    if (AnulyticsState.getAnulyticsInstanceExist()) {
        const url = path || window.location.pathname;
        const event = {
            eventType: url,
            timestamp: new Date().getTime(),
            properties: {}
        };

        AnulyticsState.addEvent(EventTypes.NAVIGATION, event);
    }
};

class AnulyticsProvider extends Component {
    constructor(props) {
        super(props);
        AnulyticsState.setAnulyticsInstanceExist(true);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    componentDidMount() {
        const { userData } = this.props;
        AnulyticsState.setUser(userData);

        document.addEventListener('visibilitychange', this.handleVisibilityChange, {
            passive: true,
        });
    }

    componentWillUnmount() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        AnulyticsState.setAnulyticsInstanceExist(false);
    }

    handleVisibilityChange() {
        const { analyticsUrl, onSuccess, onFail } = this.props;

        if (_isBot) {
            return;
        }

        if (document.visibilityState === 'hidden') {
            const url = window.location.pathname;
            const event = {
                eventType: url,
                timestamp: new Date().getTime(),
                properties: {}
            };
            let ua;

            AnulyticsState.addEvent(EventTypes.PAGE_LEAVE, event);

            if (window.navigator.userAgentData) {
                const { brands, mobile, platform } = window.navigator.userAgentData;

                ua = { userAgent: brands, mobile, platform };
            } else {
                ua = {
                    userAgent: window.navigator.userAgent,
                    mobile: false,
                    platform: ''
                };
            }

            const data = {
                ...AnulyticsState.getAnulyticsData(),
                endDate: new Date().getTime(),
                system: {
                    referrer: document.referrer || null,
                    innerWidth: window.innerWidth,
                    isMobileAppInstalled: _isInstalled(),
                    userAgentData: ua,
                }
            };

            ServerAPI.post(analyticsUrl, data)
                .then(({ response }) => onSuccess(response))
                .catch(({ status }) => onFail(status));
        } else {
            this.setState();
        }
    }

    render() {
        const { children } = this.props;

        try {
            if (children.length !== 1) {
                throw new Error('Provider must have one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);
        }
    }
}

export default AnulyticsProvider;