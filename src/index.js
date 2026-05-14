import Async from './misc/async';
import Utils from './misc/utils';
import ServerAPI from './server-api/server-api';
import { createElement } from './core/elements';
import { createRef, render } from './core/reconciler';
import store from './store/store';
import { createContext } from './core/components/Context';
import { Component } from './core/components/Component';
import { Fragment } from './core/components/Fragment';
import Connector from './core/components/Connector';
import Feature from './core/components/Feature';
import History from './core/components/History';
import Intl from './core/components/Intl';
import AnulyticsProvider, { trackEvent } from './core/components/AnulyticsProvider';

window.requestIdleCallback =
    window.requestIdleCallback ||
    function (callBack) {
        const start = Date.now();

        return setTimeout(() => {
            callBack({
                didTimeout: false,
                timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
            });
        }, 1);
    };

window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
        clearTimeout(id);
    };



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
    History,
    Intl,
    Connector,
    ServerAPI,
    store,
    Async,
    Utils
};

export default Anu;