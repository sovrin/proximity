import WebSocket from "ws";
import {Adapter} from '../types';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 08.05.2020
 * Time: 23:00
 */
export = class Socket implements Adapter {

    /**
     *
     */
    private timeout: number;

    /**
     *
     */
    private connection: WebSocket;

    /**
     *
     * @param timeout
     */
    public constructor(timeout = 1) {
        this.timeout = timeout;
    }

    /**
     *
     * @param data
     */
    public flush(data: string) {
        this.connection.send(data);
    }

    /**
     *
     * @param host
     * @param port
     * @param ssl
     */
    public open(host: string, port: number, ssl: boolean) {
        let address = (ssl)
            ? 'wss'
            : 'ws'
        ;

        address += `://${host}:${port}`;

        this.connection = new WebSocket(address);
    }

    /**
     *
     * @param callback
     */
    public ready(callback) {
        this.connection.onopen = callback;
    }

    /**
     *
     */
    public close() {
        this.connection.close();
        this.connection = null;
    }
}
