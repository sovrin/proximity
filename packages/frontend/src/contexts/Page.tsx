import React, {createContext, useState} from 'react';
import useUnique from 'hooks/useUnique';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @constructor
 */
const Page = ({children}) => {
    const id = useUnique();
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const context = {
        id,
        collapsed,
        toggleSidebar,
    };

    return (
        <Provider value={context}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 21.11.2019
 * Time: 20:06
 */
export default Page;
