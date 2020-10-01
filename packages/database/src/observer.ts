import {Callback, ObserverFactory, Observers} from "~types/Observer";

export enum Action {
    WRITE,
    WIPE,
    APPEND,
}

type State = {
    observers: Observers
}

/**
 *
 */
const factory: ObserverFactory = () => {
    const state: State = {
        observers: {}
    };

    /**
     *
     * @param path
     * @param callback
     */
    const observe = (path: string, callback: Callback) => {
        const event = {
            path, callback
        }

        if (!state.observers[path]) {
            state.observers[path] = [];
        }

        state.observers[path].push(event)

        return () => {

            /**
             *
             * @param entry
             */
            const filter = (entry) => (
                entry !== event
            )

            state.observers[path] = state.observers[path].filter(filter);
        }
    }

    /**
     *
     * @param path
     * @param data
     * @param action
     */
    const emit = (path: string, data: any, action: Action) => {
        const {[path]: observer} = state.observers;

        if (!observer) {
            return;
        }

        for (const {callback} of observer) {
            callback(path, data, action);
        }
    }

    return {
        observe,
        emit
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.09.2020
 * Time: 23:48
 */
export default factory;