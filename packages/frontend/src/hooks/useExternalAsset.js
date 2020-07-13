import {useCallback} from 'react';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 17:36
 */
export default (resource) => {
    return useCallback(() => fetch(resource), [resource]);
}