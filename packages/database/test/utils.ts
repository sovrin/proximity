import {Adapter} from "~types/Adapter";

/**
 *
 * @param a
 * @param b
 */
export const equals = (a, b) => {
    if (Array.isArray(a)) {
        a = a.sort();
    }

    if (Array.isArray(b)) {
        b = b.sort();
    }

    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 *
 * @param memory
 */
export const createAdapter = (memory): Adapter => ({
    /**
     *
     * @param key
     * @param data
     */
    write(key?: string, data?: object): Promise<void> {
        memory[key] = data;
        return Promise.resolve(memory[key]);
    },
    /***
     *
     * @param key
     */
    read(key: string): Promise<object> {
        return Promise.resolve(memory[key]);
    },
    /**
     *
     * @param data
     */
    serialize(data: object) {
        return data;
    },
    /**
     *
     * @param string
     */
    deserialize(string: string) {
        return string;
    }
})