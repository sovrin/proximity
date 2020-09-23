import React from 'react';
import PropTypes from 'prop-types';
import classNames from '@thomann/classnames';
import useRouter from 'hooks/useRouter';

/**
 *
 * @param className
 * @param onClick
 * @param children
 * @param href
 * @param _rest
 * @returns {*}
 * @constructor
 */
export const Link = ({className, onClick, children, href, ..._rest}) => {
    Link.propTypes = {
        href: PropTypes.string
    }

    const {push, route} = useRouter();

    /**
     *
     * @param e
     */
    const handleClick = (e) => {
        e.preventDefault();
        push(e.target.href);

        onClick && onClick(e);
    };

    className = classNames(className, {
        active: href === route
    })

    return (
        <a
            className={className}
            onClick={handleClick}
            href={href}
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