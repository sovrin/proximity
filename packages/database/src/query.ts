import {hasProperty, isNumber, isRegexp} from "~utils";
import {Query} from "~types/Query";

/**
 *
 * @param entries
 */
const factory = (entries): Query => {
    const state = {
        skip: 0,
        limit: entries.length
    }

    /**
     *
     * @param fn
     */
    const apply = (fn) => {
        entries = entries.filter(fn);

        return context();
    }

    /**
     *
     */
    const context = (): Query => ({
        eq,
        neq,
        gt,
        gte,
        lt,
        lte,
        skip,
        limit,
        get,
    })

    /**
     *
     * @param key
     * @param value
     */
    const eq = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            if (isRegexp(value)) {
                return entry[key].match(value) !== null;
            }

            return entry[key] === value;
        }

        return false;
    });

    /**
     *
     * @param key
     * @param value
     */
    const neq = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            if (isRegexp(value)) {
                return entry[key].match(value) === null;
            }

            return entry[key] !== value;
        }

        return true;
    });

    /**
     *
     * @param key
     * @param value
     */
    const gt = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            const cursor = entry[key];

            if (isNumber(cursor)) {
                return cursor > value;
            }
        }

        return false;
    });

    /**
     *
     * @param key
     * @param value
     */
    const gte = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            const cursor = entry[key];

            if (isNumber(cursor)) {
                return cursor >= value;
            }
        }

        return false;
    });


    /**
     *
     * @param key
     * @param value
     */
    const lt = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            const cursor = entry[key];

            if (isNumber(cursor)) {
                return cursor < value;
            }
        }

        return false;
    });


    /**
     *
     * @param key
     * @param value
     */
    const lte = (key, value) => apply((entry) => {
        if (hasProperty(entry, key)) {
            const cursor = entry[key];

            if (isNumber(cursor)) {
                return cursor <= value;
            }
        }

        return false;
    });
    /**
     *
     * @param n
     */
    const skip = (n: number) => {
        state.skip = n;

        return context();
    }

    /**
     *
     * @param n
     */
    const limit = (n: number) => {
        state.limit = n;

        return context();
    }

    /**
     *
     */
    const get = () => {
        const {skip, limit} = state;
        const {length} = entries;

        if (skip > 0 && skip < length) {
            entries = entries.slice(skip, length);
        }

        if (limit > 0 && limit < length) {
            entries = entries.slice(0, limit);
        }

        return entries;
    }

    return context();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.09.2020
 * Time: 20:44
 */
export default factory;