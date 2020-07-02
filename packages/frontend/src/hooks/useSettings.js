import {useContext, useState} from 'react';
import {produce} from 'immer';
import {Context} from 'contexts/Settings';

export const Settings = {
    SWITCH: 'switch'
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.04.2020
 * Time: 16:29
 */
export default () => {
    const initial = useContext(Context);
    const [state, setState] = useState(initial);

    /**
     *
     * @param key
     * @param value
     */
    const run = (key, value = null) => {
        if (value === null) {
            value = state.get(key);
        } else {
            setState(produce(state, draft => {
                draft[key] = value;

                return draft;
            }));
        }

        return value;
    };

    return [state, run];
};