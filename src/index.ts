import Utils from './misc/utils';
import ServerAPI from './server-api/server-api';
import { createElement, cloneElement, isValidElement, Children, AnuElement, AnuNode, Props, Ref, ElementType as AnuElementType } from './core/elements';
import { createRef, render, createPortal } from './core/reconciler';
import { lazy } from './core/lazy';
import { memo } from './core/memo';
import store from './store/store';
import { createContext } from './core/components/Context';
import { Component } from './core/components/Component';
import { PureComponent } from './core/components/PureComponent';
import { Fragment } from './core/components/Fragment';
import Connector from './core/components/Connector';
import Feature from './core/components/Feature';
import History, { goTo } from './core/components/History';
import Intl from './core/components/Intl';
import AnulyticsProvider, { trackEvent } from './core/components/AnulyticsProvider';

const Anu = {
    Anulytics: {
        Provider: AnulyticsProvider,
        trackEvent
    },
    createContext,
    createElement,
    cloneElement,
    isValidElement,
    Children,
    createPortal,
    createRef,
    Component,
    PureComponent,
    Fragment,
    lazy,
    memo,
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

export type { AnuElement, AnuChild, AnuNode, AnuCSSProperties, Props, Ref, FunctionComponent, ElementType } from './core/elements';
export type { ContextValue, ConsumerProps } from './core/components/Context';
export type { Action, ThunkAction, Dispatch, Reducer, MiddlewareAPI, Middleware, Store, SelectorFn, CreateSelectorFn } from './store/store';
export type { ApiSuccessResponse, ApiErrorResponse } from './server-api/server-api';
export { Component, PureComponent, Fragment, createElement, cloneElement, isValidElement, Children, createRef, createPortal, createContext, lazy, memo, render, goTo };
export type { LazyOptions } from './core/lazy';
export { AnulyticsProvider, trackEvent };
export { store, ServerAPI, Utils, Connector, Feature, History, Intl };
export type { AbbreviateNumberOptions, FormatNumberOptions, ParseNumberOptions } from './core/components/Intl';

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-object-type */
declare global {
    namespace JSX {
        type ElementType = AnuElementType;
        interface IntrinsicAttributes {
            key?: string | number | null;
            ref?: Ref<any> | null;
        }
        interface Element extends AnuElement<any, any> {}
        interface ElementClass {
            render(): AnuNode;
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
