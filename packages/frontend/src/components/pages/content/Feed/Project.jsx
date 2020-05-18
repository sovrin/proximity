import React from 'react';
import {Item} from '@thomann/spectre-react-components/Tabs';

/**
 *
 * @param namespace
 * @returns {*}
 * @constructor
 */
const Project = ({namespace}) => {
    return (
        <Item>
            {namespace}
        </Item>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:36
 */
export default Project;