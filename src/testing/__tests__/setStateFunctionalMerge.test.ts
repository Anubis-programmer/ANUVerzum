import Anu, { Component } from '../../index';
import { render, fireEvent } from '../index';

type WidgetState = { open: boolean; activeId: string; openPath: string[] };

class Widget extends Component<{ step: number }, WidgetState> {
    state: WidgetState = { open: true, activeId: 'a', openPath: ['root'] };

    render(): any {
        return Anu.createElement(
            'div',
            null,
            Anu.createElement('span', { 'data-testid': 'snapshot' }, JSON.stringify(this.state)),
            Anu.createElement(
                'button',
                { onClick: () => this.setState((prev) => ({ activeId: prev.activeId + 'b' })) },
                'next'
            )
        );
    }
}

describe('functional setState merges its return into prev state (React parity)', () => {
    test('updater returning a partial preserves unrelated state keys', () => {
        const { getByText, getByTestId } = render(Anu.createElement(Widget, { step: 1 }));

        fireEvent.click(getByText('next'));

        expect(JSON.parse(getByTestId('snapshot').textContent!)).toEqual({
            open: true,
            activeId: 'ab',
            openPath: ['root']
        });
    });

    test('consecutive functional updates each see the accumulated previous state', () => {
        const { getByText, getByTestId } = render(Anu.createElement(Widget, { step: 1 }));

        fireEvent.click(getByText('next'));
        fireEvent.click(getByText('next'));

        expect(JSON.parse(getByTestId('snapshot').textContent!)).toEqual({
            open: true,
            activeId: 'abb',
            openPath: ['root']
        });
    });
});
