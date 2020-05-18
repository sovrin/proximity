/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 24.04.2020
 * Time: 21:58
 */
export interface IAdapter {
    open(host: string, port: number, ssl: boolean);
    flush(data: string);
    close();
    ready(callback: Function);
}