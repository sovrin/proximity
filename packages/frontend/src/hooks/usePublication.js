import {useContext} from 'react';
import {Context} from 'contexts/Connection';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 17:44
 */
export default (path) => {
    const {publish} = useContext(Context);

    return (data) => {
        publish(path, data);
    };
};