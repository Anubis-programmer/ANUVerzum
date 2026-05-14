import { scheduleUpdate } from "../reconciler";

export class Component {
    constructor(props, context) {
        this.props = props || {};
        this.context = { ...this.context, ...context } || {};
        this.state = this.state || {};
    }

    setState(partialState = {}) {
        let partialStateObject = this.state;
        let partialStateCallback;

        if (typeof partialState === 'object') {
            partialStateObject = { ...partialStateObject, ...partialState }
        } else if (typeof partialState === 'function') {
            partialStateCallback = partialState;
        }

        scheduleUpdate(this, partialStateObject, partialStateCallback);
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) { }

    componentWillUnmount() { }
}