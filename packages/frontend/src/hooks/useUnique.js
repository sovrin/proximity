/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.03.2020
 * Time: 22:21
 */
export default (seed = null) => {

    const LEN = 10000;

    /**
     *
     * @param target
     * @returns {number}
     */
    const traverse = (target) => {
        if (target === null) {
            target = Date.now();
        }

        if (typeof target === 'object') {
            target = JSON.stringify(target);
        }

        if (typeof target === 'function') {
            target = target.toString();
        }

        if (typeof target === 'string') {
            target = target.split('')
                .map(c => c.charCodeAt(0))
                .map((n, i) => n * (i + 1))
                .reduce((acc, n) => acc + n)
            ;
        }

        return target;
    }

    /**
     *
     * @returns {Generator<number, void, ?>}
     */
    const seeder = function* () {
        seed = traverse(seed);

        while (1) {
            yield Math.abs(Math.sin(seed++) * LEN) * 10 % 10 / 10;
        }
    };

    /**
     *
     * @returns {number|void}
     */
    let next = () => {
        const seeded = seeder();

        next = () => (
            seeded.next().value
        );

        return next();
    };

    /**
     *
     * @param min
     * @param max
     * @returns {number}
     */
    const between = (min, max) => (
        ~~(next() * (max - min + 1) + min)
    );

    /**
     *
     * @param max
     * @returns {number}
     */
    const upper = (max) => (
        ~~(next() * (max + 1))
    );

    /**
     *
     * @param target
     * @returns {*}
     */
    const shuffle = (target) => (
        target.reduce((acc, _, i) => {
            const j = upper(i);

            [acc[i], acc[j]] = [acc[j], acc[i]];

            return acc;
        }, target.slice())
    );

    /**
     *
     * @param length
     * @param charset
     * @returns {string}
     */
    const string = (length = 18, charset = 'ABCDEF012345679') => (
        [...Array(length)]
            .map(next)
            .map((n) => upper(n * LEN))
            .map((n) => charset[n % charset.length])
            .join('')
    );

    return {
        shuffle,
        upper,
        between,
        next,
        string,
    };
};
