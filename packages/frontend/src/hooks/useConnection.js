import {useContext} from 'react';
import {Context as Connection} from '../contexts/Connection';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:59
 */
export default () => {
    return useContext(Connection);
}