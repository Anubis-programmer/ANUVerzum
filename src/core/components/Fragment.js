import { Component } from "./Component";

export class Fragment extends Component {
    render() {
        const { children } = this.props;

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