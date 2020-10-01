type Entry = {
    _id: string,
    _ts: number,
    [key: string]: any
}

export type Data = {
    name?: string,
    schema?: object,
    entries?: Array<Entry>,
    timestamp?: number
};