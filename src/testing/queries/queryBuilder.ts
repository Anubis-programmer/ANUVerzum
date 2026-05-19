import { waitFor } from '../waitFor';
import type { QueryFn, QueryAllFn, BoundQuery } from '../types';

export const buildQueryVariants = (
    name: string,
    container: Element,
    singleFn: QueryFn,
    allFn: QueryAllFn
): BoundQuery => {
    const query = (): Element | null => singleFn(container);

    const get = (): Element => {
        const el = singleFn(container);

        if (!el) {
            throw new Error(`AnuTestingLibrary: unable to find element ${name}\n\nContainer HTML:\n${container.innerHTML}`);
        }

        return el;
    };

    const queryAll = (): Element[] => allFn(container);

    const getAll = (): Element[] => {
        const els = allFn(container);

        if (els.length === 0) {
            throw new Error(`AnuTestingLibrary: unable to find any elements ${name}\n\nContainer HTML:\n${container.innerHTML}`);
        }
        
        return els;
    };

    const find = (): Promise<Element> => waitFor(() => get());
    const findAll = (): Promise<Element[]> => waitFor(() => getAll());

    return { get, query, find, getAll, queryAll, findAll };
};