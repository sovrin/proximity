const TIMEOUT = 1000 * 5;

/**
 *
 * @param destination
 * @param protocol
 * @constructor
 */
const Socket = (destination: string, protocol: string) => (
    new Promise((resolve, reject) => {

        const timeout = setTimeout(() => {
            reject(new TimeOutException());
        }, TIMEOUT);

        const socket = new WebSocket(destination, protocol);

        /**
         *
         */
        const onOpen = () => {
            clearTimeout(timeout);

            socket.removeEventListener('open', onOpen);

            return resolve(socket);
        };

        /**
         *
         * @param e
         */
        const onError = (e) => {
            return reject(e);
        };

        socket.addEventListener('open', onOpen);
        socket.addEventListener('error', onError);
    })
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.05.2020
 * Time: 10:15
 */
export default Socket;
export class TimeOutException extends Error {
    //
}
