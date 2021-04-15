import React, {Children} from 'react';
import Provider from 'contexts/Page';
import Sprite from './Sprite';
import style from './Page.module.css';

/**
 *
 * @param children
 * @constructor
 */
const Page = ({children}) => {
    const data = {};

    Children.forEach(children, (child) => {
        const {type: {name}} = child;
        let [key] = (name || '')
            .split('_')
            .slice(-1)
        ;

        key = key.toLowerCase();

        data[key] = child;
    });

    const {header, sidebar, content, overlay} = data as any;

    return (
        <Provider>
            <Sprite/>
            <div className={style.page}>
                {header}
                {sidebar}
                {overlay}
                {content}
            </div>
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.11.2019
 * Time: 22:06
 */
export default Page;
