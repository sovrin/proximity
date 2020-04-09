import serverFactory, {IServer} from '@sovrin/proximity-server';
import * as middlewares from './middlewares';

import open from './routes/push/open'
import data from './routes/push/data'
import close from './routes/push/close'

const PORT = process.env.PORT || 3315;

/**
 *
 */
const factory = () => {
    const app: IServer = serverFactory({port: PORT});

    for (const middleware of Object.values(middlewares)) {
        app.use(middleware);
    }

    app.open(open);
    app.on('push/data', data);
    app.close(close);

    console.info('listening on :' + PORT);

    app.listen();

    return app;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.10.2019
 * Time: 21:48
 */
export default factory;