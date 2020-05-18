import {IContext, IFactory, ISession} from "./types";
import {get, set} from "./utils";
import {IPayload} from "@sovrin/proximity-common/src/payload";

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
const factory = (ws, req, session: ISession): IFactory => {
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
    const self = (): IContext => ({
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
    const open = (message: string): IContext => {
        set(state)
            (Prop.TYPE, Type.MESSAGE)
            (Prop.DONE, false)
            (Prop.MESSAGE, message)
        ;

        try {
            const {path, data}: IPayload = JSON.parse(message);

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