import {AsyncLocalStorage} from 'async_hooks';
import {ISession} from "./types";

/**
 *
 */
const factory = () :ISession => {
    const als = new AsyncLocalStorage();
    const store = new Map();

    /**
     *
     * @param key
     */
    const get = (key = null) => {
        const store: any = als.getStore();

        return (key)
            ? store.get(key)
            : store
        ;
    }

    /**
     *
     * @param key
     * @param value
     */
    const set = (key, value) => {
        const store: any = als.getStore();

        store.set(key, value);
    }

    /**
     *
     * @param key
     */
    const unset = (key) => {
        const store: any = als.getStore();

        store.delete(key);
    }

    /**
     *
     * @param fn
     */
    const wrap = (fn) => (...args) => {
        als.enterWith(store);

        return fn(...args);
    }

    /**
     *
     * @param store
     */
    const include = (store) => (
        als.enterWith(store)
    )
    /**
     *
     * @param callback
     */
    const run = (callback) => (
        als.run(store, callback)
    );

    /**
     *
     */
    const disable = () => (
        als.disable()
    );

    return {
        run,
        set,
        unset,
        get,
        include,
        wrap,
        disable,
    };
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.05.2020
 * Time: 20:08
 */
export default factory;