import React from 'react';
import Entry from './Entry';
import useCollector from 'hooks/useCollector';
import Root, {Body} from 'styles/pages/content/Feed/Entries.style';

/**
 *
 * @returns {*}
 * @constructor
 */
const Entries = () => {
    const data = useCollector();
    const children = data.map(Entry);

    return (
        <Root>
            <Body>
                {children}
            </Body>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 21:26
 */
export default Entries;
