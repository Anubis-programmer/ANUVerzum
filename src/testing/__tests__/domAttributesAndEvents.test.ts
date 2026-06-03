import Anu from '../../index';
import { render, fireEvent } from '../index';

describe('camelCase HTML attributes are forwarded to the DOM', () => {
    test('inputMode / autoComplete reach the element as their DOM attributes', () => {
        const { getByRole } = render(
            Anu.createElement('input', { inputMode: 'email', autoComplete: 'email' })
        );

        const el = getByRole('textbox') as HTMLInputElement;

        expect(el.getAttribute('inputmode')).toBe('email');
        expect(el.getAttribute('autocomplete')).toBe('email');
    });

    test('tabIndex / spellCheck / maxLength are lowercased to their DOM names', () => {
        const { getByRole } = render(
            Anu.createElement('input', { tabIndex: 2, spellCheck: false, maxLength: 10 })
        );

        const el = getByRole('textbox') as HTMLInputElement;

        expect(el.getAttribute('tabindex')).toBe('2');
        expect(el.getAttribute('spellcheck')).toBe('false');
        expect(el.getAttribute('maxlength')).toBe('10');
    });

    test('hyphenated camelCase exceptions (httpEquiv) map correctly', () => {
        const { container } = render(
            Anu.createElement('meta', { httpEquiv: 'refresh', content: '30' })
        );

        const meta = container.querySelector('meta') as HTMLMetaElement;

        expect(meta.getAttribute('http-equiv')).toBe('refresh');
    });

    test('lowercase, hyphenated and className/htmlFor props still work', () => {
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'text',
                placeholder: 'Name',
                className: 'field',
                'aria-required': 'true'
            })
        );

        const el = getByRole('textbox') as HTMLInputElement;

        expect(el.placeholder).toBe('Name');
        expect(el.getAttribute('class')).toBe('field');
        expect(el.getAttribute('aria-required')).toBe('true');
    });
});

describe('getByRole implicit-role mapping for native inputs', () => {
    test('<input type="number"> resolves as spinbutton, not textbox', () => {
        const { getByRole, queryByRole } = render(Anu.createElement('input', { type: 'number' }));

        expect((getByRole('spinbutton') as HTMLInputElement).type).toBe('number');
        expect(queryByRole('textbox')).toBeNull();
    });

    test('<input type="range"> resolves as slider', () => {
        const { getByRole } = render(Anu.createElement('input', { type: 'range' }));

        expect((getByRole('slider') as HTMLInputElement).type).toBe('range');
    });

    test('checkbox and radio resolve to their roles', () => {
        const { getByRole } = render(
            Anu.createElement('div', {},
                Anu.createElement('input', { type: 'checkbox' }),
                Anu.createElement('input', { type: 'radio' })
            )
        );

        expect((getByRole('checkbox') as HTMLInputElement).type).toBe('checkbox');
        expect((getByRole('radio') as HTMLInputElement).type).toBe('radio');
    });

    test('text-like inputs still resolve as textbox', () => {
        const { getByRole } = render(Anu.createElement('input', { type: 'email' }));

        expect((getByRole('textbox') as HTMLInputElement).type).toBe('email');
    });
});

describe('fireEvent applies the { target } init before dispatch', () => {
    test('input value is set from { target: { value } } and read by the handler', () => {
        let seen = '';
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'text',
                onInput: (e: Event) => {
                    seen = (e.target as HTMLInputElement).value;
                }
            })
        );

        const input = getByRole('textbox') as HTMLInputElement;
        fireEvent.input(input, { target: { value: 'xyz' } });

        expect(input.value).toBe('xyz');
        expect(seen).toBe('xyz');
    });

    test('firing without a target option leaves a manually-set value intact', () => {
        const { getByRole } = render(Anu.createElement('input', { type: 'text' }));
        const input = getByRole('textbox') as HTMLInputElement;

        input.value = 'manual';
        fireEvent.input(input);

        expect(input.value).toBe('manual');
    });
});

describe('fireEvent.wheel dispatches a WheelEvent', () => {
    test('wheel handler receives the deltaY from the init', () => {
        let seenDelta: number | null = null;
        let seenType = '';
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'number',
                onWheel: (e: WheelEvent) => {
                    seenDelta = e.deltaY;
                    seenType = e.type;
                }
            })
        );

        const returned = fireEvent.wheel(getByRole('spinbutton'), { deltaY: -100 });

        expect(seenType).toBe('wheel');
        expect(seenDelta).toBe(-100);
        expect(returned).toBe(true);
    });
});
