import serverFactory, {IServer} from '@sovrin/proximity-server';
import routes from './routes';

const PORT = process.env.PORT || 3315;

/**
 *
 */
const factory = async () => {
    const {listen, open, close, register}: IServer = serverFactory({port: PORT});

    await routes({open, close, register});
    console.info('listening on :' + PORT);

    listen();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.10.2019
 * Time: 21:48
 */
export default factory;