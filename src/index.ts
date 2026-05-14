import Utils from './misc/utils';
import ServerAPI from './server-api/server-api';
import { createElement, AnuElement, Props } from './core/elements';
import { createRef, render } from './core/reconciler';
import store from './store/store';
import { createContext } from './core/components/Context';
import { Component } from './core/components/Component';
import { Fragment } from './core/components/Fragment';
import Connector from './core/components/Connector';
import Feature from './core/components/Feature';
import History, { goTo } from './core/components/History';
import Intl from './core/components/Intl';
import AnulyticsProvider, { trackEvent } from './core/components/AnulyticsProvider';

if (!window.requestIdleCallback) {
    window.requestIdleCallback = (callback: IdleRequestCallback): number => {
        const start = Date.now();

        return setTimeout(() => {
            callback({
                didTimeout: false,
                timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
            });
        }, 1) as unknown as number;
    };
}

if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = (id: number): void => {
        clearTimeout(id);
    };
}

const Anu = {
    Anulytics: {
        Provider: AnulyticsProvider,
        trackEvent
    },
    createContext,
    createElement,
    createRef,
    Component,
    Fragment,
    render,
    Feature,
    History: {
        ...History,
        goTo
    },
    Intl,
    Connector,
    ServerAPI,
    store,
    Utils
};

export type { AnuElement, Props, Ref, FunctionComponent, ElementType } from './core/elements';
export type { ContextValue } from './core/components/Context';
export type { Action, ThunkAction, Dispatch, Reducer, MiddlewareAPI, Middleware, Store, SelectorFn } from './store/store';
export type { ApiSuccessResponse, ApiErrorResponse } from './server-api/server-api';
export { Component, Fragment, createElement, createRef, createContext, render, goTo };
export { AnulyticsProvider, trackEvent };
export { store, ServerAPI, Utils, Connector, Feature, History, Intl };
export type { AbbreviateNumberOptions } from './core/components/Intl';

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-object-type */
declare global {
    namespace JSX {
        interface Element extends AnuElement {}
        interface ElementClass {
            render(): AnuElement | AnuElement[] | null | undefined;
        }
        interface ElementAttributesProperty {
            props: Record<string, unknown>;
        }
        interface ElementChildrenAttribute {
            children: Record<string, unknown>;
        }
        interface IntrinsicElements {
            [elemName: string]: Props;
        }
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-object-type */

export default Anu;
