import { Component } from './Component';
import { AnuElement, Props } from '../elements';
import ServerAPI from '../../server-api/server-api';

const EventTypes = {
    INITIALIZATION: 'initialization',
    USER_ACTION: 'userAction',
    STATE_CHANGE: 'stateChange',
    NAVIGATION: 'navigation',
    PAGE_LEAVE: 'pageLeave'
} as const;

type AnulyticsData = {
    startDate: number;
    events: Array<Record<string, any>>;
    user: Record<string, any>;
};

type UserActionEvent = {
    type: string;
    keyCode?: number | null;
    pageX?: number;
    pageY?: number;
    target?: {
        id?: string;
        name?: string;
        nodeName?: string;
        value?: string;
    };
};

const AnulyticsState = (() => {
    const initStart = new Date().getTime();
    let _anulyticsInstanceExist = false;

    const setAnulyticsInstanceExist = (instanceExist: boolean): void => {
        _anulyticsInstanceExist = instanceExist;
    };

    const getAnulyticsInstanceExist = (): boolean => _anulyticsInstanceExist;

    const _anulytics: AnulyticsData = {
        startDate: initStart,
        events: [
            {
                [EventTypes.INITIALIZATION]: {
                    eventType: window.location.pathname,
                    timestamp: initStart,
                    properties: {}
                }
            }
        ],
        user: {}
    };

    return {
        getAnulyticsInstanceExist,
        setAnulyticsInstanceExist,
        addEvent: (key: string, val: Record<string, any>): void => {
            _anulytics.events.push({ [key]: val });
        },
        trackEvent: (
            {
                type,
                keyCode = null,
                pageX = 0,
                pageY = 0,
                target: { id = '', name = '', nodeName = '', value = '' } = {}
            }: UserActionEvent,
            rawProps: unknown
        ): void => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            const props =
                typeof rawProps === 'object' && !Array.isArray(rawProps) && rawProps !== null
                    ? (rawProps as Record<string, any>)
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
        trackStateChange: (
            prevState: Record<string, any>,
            action: Record<string, any>,
            nextState: Record<string, any>
        ): void => {
            const event = {
                [EventTypes.STATE_CHANGE]: {
                    eventType: action['type'],
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
        setUser: (user: Record<string, any> | null | undefined): void => {
            _anulytics.user = user || {};
        },
        getAnulyticsData: (): AnulyticsData => _anulytics
    };
})();

const _isBot: boolean = !!(
    (window as any).phantom ||
    (window as any)._phantom ||
    (window as any).__nightmare ||
    window.navigator.webdriver ||
    (window as any).Cypress
);

const _isInstalled = (): boolean => {
    if ((window.navigator as any).standalone) {
        return true;
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }

    return false;
};

export const trackEvent = (event: UserActionEvent, props?: unknown): void => {
    if (AnulyticsState.getAnulyticsInstanceExist()) {
        AnulyticsState.trackEvent(event, props);
    }
};

export const trackStateChange = (
    prevState: Record<string, any>,
    action: Record<string, any>,
    nextState: Record<string, any>
): void => {
    if (AnulyticsState.getAnulyticsInstanceExist()) {
        AnulyticsState.trackStateChange(prevState, action, nextState);
    }
};

export const trackRouteChange = (path?: string): void => {
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

export interface AnulyticsProviderProps extends Props {
    analyticsUrl: string;
    userData?: Record<string, any>;
    onSuccess: (response: any) => void;
    onFail: (status: number) => void;
}

class AnulyticsProvider extends Component<AnulyticsProviderProps> {
    constructor(props: AnulyticsProviderProps) {
        super(props);
        AnulyticsState.setAnulyticsInstanceExist(true);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    componentDidMount(): void {
        const { userData } = this.props;
        AnulyticsState.setUser(userData || null);

        document.addEventListener('visibilitychange', this.handleVisibilityChange, {
            passive: true
        });
    }

    componentWillUnmount(): void {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange as EventListener);
        AnulyticsState.setAnulyticsInstanceExist(false);
    }

    handleVisibilityChange(): void {
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
            let ua: { userAgent: any; mobile: boolean; platform: string };

            AnulyticsState.addEvent(EventTypes.PAGE_LEAVE, event);

            if ((window.navigator as any).userAgentData) {
                const { brands, mobile, platform } = (window.navigator as any).userAgentData;

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
                    userAgentData: ua
                }
            };

            ServerAPI.post(analyticsUrl, data)
                .then(({ response }) => onSuccess(response))
                .catch(({ status }) => onFail(status));
        } else {
            this.setState();
        }
    }

    render(): AnuElement | AnuElement[] | null {
        const children = this.props.children as AnuElement[] | undefined;

        try {
            if (!children || children.length !== 1) {
                throw new Error('Provider must have one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);

            return null;
        }
    }
}

export default AnulyticsProvider;
