import { Component } from './Component';
import { AnuChild, toChildArray } from '../elements';

export class Fragment extends Component {
    render(): AnuChild[] {
        return toChildArray(this.props.children);
    }
}
