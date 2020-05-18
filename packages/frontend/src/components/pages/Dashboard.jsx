import React from 'react';
import Page from 'components/atoms/Page';
import Content from 'components/templates/Content';
import Header from 'components/templates/Header';
import Overlay from 'components/templates/Overlay';
import Sidebar from 'components/templates/Sidebar';
import Feed from './content/Feed';
import Logo from './content/Logo';

/**
 *
 * @returns {*}
 * @constructor
 */
const Dashboard = () => (
    <Page>
        <Header/>
        <Sidebar/>
        <Content>
            <Logo/>
            <Feed/>
        </Content>
        <Overlay/>
    </Page>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:15
 */
export default Dashboard;