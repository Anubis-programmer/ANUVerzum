import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, BoundQuery } from '../types';

const matches = (el: Element, text: TextMatch): boolean => {
    const content = (el.textContent ?? '').trim();

    return text instanceof RegExp ? text.test(content) : content === text;
};

const isLeaf = (el: Element): boolean =>
    !Array.from(el.children).some((child) => (child.textContent ?? '').trim().length > 0);

const queryAllByText = (container: Element, text: TextMatch): Element[] => {
    const results: Element[] = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode() as Element | null;

    while (node) {
        if (isLeaf(node) && matches(node, text)) {
            results.push(node);
        }

        node = walker.nextNode() as Element | null;
    }
    
    return results;
};

const queryByText = (container: Element, text: TextMatch): Element | null =>
    queryAllByText(container, text)[0] ?? null;

export const createByTextQueries = (container: Element, text: TextMatch): BoundQuery =>
    buildQueryVariants(`ByText("${text}")`, container, (c) => queryByText(c, text), (c) => queryAllByText(c, text));