import {Action} from 'reducers/configuration';

export type Dispatcher = ({
    action: typeof Action[keyof typeof Action],
    value?: any,
});

export type State = {
    version: number,
    namespace: string,
    collapsed: boolean,
};

export type Configuration = {
    dispatch({action, value}: Dispatcher): void,
    state: State,
}
