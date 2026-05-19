import { flushEffects } from './act';
import type { WaitForOptions } from './types';

export const waitFor = <T>(callback: () => T, options: WaitForOptions = {}): Promise<T> => {
    const { timeout = 1000, interval = 50 } = options;

    return new Promise<T>((resolve, reject) => {
        const startTime = Date.now();
        let lastError: Error;

        const check = (): void => {
            flushEffects();

            try {
                resolve(callback());

                return;
            } catch (err) {
                lastError = err as Error;
            }

            if (Date.now() - startTime >= timeout) {
                reject(
                    new Error(
                        `AnuTestingLibrary waitFor: timed out after ${timeout}ms.\n${lastError?.message ?? ''}`
                    )
                );
                return;
            }

            setTimeout(check, interval);
        };

        check();
    });
};

export const waitForElementToBeRemoved = (
    callback: () => Element | Element[] | null,
    options?: WaitForOptions
): Promise<void> =>
    waitFor(() => {
        const result = callback();
        const present =
            result !== null && (Array.isArray(result) ? result.length > 0 : true);

        if (present) {
            throw new Error('AnuTestingLibrary: element is still present in the DOM.');
        }
    }, options);