import React from 'react';
import Toggle from './header/Toggle';
import Controls from './header/Controls';
import Root from 'styles/templates/Header.style';

/**
 *
 * @returns {*}
 * @constructor
 */
const Header = ({children}) => (
    <Root>
        <Toggle/>
        {children}
        {/*<Controls/>*/}
    </Root>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.11.2019
 * Time: 20:57
 */
export default Header;