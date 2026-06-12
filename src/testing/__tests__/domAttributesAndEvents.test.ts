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

    test('<textarea> resolves as textbox via its implicit role', () => {
        const { getByRole } = render(Anu.createElement('textarea', { 'aria-label': 'Bio' }));

        expect(getByRole('textbox').tagName.toLowerCase()).toBe('textarea');
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

describe('fireEvent resource/media helpers (error/load/abort)', () => {
    test('fireEvent.error fires an <img> error event handled by onError', () => {
        let errored = false;
        const { container } = render(
            Anu.createElement('img', {
                src: 'broken.png',
                onError: () => {
                    errored = true;
                }
            })
        );

        const img = container.querySelector('img') as HTMLImageElement;
        const returned = fireEvent.error(img);

        expect(errored).toBe(true);
        expect(returned).toBe(true);
    });

    test('fireEvent.load and fireEvent.abort reach their handlers', () => {
        let loaded = false;
        let aborted = false;
        const { container } = render(
            Anu.createElement('img', {
                src: 'pic.png',
                onLoad: () => {
                    loaded = true;
                },
                onAbort: () => {
                    aborted = true;
                }
            })
        );

        const img = container.querySelector('img') as HTMLImageElement;
        fireEvent.load(img);
        fireEvent.abort(img);

        expect(loaded).toBe(true);
        expect(aborted).toBe(true);
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

describe('fireEvent carries non-standard event payloads to the handler', () => {
    test('fireEvent.paste delivers clipboardData to an onPaste handler', () => {
        let pasted = '';
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'text',
                onPaste: (e: ClipboardEvent) => {
                    pasted = e.clipboardData!.getData('text');
                }
            })
        );

        const input = getByRole('textbox');
        const returned = fireEvent.paste(input, {
            clipboardData: { getData: () => '123456' }
        });

        expect(pasted).toBe('123456');
        expect(returned).toBe(true);
    });

    test('the generic fireEvent(el, "paste", …) form also carries clipboardData', () => {
        let pasted = '';
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'text',
                onPaste: (e: ClipboardEvent) => {
                    pasted = e.clipboardData!.getData('text');
                }
            })
        );

        fireEvent(getByRole('textbox'), 'paste', {
            clipboardData: { getData: () => 'abc' }
        });

        expect(pasted).toBe('abc');
    });

    test('fireEvent.drop delivers dataTransfer to an onDrop handler', () => {
        let dropped = '';
        const { getByRole } = render(
            Anu.createElement('button', {
                onDrop: (e: DragEvent) => {
                    dropped = e.dataTransfer!.getData('id');
                }
            })
        );

        fireEvent.drop(getByRole('button'), {
            dataTransfer: { getData: () => 'task-1' }
        });

        expect(dropped).toBe('task-1');
    });

    test('standard init keys are still honoured by the constructor (not shadowed)', () => {
        let seenDelta: number | null = null;
        const { getByRole } = render(
            Anu.createElement('input', {
                type: 'number',
                onWheel: (e: WheelEvent) => {
                    seenDelta = e.deltaY;
                }
            })
        );

        fireEvent.wheel(getByRole('spinbutton'), { deltaY: 42, clipboardData: null });

        expect(seenDelta).toBe(42);
    });
});

describe('fireEvent named helpers for the mouse-move family', () => {
    const cases: Array<[keyof typeof fireEvent, string, string]> = [
        ['mouseEnter', 'onMouseEnter', 'mouseenter'],
        ['mouseLeave', 'onMouseLeave', 'mouseleave'],
        ['mouseOver', 'onMouseOver', 'mouseover'],
        ['mouseOut', 'onMouseOut', 'mouseout'],
        ['mouseMove', 'onMouseMove', 'mousemove']
    ];

    test.each(cases)('fireEvent.%s dispatches a MouseEvent reaching %s', (helper, handler, eventType) => {
        let seenType = '';
        const { getByRole } = render(
            Anu.createElement('button', {
                [handler]: (e: MouseEvent) => {
                    seenType = e.type;
                }
            })
        );

        const returned = (fireEvent[helper] as (el: Element) => boolean)(getByRole('button'));

        expect(seenType).toBe(eventType);
        expect(returned).toBe(true);
    });
});

describe('fireEvent.focusIn / focusOut dispatch the bubbling focus events', () => {
    test('focusIn/focusOut bubble to a listener bound on an ancestor', () => {
        const seen: string[] = [];
        const { container, getByRole } = render(
            Anu.createElement('div', {}, Anu.createElement('button', {}, 'child'))
        );

        const region = container.querySelector('div') as HTMLDivElement;
        region.addEventListener('focusin', (e) => seen.push(e.type));
        region.addEventListener('focusout', (e) => seen.push(e.type));

        const button = getByRole('button');
        const inReturned = fireEvent.focusIn(button);
        const outReturned = fireEvent.focusOut(button);

        expect(seen).toEqual(['focusin', 'focusout']);
        expect(inReturned).toBe(true);
        expect(outReturned).toBe(true);
    });

    test('the non-bubbling focus helper does not trigger a focusin ancestor listener', () => {
        const seen: string[] = [];
        const { container, getByRole } = render(
            Anu.createElement('div', {}, Anu.createElement('button', {}, 'child'))
        );

        const region = container.querySelector('div') as HTMLDivElement;
        region.addEventListener('focusin', (e) => seen.push(e.type));

        fireEvent.focus(getByRole('button'));

        expect(seen).toEqual([]);
    });

    test('focusIn/focusOut construct FocusEvent instances', () => {
        let inEvent: Event | null = null;
        let outEvent: Event | null = null;
        const { container, getByRole } = render(
            Anu.createElement('div', {}, Anu.createElement('button', {}, 'child'))
        );

        const region = container.querySelector('div') as HTMLDivElement;
        region.addEventListener('focusin', (e) => (inEvent = e));
        region.addEventListener('focusout', (e) => (outEvent = e));

        const button = getByRole('button');
        fireEvent.focusIn(button);
        fireEvent.focusOut(button);

        expect(inEvent).toBeInstanceOf(FocusEvent);
        expect(outEvent).toBeInstanceOf(FocusEvent);
    });
});
