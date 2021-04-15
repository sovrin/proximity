import {isValidElement, useMemo} from 'react';

/**
 *
 * @param seed
 * @param length
 */
const useUnique = (seed?: any, length = 12) => {
    const CHARS = 'ABCDEF012345679';

    if (typeof seed === 'object') {
        if (isValidElement(seed)) {
            seed = {
                key: seed.key,
                props: seed.props,
                type: seed.type,
            };
        }

        seed = JSON.stringify(seed);
    }

    if (typeof seed === 'string') {
        seed = ~~seed.split('')
            .map((char) => char.charCodeAt(0))
            .join('')
        ;
    }

    seed = seed || new Date().getTime();

    /**
     *
     */
    const xorshift = (): number => {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 5;

        return seed;
    };

    /**
     *
     */
    const generate = (): string => {
        const stack: number[] = [];

        do {
            const numbers = xorshift()
                .toString()
                .replace('-', '')
                .split('')
                .map(n => ~~n)
            ;

            stack.push(...numbers);

        } while (stack.length < length);

        return stack.slice(0, length)
            .map((n) => CHARS[n % CHARS.length])
            .join('')
        ;
    };

    return useMemo(generate, [seed, length]);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.03.2020
 * Time: 22:21
 */
export default useUnique;
