export interface IContext {
    send(...args: any),
    done(),
    throw(err),
    type,
    message,
    request,
    path,
    data,
    session: ISession,
    finished,
}

export interface IFactory {
    context: IContext,
    close: Function,
    open: Function,
}

export interface ISession {
    get(key: string),
    set(key: string, value: any),
    wrap(Function),
    run(Function),
    disable,
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
