import {Link as Base, useRoute} from 'wouter';
import classNames from '@thomann/classnames';

/**
 *
 * @param props
 * @constructor
 */
const Link = ({href, className = null, ...rest}) => {
    const [isActive] = useRoute(href);

    className = classNames(className, {
        active: isActive,
    });

    return (
        <Base
            {...rest}
            href={href}
            className={className}
        />
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.04.2021
 * Time: 22:43
 */
export default Link;
