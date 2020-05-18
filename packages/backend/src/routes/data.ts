import {IContext} from "@sovrin/proximity-server";
import {payload as payloadFactory} from "../../../common/src";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:50
 */
export default (({session, data}: IContext) => {
    const pool = session.get('pool');
    const payload = payloadFactory('data', data);

    for (const {socket} of pool.get()) {
        socket.send(payload);
    }
})