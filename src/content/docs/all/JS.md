---
title: JS
---

## Other
By using flag `--require ./path/toFile.js` for `node` we can add some file to be called with main file we call
- usage: add some global module that is not required in other files

#### Node shortcuts
npm run start -> npm start -> npm s?
npm install -> npm i
npm run test -> npm test -> npm t

#### JSDoc
add typing to functions with native JS

to use, add comment before function in this format:
```js
/**
* @param {number} a
* @param {string} b
*/
```

#### Interesting
- if you declare variable inside `<script>` tag it will become global

## Data normalizing
Data normalizing - process of transforming arbitrary list of data to list where we have one entity at a time and in other places we have links to this entity

## V8
JS engine by google

Compiles js into machine code with features like caching, optimizing, garbage collection etc
Used in browsers and Node.js

Code inside `try {}` is not optimized and usually slower

## Regex (Regular Expression)
Regex is used to validate/filter some text data
Works by comparing substr inside str

Regex is heavy operation, so better use simple expressions for small data sets
- sometimes better use self written solution

## Service Worker
Service worker - browser api
- for simplicity we can call it as hybrid of proxy and js(file) between client and browser

- have ability to cache, work with requests etc
- async
- can't work with DOM directly
- is some file, that is scoped by page, globaly etc
	- if we have global and scoped sw on page only scoped will work

#### Use Cases
- usually used with listening fetch event
- caching (work with `caches` obj)
	- can make website work offline
	- usually better to init cache on install

#### Life Cycle
- Register. Triggers every time.
	- cases other steps
- Download. Can be seen in network, on registration
	- if registered won't be reregistered later
- Install. Goes directly after download and linked to it
	- can be listened as event
- Activation. Indicates that service worker is ready to work
	- can be listened as event
	- not always instantly triggered after install, so we can `self.skipWaiting()` on install stage
- Update. Triggered after changes inside js file, after ~24hours of AFK
	- causes downloading, installing and activation again

#### Other
- if we change request we will see old request and changed response
- active not working for first time, can be fixed with `event.waintUntil(clients.claim())` on activate
- can't communicate directly, only with messages
- external lib: work box

## Lodash
utility library to work with different data structures in compact and clean way

it is good practice to check if some method is present before writing it

popular methods are(by convention lodash is imported as `_`):
- `.sumBy(arr, () => number)` // calculate sum from array
- `.get(obj, 'location.to[1].propertie', default)` // find some data from nested obj by path
- `.groupBy(arr, () => propertie)` // group list of data by some field
- `.deepClone(obj)` // return a deep cope of some obj
- `.uniqBy(arr, 'field')` // filters array of objects to be unique by some properte
	- `.sortBy`, `.orderBy` // same, action is described in name
- `.isEmpty(arr)` // checks if array is empty or even present
	- native clean way: `arr?.length > 0`
- `.isEqual(obj1, obj2)` // check for deep equality


## Requests
#### Ajax
Tool to reload-less client-server communication

#### XMLHTTP
Old, native, everywhere supported method to request some data

pros:
- you can track downloading progress, so it is great for file upload related stuff

#### Fetch
Modern, well supported, native way of doing HTTP requests

#### Axios
Similar to Fetch, but it is a lib with some additional features, like middlewares

## You don't know JS book
#### Naming and Spec
JavaScript is named after Java as branding for "web Java" and name still owned by Oracle
JavaScript/JS has official name ECMAScript(ES) and it is also a standard for how to implement JS(browser, Node.js erc)

TC39 is tech committee that decides on new changes and later addresses them to ECMA
- TC39 is managing open source proposals too
- every proposal are gone gone through 0-4 stages

JS engines (ideally) fully implement JS spec
Spec has appendix B that includes some historical inconsistencies in browser JS spec
Some methods like `alert`, `console.x`, `fs.write` etc aren't in spec, but universal-ish in JS environment

JS is muliy-paradigm lang

#### Updates
JS is backward compatible(new changes don't break old code), but not forwardcompatiable(new changes can't be run in old version)
- HTML/CSS are opposite

To address forwardcompatiable problem transpiling(babel is most popular) invented
- transpiling - converting new syntax to old one, like `let` -> `var` 

Transpiling won't help in new-new-API case, so dev can write polyfill(wrapper for new API that implemented with old APIs)
- there are library of official polyfills
- often babel can add polyfills

#### Interpretation
There two polar types of langs: interpreted and compiled, BUT it is not binary and rather a spectrum
- interpretation works by executing code line by line
	- any errors are throw in run time
- compiling works by converting code to Abstract Syntax Tree (AST), analyzing for static(syntax, type etc) errors, then to binary code and then executed

JS has a parsing step and kinda compiled, but not fully
- kinda, because after parsing it has conversion to optimized binary code(binary intermediate representation), that can be executed by virtual machine aka JS engine(similar to Java)
JS also has Just-In-Time optimizations on BIR(post parsing)

#### WebAssembly(WASM)
In it's core WASM is tool to convert some lang to binary representation of JS, that can be read by JS VM without need in additional optimizations

It is also suitable like general purpose VM
- ironically it is hard to WASM to convert JS itself because of lack of type-safety :)

#### Strict
Optional(highly enforced in new code bases) list of additional rules to make JS safer and cleaner
- best-practice is Strict + linter + prettier
- de facto is default but technically not for backwardcompatability

some of strictness comes in form of new Static errors
in strict `this` defaults to `undefined` 

turned on with `"use strict";` on first line per file
- can be not on first line if there are comments/blank space above

ES6 modules enforces strict

#### Files
Each file is a program, but executions helps them to organically communicate, by mixing them in a runtime
- it is done, so if one file throws, other will still operate
Seamless communication is achieved via global scope, BUT after ES6, we can make files to be scoped(modular)

#### Values
- primitive
	- string - ordered collection of chars, can be defined with quotes(\` ' ")
		- \` - doing interpolation on string, aka resolving some value into string
	- boolean
	- number
	- bigint
	- null
	- undefined
	- symbol - unguessable, uniq value, that can be used as object key
		- created by Symbol("string"), BUT Symbol("string") !== Symbol("string")
- objects
	- array - special type of object for ordered, numerically indexed collection of items
	- object - unordered, keyed collection of items with string keys

typeof tells type, BUT with some catch :)

```js
typeof 42;                  // "number"
typeof "abc";               // "string"
typeof true;                // "boolean"
typeof undefined;           // "undefined"
typeof null;                // "object" -- oops, bug!
typeof { "a": 1 };          // "object"
typeof [1,2,3];             // "object"
typeof function hello(){};  // "function"
```

coercion is converting between types

value can be literal(declared in place) or stored in some var

#### Var, let, const
*junior interview be like*

|              | var | let | const | function |
| ------------ | --- | --- | ----- | -------- |
| mutability   | +   | +   | -*    | -        |
| block scoped | -   | +   | +     | -        |
| hoisting     | +   | -   | -     | +        |
\* - if const is a pointer, it's referenced value still can be changed, BUT it can be const via TS `as const` 

#### Functions
We can call JS functions as procedure - collection of statements that can be invoked one or more times, that has output/input

- `function name(){}` - function declaration, with name to func mapping on compile state
- `const name = function(){}` - function expression(function is assigned to to var as expression), where function is associated with it's name on runtime

JS functions are treated as values(or special type of Object) and can be passed around as in Functional Language

Func can receive 0-infinity parameter(local to function vars)

Func can be set as Object param

#### Comparisons
- strict equality `===` - compare two values, without possibility of converting types
	- type equality is always checked, but in === it is strictly must be the same
	- NOTE
		- 3 === 3.0 // true
		- NaN === NaN // false
			- Number.isNan(NaN) // true
			- Object.is(NaN, NaN) // true
		- 0 === -0 // true
			- Object.is(0, -0) // false
		- {} === {} || \[] === \[] etc // false
			- because it is pointers comparison(opposite to structural equality, where we compare content)
	- coercive comparisons OR loose equality `==` - compare two values, with converting to same type if possible
		- agreed to be dangerous to use
		- `==` and `===` do same value comparison
		- tend to do primitive numeric comparison
		- can't be avoided, because `> < >= <=` are also coercive :)
			- two strings will resolve in dictionary-like comparison 

#### Code Organization
- classes
	- class defines a "type" of custom data structure that includes data and behavior
	- class is not a value, but value can be got from class via `new` aka class is instantiated
		- methods can be called only on instances
	- inheritance is JS is done via `extends` + `super()`, so we can define common parent and extend it's functional
	- JS classes also have polymorphism, because they allow children classes to override existing methods
- modules
	- have same goal as classes to combine data with behavior, with additional possibility of module interactions
	- Classic Modules
		- it is similar to classes, but we are creating a function, that incapsulates data and returns some object with methods to interact with data inside
			- factory pattern
	- ES Modules
		- wrapping function is changed to wrapping file that incapsulates all data and `exports` all behaviors
		- we can say ESM is a singleton, caze it's instance created on first `import` and after that other imports receive a reference

## Clean Code JS
adaptation of Clean Code principles onto JS

#### Variables
- use meaningful and explanatory variable names
- create simular vocabulary(getClient, createClient, ~~updateUser~~)
- don't use magic numbers
- don't repeat context in var names(~~Car.carModel~~)
- default values in func is better than `name || "Joe"`
- useful pattern to create objs with default value
```js
const defaultObj = {
  name: 'Joe',
  age: 18,
}

const obj = {
	...defaultObj,
	name: 'Mike'm
}
```
- avoid negative conditions in vars(for example: isNotLoading)
#### Functions
- it is good to limit func args to 2-3. If more is needed it is better to use object arg with destruction
	- approves testability
	- single responsibility
- **one func - one task**
	- avoid adding different functional based on args(for example: `createUpdateUser(toUpdate: bool)`)
- func name must describe func
- DRY by adding right abstractions to codebase
- avoid side effects(write files, modifying vars)
	- it is good practice to create one service that will handle mutations/side effects
	- usually it is better to clone and return new obj then modify passed into func
- don't extend default functions/classes by adding property to prototype
	- better approach to create superClass that extends default
```js
class superArr extends Array {
	findSumm() {}
}
```
- it is good practice to lean towards functional programing(for example: `arr.map().reduce` instead of doing it line by line)
- encapsulate conditions
```js
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
- decrease if/else by polymorphism and single responsibility
- avoid typechecking by using TS + polymorphism
- don't over optimize if it is already handled under hood
- remove dead code

#### Objects and Data structures
- prefer get/set
	- adds possibility to process/validate data + possibility to error handling and logging
	- encapsulation
- it is good practice to add chaining to class
- composition better then inheritance
	- it is still good to use inheritance when:
		- object1 "is-a" object2 (Human is an Animal)
		- object1 reuses code from object2 (Human moves like Animal)
#### [Solid](Architecture.md#Solid)

#### Testing
More important that shipping. Ideally cover 100% of codebase with tests

- one test - one task
- async/await >> Promise >> callback

#### Error handling
- throw - good
- it is bad to add catch but left error unhandled
	- console.log is better, but still not preferable

#### Formatting
- use auto-formatting tools
- good rule to name classes from capital and const capsed
- keep caller and callee close
- comments are good, but even better when code documents itself
	- remove commented code
