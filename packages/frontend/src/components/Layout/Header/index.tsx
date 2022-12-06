import React from 'react';
// import {Container} from '@thomann/spectre-react-components';
import style from './Header.module.css';
import Layout from '../Layout';

/**
 *
 * @returns {*}
 * @constructor
 */
const Header = ({children}) => (
    <Layout type="header">
        <div className={style.header}>
            {children}
            {/*<Container size={Container.Size.LARGE}>*/}
            {/*    {children}*/}
            {/*</Container>*/}
        </div>
    </Layout>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.11.2019
 * Time: 20:57
 */
export default Header;
