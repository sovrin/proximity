export interface Adapter {
    open(host: string, port: number, ssl: boolean);
    flush(data: string);
    close();
    ready(callback: Function);
}
