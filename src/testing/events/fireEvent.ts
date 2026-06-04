import { flushEffects } from '../act';

type EventInit = globalThis.EventInit & { target?: Record<string, any> } & Record<string, any>;

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

    if (/^wheel/i.test(eventName)) {
        return new WheelEvent(eventName, opts);
    }

    return new Event(eventName, opts);
};

export const fireEvent = (element: Element, eventName: string, init?: EventInit): boolean => {
    const { target, ...eventInit } = init ?? {};

    if (target) {
        Object.assign(element, target);
    }

    const dispatched = element.dispatchEvent(buildEvent(eventName, eventInit));
    flushEffects();

    return dispatched;
};

fireEvent.click = (el: Element, init?: EventInit) => fireEvent(el, 'click', init);
fireEvent.dblclick = (el: Element, init?: EventInit) => fireEvent(el, 'dblclick', init);
fireEvent.change = (el: Element, init?: EventInit) => fireEvent(el, 'change', init);
fireEvent.input = (el: Element, init?: EventInit) => fireEvent(el, 'input', init);
fireEvent.focus = (el: Element, init?: EventInit) => fireEvent(el, 'focus', init);
fireEvent.blur = (el: Element, init?: EventInit) => fireEvent(el, 'blur', init);
fireEvent.keyDown = (el: Element, init?: EventInit) => fireEvent(el, 'keydown', init);
fireEvent.keyUp = (el: Element, init?: EventInit) => fireEvent(el, 'keyup', init);
fireEvent.keyPress = (el: Element, init?: EventInit) => fireEvent(el, 'keypress', init);
fireEvent.submit = (el: Element, init?: EventInit) => fireEvent(el, 'submit', init);
fireEvent.mouseDown = (el: Element, init?: EventInit) => fireEvent(el, 'mousedown', init);
fireEvent.mouseUp = (el: Element, init?: EventInit) => fireEvent(el, 'mouseup', init);
fireEvent.wheel = (el: Element, init?: EventInit) => fireEvent(el, 'wheel', init);
fireEvent.error = (el: Element, init?: EventInit) => fireEvent(el, 'error', init);
fireEvent.load = (el: Element, init?: EventInit) => fireEvent(el, 'load', init);
fireEvent.abort = (el: Element, init?: EventInit) => fireEvent(el, 'abort', init);