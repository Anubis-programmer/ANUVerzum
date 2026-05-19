import Anu from '../index';
import { unmountComponentAtNode } from '../core/reconciler';
import { act } from './act';
import { registerContainer } from './cleanup';
import { buildQueries } from './queries/index';
import type { AnuElement, ElementType } from '../core/elements';
import type { RenderOptions, RenderResult } from './types';

const applyWrapper = (ui: AnuElement, options: RenderOptions): AnuElement => {
    if (!options.wrapper) {
        return ui;
    }
    
    return Anu.createElement(options.wrapper as ElementType, {}, ui);
};

export const render = (ui: AnuElement, options: RenderOptions = {}): RenderResult => {
    const mountBase = options.baseElement ?? document.body;
    const container = options.container ?? document.createElement('div');

    if (!options.container) {
        mountBase.appendChild(container);
    }

    registerContainer(container);

    act(() => {
        Anu.render(applyWrapper(ui, options), container);
    });

    const queries = buildQueries(container);

    return {
        container,
        baseElement: mountBase,
        rerender: (newUI: AnuElement): void => {
            act(() => {
                Anu.render(applyWrapper(newUI, options), container);
            });
        },
        unmount: (): void => {
            act(() => {
                unmountComponentAtNode(container);
            });
        },
        ...queries,
    };
};