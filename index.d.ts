declare global {
    interface TypedArray extends Iterable<number> {
        readonly length: number;
        readonly byteLength: number;
    }
}

/** Splits a string into chunks by the given separator. */
declare function split(str: string, separator: string | RegExp): string[];
/** Splits a string into chunks with the given length. */
declare function split(str: string, length: number): string[];
/** Splits a number into serials with the given step. */
declare function split(num: number, step: number): number[];
/** Splits a Buffer into chunks by the given separator. */
declare function split<T extends Buffer>(buf: T, seperator: string | Buffer): T[];
/** Splits a Buffer, an ArrayBuffer, or a TypedArray into chunks with the given byteLength. */
declare function split<T extends Buffer | ArrayBufferLike | TypedArray>(buf: T, byteLength: number): T[];
/** Splits an array into chunks of arrays with the given length. */
declare function split<T extends Array<any>>(arr: T, length: number): T[];
/** Splits an array-like object into chunks of arrays with the given length. */
declare function split<T>(list: ArrayLike<T>, length: number): T[][];
/** Splits a collection into chunks with the given size. */
declare function split<T extends Set<any> | Map<any, any>>(collection: T, size: number): T[];
/** Splits an object into multiple objects with partial properties. */
declare function split<T extends object>(obj: T extends Function ? never : T, size: number): Partial<T>[];
export default split;