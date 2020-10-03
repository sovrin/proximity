export type Query<T> = {
    eq(key, value): Query<T>,
    neq(key, value): Query<T>,
    gt(key, value): Query<T>,
    gte(key, value): Query<T>,
    lt(key, value): Query<T>,
    lte(key, value): Query<T>,
    skip(n: number): Query<T>,
    limit(n: number): Query<T>,
    get(): Array<T>,
}