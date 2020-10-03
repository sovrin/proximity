import {resolve} from 'path';
import {existsSync, readFile, writeFile} from 'fs';
import {promisify} from 'util';
import adapter from '../adapter';
import {Adapter} from "~types/Adapter";

const load = promisify(readFile);
const save = promisify(writeFile);

/**
 *
 * @param root
 * @param data
 */
const factory = (root: string, data: Record<string, unknown>): Adapter => {
    const {serialize, deserialize} = adapter(data);

    /**
     *
     */
    const read = async (key: string): Promise<Record<string, unknown>> => {
        const pointer = resolve(root, key);

        if (existsSync(pointer)) {
            const data = await load(pointer, 'utf-8')
            const trimmed = data.trim()

            return deserialize(trimmed);
        } else {
            const string = serialize(data);
            await save(pointer, string);

            return data;
        }
    }

    /**
     *
     * @param key
     * @param data
     */
    const write = async (key: string, data: Record<string, unknown>): Promise<void> => {
        const pointer = resolve(root, key);
        const string = serialize(data);

        await save(pointer, string);
    }

    return {
        serialize,
        deserialize,
        read,
        write
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.09.2020
 * Time: 19:55
 */
export default factory;