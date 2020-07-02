import styled from 'styled-components';
import ButtonBase from '@thomann/spectre-react-components/Button';
import IconBase from 'components/atoms/Icon';

/**
 *
 */
export const Icon = styled(IconBase)`
    //display: flex;
    //align-content: center;
    //align-self: center;
    //justify-self: center;
    fill: currentColor;
`

/**
 *
 */
const Root = styled(ButtonBase)`
    //color: var(--black-l);
    display: flex;
    grid-area: switch;
    align-content: center;
    align-self: center;
    justify-self: center;
    justify-content: center;
    margin-left: var(--spacing);
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 19:50
 */
export default Root;