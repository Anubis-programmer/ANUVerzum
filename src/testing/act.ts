import { __testing } from '../core/reconciler';

const FAKE_DEADLINE: IdleDeadline = { didTimeout: false, timeRemaining: () => 999 };

let _installed = false;

export const installSyncScheduler = (): void => {
    if (_installed) {
        return;
    }

    _installed = true;
    (window as any).requestIdleCallback = (cb: IdleRequestCallback): number => {
        cb(FAKE_DEADLINE);

        return 0;
    };
    (window as any).cancelIdleCallback = (): void => {};
};

export const uninstallSyncScheduler = (): void => {
    _installed = false;
};

export const flushEffects = (): void => {
    __testing.flushSync();
};

export const act = (callback: () => void | Promise<void>): void | Promise<void> => {
    const result = callback();

    if (result && typeof (result as Promise<void>).then === 'function') {
        return (result as Promise<void>).then(() => {
            __testing.flushSync();
        });
    }
    
    __testing.flushSync();
};