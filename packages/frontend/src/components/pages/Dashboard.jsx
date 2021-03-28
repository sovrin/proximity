import React from 'react';
import Page from 'components/atoms/Page';
import Content from 'components/templates/Content';
import Sidebar from 'components/templates/Sidebar';
import Router from 'contexts/Router';
import Logo from './header/Logo';
import Version from './header/Version';
import Navigation from './header/Navigation';
import User from './header/User';
import routes from './Dashboard/routes';

/**
 *
 * @returns {*}
 * @constructor
 */
const Dashboard = () => (
    <Page>
        <Sidebar>
            <Logo/>
            <User/>
            <Navigation/>
            <Version/>
        </Sidebar>
        <Content>
            <Router routes={routes}/>
        </Content>
    </Page>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:15
 */
export default Dashboard;