module.exports = function () {
    return {
        plugins: [
            [
                require('@babel/plugin-transform-react-jsx'),
                {
                    pragma: 'Anu.createElement',
                    pragmaFrag: 'Anu.Fragment'
                }
            ],
            [
                require('@babel/plugin-transform-typescript'),
                {
                    isTSX: true,
                    jsxPragma: 'Anu'
                }
            ]
        ]
    };
};
