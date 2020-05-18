import React from 'react';
import Tabs from '@thomann/spectre-react-components/Tabs';
import Project from './Project';
import useCollector from 'hooks/useCollector';

/**
 *
 * @returns {*}
 * @constructor
 */
const Projects = () => {
    const data = useCollector();

    /**
     *
     * @param acc
     * @param context
     * @returns {*}
     */
    const accumulate = (acc, {context}) => {
        const {project} = context;

        if (acc.includes(project)) {
            return acc;
        }

        acc.push(project);

        return acc;
    };

    /**
     *
     * @param acc
     * @param value
     * @returns {*}
     */
    const build = (acc, value) => {
        acc.push({
            namespace: value,
        });

        return acc;
    };

    const children = data.reduce(accumulate, [])
        .reduce(build, [])
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