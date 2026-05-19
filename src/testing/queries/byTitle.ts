import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, BoundQuery } from '../types';

const titleMatches = (el: Element, title: TextMatch): boolean => {
    const attr = el.getAttribute('title') ?? '';
    
    return title instanceof RegExp ? title.test(attr) : attr === title;
};

const queryAllByTitle = (container: Element, title: TextMatch): Element[] =>
    Array.from(container.querySelectorAll('[title]')).filter((el) => titleMatches(el, title));

const queryByTitle = (container: Element, title: TextMatch): Element | null =>
    queryAllByTitle(container, title)[0] ?? null;

export const createByTitleQueries = (container: Element, title: TextMatch): BoundQuery =>
    buildQueryVariants(
        `ByTitle("${title}")`,
        container,
        (c) => queryByTitle(c, title),
        (c) => queryAllByTitle(c, title)
    );