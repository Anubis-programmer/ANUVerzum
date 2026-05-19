import { createByTextQueries } from './byText';
import { createByRoleQueries } from './byRole';
import { createByLabelTextQueries } from './byLabelText';
import { createByPlaceholderTextQueries } from './byPlaceholderText';
import { createByTestIdQueries } from './byTestId';
import { createByTitleQueries } from './byTitle';
import { createByAltTextQueries } from './byAltText';
import type { BoundQueries, TextMatch, ByRoleOptions } from '../types';

export const buildQueries = (container: Element): BoundQueries => ({
    getByText: (text: TextMatch) => createByTextQueries(container, text).get(),
    queryByText: (text: TextMatch) => createByTextQueries(container, text).query(),
    findByText: (text: TextMatch) => createByTextQueries(container, text).find(),
    getAllByText: (text: TextMatch) => createByTextQueries(container, text).getAll(),
    queryAllByText: (text: TextMatch) => createByTextQueries(container, text).queryAll(),
    findAllByText: (text: TextMatch) => createByTextQueries(container, text).findAll(),

    getByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).get(),
    queryByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).query(),
    findByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).find(),
    getAllByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).getAll(),
    queryAllByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).queryAll(),
    findAllByRole: (role: string, opts?: ByRoleOptions) => createByRoleQueries(container, role, opts).findAll(),

    getByLabelText: (label: TextMatch) => createByLabelTextQueries(container, label).get(),
    queryByLabelText: (label: TextMatch) => createByLabelTextQueries(container, label).query(),
    findByLabelText: (label: TextMatch) => createByLabelTextQueries(container, label).find(),

    getByPlaceholderText: (ph: TextMatch) => createByPlaceholderTextQueries(container, ph).get(),
    queryByPlaceholderText: (ph: TextMatch) => createByPlaceholderTextQueries(container, ph).query(),
    findByPlaceholderText: (ph: TextMatch) => createByPlaceholderTextQueries(container, ph).find(),

    getByTestId: (id: string) => createByTestIdQueries(container, id).get(),
    queryByTestId: (id: string) => createByTestIdQueries(container, id).query(),
    findByTestId: (id: string) => createByTestIdQueries(container, id).find(),

    getByTitle: (title: TextMatch) => createByTitleQueries(container, title).get(),
    queryByTitle: (title: TextMatch) => createByTitleQueries(container, title).query(),
    findByTitle: (title: TextMatch) => createByTitleQueries(container, title).find(),

    getByAltText: (alt: TextMatch) => createByAltTextQueries(container, alt).get(),
    queryByAltText: (alt: TextMatch) => createByAltTextQueries(container, alt).query(),
    findByAltText: (alt: TextMatch) => createByAltTextQueries(container, alt).find(),
});