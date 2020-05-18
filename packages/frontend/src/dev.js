import React from 'react';
import {render} from 'react-dom';
import Proximity from './components/Proximity';

render(
    <Proximity/>,
    document.getElementById('proximity'),
);

if (module.hot) {
    module.hot.accept();
}

