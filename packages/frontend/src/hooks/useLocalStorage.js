import useSettings from './useSettings';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.06.2019
 * Time: 18:09
 */
export default (mod) => {
    const {version, namespace} = useSettings();
    const cursor = `${namespace}:${version}`;

    /**
     *
     * @param key
     * @returns {null|*}
     */
    const load = (key) => {
        const json = localStorage.getItem(cursor) || '{}';
        const store = JSON.parse(json);
        const {[mod]: context} = store;

        if (!context) {
            return null;
        }

        return (key)
            ? context[key]
            : context
        ;
    };

    /**
     *
     * @param key
     * @param value
     */
    const save = (key, value) => {
        const json = localStorage.getItem(cursor) || '{}';
        const store = JSON.parse(json);

        if (!store[mod]) {
            store[mod] = {};
        }

        store[mod][key] = value;

        const string = JSON.stringify(store);
        localStorage.setItem(cursor, string);
    };

    return {
        load,
        save
    };
}
