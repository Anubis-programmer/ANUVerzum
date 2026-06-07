import Anu, { Component } from '../../index';
import { render, act } from '../index';
import { installSyncScheduler, uninstallSyncScheduler } from '../act';

const flushMacroTasks = async (predicate: () => boolean, tries = 20): Promise<void> => {
    for (let i = 0; i < tries; i++) {
        if (predicate()) {
            return;
        }

        await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
};

describe('scheduler', () => {
    test('production scheduler commits via an async macro-task, not requestIdleCallback', async () => {
        uninstallSyncScheduler();

        try {
            const container = document.createElement('div');
            document.body.appendChild(container);

            Anu.render(Anu.createElement('p', {}, 'committed'), container);

            expect(container.textContent).toBe('');

            await flushMacroTasks(() => container.textContent === 'committed');
            expect(container.textContent).toBe('committed');

            container.remove();
        } finally {
            installSyncScheduler();
        }
    });

    test('many setState updates in a single tick all commit to the final state', () => {
        let instance: Rapid | null = null;

        class Rapid extends Component<{}, { n: number }> {
            state = { n: 0 };

            constructor(props: {}) {
                super(props);
                instance = this;
            }

            render() {
                return Anu.createElement('p', {}, `n: ${this.state.n}`);
            }
        }

        const { getByText } = render(Anu.createElement(Rapid, {}));

        act(() => {
            for (let i = 1; i <= 25; i++) {
                instance!.setState({ n: i });
            }
        });

        expect(getByText('n: 25')).toBeDefined();
    });
});
