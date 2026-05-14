import { trackStateChange } from '../core/components/AnulyticsProvider';

const createStore = (reducer, initialState, middleware) => {
    const _currentReducer = reducer;
    let _currentState = initialState;
    const _subscribers = [];

    const _validateAction = action => {
        if (!action || typeof action !== 'object' || Array.isArray(action)) {
            throw new Error('Action must be an object!');
        }

        if (typeof action.type === 'undefined') {
            throw new Error('Action must have a type!');
        }
    };

    const _coreDispatch = action => {
        _validateAction(action);
        const prevState = { ..._currentState };
        _currentState = _currentReducer(_currentState, action);
        trackStateChange(prevState, action, _currentState);

        _subscribers.forEach(subscriber => {
            subscriber();
        });
    };

    const getState = () => _currentState;

    const store = {
        getState,
        dispatch: _coreDispatch,
        subscribe: newListener => {
            _subscribers.push(newListener)
        },
        unsubscribe: listenerToRemove => {
            const index = _subscribers.indexOf(listenerToRemove);

            if (index >= 0) {
                _subscribers.splice(index, 1);
            }
        }
    };

    if (middleware) {
        const dispatch = action => store.dispatch(action);
        store.dispatch = middleware({
            dispatch,
            getState
        })(_coreDispatch);
    }

    return store;
};

const applyMiddleware = (...middlewares) => store => {
    if (middlewares.length === 0) {
        return dispatch => dispatch;
    }

    if (middlewares.length === 1) {
        return middlewares[0](store);
    }

    const boundMiddlewares = middlewares.map(middleware => middleware(store));

    return boundMiddlewares.reduce((a, b) => next => a(b(next)));
};

const thunkMiddleware = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    return next(action);
};

const loggingMiddleware = ({ getState }) => next => action => {
    const prevState = { ...getState() };
    const result = next(action);
    const nextState = { ...getState() };

    console.log('\n-----');
    console.log('Previous state:', prevState);
    console.log('Dispatching action:', action);
    console.log('Next state:', nextState);

    return result;
};

const combineReducers = reducers => {
    const reducerKeys = Object.keys(reducers);

    return (state = {}, action) => {
        const nextState = {};
        const keysLength = reducerKeys.length;

        for (let i = 0; i < keysLength; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }

        return nextState;
    }
};

const _generateKey = (args) => {
    const parts = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const type = typeof arg;

        if (arg === null) {
            parts.push('null');
        } else if (arg === undefined) {
            parts.push('undefined');
        } else if (type === 'function') {
            parts.push(`function:${arg.name || 'anonymous'}:${arg.toString().slice(0, 100)}`);
        } else if (type === 'symbol') {
            parts.push(`symbol:${arg.toString()}`);
        } else if (type === 'object') {
            try {
                parts.push(`object:${JSON.stringify(arg)}`);
            } catch (e) {
                parts.push(`object:circular:${Object.prototype.toString.call(arg)}`);
            }
        } else {
            parts.push(`${type}:${arg}`);
        }
    }

    return parts.join('|');
};

const _memoize = (func, maxSize = 100) => {
    const cache = new Map();
    const accessOrder = [];

    return (...args) => {
        const key = _generateKey(args);

        if (cache.has(key)) {
            const index = accessOrder.indexOf(key);
            accessOrder.splice(index, 1);
            accessOrder.push(key);

            return cache.get(key);
        }

        const result = func.apply(null, args);
        cache.set(key, result);
        accessOrder.push(key);

        if (cache.size > maxSize) {
            const oldestKey = accessOrder.shift();
            cache.delete(oldestKey);
        }

        return result;
    };
};

const createSelector = (dependenciesInput, transformation) => {
    const dependencies = Array.isArray(dependenciesInput) ? dependenciesInput : [dependenciesInput];
    const memoizedTransformation = _memoize(transformation);

    return _memoize(input => {
        const params = [];

        dependencies.forEach(func => {
            params.push(func(input));
        });

        return memoizedTransformation.apply(null, params);
    });
};

const store = {
    combineReducers,
    createSelector,
    createStore,
    middleware: {
        applyMiddleware,
        loggingMiddleware,
        thunkMiddleware,
    }
};

export default store;