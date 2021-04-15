import React from 'react';
import {Route} from 'wouter';
import {Scope, Page} from 'components';
import {Sidebar, Content} from 'components/Layout';
import {Connection} from 'components';
import Navigation from 'components/Layout/Sidebar/Navigation';
import Logo from 'components/Layout/Sidebar/Logo';
import Collapse from 'components/Layout/Sidebar/Collapse';

/**
 *
 * @constructor
 */
const Dashboard = () => (
    <Scope base="/dashboard">
        <Page>
            <Sidebar>
                <Logo/>
                <Navigation/>
                <Collapse/>
            </Sidebar>
            <Content>
                content

                <Connection/>
                <Route path="/feed">
                </Route>
                <Route path="/flags">
                </Route>
            </Content>
        </Page>
    </Scope>
);
/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.04.2021
 * Time: 14:05
 */
export default Dashboard;
