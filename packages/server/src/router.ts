import debug from 'debug';
import {extname, resolve} from "path";
import {Type} from "./context";
import {load, read, stats} from "./utils";
import {Router} from "./types/Router";
import {Context} from "./types/Context";

const log = debug('proximity:router');

/**
 *
 */
const factory = (): Router => {
    const stack = {};

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
    const on = (path: string, handle: Function) => (
        use(handle, path, Type.MESSAGE)
    );

    /**
     *
     * @param handle
     */
    const open = (handle: Function) => (
        use(handle, null, Type.OPEN)
    );

    /**
     *
     * @param handle
     */
    const close = (handle: Function) => (
        use(handle, null, Type.CLOSE)
    );

    /**
     *
     * @param handle
     * @param path
     * @param type
     */
    const use = (handle: Function, path?: string, type = Type.MESSAGE) => {
        const route = cursor(type, path);

        log(`route "${route}" registered`);

        stack[route] = handle;
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
    const route = async (context: Context) => {
        const {type, path} = context;
        const handle = get(type, path);

        if (!handle) {
            return;
        }

        return handle(context);
    };

    /**
     *
     * @param base
     */
    const register = async (base) => {
        base = resolve(base);

        const traverse = async (path) => {
            const absolute = resolve(path);

            const bind = async (name) => {
                const pointer = resolve(absolute, name);

                if ((await stats(pointer)).isDirectory()) {
                    return traverse(pointer);
                }

                if (extname(pointer) !== '.ts') {
                    return;
                }

                const handle = await load(pointer);

                const path = pointer
                    .replace(base + '\\', '')
                    .replace('.ts', '')
                    .replace(/\\/g, '/')
                ;

                on(path, handle);
            };

            for (const file of await read(path)) {
                await bind(file);
            }
        };

        await traverse(base);
    };

    return {
        on,
        open,
        close,
        route,
        register,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 12:12
 */
export default factory;