import styled from 'styled-components';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled('div')`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: min-content auto;
    grid-template-areas: "sidebar content";
    max-height: 100vh;
    height: 100vh;
    overflow-y: auto;
    background: var(--white);

    @media (max-width: ${Breakpoint.MD}) {
        grid-template-areas: "content content";
    }
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:30
 */
export default Root;