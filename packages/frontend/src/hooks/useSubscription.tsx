import {useContext, useEffect, useCallback} from 'react';
import {Context} from 'contexts/Connection';

/**
 *
 * @param path
 * @param handler
 */
const useSubscription = (path, handler) => {
    const {subscribe} = useContext(Context) as any;
    const updater = useCallback(handler, [path]);

    useEffect(() => subscribe(path, updater), [updater]);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 17:35
 */
export default useSubscription;
