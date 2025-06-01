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
Binary data - data that consists of zeros and ones(aka base2 numbers), it is only data format that understood by computers
- 1 bit is single 0 or 1
- 1 byte is 8 bits
- convertion:
	- 01011 (base2) -> `1 * 2^0 + 1 * 2^1 + 0 * 2^2 + 1 * 2^3 + 0 * 2^4` -> 11 (base10)
- first digit of sequence is Least Significant Bit/Digit (LSB/LSD)
- last digit of sequence is Most Significant Bit/Digit (MSB/MSD)

Hexadecimal numbers - base16 numbers, that also widely used in computing, due to ease of conversion between base2 and base16, which enables easier notation etc
- 4 bits can be represented as single hex character, thus convertion can be easily done via table
- hex is notated as 0x... OR #...
- convertion:
	- 0x456 -> `6 * 16^0 + 5 * 16^1 + 4 * 16^2` -> 1110
- number are represented as 0-F(case insensitive)
	- 0-F == 0-15

To work with characters computer requires usage of character encoding, which is basically a table that maps characters to some base2 numbers in specific way
- ex:
	- ACSII // defines 128 characters of English language and related special characters, 8 bits per char, subset of unicode
	- Unicode(standard, that defines encodings: UTF-8, UTF-16, etc) // defines all possible characters
		- UTF-8 stores all characters in 8n bit sequences(8, 16, 24, 32)
- note that "9" isn't actual 9, it will be encoded as some other number
- characters are transformed in process of encoding(transforming readable data to some format) and backward one called decoding
- encoding must always be specified

Buffer - container(allocated location) in memory, basically a data-structure to work with memory, that used to fastly write, hold, operate and read data in it
- buffer is always prefilled with zeros
- Node buffers can be allocated and operated in byte size only
	- basically you can imagine it as an array with 1 byte per element
- buffer can't be re-allocated, it is fixed size
	- overflown data will be auto-discarded by Node
	- avoid allocating redundant memory
- buffer is limited by number of available RAM
- buffer can hold only positive values(0-255) per byte, BUT we can represent negative values via standards(ex: `(2's compliment + 1) * -1`)
- methods:
	- `Buffer.from(arr)` - allocate buffer of proper size and populate it with provided data
		- alternative is to provide: `(string, method)` args to it
	- `buffer.fill(value)` - fill value with provided value
	- \---
	- most of methods can be re-implemented, BUT it will be less efficient due to internal optimizations
- notes:
	- default max buffer size is 4GB, BUT it can be changed

Notes:
- URLs will encode non-ASCII chars as hexadecimals in UTF-8
- Node pre-allocates memory region to place there your buffers
- Buffer is subclass of `Uint8Array` 
- Buffers support operations like `.indexOf` and similar iterative things, like in arrays

```js
const { Buffer } = require('buffer');

const size = 16;
const filler = 420;

/*
allocation will always fill memory with `filler` OR `0`, so it can be slower
*/
const buf1 = Buffer.alloc(size, filler);

/*
allocate free region of memory, BUT don't clean it
risks: sensitive data can become part of a buffer, memory content might be compromised
if you need additional speed with safety, always fill this buffer ASAP
*/
const buf2 = Buffer.allocUnsafe(size);

const buf3 = Buffer.from([ /* ... */ ]);
const buf4 = Buffer.concat(buf1, buf2);

/*
the fastest way is to perform allocUnsafe on memory size that is <= Buffer.poolSize >>> 1 (>>> == bit shift to the right, with dropping LSD)
>>> is equal to division by 2 + Math.flour
*/

/*
Similar to unsafe, but doesn't utilize memory right away, so called slow
*/
Buffer.allocUnsafeSlow(size);
```

#### File System
When working with files in node you are actually working with Buffers, that represent content of file in binary format

File is basically a sequence of bits, that can be decoded in some specific manner(text, image etc)
- file has content AND metadata about this file
- Node is talking with OS via libuv that wraps SysCalls, that perform operations with files
	- any file operation will use thread pool

Node has 3 implementations for same `fs` API: sync, async via callbacks, async via Promises
- they has no difference underneath the hood, but simply just a syntactic sugar
- Promises are the easiest to use
- callbacks are the fastest
	- note: errors always passed as first values in cb
- synchronous can be used only for blocking operations

notes:
- `fs.watch` can fire events several times per one save due to OS, program and other issues, out of our control
- to properly execute read/write operations on file you need to open it first(assigns constant id number, that will identify this file and allow to refer to it for doing operation) AND then execute needed operation, using returned handler
	- files must be closed to avoid memory leaks
	- this operation allows fine grained access to file(open for long time, manage metadata, read in chunks, manage reading/writing streams etc), BUT it can be omitted, when you just need to quickly read somethings
	- reading will shift position, so you might need to override default params
- Node can decode/encode only characters, not images, videos etc

#### Streams
Basically stream is flow of some data, that either written OR read
- data is added/received in chunks
	- in Node, size chunk is 16kb
- with stream you may sacrifice speed, by doing additional operations, BUT get reduction in resource usage
	- BUT, if your data writes are smaller then 16kb, you will reduce number of operations
- types:
	- writable - used to write to
		- has internal Buffer to fill one chunk size, which will be emptied with corresponding operation(ex: write chunk to file)
		- Node will auto hold superfluous data in memory, if there is not place left in Buffer, until Buffer is emptied
			- stream has `drain` event that signifies, that Buffer emptied and can be filled again, SO you can prevent memory additional memory consumption
		- omit closing stream before it finishes it's execution to omit data loss
	- readable - used to read from
		- exposes `data` event, that will be fired after Buffer is filled and ready to be drained
		- readable stream is created in paused state, when event handler is added we start to read AND, after there is nothing else to read stream is closed
			- closed state can be detected by `"end"` event
	- duplex - writable + readable
		- has two separate Buffers to do reading and writing
	- transform - duplex, that can change data on fly

API
- writable stream
	- to check size of writable stream you can use `.writableHighWaterMark` AND to check how much of internal buffer is filled at the moment `.writableLength` exists
		- alternatively you can check `boolean` returned by `.write`, that will tell wether you can write to buffer OR write will go to memory
			- generally avoid writing if `.write` returns `false`, if you got `false` WAIT for `"drain"` event
		- `"drain"` happens only if full buffer fully emptied
	- to do last write and close stream you can use `.end(data)` 
		- next writes will always `throw` 
		- `.end` will emit `"finish"` event
	- if underlying resource(ex: file) is closed(`.close()`), stream will be closed and emit `"close"` event
	- stream can be prevented from flushing data by `.cork()` and later re-enabled by `.uncork()` 
	- `.destroy()` will remove stream and underlying buffer
	- you can change default encoding of stream via `.setDefaultEncoding()` 
- readable stream
	- `.pause()` can be used to stop reading AND `.resume()` to do the opposite
	- notes:
		- default buffer size for `fs` readable buffers is 64kb
		- when doing somethings like read from file and write to other file watch for backpressure, aka problem when you have higher input speed then output, THAT will ultimately cause memory issues
			- in `fs` this will happen due to hard-drive reading speed been much faster then write speed
