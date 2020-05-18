import React, {Children} from 'react';
import Provider from 'contexts/Page';
import Root from 'styles/atoms/Page.style';
import useTheme from 'hooks/useTheme';

/**
 *
 * @returns {*}
 * @constructor
 */
const Page = ({children}) => {
    const data = {};

    Children.forEach(children, (child) => {
        const {type: {name}} = child;
        const key = name.toLowerCase();

        data[key] = child;
    });

    const {header, sidebar, content, overlay} = data;

    useTheme();

    return (
        <Provider>
            <Root sidebar>
                {header}
                {sidebar}
                {overlay}
                {content}
            </Root>
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.11.2019
 * Time: 22:06
 */
export default Page;