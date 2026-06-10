import { FunctionComponent, Props } from './elements';
import { shallowEqual } from '../misc/utils';

export type MemoComponent<P extends Props = Props> = FunctionComponent<P> & {
    __isMemo: true;
    __areEqual: (prev: P, next: P) => boolean;
};

export const memo = <P extends Props>(
    Comp: FunctionComponent<P>,
    areEqual: (prev: P, next: P) => boolean = (prev, next) => shallowEqual(prev, next)
): FunctionComponent<P> => {
    const Memoized = ((props: P) => Comp(props)) as MemoComponent<P>;
    Memoized.__isMemo = true;
    Memoized.__areEqual = areEqual;

    return Memoized;
};
