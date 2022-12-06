import React from 'react';
import style from './Logo.module.css';
// import Menu, {Item} from '@thomann/spectre-react-components/Menu';
// import Button from '@thomann/spectre-react-components/Button';
import {Icon} from 'components';
import {useConfiguration} from 'hooks';

const Logo = () => {
    const {state: {collapsed}} = useConfiguration();

    return (
        <ul className={style.logo}>
            <li className={style.item}>
                <button
                    className={style.button}
                    // size={Button.Size.SMALL}
                    // primary
                >
                    <Icon
                        className={style.icon}
                        type={Icon.Type.CIRCULAR_GRAPH}
                        size={Icon.Size.SMALL}
                    />
                </button>

                {(!collapsed) && (
                    <div className={style.name}>Proximity</div>
                )}
            </li>
        </ul>
    );
};

export default Logo;
