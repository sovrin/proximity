import serverFactory, {Server} from '@sovrin/proximity-server';
import routes from './routes';
import database from './database';

const PORT = process.env.PORT || 3315;

/**
 *
 */
const factory = async () => {
    const {listen, open, close, register}: Server = serverFactory({port: PORT});

    await routes({open, close, register});
    await database('collections');
    
    console.info('listening on :' + PORT);

    listen();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.10.2019
 * Time: 21:48
 */
export default factory;
