import React, {createContext, useEffect, useReducer} from 'react';
import dataReducer, {Action} from 'reducers/data';
import usePublication from 'hooks/usePublication';
import useSubscription from 'hooks/useSubscription';

export const Context = createContext(false);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.05.2020
 * Time: 18:31
 */
export default ({children}) => {
    const register = usePublication('register');
    const [data, dispatch] = useReducer(dataReducer, []);

    /**
     *
     * @type {onData}
     */
    const onData = ((value) => {
        dispatch({value, type: Action.UPDATE});
    });

    /**
     *
     * @param data
     */
    const onRegister = (data) => {
        console.info('reg', data);
    };

    useSubscription('data', onData);
    useSubscription('register', onRegister);

    useEffect(() => {
        // remove this
        const config = {
            project: 'foo',
        };

        register(config);
    }, []);

    return (
        <Provider value={data}>
            {children}
        </Provider>
    );
}