import React from 'react';
import {Item} from '@thomann/spectre-react-components/Tabs';
import {useBadge} from '@thomann/spectre-react-components/hooks';


/**
 *
 * @param namespace
 * @param count
 * @returns {*}
 * @constructor
 */
const Project = ({namespace, length}) => {
    const badge = [
        useBadge.default(length),
    ];

    return (
        <Item use={badge}>
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