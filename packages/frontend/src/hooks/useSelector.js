import React, {useContext} from 'react';
import {Context as Selector} from 'contexts/Selector';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.06.2020
 * Time: 15:26
 */
export default (key) => {
    const {data, meta} = useContext(Selector);

    if (key) {
        return data[key];
    }

    return meta;
}