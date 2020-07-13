import {useEffect} from 'react';

const SPRITE = '/sprite.svg';
const ID = '#sprite';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.07.2020
 * Time: 15:06
 */
export default (path = SPRITE) => {

    // const check = () => {
    //     return document.querySelector(ID);
    // }

    /**
     *
     */
    const fetch = () => {


        /**
         *
         */
        const onLoad = (e) => {
            const {currentTarget: {responseText}} = e;
            const $sprite = document.createElement('div');
            $sprite.setAttribute('id', ID);
            $sprite.innerHTML = responseText;
            document.body.insertBefore($sprite, document.body.firstChild);
        };

        const req = new XMLHttpRequest();

        req.open('GET', path, true);
        req.send();
        req.onload = onLoad;
    };

    useEffect(() => {
        if (check()) {
            return;
        }

        fetch();
    }, [path]);
}