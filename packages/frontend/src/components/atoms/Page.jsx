import React, {Children} from 'react';
import Header from 'components/templates/Header';
import Sidebar from 'components/templates/Sidebar';
import Overlay from 'components/templates/Overlay';
import Content from 'components/templates/Content';
import Provider from 'contexts/Page';
import Root from 'styles/atoms/Page.style';
import useTheme from 'hooks/useTheme';

/**
 *
 * @returns {*}
 * @constructor
 */
const Page = ({children}) => {
    useTheme();

    const data = {};

    Children.forEach(children, (child) => {
        const {type: {name}} = child;
        const key = name.toLowerCase();

        data[key] = child;
    });

    const {header, sidebar, content} = data;

    return (
        <Provider>
            <Root sidebar>
                <Header>
                    {header}
                </Header>

                <Sidebar>
                    {sidebar}
                </Sidebar>

                <Overlay/>

                <Content>
                    {content}
                </Content>
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