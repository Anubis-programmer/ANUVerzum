const asyncMap = (coll, iteratee, callback) => {
    const collection = Array.isArray(coll) ? coll : [coll];
    const collLastIndex = collection.length - 1;
    const results = [];

    for (let i = 0; i < collection.length; i++) {
        (index => {
            const result = iteratee(collection[index]);
            results.push(result);

            if (index === collLastIndex) {
                callback(results);
            }
        })(i);
    }
};

const Async = {
    map: asyncMap
};

export default Async;