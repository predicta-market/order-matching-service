/**
 * This function takes in an object and returns a copy of it
 * excluding the specified keys.
 *
 * @param input the object to sanitize.
 * @param exclude fields (keys) to omit.
 * @returns a sanitized copy excluding those keys.
 */
export function omit<T>(input: T, exclude: (keyof T)[]): Partial<T> {
    const obj = { ...input };
    exclude.forEach((key) => delete obj[key]);
    return obj;
}