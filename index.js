"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { isArrayLike, isBufferLike, isCollectionLike } = require("is-like");

/**
 * @param {string} name
 * @param {any} value
 */
function checkNumberArgument(name, value) {
    if (typeof value !== "number") {
        throw new TypeError(`argument '${name}' must be a number`);
    } else if (value < 1) {
        throw new RangeError(`argument '${name}' must be 1 or higher`);
    }
}

/**
 * @param {ArrayLike<any>} arr 
 * @param {number} length 
 * @param {number} total
 */
function splitArrayLike(arr, length, total = void 0) {
    let result = [];

    for (let i = 0, j = (total || arr.length); i < j; i += length) {
        if (typeof arr.slice === "function") {
            result.push(arr.slice(i, i + length));
        } else {
            result.push(Array.prototype.slice.call(arr, i, i + length));
        }
    }

    return result;
}

/**
 * @param {Buffer} buf 
 * @param {string|Buffer} sep 
 */
function splitBuffer(buf, sep) {
    let result = [];
    let offset = 0;
    let length = sep.length;
    let total = buf.byteLength;

    while (offset < total) {
        let index = buf.indexOf(sep, offset);

        if (index !== -1) {
            result.push(buf.slice(offset, index));
            offset = index + length;
        } else {
            result.push(buf.slice(offset));
            offset = total;
        }
    }

    return result;
}

/**
 * @param {any} obj 
 * @param {number} size 
 */
function splitObject(obj, size) {
    let proto = Object.getPrototypeOf(obj);
    let keyChunks = splitArrayLike(Object.keys(obj), size);
    let result = [];

    for (let keys of keyChunks) {
        let chunk = Object.create(proto);
        result.push(chunk);

        for (let key of keys) {
            chunk[key] = obj[key];
        }
    }

    return result;
}

/**
 * @param {number} num 
 * @param {number} step 
 */
function splitNumber(num, step) {
    let result = [];
    let offset = 0;

    while ((offset += step) <= num) {
        result.push(offset);
    }

    if (num > offset - step) {
        result.push(num);
    }

    return result;
}

/**
 * @param {string|number|object} obj 
 * @param {string|number|RegExp} cond 
 */
function split(obj, cond) {
    if (arguments.length < 2) {
        throw new SyntaxError(`2 arguments required, received ${arguments.length}`);
    } else if (typeof obj === "string") {
        if (typeof cond === "string" || cond instanceof RegExp) {
            return obj.split(cond);
        } else {
            checkNumberArgument("length", cond);
            return splitArrayLike(obj, cond);
        }
    } else if (typeof obj === "number") {
        checkNumberArgument("step", cond);
        return splitNumber(obj, cond);
    } else if (Buffer.isBuffer(obj) && (typeof cond === "string" || Buffer.isBuffer(cond))) {
        return splitBuffer(obj, cond);
    } else if (isBufferLike(obj)) {
        checkNumberArgument("byteLength", cond);
        return splitArrayLike(obj, cond, obj.byteLength);
    } else if (isArrayLike(obj)) {
        checkNumberArgument("length", cond);
        return splitArrayLike(obj, cond);
    } else if (isCollectionLike(obj)) {
        let ctor = obj["constructor"];
        checkNumberArgument("size", cond);
        return splitArrayLike([...obj], cond).map(list => new ctor(list));
    } else if (typeof obj === "object" && obj !== null) {
        checkNumberArgument("size", cond);
        return splitObject(obj, cond);
    } else {
        throw new TypeError("argument 'obj' must be a string, a number or an object");
    }
}

module.exports = split;
module.exports.default = split;