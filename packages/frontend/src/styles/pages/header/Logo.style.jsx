import styled from 'styled-components';
import Menu from '@thomann/spectre-react-components/Menu';
import ButtonBase from '@thomann/spectre-react-components/Button';
import IconBase from 'components/atoms/Icon';

/**
 *
 */
export const Name = styled('div')`
    font-style: italic;
    color: var(--accent);
    margin: auto var(--spacing-lg);
    letter-spacing: var(--unit-o);
`;

/**
 *
 */
export const Icon = styled(IconBase)`
   fill: #fff;
`;

/**
 *
 */
export const Box = styled(ButtonBase)`
    
`;

/**
 *
 */
const Root = styled(Menu)`
    display: flex;
    justify-content: space-between;
    align-content: center;
    min-width: auto;
    transform: none;
    padding: var(--spacing-sm);
    grid-area: logo;
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 15:25
 */
export default Root;