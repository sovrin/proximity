import creator, {Type} from './creator';
import {hasProperty, isArray, isEmpty, timestamp, unique} from "~utils";
import {Config} from "~types/Config";
import {Collection} from "~types/Collection";
import {Query} from "~types/Query";
import {Data} from "~types/Data";

/**
 *
 * @param name
 * @param schema
 * @param config
 */
const factory = async (name, schema, config: Config): Promise<Collection> => {
    const {adapter, ext} = config;

    let data: Data = {
        name,
        schema,
        entries: [],
        timestamp: timestamp(),
    };

    /**
     *
     */
    const read = async () => {
        const file = [name, ext].filter(Boolean)
            .join('.')
        ;

        data = await adapter.read(file);
    }

    /**
     *
     */
    const write = () => {
        const file = `${name}.${ext}`;
        const promise = adapter.write(file, data);

        return promise.then(() => data);
    }

    /**
     *
     * @param entry
     */
    const filter = (entry) => {
        const candidate = {
            _id: '',
            _ts: 0,
            ...schema
        };

        for (const key of Object.keys(candidate)) {
            const propertyExists = (hasProperty(entry, key));
            const isSameType = (typeof entry[key] === typeof candidate[key]);

            if (propertyExists && isSameType) {
                candidate[key] = entry[key];
            }
        }

        return candidate;
    }

    /**
     *
     * @param item
     */
    const add = (item) => {

        /**
         *
         * @param entry
         */
        const insert = (entry) => {
            entry._id = unique(32);
            entry._ts = timestamp();

            if (!isEmpty(schema)) {
                entry = filter(entry);
            }

            return entry;
        };

        if (!isArray(item)) {
            const entry = insert(item);
            data.entries.push(entry);
            data.timestamp = timestamp();

            return entry._id;
        }

        const entries = item.map(insert);
        data.entries = data.entries.concat(entries);
        data.timestamp = timestamp();

        return entries.map((entry) => {
            return entry._id;
        });
    }

    /**
     *
     */
    const all = () => {
        return [...data.entries];
    }

    /**
     *
     */
    const count = (): number => {
        return data.entries.length;
    }

    /**
     *
     * @param id
     */
    const get = (id: string) => {
        const {entries} = data;
        const candidates = entries.filter((entry) => {
            return entry._id === id;
        });

        return candidates.length > 0
            ? candidates[0]
            : null
        ;
    }

    /**
     *
     * @param id
     * @param update
     */
    const update = (id: string, update) => {
        let changed = false;

        const index = data.entries.findIndex((el) => {
            return el._id === id;
        });

        if (index >= 0) {
            let obj = data.entries[index];

            for (let key of Object.keys(obj)) {
                if (key === '_id' || key === '_ts') {
                    continue;
                }

                const propertyExists = (hasProperty(update, key));
                const equalType = (typeof update[key] === typeof obj[key]);
                const notEqualValue = (update[key] !== obj[key]);

                if (propertyExists && equalType && notEqualValue) {
                    obj[key] = update[key];

                    changed = true;
                }
            }

            if (!changed) {
                return false;
            }

            obj._ts = timestamp();
            data.entries[index] = obj;
            data.timestamp = timestamp();

            return obj;
        }

        return false;
    }

    /**
     *
     * @param id
     */
    const remove = (id: string) => {
        const {entries} = data;
        const index = entries.findIndex((entry) => {
            return entry._id === id;
        });

        if (index >= 0) {
            entries.splice(index, 1);
            data.entries = entries;
            data.timestamp = timestamp();

            return true;
        }

        return false;
    }

    /**
     *
     */
    const query = (): Query => {
        const create = creator(Type.QUERY);

        return create(data.entries);
    }

    /**
     *
     */
    const reset = () => {
        data.timestamp = timestamp();
        data.entries = [];

        write();
    }

    await read();

    return {
        add,
        read,
        write,
        all,
        count,
        get,
        update,
        remove,
        query,
        reset
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.09.2020
 * Time: 22:02
 */
export default factory;