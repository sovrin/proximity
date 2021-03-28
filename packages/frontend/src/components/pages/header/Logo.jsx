import React from 'react';
import Button from '@thomann/spectre-react-components/Button';
import Root, {Icon, Item, Box, Name} from 'styles/pages/header/Logo.style';
import useSettings, {Settings} from 'hooks/useSettings';

/**
 *
 * @returns {*}
 * @constructor
 */
const Logo = () => {
    const {switch: collapsed, invoke} = useSettings();

    /**
     *
     */
    const onToggle = () => {
        invoke(Settings.SWITCH, !invoke(Settings.SWITCH));
    };

    return (
        <Root>
            <Item>
                <Box
                    onClick={onToggle}
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
            </Item>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:51
 */
export default Logo;