import { __testing, unmountComponentAtNode } from '../core/reconciler';
import { __testing as HistoryTesting } from '../core/components/History';
import { __testing as IntlTesting } from '../core/components/Intl';
import { __testing as AnulyticsTesting } from '../core/components/AnulyticsProvider';
import { act } from './act';

const mountedContainers = new Set<Element>();

export const registerContainer = (container: Element): void => {
    mountedContainers.add(container);
};

export const cleanup = (): void => {
    mountedContainers.forEach((container) => {
        act(() => {
            unmountComponentAtNode(container);
        });
        container.parentNode?.removeChild(container);
    });
    mountedContainers.clear();
    __testing.resetGlobals();
    HistoryTesting.reset();
    IntlTesting.reset();
    AnulyticsTesting.reset();
};

export const setupAutoCleanup = (): void => {
    if (typeof afterEach === 'function') {
        afterEach(cleanup);
    }
};
