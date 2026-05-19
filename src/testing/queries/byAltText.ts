import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, BoundQuery } from '../types';

const altMatches = (el: Element, alt: TextMatch): boolean => {
    const attr = el.getAttribute('alt') ?? '';
    
    return alt instanceof RegExp ? alt.test(attr) : attr === alt;
};

const queryAllByAltText = (container: Element, alt: TextMatch): Element[] =>
    Array.from(container.querySelectorAll('[alt]')).filter((el) => altMatches(el, alt));

const queryByAltText = (container: Element, alt: TextMatch): Element | null =>
    queryAllByAltText(container, alt)[0] ?? null;

export const createByAltTextQueries = (container: Element, alt: TextMatch): BoundQuery =>
    buildQueryVariants(
        `ByAltText("${alt}")`,
        container,
        (c) => queryByAltText(c, alt),
        (c) => queryAllByAltText(c, alt)
    );