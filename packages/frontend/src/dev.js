import React from 'react';
import {render} from 'react-dom';
import Proximity from './components/Proximity';

import pkg from '../package.json';

const settings = {
    version: pkg.version,
    namespace: 'proximity'
};

render(
    <Proximity {...settings}/>,
    document.getElementById('proximity'),
);

if (module.hot) {
    module.hot.accept();
}

