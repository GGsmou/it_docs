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

