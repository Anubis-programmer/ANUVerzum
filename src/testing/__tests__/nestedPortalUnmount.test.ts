import Anu, { Component, createPortal } from '../../index';
import { render } from '../index';

class NestedPortal extends Component {
    render(): any {
        const root = document.getElementById('modal-root');

        return Anu.createElement(
            'span',
            null,
            Anu.createElement('button', null, 't'),
            createPortal(Anu.createElement('div', { className: 'p' }), root as Element)
        );
    }
}

class DeeplyNestedPortal extends Component {
    render(): any {
        const root = document.getElementById('modal-root');

        return Anu.createElement(
            'section',
            null,
            Anu.createElement(
                'div',
                null,
                createPortal(Anu.createElement('div', { className: 'p' }), root as Element)
            )
        );
    }
}

describe('commitDeletion descends into host children to remove nested portals', () => {
    beforeAll(() => {
        const root = document.createElement('div');
        root.id = 'modal-root';
        document.body.appendChild(root);
    });

    afterAll(() => {
        document.getElementById('modal-root')?.remove();
    });

    test('A: portal nested inside a host element mounts', () => {
        render(Anu.createElement(NestedPortal, null));
        expect(document.querySelectorAll('#modal-root .p')).toHaveLength(1);
    });

    test('B: no stale nested portal leaks from test A', () => {
        render(Anu.createElement(NestedPortal, null));
        expect(document.querySelectorAll('#modal-root .p')).toHaveLength(1);
    });

    test('C: portal nested several host levels deep mounts', () => {
        render(Anu.createElement(DeeplyNestedPortal, null));
        expect(document.querySelectorAll('#modal-root .p')).toHaveLength(1);
    });

    test('D: no stale deeply nested portal leaks from test C', () => {
        render(Anu.createElement(DeeplyNestedPortal, null));
        expect(document.querySelectorAll('#modal-root .p')).toHaveLength(1);
    });
});
