'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (projectRoot, options = {}) => ({
    mode: 'development',
    entry: options.entry ?? path.join(projectRoot, 'src/index.tsx'),
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            ...(options.rules ?? [])
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: options.template ?? path.join(projectRoot, 'index.html')
        }),
        ...(options.plugins ?? [])
    ],
    devServer: {
        port: options.port ?? 3000,
        historyApiFallback: true,
        open: true
    }
});
