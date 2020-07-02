import React from 'react';
import Button from '@thomann/spectre-react-components/Button';
// import Avatar from '@thomann/spectre-react-components/Avatar';
// import Connection from './Connection';
import Root, {Icon, Box, Name} from 'styles/pages/header/Logo.style';
import useSettings from '../../../hooks/useSettings';

/**
 *
 * @returns {*}
 * @constructor
 */
const Logo = () => {
    const [data] = useSettings();
    const {switch: collapsed} = data;

console.info(data);

    return (
        <Root>
            <Box
                size={Button.Size.SMALL}
                primary
            >
                <Icon
                    type={Icon.Type.CIRCULAR_GRAPH}
                    size={Icon.Size.SMALL}
                />
            </Box>

            {(!collapsed) && (
                <Name>Proximity</Name>
            )}


            {/*<Avatar size={Avatar.Size.SMALL}>*/}
            {/*    <Connection/>*/}
            {/*</Avatar>*/}
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:51
 */
export default Logo;