import {Server} from "ws";
import {uuid} from "./utils";
import {IServer} from "./types";
import contextFactory from './context';
import routerFactory from './router';

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
const factory = (config): IServer => {
    const {use, on, route, open, close} = routerFactory();

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
        const instance = new Server(config);

        /**
         *
         * @param socket
         * @param request
         */
        const onConnection = (socket, request): void => {
            const [connections, setConnections] = update(Prop.CONNECTION);
            const {context, close, open} = contextFactory(socket, request, connections);
            const id = uuid();

            connections[id] = context;
            setConnections(connections);

            route(context).catch(console.error);

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
                });
            };

            socket.on('message', onMessage);
            socket.on('close', onClose);
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
        use,
        on,
        open,
        close,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.04.2020
 * Time: 16:26
 */
export default factory;
