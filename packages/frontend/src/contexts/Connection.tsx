import React, {createContext, useEffect, useState} from 'react';
import socketFactory, {TimeOutException} from 'services/Socket';

export const Context = createContext(false);
const {Provider} = Context;

export const Status = {
    IDLE: 'idle',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    TIMED_OUT: 'timed_out',
    ERROR: 'error',
}

const Connection = ({children}) => {
    // const {host, protocol} = document.location;
    const [status, setStatus] = useState(Status.IDLE);
    let subscriptions = [];
    let connection;

    const endpoint = 'ws://localhost:3315';
    const stack = [];

    // let destination = (protocol.includes('https'))
    //     ? `wss://${host}`
    //     : `ws://${host}`
    // ;

    /**
     *
     * @param element
     */
    const push = (element) => {
        stack.push(element);

        if (connection) {
            execute();
        }
    };

    /**
     *
     * @param payload
     */
    const send = (payload) => {
        connection.send(payload);
    };

    /**
     *
     */
    const execute = () => {
        while (stack.length) {
            const fn = stack.shift();

            fn();
        }
    };

    /**
     *
     * @param subscriptions
     * @param string
     */
    const listener = (subscriptions, {data: string}) => {
        const {path, data} = JSON.parse(string);

        for (const subscription of subscriptions) {
            if (subscription.path !== path) {
                continue;
            }

            subscription.handle(data);
        }
    };

    /**
     *
     * @param path
     * @param handle
     */
    const subscribe = (path, handle) => {
        const subscription = {
            path,
            handle,
        };

        subscriptions = [...subscriptions, subscription];

        return () => {
            subscriptions = subscriptions.filter(entry => entry !== subscription);
        };
    };

    /**
     *
     * @param path
     * @param data
     */
    const publish = (path, data = {}) => {
        const payload = {
            path,
            data,
        };

        const string = JSON.stringify(payload);

        push(() => {
            send(string);
        });
    };

    /**
     *
     */
    const unbind = (onMessage) => {
        connection.removeEventListener('message', onMessage);
    };

    /**
     *
     */
    const bind = (subscriptions) => {
        /**
         *
         * @param message
         */
        const onMessage = (message) => {
            return listener(subscriptions, message);
        };

        connection.addEventListener('message', onMessage);

        return () => unbind(onMessage);
    };

    const value = {
        subscribe,
        publish,
        status,
        endpoint
    };

    useEffect(() => {
        setStatus(Status.CONNECTING);

        const connect = async () => {
            try {
                connection = await socketFactory(endpoint, 'proximity');

                execute();
                bind(subscriptions);
                setStatus(Status.CONNECTED);
            } catch (e) {
                if (e instanceof TimeOutException) {
                    setStatus(Status.TIMED_OUT);
                } else {
                    setStatus(Status.ERROR);
                }

                console.error(e);
            }
        };

        connect();
    }, []);

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:48
 */
export default Connection;
