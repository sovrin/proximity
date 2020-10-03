import collectionFactory from './collection';
import {Config} from "~types/Config";
import {Collection} from "~types/Collection";
import {Database} from "~types/Database";

/**
 *
 * @param config
 */
const factory = async (config: Config): Promise<Database> => {
    config = {
        ext: 'json',
        ...config
    }
    const collections: Record<string, Collection<any>> = {};

    /**
     *
     * @param name
     * @param schema
     */
    const collection = async <T> (name: string, schema: T): Promise<Collection<T>> => {
        if (!collections[name]) {
            collections[name] = await collectionFactory(name, schema, config);
        }

        return collections[name];
    }

    return {
        collection
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.09.2020
 * Time: 18:36
 */
export default factory;