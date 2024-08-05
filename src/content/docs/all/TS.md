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
- interface - used specify a format/type of an object, commonly used as contract, that specifies a structure of a class/object
	- can be used as abstract class, that other classes are `implement` 
	- unlike `type` interface's purpose is more about defining an object structure and to work with classes(they themselves can be extended etc), but `type` is more about aliasing other type or some kind of type combination
		- extending is done via `extend`, which states that interface must have all properties of it's "parent", but can have some more
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
	- `number | string` (it is also called a Hybrid Type, meaning variable can be some of those types)
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

## Functions
TS functions are same as JS, but with possibility add add parameter, return types(can be generic)

Interestingly, you can declare two+ functions with same name, but different parameters(overload functions) and TS will determine which one to execute, based on number, type or order of parameters, like this:
```ts
function aF(a: number): number;
function aF(a: string): string;

function aF(a: number | string): number | string {
  return a;
}
```

It is useful pattern when migrating from JS to TS, but it general better keep one function <-> one use-case(interface) and not overcomplicate function

## Classes
Similar to JS, but with some extra syntactic sugar and types

One of main features is constructor params with access features, this allows not only state access restrictions to a property, but auto-init this property
Consider classical approach and TS one:
```ts
class A {
  a: string;
  b: number;
  
  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}

class A {
  constructor(public a: string, private b: number) {}
}
```

We can also do constructor overloading, similar to function one, by specifying several types and one implementation, that covers all cases

Access modifies:
- public (default) - property can be accessed from everywhere
- private  - property can be accessed only from inside of a class
- protected - property can be accessed only from inside of a class or it's subclass

Abstract classes - class, that acts as blueprint for other classes, that can't be instantiated and only can be extended by subclass
- can consist of abstract methods without implementation, that must be overridden and implemented
```ts
abstract class A {
  abstract a(): void;

  b(): string { return "b"; }
}
```

We can do Polymorphism and Inheritance in TS via method overriding and `extends` 
- unlike in JS, when overriding we must keep signature(parameters and result type) exactly the same

TS allows to use decorators in classes(property, method and parameter) in a way of adding additional functionality
- useful for logging, validation, optimization etc
```ts
function log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // do smth
    
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class A {
  @log
  a() {}
}
```

## Generics
Generic is standard pattern, that allow functions to work with different parameter types, where type will be specified similar to placeholder
```ts
function a<T>(b: T): T {
  return b;
}
```

Key note, that TS have mechanisms to infer generics, so good written generic function can avoid explicit type annotation at all

We can use generics with: function, class, interface, object type

It is possible to constrain generic via `<T extends Type>` syntax, which states to TS, that `T` must implement `Type` 

## Advanced Types
Set of type constructs that enables more advanced typings

commonly used:
- mapped types - new type is generated by mapping keys of existing type
	- example: `readonly [Key in keyof TObj]: TObj[Key]; // make all keys readonly` 
- conditional types - new type is selected via boolean condition of input types
	- example: `T extends U ? T : U` 
	- example: `T extends (...args: any[]) => infer R ? R : any;` 
		- this code is extracting return type of a function, by using `infer` keyword, that creates type variable, that can be referenced in true branch of `extends` condition
- literal types - literal value set as type, meaning we can set a specific number, string or boolean value as type
	- TS will check not only for type, but also for value to be same
	- example: `type Num = 37;` 
- template literal types - way to manipulate string templates by injecting types into them
	- example:
```ts
type s = `some text with ${number} in it`;
```
- recursive types - way to define type, that references itself
	- common for data structures like linked lists or trees

#### Utility Types
- `Partial<TObj>` - make all object properties optional
- `Pick<TObj, strLiteral | strLiteral2 ...>` - take specified properties from object
- `Omit<TObj, strLiteral | strLiteral2 ...>` - take all properties from object and remove specified ones
- `Readonly<TObj>` - make all properties readonly
- `Record<TKey, TVal>` - make object type with specified key, value types
	- commonly used with `satisfies` and type mapping
- `Exclude<type1 | type2 ..., type3 | type4 ...>` - exclude specified types from union type
- `Extract<type1 | type2 ..., type3 | type4 ...>` - take specified types from union type
- `NonNullable<T>` - construct type by excluding `null | undefined` 
- `Parameters<TFunc>` - construct tuple type from types of function parameters
- `ReturnType<TFunc>` - gives type, that function will return
- `InstanceType<typeof TClass>` - gives class constructor function type type
- `Awaited<Promise<T>>` - unwraps(recursively) promise type and returns it

## THIS
In TS we can explicitly set interface of `this` 

Can be done:
- automatically if function is an obj method
- declaratively, by acknowledging fact that JS restricts parameter with name this, in such way:
```ts
filter: (this: User) => boolean
```

## Other
Modules - used for code organisation and reusability
- internal(namespace) - used in a file scope
	- example
```ts
namespace Module {
	export const a = () => undefined;
}

Module.a();
```
- external - used in a project scope
	- external modules can be compiled into JS's CommonJS or ES modules
	- example:
```ts
export const a = () => undefined;

////

import a from "path/to/file";
a();
```
- .
	- sub-variation of external module is possibility to include code into one file in compilation process via `/// <reference path="File.ts" />`, which will inject code from `File.ts` into current file
		- referencing is used in combination with namespaces
- ambient - type of modules that provide types for non TS modules(via `d.ts` files)
	- example:
```ts
// Module.d.ts
declare module 'module' {
  export function a(): void;
}
```

Augmentation - way to add declarations to some scope(namespace or global)
- main use-case is  to type safely extend `window`, `global` etc
- global augmentation example:
```ts
// NodeAugmentation.d.ts
declare namespace NodeJS {
  interface Global {
    someFunc(): void;
  }
}

// main.ts
global.someFunc = function () {
  console.log('Hi!');
};

someFunc();
```

Ecosystem:
- Prettier - formatting
- ESLint - linting
- Build tools:
	- use-cases: spinning-up servers, compiling/transpiling/minifying/etc code, serving files, linting, pre-commit checking etc
	- vite - most popular of them
- Other popular packages:
	- zod - real-time data validation lib
	- ts-morph - manipulation with TS code
	- ts-node - direct TS execution in node env
	- ts-jest - TS enabler for Jest(testing lib)