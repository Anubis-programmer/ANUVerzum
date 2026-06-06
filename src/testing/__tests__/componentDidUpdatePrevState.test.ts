import Anu, { Component } from '../../index';
import { render, fireEvent } from '../index';

let capturedPrevProps: any;
let capturedPrevState: any;

class Bumper extends Component<{}, { n: number }> {
    state = { n: 0 };

    render(): any {
        return Anu.createElement('button', { onClick: () => this.setState({ n: this.state.n + 1 }) }, 'bump');
    }
}

class Parent extends Component<{ label: string }, { open: boolean }> {
    state = { open: true };

    componentDidUpdate(prevProps: { label: string }, prevState: { open: boolean }): void {
        capturedPrevProps = prevProps;
        capturedPrevState = prevState;
        void prevState.open;
        void prevProps.label;
    }

    render(): any {
        return Anu.createElement('div', null, Anu.createElement(Bumper, null));
    }
}

describe('componentDidUpdate receives defined prevProps/prevState on descendant-triggered re-renders', () => {
    beforeEach(() => {
        capturedPrevProps = undefined;
        capturedPrevState = undefined;
    });

    test('does not throw when a descendant setState re-renders a bailed-out ancestor', () => {
        const { getByText } = render(Anu.createElement(Parent, { label: 'x' }));

        expect(() => fireEvent.click(getByText('bump'))).not.toThrow();
    });

    test('prevState is the defined (unchanged) state of the bailed-out ancestor', () => {
        const { getByText } = render(Anu.createElement(Parent, { label: 'x' }));
        fireEvent.click(getByText('bump'));

        expect(capturedPrevState).toEqual({ open: true });
    });

    test('prevProps is the defined (unchanged) props of the bailed-out ancestor', () => {
        const { getByText } = render(Anu.createElement(Parent, { label: 'x' }));
        fireEvent.click(getByText('bump'));

        expect(capturedPrevProps).toMatchObject({ label: 'x' });
    });
});
