import { Component } from './Component';
import { AnuChild, toChildArray } from '../elements';

export class Fragment extends Component {
    render(): AnuChild[] {
        const children = toChildArray(this.props.children);

        try {
            if (!children.length) {
                throw new Error('Fragment must have at least one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);

            return [];
        }
    }
}
