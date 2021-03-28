import React from 'react';
import Root, {Item, Link, Icon, Divider} from 'styles/pages/header/Navigation.style';
import useSettings from 'hooks/useSettings';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {
    const {switch: collapsed} = useSettings();

    return (
        <Root>
            <Item>
                <Link href="/dashboard/alerts">
                    <Icon
                        type={Icon.Type.BELL}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && 'Alerts'}
                </Link>
            </Item>

            <Item>
                <Link href="/dashboard/feed">
                    <Icon
                        type={Icon.Type.TEXT}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && 'Feed'}
                </Link>
            </Item>

            <Item>
                <Link href="/dashboard/flags">
                    <Icon
                        type={Icon.Type.FLAG}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && 'Flag'}
                </Link>
            </Item>

            <Divider/>

            <Item>
                <Link href="/settings">
                    <Icon
                        type={Icon.Type.COG}
                        size={Icon.Size.SMALL}
                    />
                    {!collapsed && 'Settings'}
                </Link>
            </Item>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.09.2020
 * Time: 22:56
 */
export default Navigation;