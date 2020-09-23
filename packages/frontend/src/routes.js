import React from 'react';
import Dashboard from 'components/pages/Dashboard';
import Settings from 'components/pages/Settings';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:15
 */
export default {
    '/': 'dashboard',
    '/dashboard': () => <Dashboard/>,
    '/dashboard/*': () => <Dashboard/>,
    '/settings': () => <Settings/>
};