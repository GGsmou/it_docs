---
title: Code_Snippets
---
Sanitizer builder, based on template tag function syntax
```js
class SanitizerBuilder {
  constructor(stringSanitizer) {
    const isIncorrectSanitizer =
      !stringSanitizer || typeof stringSanitizer !== 'function';

    if (isIncorrectSanitizer) {
      throw new Error('Invalid stringSanitizer provided');
    }

    this.stringSanitizer = stringSanitizer;
  }

  sanitize(...args) {
    return args[0]
      .map((string, index) => {
        const toSanitize = args[index + 1];

        return string + (toSanitize ? this.stringSanitizer(toSanitize) : '');
      })
      .join('');
  }
}

const underscoreSanitizer = new SanitizerBuilder((string) => `_${string}_`);

console.log(underscoreSanitizer.sanitize`Hello, ${'world'}!`); // Hello, _world_!
```

String functions, based on template literals
```js
const main = `${(function () {
	console.log("I am inside a string!");
})()}`;
```

`.toString()` that we all deserve
```js
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

obj[Symbol.toStringTag] = JSON.stringify(obj);

console.log(obj.toString()); // [object {"a":1,"b":2,"c":{"d":3}}]

```
