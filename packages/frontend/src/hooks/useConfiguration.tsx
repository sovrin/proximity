import {useContext} from 'react';
import {Context} from 'contexts/Configuration';
import {Action} from 'reducers/configuration';
import {Configuration} from 'types/contexts';

/**
 *
 */
const useConfiguration = () => {
    const {state, dispatch} = useContext(Context) as Configuration;

    return {
        state,
        dispatch,
        Action,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.04.2020
 * Time: 16:29
 */
export default useConfiguration;
