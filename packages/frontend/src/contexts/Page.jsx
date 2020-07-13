import React, {createContext, useEffect, useState} from 'react';
import useUnique from 'hooks/useUnique';

export const Context = createContext(null);
const {Provider} = Context;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 21.11.2019
 * Time: 20:06
 */
export default ({children}) => {
    const [id, setId] = useState(null);
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const context = {
        id,
        collapsed,
        toggleSidebar
    };

    useEffect(() => {
        const {string} = useUnique();

        setId(string());
    }, []);

    return (
        <Provider value={context}>
            {children}
        </Provider>
    );
}