import React from 'react';
import Avatar from '@thomann/spectre-react-components/Avatar';
import Menu from '@thomann/spectre-react-components/Menu';
import Connection from './Connection';

/**
 *
 * @returns {*}
 * @constructor
 */
const Logo = () => (
    <Menu>
        <Avatar
            initials="P" // stylize
            size={Avatar.Size.SMALL}
        >
            <Connection/>
        </Avatar>
    </Menu>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:51
 */
export default Logo;