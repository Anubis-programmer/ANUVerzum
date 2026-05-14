import { Component } from './Component';
import { AnuElement } from '../elements';

export class Fragment extends Component {
    render(): AnuElement[] {
        const { children } = this.props;

        try {
            if (!children || !children.length) {
                throw new Error('Fragment must have at least one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);

            return [];
        }
    }
}
