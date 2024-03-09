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

#### Stop Throwing Errors
JS doesn't treat errors as values, so we can't be sure that function won't throw at runtime without knowing it's implementation
- this leads to risk of missing try/catch

we can fix it by using explicit return type like this:
```ts
type Return = {success: false; error: Error} | {success: true; data: SomeDataType}
```
now we can be sure that function might return error, as well as handle it without try/catch

it is not always best solution, because sometimes it is good to throw error, so some middleware or other catcher will catch and handle it, but this strategy is useful

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

## EventLoop - Node.js
#### Node.js
Node.js - JS runtime build on top of V8 Chrome Engine, with event-driven, non blocking I/O model

I/O - input / output and refers to communication with PC's CPU
- libuv lib is handling multiplatform async work with I/O for Node.js
- ![](../../../assets/it_6.png)

Event-Driven model is based on Reactor pattern
- make I/O request(fs.read) -> passed to EventLoop -> passed to Event Demultiplexer -> calls C++ function -> result goes back to Event Demultiplexer -> result is wrapped into event and added to Event Queue -> when call stack is empty our callback is executed with data from event

Node.js components
- V8 - engine for parsing and execution of JS
- libuv - provider of EventLoop and I/O operations
- core modules - non standard JS modules like http, fs etc
- c++ bindings - wrapper to require custom compiled C++ modules
	- can be generated with Node.js compiler and required like this: `require('./my-cpp-module.node');` 
- deps - other small utility libs for low level operations

#### EventQueue - MarkroTasks
EventLoop - mechanism to semi-infinitelly process and handle events

Events are queued into several queues with different priorities and executed after stack is empty

| Queue Name   | Description                                                                | Priority | Is all events need to be executed |
| ------------ | -------------------------------------------------------------------------- | -------- | --------------------------------- |
| Timer        | queue for setTimeout, setInterval                                          | 1        | +                                 |
| I/O          | most of async operations(network, system)                                  | 2        | +                                 |
| Immediate    | queue for setImmediate(registered and executed as soon as JS picked it up) | 3        | +                                 |
| Close events | queue for closing connection events(DB, TCP etc)                           | 4        | +                                 |
Empty loop ~= few milliseconds

EventLoop is tracking how many ongoing tasks and when they are done, their count is decreased
- if equal to 0 loop is exited

`setTimeout(..., 0)` !== `setImmediate`, because EvebtLoop CAN(not always) be so fast, that timeOut won't be registered at all for this cycle and will appear at next

#### EventQueue - MicroTasks
I/O Polling
- I/O events are added to their queue not when they are ready(as other events), but after I/O polling

Between each macrotasks we have JS execution period of time(same as before EventLoop), inside which we have micro tasks as process.nextTick(1 priority) Promise(2 priority), with their own dedicated queues
- there also others microtasks as MutationObserver, queueMicrotask etc
- microtasks are checked by V8, after all JS is executed

process.nextTick have the highest priority among all of others, BUT can block EventLoop and kill performance

microtask queues block EventLoop and must be cleared

in Node version < 11 microtasks was executed between queues and not macrotasks, but for web compatibility it was changed

#### EventLoop
EventLoop is not fully part of V8, V8 is only parsing and executing JS + microtasks, but macrotasks are done by libuv
- ![](../../../assets/it_7.png)

#### EsModules
EsModules are async by design, so when we init our program, inside first EventLoop promises will have highest priority

#### libuv
I/O operations can be:
- blocking: file, dns etc
	- require different thread
- non-blocking: network
	- several tasks can execute in simultaneously

for blocking tasks libuv uses Thread Pool, so we can simultaneously execute this tasks on different threads(4 by default if any blocking operation is present in code)
on top of that we have threads that occupied by default for garbage collection etc

DNS lookup is blocking, but can by made it non-blocking with some effort

#### Other
Custom promises(Bluebird.js)
- Can collet all promises into one macrotask to reduce blocking time
- Can executer promises on some other phase

## EventLoop - Browser
Similar to Node.js EventLoop, BUT with addition to some DOM related tasks and with no strict order in macro/micro tasks queues

Most of the time JS engine doing nothing and runs only when some event, script, handler activates

Rendering happens between macrotasks and blocked by their execution
- some very heavy tasks can block whole browser(not responsive to user events), so browser might suggest to kill this process with page

Same as in Node microtasks queue empties in-between each macrotask
- microtasks are mostly come from promises, but can be also manually queued by `queueMicrotask(func)` 

macrotasks
- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering
microtasks
- process.nextTick
- Promises
- queueMicrotask
- MutationObserver

Other
- heavy tasks can be split into smaller once and wrapped into zero second setTimeout, that will not block DOM
	- it is better to setTimeout earlier in code, because even zero second timeout has some delay in it
	- you can show some loading via this split, because otherwise change in DOM will be shown after whole process is finished

## You don't know JS book
>I've also had many people tell me that they quoted some topic/explanation from these books during a job interview, and the interviewer told the candidate they were wrong; indeed, people have reportedly lost out on job offers as a result.

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
- function in JS is first-class value

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

#### Iteration
It is important to have consistent method to work with large quantity of data, that's why we have iterator pattern, that can iterate through some set of data and stop iterating at some point

there is `next()` method in JS, that returns object named iterator result, which consists of `done: bool` and `value: any`, where done indicates, that iteration of set is finished

`for of` is a syntax to consume iterators
`...` - spread and rest operator
- SPREAD
	- this form of operator is an iterator consumer
	- we need some place to spread data into(array, function call)

iterator was created as base for iterable values aka value that can be iterated
- iterator instance created from iterable on demand
- string, array, map, set etc - iterable, so we can do smth like this:
```js
const greeting = "Hello";
const chars = [ ...greeting ];

chars; // [ "H", "e", "l", "l", "o" ]
```
- map has iterator that returns tuple value in a form of `[key, value]` 
	- `.keys()` gives us a list of keys
	- `.values()` gives us a list of values
	- `.entries()` gives us tuple, but for any iterable(for array it will be: `[index, value]`)

#### Closures
>Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.

objects don't have closures, only functions

common closure use-case - async functions, when we close some data inside function, that is executed after some time, but still remembers data

#### This
Function has two characteristics:
- scope - attached to function via closure, represents a list of static rules, that controls resolution of references and values. It is attached, when function is defined
	- hidden inside JS engine
- context - similar to scope, but attached on call stage and can be accessed via `this`. Context is dynamic and can differ from call to call
	- object, that has properties, that made available for function
	- this aware function - function, that depends on it's context

if this aware func is called without strict mode, it will look to it's context and then to global window object, in order to resolve value

WAYS TO MAKE THIS AWARE FUNCTION:
- call function as object method -> this === object
- function.call(obj, arg1, arg2) -> this === obj
- function.apply(obj, \[arg1, arg2]) -> this === obj
- const f = function.bind(obj) -> this(inside f) === obj

classes are heavily based on `this` 

#### Prototype
NOTE: JS is one of not many, who give access to direct object creating

`this` is characteristics of a function and prototype is characteristics of an object that helps to resolve property access
- basically prototype is hidden link between two objects
- prototype chain - series of objects linked via prototype
	- it is called "behavior delegation"
- prototype helps in delegation(inheritance) of methods
	- by calling some method on current obj, JS will try to find it on this object first, than on it's prototype in chain and return first occurrence || undefined

`const newObj = Object.create(obj)` - safe way to set newObj.prototype to obj
- if obj is null, newObj will have no prototype(event Object.prototype)

`this` highly benefits from prototypes. It is dynamic in JS and can resolve from different objects. Example:
```js
var homework = {
    study() {
        console.log(`Please study ${ this.topic }`);
    }
};

var jsHomework = Object.create(homework);
jsHomework.topic = "JS";
jsHomework.study(); // Please study JS

var mathHomework = Object.create(homework);
mathHomework.topic = "Math";
mathHomework.study(); // Please study Math
```
as we can see `this.study` resolves from homework, but `this.topic` still from object itself

#### Scope
Lexical scope model
- scope is a block of code in which variable can be accessed
	- can be nested
	- variables from higher scope can be accessed, but not from lower
	- how variables are placed determined at parsing/compiling stage

JS is has lexical scope model, BUT with some differences:
- hoisting - variable can be declared at any place of scope, but treated as it is declared at beginning of it
- var-declared - by declaring variable with `var` inside the scope it is accessible outside a block
- temporal dead zone(TDZ) - by declaring variable with `const/let` there is a part of program, where you can try to call in-scope variable, but it is not accessible yet, because it is not declared
	- result in `ReferenceError` 
```js
let x = 10;
if (true) {
 console.log(x); // ReferenceError: Cannot access ‘x’ before 
 let x = 20; // decalre
}
```

#### Why JS Uniq
Prototype, Closure+Scope, Types+Type Equality

#### Values and References
In JS type determines if our variable will contain value or reference

Primitives are always passed as copies

Object values(like functions, arrays, objects) are stored as reference, so we can pass and copy the pointer, but not value itself

#### Function forms
We have function declaration and function expression(setting func to var)

Function expression can be done with anonymous function, BUT it and some other functions will still have `.name` property, reflecting declared OR variable name
- mainly used for stack trace
- function expression's name will be `""` if it is passed as an argument
- function is still anonymous because it can't refer to itself, `.name`  is just metadata

We can also declare var with named function expression(name of var and func can be different, BUT `.name` will be from expression)

Generator function can be declared like this:
```js
function *generator(){...}
```

Also there are arrow functions, Immediately Invoked Function Expression(IIFE), async variations, class/object methods(not different from function in JS terms)
- arrow functions are anonymous by design
- key difference is that arrow function is referring to `this` from place it was declared AND NOT from place it was called, so it kinda closer to scope and perfect for callbacks inside methods
```js
showSkills() {
    this.skills.forEach(function (skill) {
      console.log(`${this.name} is skilled in ${skill}`); // this.name === undefined
    });
  },
```

#### Coercive in conditionals
if, while, for, `? :` have different from `===` or `==` comparison type, they are doing conversion to boolean each time, so:
```js
// if("hello") === if(Boolean("hello") == true)
```
So we still meat coercive comparison, BUT in a way of just type transformation to boolean

#### Prototypal "Classes"
*Aka classes before classes*

It is old syntax, but classic for JS and it looks like this:
```js
function A() {}

A.prototype.hi = () => console.log("hi");

const a = new A();
mathClass.hi(); // hi
```

It is possible, because all functions in JS refer to empty object as prototype, that will become prototype of objects, created from function via `new` 

#### Practice 1
- comparison
	- `str.slice("")`  can be changed with `str.match(regex)` 
	- `"07:15" < "07:30" // true` - example of valid string alphabetic comparison, that can be used to compare time, if time is in valid format

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
