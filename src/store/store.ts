import { trackStateChange } from '../core/components/AnulyticsProvider';

export type Action = { type: string; [key: string]: any };
export type ThunkAction<S = any> = (dispatch: Dispatch, getState: () => S) => any;
export type Dispatch<A extends Action = Action> = (action: A | ThunkAction) => any;
export type Reducer<S = any, A extends Action = Action> = (state: S | undefined, action: A) => S;

export type MiddlewareAPI<S = any, A extends Action = Action> = {
    dispatch: Dispatch<A>;
    getState: () => S;
};

export type Middleware<S = any, A extends Action = Action> = (
    api: MiddlewareAPI<S, A>
) => (next: Dispatch<A>) => (action: A | ThunkAction) => any;

export type Store<S = any, A extends Action = Action> = {
    getState: () => S;
    dispatch: Dispatch<A>;
    subscribe: (listener: () => void) => void;
    unsubscribe: (listener: () => void) => void;
};

const createStore = <S = any, A extends Action = Action>(
    reducer: Reducer<S, A>,
    initialState: S,
    middleware?: Middleware<S, A>
): Store<S, A> => {
    const _currentReducer = reducer;
    let _currentState = initialState;
    const _subscribers: Array<() => void> = [];

    const _validateAction = (action: any): void => {
        if (!action || typeof action !== 'object' || Array.isArray(action)) {
            throw new Error('Action must be an object!');
        }

        if (typeof action.type === 'undefined') {
            throw new Error('Action must have a type!');
        }
    };

    const _coreDispatch: Dispatch<A> = (action: A | ThunkAction): any => {
        _validateAction(action);
        const prevState = { ..._currentState };
        _currentState = _currentReducer(_currentState, action as A);
        trackStateChange(
            prevState as Record<string, any>,
            action as Record<string, any>,
            _currentState as Record<string, any>
        );

        _subscribers.forEach((subscriber) => {
            subscriber();
        });
    };

    const getState = (): S => _currentState;

    const store: Store<S, A> = {
        getState,
        dispatch: _coreDispatch,
        subscribe: (newListener: () => void): void => {
            _subscribers.push(newListener);
        },
        unsubscribe: (listenerToRemove: () => void): void => {
            const index = _subscribers.indexOf(listenerToRemove);

            if (index >= 0) {
                _subscribers.splice(index, 1);
            }
        }
    };

    if (middleware) {
        const dispatch: Dispatch<A> = (action: A | ThunkAction) => store.dispatch(action);
        store.dispatch = (middleware as any)({ dispatch, getState })(_coreDispatch);
    }

    return store;
};

const applyMiddleware =
    <S = any, A extends Action = Action>(...middlewares: Array<Middleware<S, A>>) =>
    (store: MiddlewareAPI<S, A>): ((next: Dispatch<A>) => Dispatch<A>) => {
        if (middlewares.length === 0) {
            return (dispatch: Dispatch<A>) => dispatch;
        }

        if (middlewares.length === 1) {
            return middlewares[0](store);
        }

        const boundMiddlewares = middlewares.map((middleware) => middleware(store));

        return boundMiddlewares.reduce((a, b) => (next: Dispatch<A>) => a(b(next)));
    };

const thunkMiddleware: Middleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        if (typeof action === 'function') {
            return (action as ThunkAction)(dispatch, getState);
        }

        return next(action as Action);
    };

const loggingMiddleware: Middleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        const prevState = { ...getState() };
        const result = next(action as Action);
        const nextState = { ...getState() };

        console.log('\n-----');
        console.log('Previous state:', prevState);
        console.log('Dispatching action:', action);
        console.log('Next state:', nextState);

        return result;
    };

const combineReducers = <S extends Record<string, any> = Record<string, any>>(reducers: {
    [K in keyof S]: Reducer<S[K]>;
}): Reducer<S> => {
    const reducerKeys = Object.keys(reducers) as Array<keyof S>;

    return (state: S = {} as S, action: Action): S => {
        const nextState: Partial<S> = {};
        const keysLength = reducerKeys.length;

        for (let i = 0; i < keysLength; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }

        return nextState as S;
    };
};

const _generateKey = (args: any[]): string => {
    const parts: string[] = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const type = typeof arg;

        if (arg === null) {
            parts.push('null');
        } else if (arg === undefined) {
            parts.push('undefined');
        } else if (type === 'function') {
            const fn = arg as { name?: string; toString(): string };
            parts.push(`function:${fn.name || 'anonymous'}:${fn.toString().slice(0, 100)}`);
        } else if (type === 'symbol') {
            parts.push(`symbol:${(arg as symbol).toString()}`);
        } else if (type === 'object') {
            try {
                parts.push(`object:${JSON.stringify(arg)}`);
            } catch {
                parts.push(`object:circular:${Object.prototype.toString.call(arg)}`);
            }
        } else {
            parts.push(`${type}:${arg}`);
        }
    }

    return parts.join('|');
};

const _memoize = <T extends (...args: any[]) => any>(func: T, maxSize = 100): T => {
    const cache = new Map<string, ReturnType<T>>();
    const accessOrder: string[] = [];

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = _generateKey(args);

        if (cache.has(key)) {
            const index = accessOrder.indexOf(key);
            accessOrder.splice(index, 1);
            accessOrder.push(key);

            return cache.get(key)!;
        }

        const result = func(...args) as ReturnType<T>;
        cache.set(key, result);
        accessOrder.push(key);

        if (cache.size > maxSize) {
            const oldestKey = accessOrder.shift()!;
            cache.delete(oldestKey);
        }

        return result;
    }) as T;
};

export type SelectorFn<TInput = any, TOutput = any> = (input: TInput) => TOutput;

const createSelector = <TInput = any, TOutput = any>(
    dependenciesInput: SelectorFn<TInput> | Array<SelectorFn<TInput>>,
    transformation: (...args: any[]) => TOutput
): SelectorFn<TInput, TOutput> => {
    const dependencies = Array.isArray(dependenciesInput) ? dependenciesInput : [dependenciesInput];
    const memoizedTransformation = _memoize(transformation);

    return _memoize((input: TInput): TOutput => {
        const params: any[] = [];

        dependencies.forEach((func) => {
            params.push(func(input));
        });

        return memoizedTransformation(...params) as TOutput;
    });
};

const store = {
    combineReducers,
    createSelector,
    createStore,
    middleware: {
        applyMiddleware,
        loggingMiddleware,
        thunkMiddleware
    }
};

export default store;
