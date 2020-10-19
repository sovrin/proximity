import {Context} from "./Context";

export type Router = {
    on(path: string, handle: Function),
    open(handle: Function),
    close(handle: Function),
    route(context: Context),
    register(path: string)
}
