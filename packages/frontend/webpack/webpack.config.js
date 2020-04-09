const {resolve} = require('path');
const {DefinePlugin, NoEmitOnErrorsPlugin, LoaderOptionsPlugin, optimize: {ModuleConcatenationPlugin}} = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
const LIB = resolve(ROOT, 'lib');

const ENTRY = resolve(SRC, 'index.js');

const base = require('./webpack.base');

module.exports = {
    ...base,
    output: {
        path: LIB,
        filename: '[name].js',
        library: 'proximity',
        libraryTarget: 'umd',
    },
    entry: ENTRY,
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
        new ModuleConcatenationPlugin(),
        new NoEmitOnErrorsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
};
