export { render } from './render';
export { act, flushEffects, installSyncScheduler, uninstallSyncScheduler } from './act';
export { cleanup, setupAutoCleanup } from './cleanup';
export { waitFor, waitForElementToBeRemoved } from './waitFor';
export { fireEvent } from './events/fireEvent';
export { userEvent } from './events/userEvent';
export { renderWithStore, renderWithRouter, renderWithIntl, renderWithContext } from './wrappers';
export { buildQueries } from './queries/index';

export type {
    RenderOptions,
    RenderResult,
    BoundQueries,
    BoundQuery,
    ByRoleOptions,
    TextMatch,
    WaitForOptions,
} from './types';