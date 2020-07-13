import React from 'react';
import Page from 'components/atoms/Page';
import Content from 'components/templates/Content';
import Sidebar from 'components/templates/Sidebar';
import Feed from './content/Feed';
import Logo from './header/Logo';
import Version from './header/Version';

/**
 *
 * @returns {*}
 * @constructor
 */
const Dashboard = () => (
    <Page>
        <Sidebar>
            <Logo/>
            <Version/>
        </Sidebar>
        <Content>
            <Feed/>
        </Content>
    </Page>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:15
 */
export default Dashboard;