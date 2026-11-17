import Anu from '../../index';
import { render, fireEvent, userEvent } from '../index';

describe('event prop → DOM event name mapping', () => {
    test('onDoubleClick fires on a native dblclick', () => {
        const onDoubleClick = jest.fn();
        const { container } = render(Anu.createElement('div', { onDoubleClick }, 'double-click me'));

        fireEvent.dblclick(container.querySelector('div') as Element);

        expect(onDoubleClick).toHaveBeenCalledTimes(1);
        expect(onDoubleClick.mock.calls[0][0].type).toBe('dblclick');
    });

    test('onDoubleClick fires through userEvent.dblclick', () => {
        const onDoubleClick = jest.fn();
        const { container } = render(Anu.createElement('div', { onDoubleClick }));

        userEvent.dblclick(container.querySelector('div') as Element);

        expect(onDoubleClick).toHaveBeenCalledTimes(1);
    });

    test('onDoubleClick does not listen for the non-existent doubleclick event', () => {
        const onDoubleClick = jest.fn();
        const { container } = render(Anu.createElement('div', { onDoubleClick }));

        (container.querySelector('div') as Element).dispatchEvent(new Event('doubleclick'));

        expect(onDoubleClick).not.toHaveBeenCalled();
    });

    test('replacing the onDoubleClick handler swaps the dblclick listener', () => {
        const first = jest.fn();
        const second = jest.fn();
        const { container, rerender } = render(Anu.createElement('div', { onDoubleClick: first }));

        rerender(Anu.createElement('div', { onDoubleClick: second }));
        fireEvent.dblclick(container.querySelector('div') as Element);

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);
    });

    test('removing onDoubleClick removes the dblclick listener', () => {
        const onDoubleClick = jest.fn();
        const { container, rerender } = render(Anu.createElement('div', { onDoubleClick }));

        rerender(Anu.createElement('div', {}));
        fireEvent.dblclick(container.querySelector('div') as Element);

        expect(onDoubleClick).not.toHaveBeenCalled();
    });

    test('regular event props still map to their lowercased name', () => {
        const onClick = jest.fn();
        const onPointerDown = jest.fn();
        const { container } = render(Anu.createElement('button', { onClick, onPointerDown }));
        const button = container.querySelector('button') as Element;

        fireEvent.click(button);
        button.dispatchEvent(new Event('pointerdown'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onPointerDown).toHaveBeenCalledTimes(1);
    });
});
