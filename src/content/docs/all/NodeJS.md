---
title: NodeJS
---
## Enterprise Node by Khalilstemmler
#### DTOs as Layer of Indirection
Different parts of software must be connected in order to do somethings useful, BUT too tight connection will cause waterfall changes into downstream, when upstream introduce some change (thigh coupling)

Data Transfer Objects is one way to lower coupling, by introducing mapping of DB/ORM models into our own DTOs, thus
- introducing single point of change (by adding single mapper)
- hiding implementation details of DB
	- dependency inversion
- allowing for changes more easily
	- the easier is to change design decision the better
- creating a contract for API

You have domain objects (that your domain layer needs), data transfer objects (that your clients need), and the raw sequelize objects (that your database needs). The mapper handles transformations between all of 'em.

#### Event Based Systems
Event Based Systems go hand-in-hand with DDD and is a great way of thinking and dealing with complex problems, because it is:
- easy to express communication, ex: UserRegistered -> EmailVerificationSent -> EmailVerified
- possible to record system state as history of events
- possible to scale by making heavy operations async
- reduce complexity via indirection

#### Functional Error Handling
Happy path is not only one, so we need a way to deal with errors
- errors represent state and need to be handled properly in proper place
- throwing errors is mass disruption to flow of code, that can be seen as kinda of a `goto` AND also it is just harder to reason about your program

Errors can and should be a part of domain model, strictly defined on interface, so it is easier to work with them
- this leads to function or golang or error as value approach, where you have concepts like: `Result<T>` OR even better `Either<E, T>`, so you can return T value OR E error
	- it is pretty hard to work with types, when errors are "thrown" all over the place
	- alternatives are:
		- return `null` - lead to impossibility or error handling, because no errors
		- throw `error` - harder to type + constant try/catch
	- in model above each error must have strictly defined type, so it is identifiable in any part of the code it propagates to
	- when working with Result you can create combination functional, that will calculate overall Result from array of Results
- in our model errors can be generic: Unauthorized, Unknown; domain related: business(UserNameAlreadyTaken), general(UserUnknownError)

note that is is more of a solution for your custom app, otherwise you should:
- for libs - throw OR return error in first callback, due to it been standard
	- btw, when working with external lib in your app you can and should create adaptors to match your style
- for broken state of an app - throw via invariant/assert to identify incorrect flow of code
- for unknown errors - throw, catch somewhere on top, log, return 500(or similar action)

note that such approach is harder to adopt, but worth on scale

#### Use-case layer
We can keep application logic as layer of use-cases, thus keeping all logic encapsulated and organized

use-case must:
- have actor, who would use it
- be command OR query
- be related to subdomain(a logical separation of the entire problem domain)(don't forget to distinguish between core and generic subdomains)
	- remember about Conway's law: Organizations that design systems, are constrained to produce designs that are copies of the communication structures of these organizations.
	- it must be possible to extract subdomain as micro-services

generally we will have such layers:
- domain to keep domain types and logic
- infra to keep networking, DB etc
- use-case layer to bound domain with infra with additional app logic

notes:
- your project structure must give basic proper understanding of your system
- use-cases must be executable in any env, if all dependencies are provided, meaning that we could pass them to server controller OR to test
- use-cases can use other use-cases

#### Clean Architecture
Our app must distinguish business logic(abstract, declarative) and infra logic(implementation focused, often imperative)

Business logic can't depend on infra

Define interfaces as strict contracts AND then define implementations of those interface for specific cases(ex: tests, server controller)
- by passing implementations as dependencies you enable testability and flexibility of your code
	- it is easy to test domain, it is harder and slower to test infra, BUT infra is often external(ex: Redis), so no much need to do so

The only way we can be certain about changing code is to have written tests for it.

#### Clean Contollers
We need to have some basic controller functional, that all other controllers will inherit, like:
- take req and send resp
	- it also includes proper parsing AND stringifying
- return 200/201 with/without data
- return 400/similar with custom error
- return 500/similar with default error
	- includes loggin, ideally via DI passed logger

## Understanding Core Concepts
Section will be about Node.js AND related BE topics

#### Intro
###### CLI
Command prompt - some info, that terminal will show to you all the time
Command line - input field to execute commands
Terminal - app to access CLI
Instruction - instruction to execute
- instructions are written in some scripting language

commands:
- `cd dir` - go to directory
	- cd == change dir
- `mkdir name name2 ...` - create folder
	- other commands also can chain inputs like so
- `pwd` - print current full path
- `touch name.ext` - create file
- `echo $var` - print string/parameter to console
	- `$var` is syntax to reference variable
- `ls filter` - list content of current dir
	- `filter` is glob patter (optional)
	- `-a` - show hidden files
- `mv path1 path2` - move OR rename file/folder
- `ssh` - connect to external server
- `vim`/`nano` - terminal text editors
- `cat file` - print content of a file
- `rm path` - remove path
- `man command` - command docs
- `open path` - open path with Finder

shortcuts:
- ctr+A - go to the beginning of a line
- ctr+E - go to the end of a line
- arrow-\[up/down] - move between command history

notes:
- `~` == home dir
- bash is stored as `.sh` 
- `..` go up a dir
- `|` - pipe output of command to other command
- `>` - extract output of command
- commands can be ran from inside, piped into and from a node.js

###### Node versioning
Always use LTS for production (LTS changes every 2 years)

To switch version you can use `nvm`:
- `ls` - list of installed node versions
- `(un)install version` (un)install new version of node
- `use version` use version of node
- \---
- npm -g will store packages scoped by version
- `.nvmrc` can be used to create dir scoped configs of nvm WITH possibility to always use specific node version(by specifying it at first line)
	- note: you still need to manually write `nvm use` 

###### NodeJS Under the Hood
Programing is basically talking to CPU, which requires Machine Code(low level set of instruction, uniq per processor architecture), which can be generated from Assembly Language, which can be generated from high-low-level programing language like C/C++, that expose low-level details to coder, which can be abstracted via high-level language, that abstract implementation details
- JS is example of such high-level language, while NodeJS is something, that makes it possible to run JS on device
- JS is first of all run by engine, like V8(embedded in NodeJS), SpiderMonkey etc AND only then embedded into other apps like NodeJS, Chrome etc, that expose additional functionality and syntax to it(ex: `window`, `global` etc), that is bound to JS
	- proper engine must implement ECMAScript specification, that states how JS must be ran

First major Node's dependency is V8 to run JS, while second is libuv, library that exposes functionality to interact with OS, in order for Node to be properly used as server-side language

Other important Node concept is Event Loop, that handles code execution and proper interaction between libuv and V8, in such way, that it enables us to write non-blocking async code
- non-blocking operations are achieved via event-driven nature of Node, where you say to do start doing somethings AND when this something is done execute smth else OR send event about the result of operation
- related commands:
	- `process.nextTick(cb)` - execute callback after main process is done
- watch out for operations that block main thread, such action will block both V8 and Event Loop
	- basically this happens due to Node been single threaded by it's nature
		- this still implies possibility of spinning up several instances of Node and communicate between them in multi-threaded manner
		- libuv have N(default = 4) ports to do sys-operations
			- Node aims to use as low number of threads as possible
	- in general avoid: heavy operations done in one byte(regex, file processing), heavy sync functions, complex operations

###### EventEmitter
Object, that Node exposes to utilize event-driven communication via Observer pattern
- EventEmitter is implemented in pure JS and can be reimplemented without Node
- events are used as a way to reduce overload, that otherwise will occur if we will do pseudo-events via something like polling(sync event management)

ex:
```js
const EventEmmiter = require("events");

const e = new EventEmmiter();

e.on("eventName", () => undefined);
e.once("eventName", () => undefined); // run only once
e.off("eventName", someCB) // unsubscribe from event

e.emit("eventName");
```

notes:
- CBs are called in order of assignment
- event will trigger all CBs to be executed, even if several events are triggered one after another
- Node provides identical to browser API methods for completeness sake

#### Buffers
