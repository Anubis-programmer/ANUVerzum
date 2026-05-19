import { buildQueryVariants } from './queryBuilder';
import type { BoundQuery } from '../types';

const queryAllByTestId = (container: Element, id: string): Element[] =>
    Array.from(container.querySelectorAll(`[data-testid="${CSS.escape(id)}"]`));

const queryByTestId = (container: Element, id: string): Element | null =>
    queryAllByTestId(container, id)[0] ?? null;

export const createByTestIdQueries = (container: Element, id: string): BoundQuery =>
    buildQueryVariants(
        `ByTestId("${id}")`,
        container,
        (c) => queryByTestId(c, id),
        (c) => queryAllByTestId(c, id)
    );