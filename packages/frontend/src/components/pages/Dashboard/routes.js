import React from 'react';
import Feed from './content/Feed';
import Flags from './content/Flags';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.09.2020
 * Time: 23:34
 */
export default {
    '/dashboard/feed': () => <Feed/>,
    '/dashboard/flags': () => <Flags/>,
};