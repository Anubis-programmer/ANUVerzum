import { Component } from './Component';
import { Props } from '../elements';
import { shallowEqual } from '../../misc/utils';

export abstract class PureComponent<
    P extends Record<string, any> = Props,
    S extends Record<string, any> = Record<string, any>
> extends Component<P, S> {
    shouldComponentUpdate(nextProps: P, nextState: S): boolean {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
}
