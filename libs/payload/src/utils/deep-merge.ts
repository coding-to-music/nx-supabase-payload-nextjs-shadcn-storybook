// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- [bulk suppress]
// @ts-nocheck

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
// eslint-disable-next-line func-style -- [bulk suppress]
export function isObject(item: unknown): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
// eslint-disable-next-line func-style, @typescript-eslint/no-unnecessary-type-parameters -- [bulk suppress]
export function deepMerge<T, R>(target: T, source: R): T {
    const output = {...target};
    if (isObject(target) && isObject(source)) {
        for (const key of Object.keys(source)) {
            if (isObject(source[key])) {
                if (key in target) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                    output[key] = deepMerge(target[key], source[key]);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                    Object.assign(output, {[key]: source[key]});
                }
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
                Object.assign(output, {[key]: source[key]});
            }
        }
    }

    return output;
}
