export type Session = {
    get(key: string),
    set(key: string, value: any),
    unset(key: string),
    include(store: any),
    wrap(Function),
    run(Function),
    disable,
}