import adapter from '../adapter';
import {Adapter} from "~types/Adapter";

/**
 *
 */
const factory = (data: object): Adapter => {
    const {serialize, deserialize} = adapter(data);

    /**
     *
      * @param key
     */
    const read = async (key: string): Promise<object> => {
        return Promise.resolve(data[key]);
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