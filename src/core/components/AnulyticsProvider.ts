import { Component } from './Component';
import { AnuChild, Props, toChildArray } from '../elements';
import ServerAPI from '../../server-api/server-api';

const EventTypes = {
    INITIALIZATION: 'initialization',
    USER_ACTION: 'userAction',
    STATE_CHANGE: 'stateChange',
    NAVIGATION: 'navigation',
    PAGE_LEAVE: 'pageLeave'
} as const;

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
    const startDate = new Date().getTime();
    let _anulyticsInstanceExist = false;
    let _analyticsUrl = '';
    let _onSuccess: (response: any) => void = () => {};
    let _onFail: (status: number) => void = () => {};
    let _user: Record<string, any> = {};

    const send = (event: Record<string, any>, extra?: Record<string, any>): void => {
        ServerAPI.post(_analyticsUrl, { startDate, user: _user, ...event, ...(extra || {}) })
            .then(({ response }) => _onSuccess(response))
            .catch(({ status }) => _onFail(status));
    };

    return {
        getAnulyticsInstanceExist: (): boolean => _anulyticsInstanceExist,
        setAnulyticsInstanceExist: (instanceExist: boolean): void => {
            _anulyticsInstanceExist = instanceExist;
        },
        setConfig: (url: string, onSuccess: (response: any) => void, onFail: (status: number) => void): void => {
            _analyticsUrl = url;
            _onSuccess = onSuccess;
            _onFail = onFail;
        },
        setUser: (user: Record<string, any> | null | undefined): void => {
            _user = user || {};
        },
        getStartDate: (): number => startDate,
        sendEvent: (key: string, val: Record<string, any>, extra?: Record<string, any>): void => {
            send({ [key]: val }, extra);
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

            send({
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
            });
        },
        trackStateChange: (
            prevState: Record<string, any>,
            action: Record<string, any>,
            nextState: Record<string, any>
        ): void => {
            send({
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
            });
        }
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

        AnulyticsState.sendEvent(EventTypes.NAVIGATION, {
            eventType: url,
            timestamp: new Date().getTime(),
            properties: {}
        });
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
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    componentDidMount(): void {
        const { analyticsUrl, userData, onSuccess, onFail } = this.props;
        AnulyticsState.setConfig(analyticsUrl, onSuccess, onFail);
        AnulyticsState.setUser(userData || null);
        AnulyticsState.setAnulyticsInstanceExist(true);

        AnulyticsState.sendEvent(EventTypes.INITIALIZATION, {
            eventType: window.location.pathname,
            timestamp: AnulyticsState.getStartDate(),
            properties: {}
        });

        document.addEventListener('visibilitychange', this.handleVisibilityChange, {
            passive: true
        });
    }

    componentWillUnmount(): void {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange as EventListener);
        AnulyticsState.setAnulyticsInstanceExist(false);
    }

    handleVisibilityChange(): void {
        if (_isBot) {
            return;
        }

        if (document.visibilityState === 'hidden') {
            const url = window.location.pathname;
            let ua: { userAgent: any; mobile: boolean; platform: string };

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

            AnulyticsState.sendEvent(
                EventTypes.PAGE_LEAVE,
                {
                    eventType: url,
                    timestamp: new Date().getTime(),
                    properties: {}
                },
                {
                    system: {
                        referrer: document.referrer || null,
                        innerWidth: window.innerWidth,
                        isMobileAppInstalled: _isInstalled(),
                        userAgentData: ua
                    }
                }
            );
        } else {
            this.setState();
        }
    }

    render(): AnuChild[] | null {
        const children = toChildArray(this.props.children);

        try {
            if (children.length !== 1) {
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

export const __testing = {
    reset(): void {
        if (process.env.NODE_ENV !== 'test') {
            return;
        }

        AnulyticsState.setAnulyticsInstanceExist(false);
    }
};
