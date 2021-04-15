import React from 'react';
import {useConfiguration} from 'hooks';
import Menu, {Item, Divider} from '@thomann/spectre-react-components/Menu';
import {Icon, Link} from 'components';
import style from './Navigation.module.css';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {
    const {state: {collapsed}} = useConfiguration();

    return (
        <Menu className={style.navigation}>
            <Item className={style.item}>
                <Link
                    className={style.link}
                    href="/alerts"
                >
                    <Icon
                        className={style.icon}
                        type={Icon.Type.BELL}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && (
                        <span>Alerts</span>
                    )}
                </Link>
            </Item>

            <Item className={style.item}>
                <Link
                    className={style.link}
                    href="/feed"
                >
                    <Icon
                        className={style.icon}
                        type={Icon.Type.TEXT}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && (
                        <span>Feed</span>
                    )}
                </Link>
            </Item>

            <Item className={style.item}>
                <Link
                    className={style.link}
                    href="/flags">
                    <Icon
                        className={style.icon}
                        type={Icon.Type.FLAG}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && (
                        <span>Flags</span>
                    )}
                </Link>
            </Item>

            <Divider/>

            <Item className={style.item}>
                <Link
                    className={style.link}
                    href="/settings"
                >
                    <Icon
                        className={style.icon}
                        type={Icon.Type.COG}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && (
                        <span>Settings</span>
                    )}
                </Link>
            </Item>
        </Menu>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.09.2020
 * Time: 22:56
 */
export default Navigation;
