import {promisify} from "util";
import {readdir, stat} from "fs";

/**
 *
 */
export const read = promisify(readdir);

/**
 *
 */
export const stats = promisify(stat);

/**
 *
 * @param path
 */
export const load = async (path) => {
    let target;

    try {
        target = await import(path);
    } catch (e) {
        target = require(path);
    }

    if (target.default && typeof target.default === 'function') {
        target = target.default;
    }

    return target;
};

/**
 *
 */
export const uuid = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return pattern.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == 'x'
            ? r
            : (r & 0x3 | 0x8)
        ;

        return v.toString(16);
    });
};

/**
 *
 * @param obj
 */
export const set = (obj: object) => {
    const setter = (key: string, value: any) => {
        obj[key] = value;

        return setter;
    };

    return setter;
};

/**
 *
 * @param obj
 */
export const get = (obj: object) => (path: Array<string>) => (
    path.reduce((acc, v) => acc && acc[v], obj)
);