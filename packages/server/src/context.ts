import {get, set} from "./utils";
import {Payload} from "@sovrin/proximity-common";
import {Factory} from "./types/Factory";
import {Context} from "./types/Context";
import {Session} from "./types/Session";

export const Type = {
    OPEN: 'open',
    MESSAGE: 'message',
    CLOSE: 'close',
};

const Prop = {
    TYPE: 'type',
    MESSAGE: 'message',
    DONE: 'done',
    SOCKET: 'socket',
    REQUEST: 'request',
    PATH: 'path',
    DATA: 'data',
    SESSION: 'session',
};

/**
 *
 * @param ws
 * @param req
 * @param session
 */
const factory = (ws, req, session: Session): Factory => {
    const state = {
        [Prop.SOCKET]: ws,
        [Prop.REQUEST]: req,
        [Prop.SESSION]: session,
        [Prop.TYPE]: Type.OPEN,
        [Prop.MESSAGE]: null,
        [Prop.DONE]: false,
        [Prop.DATA]: null,
    };

    /**
     *
     */
    const context = (): Context => ({
        send,
        done,
        throw: error,
        socket: get(state)([Prop.SOCKET]),
        message: get(state)([Prop.MESSAGE]),
        type: get(state)([Prop.TYPE]),
        request: get(state)([Prop.REQUEST]),
        path: get(state)([Prop.PATH]),
        data: get(state)([Prop.DATA]),
        session: get(state)([Prop.SESSION]),
        finished: get(state)([Prop.DONE]),
    });

    /**
     *
     * @param message
     */
    const open = (message: string): Context => {
        set(state)
            (Prop.TYPE, Type.MESSAGE)
            (Prop.DONE, false)
            (Prop.MESSAGE, message)
        ;

        try {
            const {path, data}: Payload = JSON.parse(message);

            set(state)
                (Prop.PATH, path)
                (Prop.DATA, data)
            ;
        } catch (e) {
            console.error(e);
        }

        return context();
    };

    /**
     *
     */
    const close = (): Context => {
        set(state)
            (Prop.MESSAGE, null)
            (Prop.DATA, null)
            (Prop.PATH, null)
            (Prop.TYPE, Type.CLOSE)
        ;

        return context();
    };

    /**
     *
     * @param args
     */
    const send = (...args: any): Context => {
        state[Prop.SOCKET].send(...args);

        return context();
    };

    /**
     *
     */
    const done = (): Context => {
        set(state)
            (Prop.DONE, true)
        ;

        return context();
    };

    /**
     *
     * @param err
     */
    const error = (err): void => {
        throw (err);
    };

    return {
        context: context(),
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