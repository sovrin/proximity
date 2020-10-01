import collection from './collection';
import query from './query';
import {CollectionFactory} from "~types/Collection";
import {QueryFactory} from "~types/Query";

export enum Type {
    COLLECTION,
    QUERY
}

type Creator = CollectionFactory
    | QueryFactory
;

function factory(type: Type.COLLECTION): CollectionFactory;
function factory(type: Type.QUERY): QueryFactory;
function factory(type: null): null;

/**
 *
 * @param type
 */
function factory(type: Type): Creator {
    switch (type as Type) {
        case Type.COLLECTION:
            return collection;

        case Type.QUERY:
            return query;

        default:
            return null;
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.09.2020
 * Time: 20:28
 */
export default factory;


