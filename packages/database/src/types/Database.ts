import {Collection} from "~types/Collection";

export type Database = {
    collection<T>(name: string, schema?: T): Promise<Collection<T>>;
};