import { AnuElement, ElementType } from '../core/elements';

export type TextMatch = string | RegExp;

export interface ByRoleOptions {
    name?: TextMatch;
}

export type QueryFn = (container: Element) => Element | null;
export type QueryAllFn = (container: Element) => Element[];

export interface BoundQuery {
    get: () => Element;
    query: () => Element | null;
    find: () => Promise<Element>;
    getAll: () => Element[];
    queryAll: () => Element[];
    findAll: () => Promise<Element[]>;
}

export interface BoundQueries {
    getByText(text: TextMatch): Element;
    queryByText(text: TextMatch): Element | null;
    findByText(text: TextMatch): Promise<Element>;
    getAllByText(text: TextMatch): Element[];
    queryAllByText(text: TextMatch): Element[];
    findAllByText(text: TextMatch): Promise<Element[]>;

    getByRole(role: string, options?: ByRoleOptions): Element;
    queryByRole(role: string, options?: ByRoleOptions): Element | null;
    findByRole(role: string, options?: ByRoleOptions): Promise<Element>;
    getAllByRole(role: string, options?: ByRoleOptions): Element[];
    queryAllByRole(role: string, options?: ByRoleOptions): Element[];
    findAllByRole(role: string, options?: ByRoleOptions): Promise<Element[]>;

    getByLabelText(label: TextMatch): Element;
    queryByLabelText(label: TextMatch): Element | null;
    findByLabelText(label: TextMatch): Promise<Element>;

    getByPlaceholderText(placeholder: TextMatch): Element;
    queryByPlaceholderText(placeholder: TextMatch): Element | null;
    findByPlaceholderText(placeholder: TextMatch): Promise<Element>;

    getByTestId(id: string): Element;
    queryByTestId(id: string): Element | null;
    findByTestId(id: string): Promise<Element>;

    getByTitle(title: TextMatch): Element;
    queryByTitle(title: TextMatch): Element | null;
    findByTitle(title: TextMatch): Promise<Element>;

    getByAltText(alt: TextMatch): Element;
    queryByAltText(alt: TextMatch): Element | null;
    findByAltText(alt: TextMatch): Promise<Element>;
}

export interface RenderOptions {
    container?: Element;
    baseElement?: Element;
    wrapper?: ElementType;
}

export interface RenderResult extends BoundQueries {
    container: Element;
    baseElement: Element;
    rerender(ui: AnuElement): void;
    unmount(): void;
}

export interface WaitForOptions {
    timeout?: number;
    interval?: number;
}
