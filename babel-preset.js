module.exports = function () {
    return {
        plugins: [
            [
                require('@babel/plugin-transform-react-jsx'),
                {
                    pragma: 'Anu.createElement',
                    pragmaFrag: 'Anu.Fragment'
                }
            ]
        ]
    };
};
