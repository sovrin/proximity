export type QueryFactory = (entries: Array<any>) => Query;

export type Query = {
    eq(key, value): Query,
    neq(key, value): Query,
    gt(key, value): Query,
    gte(key, value): Query,
    lt(key, value): Query,
    lte(key, value): Query,
    skip(n: number): Query,
    limit(n: number): Query,
    get(): Array<any>,
}