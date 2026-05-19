import { fireEvent } from './fireEvent';

export const userEvent = {
    click: (element: Element): void => {
        fireEvent(element, 'mousedown');
        fireEvent(element, 'mouseup');
        fireEvent(element, 'click');
    },

    dblclick: (element: Element): void => {
        fireEvent(element, 'mousedown');
        fireEvent(element, 'mouseup');
        fireEvent(element, 'click');
        fireEvent(element, 'mousedown');
        fireEvent(element, 'mouseup');
        fireEvent(element, 'click');
        fireEvent(element, 'dblclick');
    },

    type: (element: HTMLInputElement | HTMLTextAreaElement, text: string): void => {
        fireEvent(element, 'focus');

        for (const char of text) {
            fireEvent(element, 'keydown', { key: char });
            fireEvent(element, 'keypress', { key: char });
            element.value += char;
            fireEvent(element, 'input');
            fireEvent(element, 'keyup', { key: char });
        }

        fireEvent(element, 'change');
    },

    clear: (element: HTMLInputElement | HTMLTextAreaElement): void => {
        fireEvent(element, 'focus');
        element.value = '';
        fireEvent(element, 'input');
        fireEvent(element, 'change');
    },

    change: (element: HTMLInputElement | HTMLSelectElement, value: string): void => {
        (element as HTMLInputElement).value = value;
        fireEvent(element, 'input');
        fireEvent(element, 'change');
    },

    submit: (form: HTMLFormElement): void => {
        fireEvent(form, 'submit');
    },

    selectOption: (select: HTMLSelectElement, value: string): void => {
        select.value = value;
        fireEvent(select, 'change');
    },

    tab: (options: { shift?: boolean } = {}): void => {
        const focused = document.activeElement;
        
        if (focused) {
            fireEvent(focused, 'keydown', { key: 'Tab', shiftKey: options.shift ?? false });
        }
    },
};