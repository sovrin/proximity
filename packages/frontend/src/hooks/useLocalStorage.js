/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.06.2019
 * Time: 18:09
 */
export default (cursor, module) => {
    /**
     *
     * @param key
     * @returns {null|*}
     */
    const load = (key = null) => {
        const json = localStorage.getItem(cursor) || '{}';
        const store = JSON.parse(json);
        const {[module]: context} = store;

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

        if (!store[module]) {
            store[module] = {};
        }

        store[module][key] = value;

        const string = JSON.stringify(store);
        localStorage.setItem(cursor, string);
    };

    return {
        load,
        save
    };
}
