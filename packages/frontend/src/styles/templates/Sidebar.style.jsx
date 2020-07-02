import styled from 'styled-components';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled('div')`
    grid-template-rows: min-content;
    grid-template-columns: min-content auto;
    padding: var(--spacing);
    grid-area: sidebar;
    min-width: auto;
    max-height: 100vh;
    transform: none;
    color: var(--white);
    background: var(--accent);
    z-index: 10;
    display: grid;
    
     grid-template-areas:
       "logo switch"
       "version version";

    @media (max-width: ${Breakpoint.MD}) {
        grid-area: content;
        position: relative;
        left: 0;
        
        ${({collapsed}) => collapsed && `
            left: -100%;
        `}
    }    
}
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:40
 */
export default Root;