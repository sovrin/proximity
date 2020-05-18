import styled from 'styled-components';
import {Overlay} from '@thomann/spectre-react-components/OffCanvas';

/**
 *
 */
const Root = styled(Overlay)`
    backdrop-filter: blur(5px);
    transition: all 5s ease ;
`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 19:39
 */
export default Root;