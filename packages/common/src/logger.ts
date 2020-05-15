const Level = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
};

const Adapter = {
    CONSOLE: console.log
};

interface IOptions {
    adapter?: Function,
    level?: Number,
}

/**
 *
 * @param options
 */
const factory = (options: IOptions) => {

    /**
     *
     * @param level
     * @param message
     */
    const add = (level, message) => {
        // if (level > (Level[level] || 5)) {
        //     return;
        // }

        return write({
            timestamp: new Date(),
            severity: level,
            message,
            pid: process && process.pid || 'NONE'
        });
    };

    /**
     *
     * @param timestamp
     * @param severity
     * @param message
     * @param pid
     */
    const format = ({timestamp, severity, message, pid}) => {
        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDay();
        const hours = timestamp.getUTCHours();
        const minutes = timestamp.getUTCMinutes();
        const seconds = timestamp.getUTCSeconds();
        const milliseconds = timestamp.getUTCMilliseconds();

        const time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

        return `[${time} ${severity} (${pid})] ${message}`;
    };

    /**
     *
     * @param input
     */
    const write = (input) => {
        const adapter = options.adapter || Adapter.CONSOLE;
        const string = format(input);

        return adapter(string);
    };

    /**
     *
     * @param severity
     */
    const define = (severity) => (
        (message) => add(severity, message)
    );

    return {
        debug: define(Level.DEBUG),
        info: define(Level.INFO),
        warn: define(Level.WARN),
        error: define(Level.ERROR),
        fatal: define(Level.FATAL),
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.04.2020
 * Time: 16:47
 */
export default factory;