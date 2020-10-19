import poolFactory from './pool';
import {Context} from '@sovrin/proximity-server';

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
    const onOpen = ({session}: Context) => {
        session.set('pool', pool)
    }

    /**
     *
     * @param socket
     * @param session
     */
    const onClose = ({socket, session}: Context) => {
        pool.unregister(socket);

        session.unset('pool')
    }

    open(onOpen);
    await register('./src/routes');
    close(onClose);
};