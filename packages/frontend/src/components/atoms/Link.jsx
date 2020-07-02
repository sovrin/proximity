import React from 'react';
import useRouter from 'hooks/useRouter';

/**
 *
 * @param onClick
 * @param children
 * @param _rest
 * @returns {*}
 * @constructor
 */
export const Link = ({onClick, children, ..._rest}) => {
    const {push} = useRouter();

    /**
     *
     * @param e
     */
    const handleClick = (e) => {
        e.preventDefault();
        push(e.target.href);

        onClick && onClick(e);
    };

    return (
        <a
            onClick={handleClick}
            {..._rest}
        >
            {children}
        </a>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.06.2020
 * Time: 22:07
 */
export default Link;