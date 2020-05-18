import React from 'react';
import 'spectre.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';

import Connection from 'contexts/Connection';
import Collector from '../contexts/Collector';
import useRoutes from '../hooks/useRoutes';
import routes from '../routes';

/**
 *
 * @returns {*}
 * @constructor
 */
const Proximity = () => (
    <Connection>
        <Collector>
            {useRoutes(routes)}
        </Collector>
    </Connection>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:10
 */
export default Proximity;