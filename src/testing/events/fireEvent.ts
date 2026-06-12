import { flushEffects } from '../act';

type EventInit = globalThis.EventInit & { target?: Record<string, any> } & Record<string, any>;

const buildEvent = (eventName: string, init?: EventInit): Event => {
    const opts = { bubbles: true, cancelable: true, ...init };

    let event: Event;

    if (/^(click|mouse|contextmenu|dblclick|drag|drop)/i.test(eventName)) {
        event = new MouseEvent(eventName, opts);
    } else if (/^key/i.test(eventName)) {
        event = new KeyboardEvent(eventName, opts);
    } else if (/^(focus|blur)/i.test(eventName)) {
        event = new FocusEvent(eventName, opts);
    } else if (/^pointer/i.test(eventName)) {
        event = new PointerEvent(eventName, opts);
    } else if (/^wheel/i.test(eventName)) {
        event = new WheelEvent(eventName, opts);
    } else {
        event = new Event(eventName, opts);
    }

    if (init) {
        for (const key of Object.keys(init)) {
            if (!(key in event)) {
                Object.defineProperty(event, key, {
                    value: init[key],
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            }
        }
    }

    return event;
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
fireEvent.focusIn = (el: Element, init?: EventInit) => fireEvent(el, 'focusin', init);
fireEvent.focusOut = (el: Element, init?: EventInit) => fireEvent(el, 'focusout', init);
fireEvent.keyDown = (el: Element, init?: EventInit) => fireEvent(el, 'keydown', init);
fireEvent.keyUp = (el: Element, init?: EventInit) => fireEvent(el, 'keyup', init);
fireEvent.keyPress = (el: Element, init?: EventInit) => fireEvent(el, 'keypress', init);
fireEvent.submit = (el: Element, init?: EventInit) => fireEvent(el, 'submit', init);
fireEvent.mouseDown = (el: Element, init?: EventInit) => fireEvent(el, 'mousedown', init);
fireEvent.mouseUp = (el: Element, init?: EventInit) => fireEvent(el, 'mouseup', init);
fireEvent.mouseEnter = (el: Element, init?: EventInit) => fireEvent(el, 'mouseenter', init);
fireEvent.mouseLeave = (el: Element, init?: EventInit) => fireEvent(el, 'mouseleave', init);
fireEvent.mouseOver = (el: Element, init?: EventInit) => fireEvent(el, 'mouseover', init);
fireEvent.mouseOut = (el: Element, init?: EventInit) => fireEvent(el, 'mouseout', init);
fireEvent.mouseMove = (el: Element, init?: EventInit) => fireEvent(el, 'mousemove', init);
fireEvent.wheel = (el: Element, init?: EventInit) => fireEvent(el, 'wheel', init);
fireEvent.paste = (el: Element, init?: EventInit) => fireEvent(el, 'paste', init);
fireEvent.copy = (el: Element, init?: EventInit) => fireEvent(el, 'copy', init);
fireEvent.cut = (el: Element, init?: EventInit) => fireEvent(el, 'cut', init);
fireEvent.drag = (el: Element, init?: EventInit) => fireEvent(el, 'drag', init);
fireEvent.dragStart = (el: Element, init?: EventInit) => fireEvent(el, 'dragstart', init);
fireEvent.dragEnd = (el: Element, init?: EventInit) => fireEvent(el, 'dragend', init);
fireEvent.dragEnter = (el: Element, init?: EventInit) => fireEvent(el, 'dragenter', init);
fireEvent.dragLeave = (el: Element, init?: EventInit) => fireEvent(el, 'dragleave', init);
fireEvent.dragOver = (el: Element, init?: EventInit) => fireEvent(el, 'dragover', init);
fireEvent.drop = (el: Element, init?: EventInit) => fireEvent(el, 'drop', init);
fireEvent.error = (el: Element, init?: EventInit) => fireEvent(el, 'error', init);
fireEvent.load = (el: Element, init?: EventInit) => fireEvent(el, 'load', init);
fireEvent.abort = (el: Element, init?: EventInit) => fireEvent(el, 'abort', init);