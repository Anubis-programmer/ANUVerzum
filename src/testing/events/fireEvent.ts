import { flushEffects } from '../act';

type EventInit = globalThis.EventInit & Record<string, any>;

const buildEvent = (eventName: string, init?: EventInit): Event => {
    const opts = { bubbles: true, cancelable: true, ...init };

    if (/^(click|mouse|contextmenu|dblclick)/i.test(eventName)) {
        return new MouseEvent(eventName, opts);
    }

    if (/^key/i.test(eventName)) {
        return new KeyboardEvent(eventName, opts);
    }

    if (/^(focus|blur)/i.test(eventName)) {
        return new FocusEvent(eventName, opts);
    }

    if (/^pointer/i.test(eventName)) {
        return new PointerEvent(eventName, opts);
    }

    return new Event(eventName, opts);
};

export const fireEvent = (element: Element, eventName: string, init?: EventInit): boolean => {
    const dispatched = element.dispatchEvent(buildEvent(eventName, init));
    flushEffects();

    return dispatched;
};

fireEvent.click = (el: Element, init?: MouseEventInit) => fireEvent(el, 'click', init);
fireEvent.dblclick = (el: Element, init?: MouseEventInit) => fireEvent(el, 'dblclick', init);
fireEvent.change = (el: Element, init?: globalThis.EventInit) => fireEvent(el, 'change', init);
fireEvent.input = (el: Element, init?: globalThis.EventInit) => fireEvent(el, 'input', init);
fireEvent.focus = (el: Element, init?: FocusEventInit) => fireEvent(el, 'focus', init);
fireEvent.blur = (el: Element, init?: FocusEventInit) => fireEvent(el, 'blur', init);
fireEvent.keyDown = (el: Element, init?: KeyboardEventInit) => fireEvent(el, 'keydown', init);
fireEvent.keyUp = (el: Element, init?: KeyboardEventInit) => fireEvent(el, 'keyup', init);
fireEvent.keyPress = (el: Element, init?: KeyboardEventInit) => fireEvent(el, 'keypress', init);
fireEvent.submit = (el: Element, init?: globalThis.EventInit) => fireEvent(el, 'submit', init);
fireEvent.mouseDown = (el: Element, init?: MouseEventInit) => fireEvent(el, 'mousedown', init);
fireEvent.mouseUp = (el: Element, init?: MouseEventInit) => fireEvent(el, 'mouseup', init);