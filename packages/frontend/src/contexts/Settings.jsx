import React, {createContext, useEffect, useState} from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

export const Context = createContext(false);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 19.01.2020
 * Time: 17:13
 */
export default ({children, ...data}) => {
    const {version} = data;
    const key = 'proximity:' + (version || '');
    const {load, save} = useLocalStorage(key);
    const [state, setState] = useState(data);

    /**
     *
     * @param key
     * @returns {*}
     */
    const get = (key) => {
        return load(key);
    }

    /**
     * 
     * @type {{}}
     */
    const set = (key, value) => {
        setState((old) => {
            old[key] = value;

            return old;
        });

        return save(key, value);
    }

    useEffect(() => {

    },[])

    const value = {
        ...state,
        get,
        set,
    };
    
    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};
