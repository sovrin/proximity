import React from 'react';
import Root, {Link, Avatar} from 'styles/pages/header/User.style';
import Button from '@thomann/spectre-react-components/Button';
import useSettings from 'hooks/useSettings';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const User = () => {
    const {switch: collapsed} = useSettings();

    return (
        <Root>
            <Button link>
                <Link href="/auth">
                    <Avatar size={Avatar.Size.SMALL}/>
                    {!collapsed && 'Oleg'}
                </Link>
            </Button>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 24.09.2020
 * Time: 22:17
 */
export default User;