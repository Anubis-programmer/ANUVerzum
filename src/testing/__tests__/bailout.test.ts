import Anu, { Component, PureComponent, memo } from '../../index';
import { render, fireEvent } from '../index';

let childRenders = 0;
let childDidUpdate = 0;

class Child extends Component<{ value: string }> {
    componentDidUpdate(): void {
        childDidUpdate++;
    }

    render(): any {
        childRenders++;

        return Anu.createElement('span', null, this.props.value);
    }
}

class ScuChild extends Component<{ value: string }> {
    shouldComponentUpdate(nextProps: { value: string }): boolean {
        return nextProps.value !== this.props.value;
    }

    componentDidUpdate(): void {
        childDidUpdate++;
    }

    render(): any {
        childRenders++;

        return Anu.createElement('span', null, this.props.value);
    }
}

class Parent extends Component<{ ChildType: any }, { tick: number }> {
    state = { tick: 0 };

    render(): any {
        return Anu.createElement(
            'div',
            null,
            Anu.createElement('button', { onClick: () => this.setState({ tick: this.state.tick + 1 }) }, 'tick'),
            Anu.createElement(this.props.ChildType, { value: 'stable' })
        );
    }
}

describe('shouldComponentUpdate is honoured', () => {
    beforeEach(() => {
        childRenders = 0;
        childDidUpdate = 0;
    });

    test('a child that returns false skips re-render when the parent re-renders', () => {
        const { getByText } = render(Anu.createElement(Parent, { ChildType: ScuChild }));
        expect(childRenders).toBe(1);

        fireEvent.click(getByText('tick'));
        fireEvent.click(getByText('tick'));

        expect(childRenders).toBe(1);
    });

    test('componentDidUpdate does not fire when shouldComponentUpdate returns false', () => {
        const { getByText } = render(Anu.createElement(Parent, { ChildType: ScuChild }));
        fireEvent.click(getByText('tick'));

        expect(childDidUpdate).toBe(0);
    });

    test('a plain child without the hook still re-renders on every parent update', () => {
        const { getByText } = render(Anu.createElement(Parent, { ChildType: Child }));
        expect(childRenders).toBe(1);

        fireEvent.click(getByText('tick'));

        expect(childRenders).toBe(2);
    });

    test('the preserved subtree keeps its committed DOM', () => {
        const { getByText, container } = render(Anu.createElement(Parent, { ChildType: ScuChild }));
        fireEvent.click(getByText('tick'));

        expect(container.querySelector('span')!.textContent).toBe('stable');
    });
});

class PureChild extends PureComponent<{ value: string }> {
    render(): any {
        childRenders++;

        return Anu.createElement('span', null, this.props.value);
    }
}

class PureParent extends Component<{}, { tick: number; value: string }> {
    state = { tick: 0, value: 'stable' };

    render(): any {
        return Anu.createElement(
            'div',
            null,
            Anu.createElement('button', { onClick: () => this.setState({ tick: this.state.tick + 1 }) }, 'tick'),
            Anu.createElement('button', { onClick: () => this.setState({ value: 'changed' }) }, 'change'),
            Anu.createElement(PureChild, { value: this.state.value })
        );
    }
}

describe('PureComponent shallow-compares props', () => {
    beforeEach(() => {
        childRenders = 0;
    });

    test('skips re-render when shallow props are unchanged', () => {
        const { getByText } = render(Anu.createElement(PureParent, {}));
        expect(childRenders).toBe(1);

        fireEvent.click(getByText('tick'));

        expect(childRenders).toBe(1);
    });

    test('re-renders when a prop value actually changes', () => {
        const { getByText, container } = render(Anu.createElement(PureParent, {}));
        fireEvent.click(getByText('change'));

        expect(childRenders).toBe(2);
        expect(container.querySelector('span')!.textContent).toBe('changed');
    });
});

const MemoLeaf = memo((props: { value: string }) => {
    childRenders++;

    return Anu.createElement('span', null, props.value);
});

class MemoParent extends Component<{}, { tick: number; value: string }> {
    state = { tick: 0, value: 'stable' };

    render(): any {
        return Anu.createElement(
            'div',
            null,
            Anu.createElement('button', { onClick: () => this.setState({ tick: this.state.tick + 1 }) }, 'tick'),
            Anu.createElement('button', { onClick: () => this.setState({ value: 'changed' }) }, 'change'),
            Anu.createElement(MemoLeaf, { value: this.state.value })
        );
    }
}

describe('memo bails out function components', () => {
    beforeEach(() => {
        childRenders = 0;
    });

    test('skips re-render when props are shallow-equal', () => {
        const { getByText } = render(Anu.createElement(MemoParent, {}));
        expect(childRenders).toBe(1);

        fireEvent.click(getByText('tick'));

        expect(childRenders).toBe(1);
    });

    test('re-renders when a prop changes', () => {
        const { getByText, container } = render(Anu.createElement(MemoParent, {}));
        fireEvent.click(getByText('change'));

        expect(childRenders).toBe(2);
        expect(container.querySelector('span')!.textContent).toBe('changed');
    });

    test('a custom comparator controls the bail-out', () => {
        const always = memo(
            (props: { value: string }) => {
                childRenders++;

                return Anu.createElement('span', null, props.value);
            },
            () => true
        );

        class Host extends Component<{}, { value: string }> {
            state = { value: 'a' };

            render(): any {
                return Anu.createElement(
                    'div',
                    null,
                    Anu.createElement('button', { onClick: () => this.setState({ value: 'b' }) }, 'go'),
                    Anu.createElement(always, { value: this.state.value })
                );
            }
        }

        const { getByText } = render(Anu.createElement(Host, {}));
        fireEvent.click(getByText('go'));

        expect(childRenders).toBe(1);
    });
});
