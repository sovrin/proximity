export const Action = {
    UPDATE: 'update',
};

/**
 *
 * @param state
 * @param type
 * @param value
 */
const reduce = (state, {type, value}) => {
    switch (type) {
        case Action.UPDATE:

        default:
            return state;
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.05.2020
 * Time: 18:15
 */
export default reduce;
