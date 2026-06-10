const isObject = (object: unknown): object is Record<string, unknown> => object !== null && typeof object === 'object';

export const isNotNullish = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined;

export const deepEqual = (object1: Record<string, any>, object2: Record<string, any>): boolean => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);

        if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
            return false;
        }
    }

    return true;
};

export const shallowEqual = (objectA: Record<string, any>, objectB: Record<string, any>): boolean => {
    if (Object.is(objectA, objectB)) {
        return true;
    }

    if (typeof objectA !== 'object' || objectA === null || typeof objectB !== 'object' || objectB === null) {
        return false;
    }

    const keysA = Object.keys(objectA);
    const keysB = Object.keys(objectB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(objectB, key) || !Object.is(objectA[key], objectB[key])) {
            return false;
        }
    }

    return true;
};

const Utils = {
    deepEqual,
    shallowEqual
};

export default Utils;
