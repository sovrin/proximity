import React, {createContext, useEffect, useReducer} from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import {configuration} from 'reducers';
import {build} from 'reducers/configuration';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @param rest
 * @constructor
 */
const Configuration = ({children, ...rest}) => {
    const [state, dispatch] = useReducer(configuration, build(rest));

    const {namespace, version} = state;
    const cursor = `${namespace}:${version}`;
    const {load, save} = useLocalStorage(cursor, 'settings');

    const value = {
        state,
        dispatch
    };

    console.info(state);

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 19.01.2020
 * Time: 17:13
 */
export default Configuration;
