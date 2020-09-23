import React from 'react';
import Menu, {Divider} from '@thomann/spectre-react-components/Menu';
import Entries from './Feed/Entries';
import Projects from './Feed/Projects';
import Sink from './Sink';

/**
 *
 * @returns {*}
 * @constructor
 */
const Feed = () => (
    <Menu>
        <Sink>
            <Projects/>
            <Divider>
                Feed
            </Divider>
            <Entries/>
        </Sink>
    </Menu>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:18
 */
export default Feed;