import Anu, { Component } from '../../index';
import { render, fireEvent } from '../index';

let innerDidUpdateCalls: Array<{ prevProps: any; prevState: any }>;
let childDidMountCalls: number;

class MountProbe extends Component<{}, {}> {
    componentDidMount(): void {
        childDidMountCalls++;
    }

    render(): any {
        return Anu.createElement('span', null, 'probe');
    }
}

class Inner extends Component<{}, { open: boolean }> {
    state = { open: false };

    componentDidUpdate(prevProps: {}, prevState: { open: boolean }): void {
        innerDidUpdateCalls.push({ prevProps, prevState });
    }

    render(): any {
        return Anu.createElement(
            'div',
            { 'data-testid': 'toggle', onClick: () => this.setState({ open: !this.state.open }) },
            this.state.open ? 'open' : 'closed',
            this.state.open ? Anu.createElement(MountProbe, null) : null
        );
    }
}

class ClassWrapper extends Component<{}, {}> {
    render(): any {
        return Anu.createElement(Inner, null);
    }
}

const FunctionWrapper = (): any => Anu.createElement(Inner, null);

describe('lifecycles of a component updating beneath a clone-path parent', () => {
    beforeEach(() => {
        innerDidUpdateCalls = [];
        childDidMountCalls = 0;
    });

    test('componentDidUpdate fires when the direct parent is a class component on the clone path', () => {
        const { getByText } = render(Anu.createElement('section', null, Anu.createElement(ClassWrapper, null)));
        fireEvent.click(getByText('closed'));

        expect(innerDidUpdateCalls).toHaveLength(1);
    });

    test('componentDidUpdate receives the pre-update state and unchanged props', () => {
        const { getByText } = render(Anu.createElement('section', null, Anu.createElement(ClassWrapper, null)));
        fireEvent.click(getByText('closed'));

        expect(innerDidUpdateCalls[0].prevState).toEqual({ open: false });
        expect(innerDidUpdateCalls[0].prevProps).toBeDefined();
    });

    test('componentDidUpdate fires when the direct parent is a function component on the clone path', () => {
        const { getByText } = render(Anu.createElement('section', null, Anu.createElement(FunctionWrapper, null)));
        fireEvent.click(getByText('closed'));

        expect(innerDidUpdateCalls).toHaveLength(1);
    });

    test('DOM commits and componentDidUpdate fires on every toggle, not just the first', () => {
        const { getByTestId, getByText } = render(Anu.createElement('section', null, Anu.createElement(ClassWrapper, null)));
        fireEvent.click(getByTestId('toggle'));
        fireEvent.click(getByTestId('toggle'));

        expect(getByText('closed')).toBeDefined();
        expect(innerDidUpdateCalls).toHaveLength(2);
    });

    test('a class descendant newly mounted by the update still runs componentDidMount', () => {
        const { getByText } = render(Anu.createElement('section', null, Anu.createElement(ClassWrapper, null)));
        fireEvent.click(getByText('closed'));

        expect(getByText('probe')).toBeDefined();
        expect(childDidMountCalls).toBe(1);
    });
});
