import creator, {Type} from './creator'
import {Config} from "~types/Config";
import {Collection, Collections} from "~types/Collection";

/**
 *
 * @param config
 */
const factory = async (config: Config) => {
    config = {
        ext: 'json',
        ...config
    }
    const collections: Collections = {};

    /**
     *
     * @param name
     * @param schema
     */
    const collection = async (name: string, schema = {}): Promise<Collection> => {
        if (!collections[name]) {
            const create = creator(Type.COLLECTION);
            collections[name] = create(name, schema, config)
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
 * Time: 19:36
 */
export default factory;