import {useContext} from 'react';
import {Context as Collector} from 'contexts/Collector';

const useCollector = () => {
    return useContext(Collector);
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 18:33
 */
export default useCollector;
