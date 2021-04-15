import React from 'react';
import {Presence} from '@thomann/spectre-react-components/Avatar';
import {useConnection} from 'hooks';
import {Status} from 'contexts/Connection';

/**
 *
 * @returns {*}
 * @constructor
 */
const Connection = () => {
    const {status} = useConnection() as any;

    let presence = Presence.Presence.OFFLINE;

    switch (status) {
        case Status.CONNECTED:
            presence = Presence.Presence.ONLINE;
            break;
        case Status.ERROR:
            presence = Presence.Presence.OFFLINE;
            break;
        case Status.IDLE:
            presence = Presence.Presence.AWAY;
            break;
        case Status.CONNECTING:
            presence = Presence.Presence.BUSY;
            break;
    }

    console.info(presence);

    return (
        <Presence presence={presence}/>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:51
 */
export default Connection;
