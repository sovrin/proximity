import React from 'react';
import Root, {Container} from 'styles/templates/Content.style';

/**
 *
 * @returns {*}
 * @constructor
 */
const Content = ({children}) => (
    <Root>
        <Container>
            {children}
        </Container>
    </Root>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.11.2019
 * Time: 00:32
 */
export default Content;