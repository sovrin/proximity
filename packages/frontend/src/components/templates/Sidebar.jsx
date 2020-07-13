import React from 'react';
import Root from 'styles/templates/Sidebar.style';
import usePage from 'hooks/usePage';

/**
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const Sidebar = ({children}) => {
    const {id, collapsed} = usePage();

    return (
        <Root
            id={id}
            collapsed={collapsed}
        >
            {children}
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.11.2019
 * Time: 00:24
 */
export default Sidebar;