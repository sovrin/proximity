/**
 *
 */
const factory = () => {
    let stack = [];

    /**
     *
     * @param project
     */
    const get = (project) => {
        if (!project) {
            return stack;
        }

        /**
         *
         * @param acc
         * @param entry
         */
        const aggregate = (acc, entry) => {
            if (entry.project === project) {
                acc.push(entry);
            }

            return acc;
        };

        return stack.reduce(aggregate, []);
    };

    /**
     *
     * @param project
     * @param socket
     */
    const register = (project, socket) => {
        stack.push({
            project,
            socket,
        });
    }

    /**
     *
     * @param socket
     */
    const unregister = (socket) => {
        const filter = (entry) => {
            return entry.socket !== socket;
        };

        stack = stack.filter(filter);
    }

    return {
        register,
        unregister,
        get,
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.05.2020
 * Time: 21:25
 */
export default factory