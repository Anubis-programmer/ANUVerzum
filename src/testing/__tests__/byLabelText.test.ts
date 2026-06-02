import Anu from '../../index';
import { render } from '../index';

describe('getByLabelText', () => {
    test('resolves a label/for association without throwing (jsdom has no CSS.escape)', () => {
        const { getByLabelText, getByRole } = render(
            Anu.createElement('div', {},
                Anu.createElement('label', { htmlFor: 'email' }, 'Email'),
                Anu.createElement('input', { id: 'email', type: 'text' })
            )
        );

        const input = getByLabelText('Email');
        expect(input).toBe(getByRole('textbox'));
        expect((input as HTMLInputElement).id).toBe('email');
    });

    test('handles ids that are not valid bare CSS selectors', () => {
        const { getByLabelText } = render(
            Anu.createElement('div', {},
                Anu.createElement('label', { htmlFor: '123:weird.id' }, 'Weird'),
                Anu.createElement('input', { id: '123:weird.id', type: 'text' })
            )
        );

        expect((getByLabelText('Weird') as HTMLInputElement).id).toBe('123:weird.id');
    });

    test('falls back to a nested control when there is no for attribute', () => {
        const { getByLabelText } = render(
            Anu.createElement('label', {},
                'Nested',
                Anu.createElement('input', { type: 'text' })
            )
        );

        expect((getByLabelText('Nested') as HTMLElement).tagName).toBe('INPUT');
    });

    test('queryByLabelText returns null for a for attribute pointing at a missing id', () => {
        const { queryByLabelText } = render(
            Anu.createElement('label', { htmlFor: 'absent' }, 'Ghost')
        );

        expect(queryByLabelText('Ghost')).toBeNull();
    });
});
