import React from 'react';
import 'spectre.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import Connection from 'contexts/Connection';

const App = () => {
    return (
        <Connection>
            hello world
        </Connection>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:47
 */
export default App;