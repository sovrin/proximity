import {IContext, IRouter} from "./types";
import {Type} from "./context";

/**
 *
 */
const factory = (): IRouter => {
    const stack = {};
    const middlewares: Array<Function> = [];

    /**
     *
     * @param middlewares
     * @param handler
     */
    const chain = (middlewares: Array<Function>, handler: Function) => (context: IContext) => {
        let cursor = 0;

        const targets = [...middlewares, handler].filter(Boolean);

        const next = () => {
            const middleware = targets[cursor++];

            if (!middleware) {
                return;
            }

            try {
                middleware(context, next);
            } catch (error) {
                console.error(error);

                return;
            }
        };

        next();
    };

    /**
     *
     * @param type
     * @param path
     */
    const cursor = (type: string, path: string = null) => {
        type = type.toUpperCase();

        return (!path)
            ? type
            : `${type}:${(path === '') ? '/' : path}`
        ;
    };

    /**
     *
     * @param path
     * @param handle
     */
    const on = (path: string, handle: Function) => {
        const route = cursor(Type.MESSAGE, path);

        if (middlewares.length) {
            handle = chain(middlewares, handle);
        }

        stack[route] = handle;
    };

    /**
     *
     * @param handle
     */
    const open = (handle: Function) => {
        const route = cursor(Type.START);

        if (middlewares.length) {
            handle = chain(middlewares, handle);
        }

        stack[route] = handle;
    };

    /**
     *
     * @param handle
     */
    const close = (handle: Function) => {
        const route = cursor(Type.END);

        if (middlewares.length) {
            handle = chain(middlewares, handle);
        }

        stack[route] = handle;
    };

    /**
     *
     * @param middleware
     */
    const use = (middleware: Function) => {
        middlewares.push(middleware)
    };

    /**
     *
     * @returns {*}
     * @param type
     * @param path
     */
    const get = (type: string, path: string = null) => {
        const route = cursor(type, path);

        return stack[route];
    };

    /**
     *
     * @param context
     */
    const route = async (context: IContext) => {
        const {type, path} = context;
        const handle = get(type, path);

        if (!handle) {
            return;
        }

        return handle(context);
    };

    return {
        on,
        open,
        close,
        use,
        route,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 12:12
 */
export default factory;