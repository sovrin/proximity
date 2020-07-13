import React, {createContext, useEffect, useState} from 'react';
import {produce} from 'immer';
import useLocalStorage from 'hooks/useLocalStorage';

export const Context = createContext(false);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 19.01.2020
 * Time: 17:13
 */
export default ({children, ...data}) => {
    const [state, setState] = useState(data);
    const {version, namespace} = state;
    const cursor = `${namespace}:${version}`;
    const {load, save} = useLocalStorage(cursor, 'settings');

    /**
     *
     * @param key
     * @returns {*}
     */
    const get = (key) => load(key)

    /**
     *
     * @param key
     * @param value
     * @returns {*}
     */
    const set = (key, value) => {
        setState(produce(state, draft => {
            draft[key] = value;

            return draft;
        }));

        return save(key, value);
    }

    /**
     *
     * @param key
     * @param value
     * @returns {*}
     */
    const invoke = (key, value = undefined) => (
        (value === undefined)
            ? get(key)
            : set(key, value)
    )

    useEffect(() => {
        if (!cursor) {
            return;
        }

        setState(produce(state, () => {
            return {
                ...state,
                ...load()
            };
        }));
    }, [cursor])

    const value = {
        ...state,
        get,
        set,
        invoke,
    };
    
    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};
