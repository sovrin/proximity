import React, {createContext, useEffect, useReducer} from 'react';

export const Context = createContext(false);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.06.2020
 * Time: 15:05
 */
export default ({meta, projects, children}) => {
    const context = {
        meta,
        projects,
    };

    return (
        <Provider value={context}>
            {children}
        </Provider>
    );
}