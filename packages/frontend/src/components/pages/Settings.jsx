import React from 'react';
import Page from 'components/atoms/Page';
import Content from 'components/templates/Content';
import Sidebar from 'components/templates/Sidebar';
import Logo from './header/Logo';
import Version from './header/Version';
import Navigation from './header/Navigation';

/**
 *
 * @returns {*}
 * @constructor
 */
const Settings = () => (
    <Page>
        <Sidebar>
            <Logo/>
            <Navigation/>
            <Version/>
        </Sidebar>
        <Content>
            settings
        </Content>
    </Page>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.09.2020
 * Time: 23:29
 */
export default Settings;