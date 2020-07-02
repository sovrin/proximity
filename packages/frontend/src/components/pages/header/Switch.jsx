import React from 'react';
import useSettings, {Settings} from 'hooks/useSettings';
import Root, {Icon} from 'styles/pages/header/Switch.style';

/**
 *
 * @returns {*}
 * @constructor
 */
const Switch = () => {
    const [data, dispatch] = useSettings();

    /**
     *
     */
    const onClick = () => {
       (dispatch(Settings.SWITCH))
            ? dispatch(Settings.SWITCH, false)
            : dispatch(Settings.SWITCH, true)
        ;
    };

    return (
        <Root
            onClick={onClick}
            size={Root.Size.SMALL}
            action
            circle
        >
            <Icon
                // size={Icon.Size.SMALL}
                type={Icon.Type.CHEVRON_LEFT}
            />
        </Root>

    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 02.07.2020
 * Time: 20:15
 */
export default Switch;