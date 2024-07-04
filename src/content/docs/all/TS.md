---
title: TS
---
TS is superset(backwards compatible) of JS, created to build large scale projects with type safety, backwards compatibility and additional features(it is common for TS to implement some TC39 non-released proposals)
- in it's core, TS is type liner for JS with some additional stuff, that is added via compilation step
	- types - added via annotations or automatically and throw compile-time errors
		- *or not, just use as any ;)* 
		- note, TS is based on inferred types, so you don't always have to add types by hand, but sometimes it can be useful/necessary
		- TS uses structural type compatibility checks, meaning two types will be treated the same, if they have identical fields(despite the order)
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
- classes - similar to JS's classes, but with
	- syntactic sugar
		- you can specify params of `constructor` and TS will auto init them
	- property access modifiers: `private`, `protected`, `public` for in-class, class+children or public method access
- enum - object-like numeric or string-base type, that commonly used to create set of cases
	- can be used as runtime value, caze compiled into real JS object
	- if no value provided to enum key it will be numeric(`prev` + 1)
		- if no `prev` it set to `0` 
- array - used to specify type of an array
	- can be done as `Array<T>` or `T[]` 
- tuple - array-like structure, but we type it's exact size and what type of each element in it
	- example: `type Tuple = [number, string];` 

#### Other
- any - basically states that value can be anything, so we can access any methods, call it as function etc, without any type error
	- generally unrecommended to use
- object - similar to interface, but used specifically with objects
	- example: `type Obj = {a: number, b: boolean};` 
- unknown - safer version of any
	- we can assign any value to `unknown`, but we can use unknown value like some type, before adding some type-checking
- never - represent some value, that can be never achieved
	- examples
		- result of a function that always throws
		- type after impossible type-narrowing
	- we can assignee `never` to every type, but not backwards(except `never` itself)

## Assertion
Assertion is a way to state to TS, that value must be treated differently and not what it inferred to be

syntax:
- `<T>value` 
- `value as T` - more common

variations:
- `as const` - compiler should treat value as read-only
- `as T` - override inferred type to something else
	- usually a way to tell a compiler additional info about value, that compiler don't know
	- ok to use, but not the best practice
- `value!` - non nullish assertion, tells compiler that value can't be `null | undefined` 
	- *can lead to runtime errors and down-time in production, so be careful :)* 
- `satisfies` - used to ensure that expression is matched with type, but make it not so strict as interface
	- useful when we need to make object with keys from enum(or similar type) and some type of value

## Type Combination & Manipulation
- union - combine multiple types into one, that represents all of them
	- `number | string` 
- intersection - create new type from combination of properties of other types, with saving all properties
	- `ObjType1 & ObjType2` 
- type alias - possibility to create alias for other type
	- common example: `type A = {a: number};` 
	- interesting example: `type Number = string;` 
- `keyof` - used to extract object keys as union type
	- `type AKeys = keyof A; // "a"` 

## Type Guards & Narrowing
Technic to narrow down a type(for example union to just one of the types in it) in order to do some specific actions with it
- `typeof` - default JS way to get string name for variable type
	- commonly used for primitive types
- `instanceof` - default JS way to check if some object is prototype-instance of a Class
- `===` - can also auto-narrow type for TS
	- not commonly used, but may be helpful
- `const isNum = (v: unknown): v is number` - such function is called type predicate, it returns `boolean`, which determents value type
	- in modern TS it is rare to meet this type of a functions, but earlier they can be met in filters to guarantee that we filter out some type from array

notes:
- TS don't expect values in `if`, `||`, `!!` etc use-cases to be `boolean` 


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
