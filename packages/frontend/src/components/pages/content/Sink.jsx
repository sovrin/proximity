import React from 'react';
import Selector from 'contexts/Selector';
import useCollector from 'hooks/useCollector';

/**
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const Sink = ({children}) => {
    const collected = useCollector();

    /**
     *
     * @param acc
     * @param value
     * @returns {*}
     */
    const build = (acc, {data, context}) => {
        const {project} = context;

        if (!acc[project]) {
            acc[project] = {
                entries: [],
                length: 0
            };
        }

        acc[project].entries.push(data);
        acc[project].length++;

        return acc;
    };

    /**
     *
     * @param data
     * @returns {{}}
     */
    const gather = (data) => {
        const meta = {};
        const projects = Object.keys(data);

        for (const project of projects) {
            const {[project]: {length}} = data;

            meta[project] = {
                length
            }
        }

        return meta;
    }

    const data = collected.reduce(build, {});
    const meta = gather(data);

    return (
        <Selector
            data={data}
            meta={meta}
        >
            {children}
        </Selector>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.06.2020
 * Time: 15:07
 */
export default Sink;