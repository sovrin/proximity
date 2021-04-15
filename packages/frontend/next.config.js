const {resolve} = require('path');
const {readdirSync, statSync} = require('fs');
const withTM = require('next-transpile-modules');

/**
 *
 * @param path
 * @returns {T}
 */
const getAliases = (path) => {
    /**
     *
     * @param entry
     * @returns {boolean}
     */
    const filter = (entry) => {
        const cursor = resolve(path, entry);

        return statSync(cursor).isDirectory();
    };

    /**
     *
     * @param acc
     * @param entry
     * @returns {*}
     */
    const reduce = (acc, entry) => {
        const alias = `${entry}`;
        acc[alias] = resolve(path, entry);

        return acc;
    };

    return readdirSync(path)
    .filter(filter)
    .reduce(reduce, {})
        ;
};

module.exports = withTM(['@thomann/spectre-react-components'])({
    target: 'serverless',
    future: {
        webpack5: true,
    },
    publicRuntimeConfig: {
        content: {},
    },
    async rewrites () {
        return [
            {
                source: '/:path*',
                destination: '/',
            },
            {
                source: '/api/:path*',
                destination: 'http://localhost:3100/:path*',
            },
            {
                source: '/static/:path*',
                destination: 'http://localhost:3100/static/:path*',
            },
        ];
    },
    webpack (config) {
        config.module.rules.push({
            test: /\.svg/,
            type: 'asset/inline',
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            ...getAliases(resolve(__dirname, 'src')),
        };

        return config;
    },
});
