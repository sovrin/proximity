import poolFactory from './pool';
import {IContext} from "@sovrin/proximity-server/src";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 23:32
 */
export default async ({open, close, register}) => {
    const pool = poolFactory();

    /**
     *
     * @param socket
     * @param session
     */
    const onOpen = ({session}: IContext) => {
        session.set('pool', pool)
    }

    /**
     *
     * @param socket
     * @param session
     */
    const onClose = ({socket, session}: IContext) => {
        pool.unregister(socket);

        session.unset('pool')
    }

    open(onOpen);
    await register('./src/routes');
    close(onClose);
};