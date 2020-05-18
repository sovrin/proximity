import React from 'react';
import Dashboard from './components/pages/Dashboard';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:15
 */
export default {
    '/': 'dashboard',
    '/dashboard': () => <Dashboard/>,
};