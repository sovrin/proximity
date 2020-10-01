import {Adapter} from "~types/Adapter";

/**
 *
 * @param data
 */
const factory = (data: object = {}): Adapter => {

    /**
     *
     * @param data
     */
    const serialize = (data: object) => {
        return JSON.stringify(data, null, 2);
    }

    /**
     *
     * @param string
     */
    const deserialize = (string: string) => {
        return JSON.parse(string);
    }

    /**
     *
     */
    const read = async (): Promise<object> => {
        return Promise.resolve(data);
    }

    /**
     *
     */
    const write = async (): Promise<void> => {
        return Promise.resolve(null);
    }

    return {
        serialize,
        deserialize,
        read,
        write,
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.09.2020
 * Time: 19:47
 */
export default factory;