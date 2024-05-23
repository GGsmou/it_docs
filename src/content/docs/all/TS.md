---
title: TS
---

## THIS
In TS we can explicitly set interface of `this` 

Can be done:
- automatically if function is an obj method
- declaratively, by acknowledging fact that JS restricts parameter with name this, in such way:
```ts
filter: (this: User) => boolean
```

## Other
we can create types for templated strings like this:
```ts
type s = `some text with ${number} in it`;
```
