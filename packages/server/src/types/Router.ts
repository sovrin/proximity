import {Context} from "./Context";
import {Handle} from './Handle';

export type Router = {
    on(path: string, handle: Handle),
    open(handle: Handle),
    close(handle: Handle),
    route(context: Context),
    register(path: string)
}
