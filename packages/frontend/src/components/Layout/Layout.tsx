import {Children, cloneElement} from 'react';

type Props = {
    type: 'header' | 'content' | 'overlay' | 'sidebar',
    children: any,
}

/**
 *
 * @param Component
 * @param _rest
 * @constructor
 */
const Layout = ({children, ..._rest}: Props) => (
    Children.map(children, (child) => (
        cloneElement(child, {
            ..._rest,
        })
    ))
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.04.2021
 * Time: 22:16
 */
export default Layout;
