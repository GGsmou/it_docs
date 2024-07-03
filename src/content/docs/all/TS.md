---
title: TS
---
TS is superset(backwards compatible) of JS, created to build large scale projects with type safety, backwards compatibility and additional features(it is common for TS to implement some TC39 non-released proposals)
- in it's core, TS is type liner for JS with some additional stuff, that is added via compilation step
	- types - added via annotations or automatically and throw compile-time errors
		- *or not, just use as any ;)* 
		- note, TS is based on inferred, so you don't always have to add types by hand, but sometimes it can be useful/necessary
	- syntax - improved classes, interfaces, `Set` etc
	- tooling - IDE integrations, compilers etc

## Compilation & Usage
Compilation(with the fact, that TS is superset) makes possible to use TS code as JS
- worse to mention, that you can also use JS in TS context by itself or(common practice) with `d.ts`(type definition) files, that describe types of exported function(similar to JSDoc)

usage
- install `typescript` package as dev-dependency
- add `tsconfig.json`, file for compile configuration
	- `target` - version of JS to compile to
	- `module` - module system to use
	- `strict` - strict type checking
	- `outDir` - output for compiled files
	- `rootDir` - dir with TS files to compile
	- `include` - array with additional dir patterns to compile
	- `exclude` - array with additional dir patterns to avoid compiling
- compile project/individual files via `tsc`, command line compilation tool
	- `tsc` can also take options from `tsconfig` via `--` parameters

there is alternative to `tsc` for Node.js - `ts-node`, which is hooking into node's APIs and enabling direct TS execution without compilation step

also there is possibility to run TS live in browser via [ts-playground](https://www.typescriptlang.org/play/) 

## Types
#### Primitive Types
- boolean - `true`/`false` value
- number - float or int values
- string - UTF-16 character sets
- void - usually inferred type, that signifies that function don't have explicit `return` OR returns nothing(`return;`)
- undefined + null - corresponding type for JS's `undefined` + `null`
	- note: TS allows to avoid nullish values check by disabling `strictNullChecks`, but it is usually not worst it
- symbol - corresponding type for JS's `Symbol` 

#### Object Types
- interface - used specify a format/type of an object
	- can be used as abstract class, that other classes are `implement` 
- classes - similar to JS's classes, put with
	- syntactic sugar
		- you can specify params of `constructor` and TS will auto init them
	- property access modifiers: `private`, `protected`, `public` for in-class, class+children or public method access

any
never
object
Enumerated types (enum)
Tuple types
Array types
Union types
Intersection types
Type aliases
Type assertions

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
