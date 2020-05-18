import React from 'react';

/**
 *
 * @param data
 * @param context
 * @returns {*}
 * @constructor
 */
const Entry = ({data, context}) => {
    return (
        <div key={data.message}>
            {data.message}
        </div>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:35
 */
export default Entry;