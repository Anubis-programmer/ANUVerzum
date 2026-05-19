import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, BoundQuery } from '../types';

const labelMatches = (text: string, match: TextMatch): boolean =>
    match instanceof RegExp ? match.test(text) : text.trim() === match;

const queryAllByLabelText = (container: Element, label: TextMatch): Element[] => {
    const results: Element[] = [];

    container.querySelectorAll('label').forEach((labelEl) => {
        const text = (labelEl.textContent ?? '').trim();

        if (!labelMatches(text, label)) {
            return;
        }

        const forAttr = labelEl.getAttribute('for');

        if (forAttr) {
            const input = container.querySelector(`#${CSS.escape(forAttr)}`);

            if (input) {
                results.push(input);
            }

            return;
        }

        const nested = labelEl.querySelector('input, select, textarea');

        if (nested) {
            results.push(nested);
        }
    });

    container.querySelectorAll('[aria-label]').forEach((el) => {
        const ariaLabel = el.getAttribute('aria-label') ?? '';

        if (labelMatches(ariaLabel, label)) {
            results.push(el);
        }
    });

    container.querySelectorAll('[aria-labelledby]').forEach((el) => {
        const id = el.getAttribute('aria-labelledby') ?? '';
        const labelEl = document.getElementById(id);
        const text = (labelEl?.textContent ?? '').trim();

        if (labelMatches(text, label)) {
            results.push(el);
        }
    });

    return results;
};

const queryByLabelText = (container: Element, label: TextMatch): Element | null =>
    queryAllByLabelText(container, label)[0] ?? null;

export const createByLabelTextQueries = (container: Element, label: TextMatch): BoundQuery =>
    buildQueryVariants(
        `ByLabelText("${label}")`,
        container,
        (c) => queryByLabelText(c, label),
        (c) => queryAllByLabelText(c, label)
    );