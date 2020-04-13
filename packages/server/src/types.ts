export interface IContext {
    use(prop: string, deflt?: any),
    send(...args: any),
    broadcast(...args: any),
    done(),
    throw(err),
    type,
    message,
    request,
    path,
    data,
    finished,
}

export interface IFactory {
    context: IContext,
    close: Function,
    open: Function,
}

export interface IServer {
    listen(),
    kill(),
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
    register(path: string)
}

export interface IRouter {
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
    route(context: IContext),
    register(path: string)
}
