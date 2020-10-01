import {Config} from "~types/Config";
import {Query} from "~types/Query";

export type CollectionFactory = (name: string, schema: object, config: Config) => Promise<Collection>;

export type Collection = {
    add(item),
    read(),
    write(),
    add(item),
    all(),
    count(),
    get(id: string),
    update(id: string, data),
    remove(id: string),
    query(): Query,
    reset(),
}

export type Collections = {
    [name in string]: Promise<Collection>
};