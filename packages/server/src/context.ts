import {IContext, IFactory} from "./types";
import {get, set} from "./utils";

export const Type = {
    OPEN: 'open',
    MESSAGE: 'message',
    CLOSE: 'close',
};

const Prop = {
    CONNECTIONS: 'connections',
    TYPE: 'type',
    MESSAGE: 'message',
    DONE: 'done',
    SOCKET: 'socket',
    REQUEST: 'request',
    PATH: 'path',
    DATA: 'data',
    SPACE: 'space',
};

/**
 *
 * @param ws
 * @param req
 * @param connections
 */
const factory = (ws, req, connections): IFactory => {
    const state = {
        [Prop.SOCKET]: ws,
        [Prop.REQUEST]: req,
        [Prop.CONNECTIONS]: connections,
        [Prop.TYPE]: Type.OPEN,
        [Prop.MESSAGE]: null,
        [Prop.DONE]: false,
        [Prop.DATA]: null,
        [Prop.SPACE]: {},
    };

    /**
     *
     */
    const self = (): IContext => ({
        use,
        send,
        broadcast,
        done,
        throw: error,
        message: get(state)([Prop.MESSAGE]),
        type: get(state)([Prop.TYPE]),
        request: get(state)([Prop.REQUEST]),
        path: get(state)([Prop.PATH]),
        data: get(state)([Prop.DATA]),
        finished: get(state)([Prop.DONE]),
    });

    /**
     *
     * @param prop
     * @param deflt
     */
    const use = (prop: string, deflt?: any): [any, Function] => ([
        state[Prop.SPACE][prop] || deflt,
        (value: any) => {
            state[Prop.SPACE][prop] = value
        }
    ]);

    /**
     *
     * @param message
     */
    const open = (message: string): IContext => {
        set(state)
            (Prop.TYPE, Type.MESSAGE)
            (Prop.DONE, false)
            (Prop.MESSAGE, message)
        ;

        try {
            const {path, data} = JSON.parse(message);

            set(state)
                (Prop.PATH, path)
                (Prop.DATA, data)
            ;
        } catch (e) {
            console.error(e);
        }

        return self();
    };

    /**
     *
     */
    const close = (): IContext => {
        set(state)
            (Prop.MESSAGE, null)
            (Prop.DATA, null)
            (Prop.PATH, null)
            (Prop.TYPE, Type.CLOSE)
        ;

        return self();
    };

    /**
     *
     * @param args
     */
    const send = (...args: any): IContext => {
        state[Prop.SOCKET].send(...args);

        return self();
    };

    /**
     *
     * @param args
     */
    const broadcast = (...args: any): IContext => {
        const {connections} = state;

        for (const connection of Object.values(connections)) {
            connection[Prop.SOCKET].send(...args);
        }

        return self();
    };

    /**
     *
     */
    const done = (): IContext => {
        set(state)
            (Prop.DONE, true)
        ;

        return self();
    };

    /**
     *
     * @param err
     */
    const error = (err): void => {
        throw (err);
    };

    return {
        context: self(),
        close,
        open,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.10.2019
 * Time: 21:47
 */
export default factory;