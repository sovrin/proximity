import {Server as Instance} from "ws";
import {uuid} from "./utils";
import contextFactory from './context';
import routerFactory from './router';
import sessionFactory from './session';
import {Server} from './types';

const Prop = {
    ROUTER: 'router',
    SERVER: 'server',
    RUNNING: 'running',
    CONNECTION: 'connection'
};

/**
 *
 * @param config
 */
const factory = (config): Server => {
    const {on, open, close, route, register} = routerFactory();

    const state = {
        [Prop.SERVER]: null,
        [Prop.CONNECTION]: {},
        [Prop.RUNNING]: false,
    };

    /**
     *
     * @param prop
     */
    const update = (prop: string): [any, Function] => ([
        state[prop],
        (value: any) => {
            state[prop] = value
        }
    ]);

    /**
     *
     */
    const listen = (): void => {
        const [, setServer] = update(Prop.SERVER);
        const instance = new Instance(config);

        /**
         *
         * @param socket
         * @param request
         */
        const onConnection = (socket, request): void => {
            const [connections, setConnections] = update(Prop.CONNECTION);
            const session = sessionFactory();
            const {context, close, open} = contextFactory(socket, request, session);

            const {wrap, run, disable} = session;
            const id = uuid();

            connections[id] = context;
            setConnections(connections);

            /**
             *
             * @param message
             */
            const onMessage = (message): void => {
                const context = open(message);

                route(context).catch(console.error);
            };

            /**
             *
             */
            const onClose = (): void => {
                const context = close();

                route(context).then(() => {
                    delete connections[id];

                    setConnections(connections);
                    disable();
                });
            };

            run(() => {
                route(context).catch(console.error);

                socket.on('message', wrap(onMessage));
                socket.on('close', wrap(onClose));
            })
        };

        instance.on('connection', onConnection);
        setServer(instance);
    };

    /**
     *
     */
    const kill = (): void => {
        const [running, setRunning] = update(Prop.RUNNING);
        const [connections, setConnections] = update(Prop.CONNECTION);
        const [server] = update(Prop.SERVER);

        if (!running) {
            return;
        }

        setRunning(false);

        for (const id in connections) {
            if (!connections.hasOwnProperty(id)) {
                continue;
            }

            const connection = connections[id];
            connection.close();

            delete connections[id];
        }

        setConnections(connections);
        server.close();
    };

    return {
        listen,
        kill,
        on,
        open,
        close,
        register
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.04.2020
 * Time: 16:26
 */
export default factory;
