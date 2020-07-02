const {resolve} = require('path');
const {NoEmitOnErrorsPlugin, HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
const ENTRY = resolve(SRC, 'dev.js');
const DIST = resolve(ROOT, 'dist');
const ASSETS = resolve(SRC, 'assets');

const base = require('./webpack.base');

module.exports = {
    ...base,
    entry: ENTRY,
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
    devServer: {
        contentBase: DIST,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: ASSETS, to: DIST },
            ],
        }),
        new HtmlWebpackPlugin({
            template: resolve(SRC, 'index.html'),
            title: 'proximity',
        }),
        new NoEmitOnErrorsPlugin(),
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
    ],
};
