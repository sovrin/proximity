import {useContext} from 'react';
import {Context as Router} from 'contexts/Router';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.06.2020
 * Time: 14:15
 */
export default () => {
    return useContext(Router);
}