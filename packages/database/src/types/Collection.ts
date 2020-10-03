import {Query} from "~types/Query";
import {Data, Entry} from "~types/Data";

export type Collection<T> = {
    add(item): string,
    read(): Promise<void>,
    write(): Promise<Data<T>>,
    all(): Array<T>,
    count(): number,
    get(id: string): Entry<T>,
    update(id: string, data): boolean | T,
    remove(id: string),
    query(): Query<T>,
    reset(),
}