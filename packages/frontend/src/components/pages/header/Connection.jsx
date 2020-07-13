import React from 'react';
import {Presence} from '@thomann/spectre-react-components/Avatar';
import useConnection from 'hooks/useConnection';
import {Status} from 'contexts/Connection';

/**
 *
 * @returns {*}
 * @constructor
 */
const Connection = () => {
    const {status} = useConnection();

    /**
     *
     * @param status
     * @returns {boolean}
     */
    const isError = (status) => {
        return [Status.TIMED_OUT, Status.ERROR].includes(status);
    };

    /**
     *
     * @param status
     * @returns {boolean}
     */
    const isConnecting = (status) => {
        return status === Status.CONNECTING;
    }

    /**
     *
     * @param status
     * @returns {boolean}
     */
    const isConnected = (status) => {
        return status === Status.CONNECTED;
    };

    /**
     *
     * @param status
     * @returns {boolean}
     */
    const isIdle = (status) => {
        return status === Status.IDLE;
    }

    const presence = ({
        [isConnected(status)]: Presence.Presence.ONLINE,
        [isError(status)]: Presence.Presence.BUSY,
        [isIdle(status)]: Presence.Presence.OFFLINE,
        [isConnecting(status)]: Presence.Presence.AWAY,
    })[true];

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