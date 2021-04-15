import React from 'react';
import {Overlay as Base} from '@thomann/spectre-react-components/OffCanvas';
import Layout from '../Layout';
import style from './Overlay.module.css';

/**
 *
 * @returns {*}
 * @constructor
 */
const Overlay = () => (
    <Layout type="overlay">
        <Base
            className={style.overlay}
            href='#close'
        />
    </Layout>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.11.2019
 * Time: 00:33
 */
export default Overlay;
