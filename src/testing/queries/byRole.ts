import { buildQueryVariants } from './queryBuilder';
import type { TextMatch, ByRoleOptions, BoundQuery } from '../types';

const IMPLICIT_ROLES: Record<string, string[]> = {
    button: ['button'],
    link: ['a'],
    heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    combobox: ['select'],
    img: ['img'],
    list: ['ul', 'ol'],
    listitem: ['li'],
    form: ['form'],
    navigation: ['nav'],
    main: ['main'],
    banner: ['header'],
    contentinfo: ['footer'],
};

const INPUT_TYPE_ROLES: Record<string, string> = {
    text: 'textbox',
    search: 'textbox',
    email: 'textbox',
    tel: 'textbox',
    url: 'textbox',
    number: 'spinbutton',
    range: 'slider',
    checkbox: 'checkbox',
    radio: 'radio',
    button: 'button',
    submit: 'button',
    reset: 'button',
    image: 'button',
};

const getAccessibleName = (el: Element): string => {
    const ariaLabel = el.getAttribute('aria-label');

    if (ariaLabel) {
        return ariaLabel;
    }

    const labelledBy = el.getAttribute('aria-labelledby');

    if (labelledBy) {
        const labelEl = document.getElementById(labelledBy);

        if (labelEl) {
            return (labelEl.textContent ?? '').trim();
        }
    }

    return (el.textContent ?? '').trim();
};

const nameMatches = (el: Element, name: TextMatch): boolean => {
    const accessible = getAccessibleName(el);

    return name instanceof RegExp ? name.test(accessible) : accessible === name;
};

const hasRole = (el: Element, role: string): boolean => {
    if (el.getAttribute('role') === role) {
        return true;
    }

    if (el.tagName.toLowerCase() === 'input') {
        const type = (el.getAttribute('type') ?? 'text').toLowerCase();

        return INPUT_TYPE_ROLES[type] === role;
    }

    const selectors = IMPLICIT_ROLES[role];

    if (!selectors) {
        return false;
    }

    return selectors.some((sel) => el.matches(sel));
};

const queryAllByRole = (container: Element, role: string, options?: ByRoleOptions): Element[] => {
    const results: Element[] = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode() as Element | null;

    while (node) {
        if (hasRole(node, role) && (!options?.name || nameMatches(node, options.name))) {
            results.push(node);
        }

        node = walker.nextNode() as Element | null;
    }
    
    return results;
};

const queryByRole = (container: Element, role: string, options?: ByRoleOptions): Element | null =>
    queryAllByRole(container, role, options)[0] ?? null;

export const createByRoleQueries = (container: Element, role: string, options?: ByRoleOptions): BoundQuery =>
    buildQueryVariants(
        `ByRole("${role}"${options?.name ? `, { name: "${options.name}" }` : ''})`,
        container,
        (c) => queryByRole(c, role, options),
        (c) => queryAllByRole(c, role, options)
    );