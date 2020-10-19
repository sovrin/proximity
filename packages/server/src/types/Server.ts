export type Server = {
    listen(),
    kill(),
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
    register(path: string)
}