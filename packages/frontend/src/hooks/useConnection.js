import {useEffect, useContext} from 'react';
import {Context} from 'contexts/Connection';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:48
 */
export default (subs = []) => {
    const socket = useContext(Context);
    const subscriptions = [];

    /**
     *
     * @param string
     */
    const listener = ({data: string}) => {
        const {evt, data} = JSON.parse(string);

        subscriptions
            .filter(({event}) => event === evt)
            .map(({handle}) => handle(data))
        ;
    };

    /**
     *
     */
    const unbind = () => {
        socket.onmessage = null;
    };

    /**
     *
     */
    const bind = () => {
        socket.onmessage = listener;

        return unbind;
    };

    /**
     *
     * @returns {number}
     * @param entry
     */
    const subscribe = (entry) => {
        const [event, handle] = entry;
        const payload = {
            evt: 'subscribe',
            data: event,
        };

        const string = JSON.stringify(payload);

        const send = () => {
            subscriptions.push({event, handle});
            socket.send(string);
        };

        if (!socket || socket.readyState === 0) {

            return setTimeout(() => send(), 1500);
        }

        send();
    };

    const publish = (event, data) => {
        const payload = {
            evt: event,
            data,
        };

        const string = JSON.stringify(payload);

        socket.send(string);
    };

    useEffect(() => {
        subs.map(subscribe);

        return bind();
    }, []);

    return {
        publish,
    };
}
