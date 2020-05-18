import styled from 'styled-components';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled('div')`
    display: flex;
    position: absolute;
    right: var(--unit-7);
    top: var(--unit-5);
    
    @media (max-width: ${Breakpoint.SM}) {
        right: var(--unit-4)
    }
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:33
 */
export default Root;