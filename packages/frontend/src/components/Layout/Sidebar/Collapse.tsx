import React from 'react';
// import Button from '@thomann/spectre-react-components/Button';
import {Icon} from 'components';
import {useConfiguration} from 'hooks';
import style from './Collapse.module.css';

/**
 *
 * @constructor
 */
const Collapse = () => {
    const {state: {collapsed}, dispatch, Action} = useConfiguration();

    /**
     *
     */
    const onClick = () => {
        dispatch({action: Action.TOGGLE_COLLAPSED});
    };

    return (
        <button
            className={style.collapse}
            onClick={onClick}
            // size={Button.Size.SMALL}
            // link
            // block
        >
            {(collapsed) && (
                <Icon
                    className={style.icon}
                    size={Icon.Size.SMALL}
                    type={Icon.Type.CHEVRON_SMALL_RIGHT}
                />
            )}
            {(!collapsed) && (
                <Icon
                    className={style.icon}
                    size={Icon.Size.SMALL}

                    type={Icon.Type.CHEVRON_SMALL_LEFT}
                />
            )}
        </button>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.04.2021
 * Time: 22:21
 */
export default Collapse;
