import {useContext, useEffect, useCallback} from 'react';
import {Context} from 'contexts/Connection';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 17:35
 */
export default (path, handler) => {
    const {subscribe} = useContext(Context);
    const updater = useCallback(handler, [path]);

    useEffect(() => subscribe(path, updater), [updater]);
};