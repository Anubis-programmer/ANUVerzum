import Anu from '../index';
import { render } from './render';
import type { AnuElement } from '../core/elements';
import type { Store } from '../store/store';
import type { RenderOptions, RenderResult } from './types';

export interface RenderWithStoreOptions extends RenderOptions {}

export const renderWithStore = (
    ui: AnuElement,
    storeInstance: Store,
    options: RenderWithStoreOptions = {}
): RenderResult =>
    render(
        Anu.createElement(Anu.Connector.Provider as any, { store: storeInstance }, ui),
        options
    );

export interface RenderWithRouterOptions extends RenderOptions {
    initialPath?: string;
}

export const renderWithRouter = (
    ui: AnuElement,
    options: RenderWithRouterOptions = {}
): RenderResult & { navigate: (path: string) => void } => {
    const { initialPath = '/', ...renderOptions } = options;
    window.history.pushState({}, '', initialPath);
    const result = render(ui, renderOptions);

    const navigate = (path: string): void => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    };

    return { ...result, navigate };
};

export interface RenderWithIntlOptions extends RenderOptions {
    defaultLocale?: string;
}

export const renderWithIntl = (
    ui: AnuElement,
    locale: string,
    messages: Record<string, Record<string, string>>,
    options: RenderWithIntlOptions = {}
): RenderResult => {
    const { defaultLocale, ...renderOptions } = options;

    return render(
        Anu.createElement(Anu.Intl.Provider as any, { locale, messages, defaultLocale }, ui),
        renderOptions
    );
};

export const renderWithContext = <T extends Record<string, any>>(
    ui: AnuElement,
    ContextProvider: new (props: any) => any,
    value: T,
    options: RenderOptions = {}
): RenderResult =>
    render(
        Anu.createElement(ContextProvider, value, ui),
        options
    );