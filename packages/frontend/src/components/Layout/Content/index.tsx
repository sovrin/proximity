import React from 'react';
// import Container from '@thomann/spectre-react-components/Container';
// import {Content as Base} from '@thomann/spectre-react-components/OffCanvas';
import Layout from '../Layout';
import style from './Content.module.css';

/**
 *
 * @returns {*}
 * @constructor
 */
const Content = ({children = null}) => (
    <Layout type="content">
        {children}
        {/*<Base className={style.content}>*/}
        {/*    <Container size={Container.Size.MEDIUM}>*/}
        {/*        {children}*/}
        {/*    </Container>*/}
        {/*</Base>*/}
    </Layout>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.11.2019
 * Time: 00:32
 */
export default Content;
