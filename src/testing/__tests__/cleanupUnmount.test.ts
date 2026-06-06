import Anu, { Component, createPortal } from '../../index';
import { render } from '../index';

let unmountCount = 0;

class Modal extends Component<{ defaultOpen?: boolean }> {
    handler = (): void => {};

    componentDidMount(): void {
        document.addEventListener('mousedown', this.handler);
    }

    componentWillUnmount(): void {
        unmountCount += 1;
        document.removeEventListener('mousedown', this.handler);
    }

    render(): any {
        const root = document.getElementById('modal-root');

        return createPortal(
            Anu.createElement('div', { className: 'panel' }, 'content'),
            root as Element
        );
    }
}

describe('cleanup() unmounts tracked roots (portal + componentWillUnmount teardown)', () => {
    beforeAll(() => {
        const root = document.createElement('div');
        root.id = 'modal-root';
        document.body.appendChild(root);
    });

    afterAll(() => {
        document.getElementById('modal-root')?.remove();
    });

    test('A: portal panel mounts', () => {
        render(Anu.createElement(Modal, { defaultOpen: true }));
        expect(document.querySelectorAll('.panel')).toHaveLength(1);
    });

    test('B: no stale portal panel leaks from test A', () => {
        render(Anu.createElement(Modal, { defaultOpen: true }));
        expect(document.querySelectorAll('.panel')).toHaveLength(1);
    });

    test('C: componentWillUnmount ran for the previous roots', () => {
        expect(unmountCount).toBe(2);
    });
});
