import {Context} from 'server';
import {payload as payloadFactory} from 'common';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:50
 */
export default (({session, data}: Context) => {
    const pool = session.get('pool');
    const payload = payloadFactory('data', data);

    for (const {socket} of pool.get()) {
        socket.send(payload);
    }
})
