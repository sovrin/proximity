import adapter from '../adapter';
import {Adapter} from "~types/Adapter";

/**
 *
 */
const factory = (data: Record<string, unknown>): Adapter => {
    const {serialize, deserialize} = adapter(data);

    /**
     *
      * @param key
     */
    const read = async (key: string): Promise<Record<string, unknown>> => {
        return Promise.resolve(data[key] as Record<string, unknown>);
    }

    /**
     *
     */
    const write = async (): Promise<void> => {
        return Promise.resolve();
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