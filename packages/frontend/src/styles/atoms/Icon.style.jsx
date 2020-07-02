import styled from 'styled-components';

/**
 *
 */
const Root = styled('i')`
    display: flex;
    width: var(--unit-6);
    height: var(--unit-6);
    
    &.huge {
        width: var(--unit-10);
        height: var(--unit-10);
    }
    
    &.big {
        width: var(--unit-8);
        height: var(--unit-8);
    }
    
    &.small {
        width: var(--unit-4);
        height: var(--unit-4);
    }
    
    &.tiny {
        width: var(--unit-2);
        height: var(--unit-2);
    }
    
    > svg {
        width: 100%;
        height: 100%;
    }
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 15:25
 */
export default Root;