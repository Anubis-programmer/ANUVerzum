import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, BoundQuery } from '../types';

const placeholderMatches = (el: Element, placeholder: TextMatch): boolean => {
    const attr = el.getAttribute('placeholder') ?? '';
    
    return placeholder instanceof RegExp ? placeholder.test(attr) : attr === placeholder;
};

const queryAllByPlaceholderText = (container: Element, placeholder: TextMatch): Element[] =>
    Array.from(container.querySelectorAll('[placeholder]')).filter((el) =>
        placeholderMatches(el, placeholder)
    );

const queryByPlaceholderText = (container: Element, placeholder: TextMatch): Element | null =>
    queryAllByPlaceholderText(container, placeholder)[0] ?? null;

export const createByPlaceholderTextQueries = (container: Element, placeholder: TextMatch): BoundQuery =>
    buildQueryVariants(
        `ByPlaceholderText("${placeholder}")`,
        container,
        (c) => queryByPlaceholderText(c, placeholder),
        (c) => queryAllByPlaceholderText(c, placeholder)
    );