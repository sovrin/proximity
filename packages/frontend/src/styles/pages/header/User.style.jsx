import styled from 'styled-components';
import Menu, {Item as BaseItem, Divider as BaseDivider} from '@thomann/spectre-react-components/Menu';
import BaseAvatar from '@thomann/spectre-react-components/Avatar';
import BaseLink from 'components/atoms/Link';
import BaseIcon from 'components/atoms/Icon';

/**
 *
 */
const Root = styled(Menu)`
    display: flex;
    flex-direction: column;;
    align-items: center;
    padding: 0;
    min-width: 0;
    color: var(--accent);
    transform: none;
`;

export const Item = styled(BaseItem)`
    padding: 0 !important;
`;

export const Link = styled(BaseLink)`
    display: flex !important;
    align-content: center !important;
    fill: var(--accent);
    font-size: small;
`

export const Icon = styled(BaseIcon)`
    display: flex;
    //margin-right: var(--spacing);
    align-self: center;
`;

export const Avatar = styled(BaseAvatar)`
    //margin-right: var(--spacing);
`;

export const Divider = styled(BaseDivider)``;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.09.2020
 * Time: 22:55
 */
export default Root;