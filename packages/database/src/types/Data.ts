export type Entry<T> = T & {
    _id: string,
    _ts: number,
}

export type Data<T> = {
    name?: string,
    schema?: any,
    entries?: Array<Entry<T>>,
    timestamp?: number
};