import React, {createContext} from 'react';

export const Context = createContext(false);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:48
 */
export default ({children}) => {
    const {host, protocol} = document.location;
    // let endpoint = (protocol.includes('https'))
    //     ? `wss://${host}`
    //     : `ws://${host}`
    // ;

    const endpoint = 'ws://localhost:3315';
    const socket = new WebSocket(endpoint, 'proximity');

    return (
        <Provider value={socket}>
            {children}
        </Provider>
    );
};
