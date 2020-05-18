const TIMEOUT = 1000 * 5;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.05.2020
 * Time: 10:15
 */
export default (destination, protocol) => (
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
 * Date: 18.05.2020
 * Time: 21:04
 */
export class TimeOutException extends Error {
    //
}