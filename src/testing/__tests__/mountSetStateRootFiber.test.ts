import Anu from '../../index';
import { render } from '../index';

type RepProps = { start: number; grow?: boolean; children?: any };

class Rep extends Anu.Component<RepProps, { n: number }> {
    constructor(props: RepProps) {
        super(props);
        this.state = { n: this.props.start };
    }

    componentDidMount(): void {
        if (this.props.grow) {
            this.setState({ n: 3 });
        }
    }

    render() {
        return Anu.createElement(
            'div',
            { className: 't' },
            Anu.createElement('div', { className: 'g' }, this.props.children),
            Array.from({ length: this.state.n }, (_, i) => i).map((k) =>
                Anu.createElement('div', { key: k, className: 'g' }, Anu.createElement('span', {}, 'x'))
            )
        );
    }
}

const count = (c: Element): number => c.querySelectorAll('.g').length;

const rep = (props: RepProps, label: string) => Anu.createElement(Rep, props, Anu.createElement('span', {}, label));

describe('setState in componentDidMount followed by a root re-render', () => {
    test('keeps the keyed list size across parent re-renders', () => {
        const r = render(rep({ start: 1, grow: true }, 'A'));

        expect(count(r.container)).toBe(4);

        r.rerender(rep({ start: 1, grow: true }, 'A'));

        expect(count(r.container)).toBe(4);

        r.rerender(rep({ start: 1, grow: true }, 'B'));

        expect(count(r.container)).toBe(4);
        expect(r.container.textContent).toBe('Bxxx');
    });

    test('stays stable without a mount-time setState', () => {
        const r = render(rep({ start: 3 }, 'A'));

        r.rerender(rep({ start: 3 }, 'A'));

        expect(count(r.container)).toBe(4);
    });
});
