import {useContext} from 'react';
import {Context} from 'contexts/Settings';

export const Settings = {
    SWITCH: 'switch',
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.04.2020
 * Time: 16:29
 */
export default () => {
    return useContext(Context);
};