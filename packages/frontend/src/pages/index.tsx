import React from 'react';
import {Router} from 'wouter';
import {Dashboard, Settings} from 'scenes';
import {Collector, Connection, Configuration} from 'contexts';

/**
 *
 * @constructor
 */
const Proximity = () => {

    const configuration = {
        version: 1,
        namespace: 'proximity',
    }

    return (
        <Configuration {...configuration}>
            <Connection>
                <Collector>
                    <Router>
                        <Dashboard/>
                        <Settings/>
                    </Router>
                </Collector>
            </Connection>
        </Configuration>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 19.12.2020
 * Time: 21:20
 */
export default Proximity;
