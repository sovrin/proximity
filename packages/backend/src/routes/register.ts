import {Context} from '@sovrin/proximity-server';
import {payload as payloadFactory} from '@sovrin/proximity-common';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 16:24
 */
export default ({session, data, socket}: Context) => {
    const {project} = data;
    const pool = session.get('pool');

    pool.register(project, socket);

    const payload = payloadFactory('register', {
        status: 'successful'
    });

    socket.send(payload);
}