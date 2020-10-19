/**
 *
 * @param path
 * @param data
 */
const factory = (path: string, data?: object) => (
    JSON.stringify({
        path,
        data,
    })
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 16:31
 */
export const payload = factory;