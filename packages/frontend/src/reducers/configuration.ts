import {Dispatcher, State} from 'types/contexts';

export const Action = {
    TOGGLE_COLLAPSED: 'toggle_collapsed',
};

/**
 *
 */
export const build = (configuration) => ({
    ...configuration,
    collapsed: true
})

/**
 *
 * @param state
 * @param type
 * @param value
 */
const reduce = (state, {action, value}: Dispatcher) => {

    /**
     *
     * @param key
     */
    const toggle = (key) => (): State => {
        state[key] = !state[key];

        return {
            ...state,
        };
    }

    const {[action]: fn} = {
        [Action.TOGGLE_COLLAPSED]: toggle('collapsed'),
    } as any;

    if (!fn) {
        return state;
    }

    return fn(value);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.05.2020
 * Time: 18:15
 */
export default reduce;
