import React from 'react';
import useSettings from 'hooks/useSettings';
import Root from 'styles/pages/header/Version.style';

/**
 *
 * @returns {*}
 * @constructor
 */
const Version = () => {
    const {version, switch: collapsed} = useSettings();

    if (collapsed) {
        return null;
    }

    return (
        <Root>v{version}</Root>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 19:14
 */
export default Version;