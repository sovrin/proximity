import {IAdapter} from "./IAdapter";
import WebSocket from "ws";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 08.05.2020
 * Time: 23:00
 */
export default class Socket implements IAdapter {

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
     */
    public close() {
        this.connection.close();
        this.connection = null;
    }
}