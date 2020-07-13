import React, {useEffect, useRef} from 'react';
import useExternalAsset from 'hooks/useExternalAsset';

/**
 *
 * @returns {*}
 * @constructor
 */
const Sprite = ({path}) => {
    const ref = useRef(null);
    const onData = useExternalAsset('/sprite.svg');

    /**
     *
     */
    const fetch = (path) => {

        /**
         *
         */
        const onLoad = (e) => {
            const {currentTarget: {responseText}} = e;

            ref.current.innerHTML = responseText;
        };

        const req = new XMLHttpRequest();

        req.open('GET', path, true);
        req.send();
        req.onload = onLoad;
    };

    useEffect(() => {


        if (!path) {
            return;
        }

        fetch(path);
    }, [path]);

    return (
        <div
            id="sprite"
            ref={ref}
        />
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 17:34
 */
export default Sprite;