import React from 'react';
import classNames from '@thomann/classnames';
import {Sidebar as Base} from '@thomann/spectre-react-components/OffCanvas';
import Layout from '../Layout';
import {usePage} from 'hooks';
import style from './Sidebar.module.css';

/**
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const Sidebar = ({children}) => {
    const {id, collapsed} = usePage();
    const className = classNames(style.sidebar, {
        [style.collapsed]: collapsed
    })

    return (
       <Layout type="sidebar">
           <Base
               className={className}
               id={id}
           >
               {children}
           </Base>
       </Layout>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.11.2019
 * Time: 00:24
 */
export default Sidebar;
