import styled from 'styled-components';
import {Toggle} from '@thomann/spectre-react-components/OffCanvas';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled(Toggle)`
    font-size: var(--unit-5);
    left: var(--unit-7) !important;
    position: fixed !important;
    top: var(--unit-5) !important;
    
    @media (max-width: ${Breakpoint.MD}) {
        z-index: 300
    }
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:35
 */
export default Root;