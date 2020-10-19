import {Session} from "./Session";

export type Context = {
    send(...args: any),
    done(),
    throw(err),
    type,
    message,
    request,
    path,
    data,
    socket,
    session: Session,
    finished,
}