import React from 'react';
import Entry from './Entry';
import useCollector from 'hooks/useCollector';

/**
 *
 * @returns {*}
 * @constructor
 */
const Entries = () => {
    const data = useCollector();
    const children = data.map(Entry);

    return (
        <div>
            {children}
        </div>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 21:26
 */
export default Entries;
