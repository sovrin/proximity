import styled from 'styled-components';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled('div')`
    display: flex;
    flex-direction: column;
    padding: var(--spacing);
    grid-area: sidebar;
    min-width: auto;
    max-height: 100vh;
    transform: none;
    color: var(--white);
    background: var(--accent);
    z-index: 10;
    
    > * {
        margin-bottom: var(--spacing); 
        
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    
    @media (max-width: ${Breakpoint.MD}) {
        grid-area: content;
        position: relative;
        left: 0;
        
        ${({collapsed}) => collapsed && `
            left: -100%;
        `}
    }    
}`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:40
 */
export default Root;