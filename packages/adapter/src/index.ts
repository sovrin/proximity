import WebSocket from "ws";

/**
 *
 * @constructor
 */
const Proximity = () => {
    const CONFIG_LOCALHOST = 'localhost';
    const CONFIG_PORT = 'port';

    const CONTEXT_PROJECT = 'project';

    const state = {
        stack: [],
        ready: false,
        socket: null,
        context: {},
        config: {
            [CONFIG_LOCALHOST]: 'localhost',
            [CONFIG_PORT]: 3315,
        }
    };

    /**
     *
     * @param config
     */
    const config = (config) => {
        state.config = {
            ...state.config,
            ...config,
        };

        return self();
    };

    /**
     *
     */
    const open = async () => {
        state.socket = connect();

        const payload = augment('push/open');

        push(() => {
            send(payload)
        });

        state.socket.onopen = () => {
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

            state.socket.close();
            state.socket = null;
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
        state.socket.send(payload);
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
    const augment = (path, data = {}) => {
        const payload = {
            path,
            data: {
                data,
                context: state.context
            }
        };

        return JSON.stringify(payload);
    };

    /**
     *
     */
    const connect = () => {
        const {localhost, port} = state.config;

        return new WebSocket(`ws://${localhost}:${port}`);
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
     * @param values
     */
    const context = (values) => {
        state.context = {
            ...state.context,
            ...values,
        };

        return self();
    };

    /**
     *
     */
    const self = () => ({
        CONFIG_LOCALHOST,
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