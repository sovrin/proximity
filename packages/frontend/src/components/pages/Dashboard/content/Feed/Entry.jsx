import React from 'react';
import Root, {Column} from 'styles/pages/content/Feed/Entry.style';

/**
 *
 * @param data
 * @param context
 * @returns {*}
 * @constructor
 */
const Entry = ({data, context}) => {
    return (
        <Root key={data.message}>
            <Column>
                {data.message}
            </Column>
        </Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:35
 */
export default Entry;