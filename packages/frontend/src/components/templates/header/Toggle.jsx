import React from 'react';
import {Icon} from '@thomann/spectre-react-components';
import usePage from 'hooks/usePage';
import Root from 'styles/templates/header/Toggle.style';
import Button from '@thomann/spectre-react-components/Button';

/**
 *
 * @returns {*}
 * @constructor
 */
const Toggle = () => {
    const {id} = usePage();
    const href = `#${id}`;

    return (
        <Root
            primary
            action
            href={href}
            size={Button.Size.SMALL}
        >
            <Icon type={Icon.Type.MENU}/>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.11.2019
 * Time: 22:52
 */
export default Toggle;