import React, {useContext} from 'react';
import {Context} from 'contexts/Page';

/**
 *
 */
const usePage = () => {
    const {
        id,
        collapsed,
        toggleSidebar,
    } = useContext(Context);

    return {
        id,
        collapsed,
        toggleSidebar,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 21.11.2019
 * Time: 23:51
 */
export default usePage;
