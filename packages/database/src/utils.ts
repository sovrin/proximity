/**
 *
 * @param object
 * @param key
 */
export const hasProperty = (object, key): boolean => (
    object.hasOwnProperty(key)
)

/**
 *
 * @param value
 */
export const isNumber = (value): boolean => (
    typeof value === "number"
);

/**
 *
 * @param value
 */
export const isRegexp = (value): boolean => (
    value instanceof RegExp
);

/**
 *
 * @param object
 */
export const isEmpty = (object): boolean => {
    for (const key in object) {
        if (hasProperty(object, key)) {
            return false;
        }
    }

    return true;
}

/**
 *
 * @param array
 */
export const isArray = (array): boolean => Array.isArray(array);

/**
 *
 * @param n
 * @param charset
 */
export const unique = (n = 32, charset = 'ABCDEF012345679'): string => (
    [...Array(n)]
        .map(Math.random)
        .map((n) => ~~(n* 100))
        .map((n) => charset[n % charset.length])
        .join('')
);

/**
 *
 */
export const timestamp = () => new Date().getTime();