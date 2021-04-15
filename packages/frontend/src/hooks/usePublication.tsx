import {useContext} from 'react';
import {Context} from 'contexts/Connection';

const usePublication = (path) => {
    const {publish} = useContext(Context) as any;

    return (data) => {
        publish(path, data);
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 17:44
 */
export default usePublication;
