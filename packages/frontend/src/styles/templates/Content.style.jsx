import styled from 'styled-components';
import {Content} from '@thomann/spectre-react-components/OffCanvas';
import BaseContainer from '@thomann/spectre-react-components/Container';
import {Breakpoint} from 'hooks/useTheme';

/**
 *
 */
const Root = styled('div')`
    //grid-area: content;
    padding: 0 !important;
    max-height: 100vh;
        //transition: all 0.4s;
    grid-area: content;
    align-items: start;
`;

export const Container = styled(BaseContainer)`
    width: 100%;

`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:37
 */
export default Root;