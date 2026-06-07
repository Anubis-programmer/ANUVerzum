import { __testing } from '../core/reconciler';

let _installed = false;

export const installSyncScheduler = (): void => {
    if (_installed) {
        return;
    }

    _installed = true;
    __testing.installSyncScheduler();
};

export const uninstallSyncScheduler = (): void => {
    _installed = false;
    __testing.uninstallSyncScheduler();
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