# Split-Any

**A function to split any type of input into pieces.**

## Install

```sh
npm i split-any
```

## API

Currently, this function includes the following signatures.

#### `split(str: string, separator: string | RegExp): string[]`

*Splits a string into chunks by the given separator.*

```js
assert.deepStrictEqual(
    split("Hello, World!", ""),
    ["H", "e", "l", "l", "o", ",", " ", "W", "o", "r", "l", "d", "!"]
);

assert.deepStrictEqual(
    split("Hello, World!", /,\s*/),
    ["Hello", "World!"]
);
```

#### `split(str: string, length: number): string[]`

*Splits a string into chunks with the given length.*

```js
assert.deepStrictEqual(
    split("Hello, World!", 3),
    ["Hel", "lo,", " Wo", "rld", "!"]
);
```

#### `split(num: number, step: number): number[]`

*Splits a number into serials with the given step.*

```js
assert.deepStrictEqual(
    split(100, 10),
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
);

assert.deepStrictEqual(
    split(105, 10),
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 105]
);
```

#### `split<T extends Array<any>>(arr: T, length: number): T[]`

*Splits an array into chunks of arrays with the given length.*

```js
assert.deepStrictEqual(
    split(["Hello", "World", "Hi", "Ayon"], 2),
    [["Hello", "World"], ["Hi", "Ayon"]]
);
```

#### `split<T>(list: ArrayLike<T>, length: number): T[][]`

*Splits an array-like object into chunks of arrays with the given length.*

```js
/** @type {ArrayLike<number>} */
let args = null;
(function () { args = arguments; })(1, 2, 3, 4, 5, 6, 7, 8, 9);

assert.deepStrictEqual(
    split(args, 2),
    [[1, 2], [3, 4], [5, 6], [7, 8], [9]]
);
```

#### `split<T extends Buffer | ArrayBufferLike | TypedArray>(buf: T, byteLength: number): T[]`

*Splits a Buffer, an ArrayBuffer, or a TypedArray into chunks with the given byteLength.*

```js
assert.deepStrictEqual(
    split(Buffer.from(["Hello", "World", "Hi", "Ayon"]), 2),
    [Buffer.from(["Hello", "World"]), Buffer.from(["Hi", "Ayon"])]
);

assert.deepStrictEqual(
    split(Uint8Array.from([1, 2, 3, 4]), 2),
    [Uint8Array.from([1, 2]), Uint8Array.from([3, 4])]
);

assert.deepStrictEqual(
    split(new ArrayBuffer(8), 2),
    [
        new ArrayBuffer(2),
        new ArrayBuffer(2),
        new ArrayBuffer(2),
        new ArrayBuffer(2)
    ]
);
```

#### `split<T extends Buffer>(buf: T, seperator: string | Buffer): T[]`

*Splits a Buffer into chunks by the given separator.*

```js
assert.deepStrictEqual(
    split(Buffer.from("Hello, World, Hi, Ayon"), ", "),
    [
        Buffer.from("Hello"),
        Buffer.from("World"),
        Buffer.from("Hi"),
        Buffer.from("Ayon")
    ]
);

assert.deepStrictEqual(
    split(Buffer.from("Hello, World, Hi, Ayon"), Buffer.from(", ")),
    [
        Buffer.from("Hello"),
        Buffer.from("World"),
        Buffer.from("Hi"),
        Buffer.from("Ayon")
    ]
);
```

#### `split<T extends Set<any> | Map<any, any>>(collection: T, size: number): T[]`

*Splits a collection into chunks with the given size.*

```js
assert.deepStrictEqual(
    split(new Set(["Hello", "World", "Hi", "Ayon"]), 2),
    [new Set(["Hello", "World"]), new Set(["Hi", "Ayon"])]
);

assert.deepStrictEqual(
    split(new Map([["Hello", "World"], ["Hi", "Ayon"]]), 1),
    [new Map([["Hello", "World"]]), new Map([["Hi", "Ayon"]])]
);
```

#### `split<T extends object>(obj: T extends Function ? never : T, size: number): Partial<T>[]`

*Splits an object into multiple objects with partial properties.*

```js
assert.deepStrictEqual(
    split({ hello: "world", hi: "ayon", foo: "bar" }, 2),
    [
        { hello: "world", hi: "ayon" },
        { foo: "bar" }
    ]
);


class Test {
    constructor(data) {
        Object.assign(this, data);
    }
}

assert.deepStrictEqual(
    split(new Test({ hello: "world", hi: "ayon", foo: "bar" }), 2),
    [
        new Test({ hello: "world", hi: "ayon" }),
        new Test({ foo: "bar" })
    ]
);
```