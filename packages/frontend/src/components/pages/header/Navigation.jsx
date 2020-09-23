import React from 'react';
import Root, {Item, Link, Icon, Divider} from 'styles/pages/header/Navigation.style';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {

    const redirect = () => {

    }

    return (
        <Root>
            <Item>
                <Link
                    onClick={redirect}
                    href="/dashboard/feed"
                >
                    <Icon
                        type={Icon.Type.TEXT}
                        size={Icon.Size.SMALL}
                    />
                    Feed
                </Link>
            </Item>
            <Item>
                <Link
                    onClick={redirect}
                    href="/dashboard/flags"
                >
                    <Icon
                        type={Icon.Type.FLAG}
                        size={Icon.Size.SMALL}
                    />
                    Flags
                </Link>
            </Item>

            <Divider/>

            <Item>
                <Link
                    onClick={redirect}
                    href="/settings"
                >
                    <Icon
                        type={Icon.Type.COG}
                        size={Icon.Size.SMALL}
                    />
                    Settings
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