import React from 'react';
import Connection from 'contexts/Connection';
import Collector from 'contexts/Collector';
import Router from 'contexts/Router';
import Settings from 'contexts/Settings';
import routes from '../routes';
import 'styles/base';

/**
 *
 * @returns {*}
 * @constructor
 */
const Proximity = ({...settings}) => (
    <Settings {...settings}>
        <Connection>
            <Collector>
                <Router routes={routes}/>
            </Collector>
        </Connection>
    </Settings>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:10
 */
export default Proximity;