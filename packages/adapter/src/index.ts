import {payload as payloadFactory} from '@sovrin/proximity-common';
import {IAdapter} from "./Adapter/IAdapter";
import Socket from "./Adapter/Socket";

/**
 *
 * @constructor
 */
const Proximity = () => {
    const CONFIG_HOST = 'host';
    const CONFIG_PORT = 'port';
    const CONFIG_TIMEOUT = 'timeout';
    const CONFIG_DEBUG = 'debug';
    const CONFIG_ADAPTER = 'adapter';

    const CONTEXT_PROJECT = 'project';

    const state = {
        stack: [],
        ready: false,
        context: {},
        config: {
            [CONFIG_HOST]: 'localhost',
            [CONFIG_PORT]: 3315,
            [CONFIG_TIMEOUT]: 1,
            [CONFIG_DEBUG]: false,
            [CONFIG_ADAPTER]: null,
        }
    };

    /**
     *
     * @param config
     */
    const config = (config = null) => {
        if (!config) {
            return state.config;
        }

        state.config = {
            ...state.config,
            ...config,
        };

        return self();
    };

    /**
     *
     * @param context
     */
    const context = (context = null) => {
        if (!context) {
            return state.context;
        }

        state.context = {
            ...state.context,
            ...context,
        };

        return self();
    };

    /**
     *
     */
    const open = async () => {
        state.config.adapter = create();

        if (!state.config.adapter) {
            return;
        }

        const payload = augment('push/open');

        push(() => {
            send(payload)
        });

        state.config.adapter.onopen = () => {
            execute();

            state.ready = true;
        };

        return self();
    };

    /**
     *
     */
    const message = async (message) => {
        const payload = augment('push/data', {message});

        push(() => {
            send(payload);
        });

        return self();
    };

    /**
     *
     */
    const close = async () => {
        const payload = augment('push/close');

        push(() => {
            send(payload);

            state.config.adapter.close();
            state.config.adapter = null;
            state.ready = false;
        });
    };

    /**
     *
     */
    const flag = async (name) => {
        const payload = augment('push/flag', {name});

        push(() => {
            send(payload)
        });
    };

    /**
     *
     * @param payload
     */
    const send = (payload) => {
        const {
            [CONFIG_ADAPTER]: adapter,
            [CONFIG_DEBUG]: debug,
        } = state.config;

        try {
            adapter.flush(payload);
        } catch (e) {
            if (!debug) {
                return;
            }

            console.error(e);
        }
    };

    /**
     *
     * @param element
     */
    const push = (element) => {
        state.stack.push(element);

        if (state.ready) {
            execute();
        }
    };

    /**
     *
     * @param path
     * @param data
     */
    const augment = (path, data = {}) => (
        payloadFactory(path, {
            data,
            context: state.context
        })
    );

    /**
     *
     */
    const create = (): IAdapter => {
        let {
            [CONFIG_HOST]: host,
            [CONFIG_PORT]: port,
            [CONFIG_ADAPTER]: adapter,
            [CONFIG_DEBUG]: debug,
            [CONFIG_TIMEOUT]: timeout,
        } = state.config;

        if (!adapter) {
            adapter = new Socket(timeout);
        }

        try {
            adapter.open(host, port);
        } catch (e) {
            if (!debug) {
                return null;
            }

            console.error(e);
        }

        return adapter;
    };

    /**
     *
     */
    const execute = () => {
        while (state.stack.length) {
            const fn = state.stack.shift();

            fn();
        }
    };

    /**
     *
     */
    const self = () => ({
        CONFIG_HOST,
        CONFIG_PORT,
        CONTEXT_PROJECT,
        config,
        context,
        open,
        message,
        close,
        flag,
    });

    return self();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 20:55
 */
export default Proximity();