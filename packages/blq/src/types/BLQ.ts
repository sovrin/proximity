export type BLQ = {
    vars,
    parent: BLQ,
    lookup(name: string): BLQ,
    extend(),
    set(name, value),
    get(name),
    define(name, value),
}