
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
    use(middleware: Function),
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
}

export interface IRouter {
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
    use(middleware: Function),
    route(context: IContext),
}
