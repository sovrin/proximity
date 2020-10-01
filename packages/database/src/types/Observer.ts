import {Action} from "~observer";

export type ObserverFactory = () => Observer;

export type Observer = {
    observe(path: string, callback: Callback),
    emit(path: string, data: any, action: Action)
};

export type Observers = {
    [key: string]: Array<Event>
}

export type Event = {
    path: string,
    callback: Callback,
}

export type Callback = (path: string, data: any, action: Action) => void;
