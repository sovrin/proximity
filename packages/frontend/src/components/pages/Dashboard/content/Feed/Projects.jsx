import React from 'react';
import Tabs from '@thomann/spectre-react-components/Tabs';
import Project from './Project';
import useSelector from 'hooks/useSelector';

/**
 *
 * @returns {*}
 * @constructor
 */
const Projects = () => {
    const meta = useSelector();
    const projects = Object.keys(meta);

    /**
     *
     * @param project
     * @returns {{namespace: *, count: number, key: *}}
     */
    const build = (project) => ({
        key: project,
        namespace: project,
        length: meta[project].length,
    });

    const children = projects
        .map(build)
        .map(Project)
    ;

    return (
        <Tabs>
            {children}
        </Tabs>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.05.2020
 * Time: 20:38
 */
export default Projects;