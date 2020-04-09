const {resolve} = require('path');
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
const STATIC = resolve(ROOT, 'static');
const COMPONENTS = resolve(SRC, 'components');
const STYLES = resolve(SRC, 'styles');
const HOOKS = resolve(SRC, 'hooks');
const REDUCERS = resolve(SRC, 'reducers');
const CONTEXTS = resolve(SRC, 'contexts');

const utils = resolve(SRC, 'utils.js');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            utils,
            styles: STYLES,
            components: COMPONENTS,
            hooks: HOOKS,
            reducers: REDUCERS,
            contexts: CONTEXTS,
            static: STATIC,
        },
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx'],
        mainFiles: ['index'],
    },
};
