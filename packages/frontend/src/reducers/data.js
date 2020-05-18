import {produce} from 'immer';

export const Action = {
    UPDATE: 'update',
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.05.2020
 * Time: 18:15
 */
export default (state, {type, value}) => {
    switch (type) {
        case Action.UPDATE:
            return produce(state, draft => {
                const {context: {project}, data} = value;

                if (!draft[project]) {
                    draft[project] = [];
                }

                draft[project].push(data);

                return draft;
            });

        default:
            return state;
    }
}