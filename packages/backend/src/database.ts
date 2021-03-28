import {resolve} from 'path';
import vano, {file} from 'vano';

/**
 *
 * @param name
 */
const factory = async (name: string) => {
    const base = resolve(__dirname, '..', name);
    const adapter = file(base);
    const db = await vano({adapter});

    const {read, add, write} = await db.collection('test');

    try {
        await read();
    } catch (e) {
        //
        console.info(e);
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 20.10.2020
 * Time: 21:03
 */
export default factory;
