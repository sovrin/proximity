import collectionFactory from './collection';
import {Config} from "~types/Config";
import {Collection} from "~types/Collection";

/**
 *
 * @param config
 */
const factory = async (config: Config) => {
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
    const collection = async <T>(name: string, schema = null): Promise<Collection<T>> => {
        if (!collections[name]) {
            collections[name] = await collectionFactory<T>(name, schema, config);
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