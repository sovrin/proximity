import {Handle} from './Handle';

export type Server = {
    listen(),
    kill(),
    on(path: string, handle: Handle),
    open(handle: Handle),
    close(handle: Handle),
    register(path: string)
}
