import React, {useMemo} from 'react';
import sprite from 'assets/sprite.svg';

/**
 *
 * @returns {*}
 * @constructor
 */
const Sprite = () => {

    /**
     *
     */
    const convert = (string: string) => (
        atob(string.replace(/data:image\/svg\+xml;base64,/, ''))
    );

    const svg = useMemo(() => {
        return convert(sprite);
    }, []);

    return (
        <div
            id="sprite"
            dangerouslySetInnerHTML={{__html: svg}}
        />
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 17:34
 */
export default Sprite;
