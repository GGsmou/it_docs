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

API (for consumers)
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
	- stream can be in two modes `stoped` and resumed(`flowing`)
		- all streams are paused from the moment of creation, until `"data"` event is added OR some other stream is piped via `.pipe()` OR `.resume()` is called
		- stream will be stopped, if `.pause()` is called OR all piped streams are removed via `.unpipe()` 
		- can be tracked via `.readableFlowing` 
	- events:
		- `"data" / "readable"` - receive data chunks
			- don't mix `"readable"` and `"data"` event usage
		- `"end"` - reading is finished
		- `"close"` - stream is closed
		- `"pause` - stream is paused
		- `"error` - error happened
	- `.pipe()` allows to pass data from readable to writable stream, with auto-handling of backpressure 
		- accepts only writable stream OR duplex OR transform, both of which implement writable stream
		- pipe returns stream, that was passed into it, so you can chain duplex streams, BUT not writable streams
		- avoid using pipe, when already subscribed to `"data"` event of readable stream
		- `.unpipe()` can be used to pause/stop reading
		- there are several events: `"pipe"`, `"unpipe"` 
		- note, that `pipe` has bad error handling, so, for production, it is better to use `pipeline(source, ...duplex/transform[], destination, (err, val) => {}`, that will kill underlying streams on error and pass this error to cb OR return final value
			- by default `.pipe` won't do clean-up, so you need to manually call `.destroy()` on each stream
	- `.finished` - called when stream errored OR not writable/readable OR unexpectedly closed, so you can do clean-up
	- notes:
		- default buffer size for `fs` readable buffers is 64kb
		- when doing somethings like read from file and write to other file watch for backpressure, aka problem when you have higher input speed then output, THAT will ultimately cause memory issues
			- in `fs` this will happen due to hard-drive reading speed been much faster then write speed
		- `cat` unix command is analog of readable stream, because it will partially read file by chunks
		- your aren't guaranteed that data will be split in proper chunks, ex: `"123 123  123"` string can be read as `"12" + " 1" ...` 
		- `fs.copy` will copy via streams
		- by default, files over 2GB can't be read directly without streams

API (for custom streams)
- generally custom streams are created by inheriting from base stream class(`Writable`, `Readable`, `Duplex`, `Transform`), with need to implement some predefined set of methods
	- omit emitting events by hand OR overwriting existing methods, use predefined callbacks AND overwrite only internal, allowed methods
	- omit throwing errors inside custom functions, pass errors to callbacks
	- JS don't have multiple inheritance(thanks God), so Duplex is basically a built in class to do multiple inheritance from `Writable` and `Readable` 

- Duplex - stream that both writable and readable, BUT writing and reading is done fully separately(separate Buffers, separate source of reading and writing etc)
	- it is possible to make Duplex's read and write parts interact, BUT they don't have to
		- this will make duplex a transform string (subtype of duplex)
		- transform inherits from duplex, BUT read and write methods are set in described above manner
		- transform can be: put through(no data transformation occur) and proper transform(data is changed in some manner)

Notes:
- streams can be used in object mode, where we moving not buffers, but JS objects
	- `highWatermark` will specify number of objects
	- streams can also be used on FE in browser, mainly to work with network streams
		- note that browsers are using streams under the hood(ex: video streaming), BUT this API allows to utilize it in your code
		- Node has implementation of this API for compatibility, BUT it won't replace Node's streams API

#### Networking (*lowest level possible in Node*)
Node is designed and focused on scalable networking apps

Main concepts:
- on pre-networking era information was passed via floppy discs
	- write data to disk, physically move it to other PC and read from disk
- networking elements are:
	- ethernet cable to move data
	- switch to connect several PCs to it and form small network
		- switch is receiving and sending packets of information from/to PC
			- each packet contains addresses of source and destination
			- switch can lookup addresses via address table
	- networking card - part of PC, that enables connection between ethernet and PC
		- each card has MAC Address associated with it, which is uniq per device and basically a 48bits, represented by 6 hexadecimals, separated by `:` 
	- router - basically a higher order switch, that can communicate in between networks of switches via IP addresses (uniq address assigned to some device)
		- router assigns IP addresses to elements inside it's local network in similar uniq manner, BUT this IP addresses aren't uniq on global scale
- networking is broken into separate, but connected layers, that act as abstractions, that built one upon another
	- Physical - level where info is moved in form of bits via cables
	- Data Link - level where info is moved in form of frames, with backed in MAC addresses
		- done by switches
	- Network - level where info is moved in form of packets, with backed in IP addresses
		- done by routers, which calc shortest distance to other router
	- Transport - level where safety and lossless of data is guaranteed
		- data is moved in segments
		- additional responsibility is connection establishment and proper disconnection(notify both sides that connection closed)
		- port numbers are added on this level to connect to application layer
		- TCP and UDP live here (there are others, but Node doesn't have native support for them)
			- TCP - data is received in the way to sent
				- 3 way handshake is key algorithm -> A send connection packet, B respond with connection acknowledgment packet, A send data packets
				- headers (it has no IP related headers, because they are added on previous layer) (non-fixed size)
					- source port (16bits)
					- destination port (16bits)
					- sequence numbers (32bits) - keep data in order
					- acknowledgment numbers (32bits)
					- ...other...
					- data
				- ex: ssh, http
			- UDP - data is sent as fast as possible, with potential losses
				- headers (fixed size of 8 bytes)
					- source port (16bits)
					- destination port (16bits)
					- segment length (16bits)
					- checksum length (16bits) - to prevent data corruption
					- data
				- ex: http 3
	- Application - abstract layer, where data is just data, that can be operated upon
		- Node server
- Ports - a way to expose application to outside world (out of your PC)
	- it is device based, but standard recommends to:
		- 0-1023 -> system ports, that ran as sudo
		- 49152-65535 -> safe private ports
			- can be used for dynamic activity
		- several apps can be created in same port, BUT they must have different transport(TCP/UDP/etc)
	- there are list(iANA standard) of well known ports, that should be used for some standard activities
		- ssh = 22
		- http = 80 - specifying this port will redirect all http traffic without a port to your app

`net` - module to work with network (on lowest level possible in Node) and inter-process communication (IPC), both of which have similar API
- it is base for something like `http` module
- creating server
	- every app must have port bound to it for proper routing
	- after server is created it exposes TCP connection to specified port
		- in Node it is represented as duplex stream
- connection to server - `net` allows to establish TCP connections with other servers via sockets, which is also a duplex stream
	- connection will `throw`, if no server to connect was found, due to how TCP specification is made
	- connection will auto close, if server stops working
	- client also need to have port, so it will be opened on fly from "dynamic" range, specified by iana spec

`readline` - module to read line by line from readable stream
- can be greatly combined with `process.stdIn`, which is readable stream, that accepts input from console
	- basically `.question` will do all heavy lifting for you to achiev this

notes:
- all devices have built it loop-back address, which is universally standardized to be (`127.0.0.1`, or `localhost` DNS)
	- this address will reroute requests back to device(either by device itself OR by router)
- Node refers to opened connections as sockets, which, in SE world, means two opened connections, that have duplex style of communication
- server can have multiple connections from clients, BUT each connection is represented through separate socket object

IP - Internet Protocol (third layer in networking model)
IP Address - uniq address associated with device, that can be accessed through network
- v4 - 32bits, with 8 bits(0-255) per portion (4 portions), separated with `.` 
	- max number of uniq devices that can be in single network is 4 billion
	- IP comes with subnet mask, which indicates what portion of address is used for network and what for host (ex: 11111111.11111111.11111111.00000000, BUT in notation it will look like some `some.ip.add.ress/24`, where 24 is number of `1`, that can be in range of 0-32)
		- this network portion is used to distinguish what traffic is routed to which network AND then by network to what device to route it
		- great for distinguishing requests to local and non-local networks
		- network portions are stored as tables inside routers
		- this led to standardization of this masks in such way, that it is easy to route traffic across the globe
			- this results in IP address now containing your location in non-explicit manner
			- this list is somewhat dynamic
	- there are some private addresses, that used only for private networks and can't be accessed from outside of network
		- reason for their existence is to save on public IP addresses (4 billon limit problem) and avoid assigning IP addresses to devices, that won't need them in first place and can be just connected via private network)
		- to utilize them routers are doing NAT (Network Address Translation), that converts private IP address to public one
			- note that multiple privates can correspond to single public AND conflict resolution is done via NAT
		- ex:
			- 10.x.x.x
			- 172.16.x.x
			- 192.168.x.x
			- 127.x.x.x - loopback
				- note that for IPv6 this reduced to just use 127.0.0.1
	- some addresses are reserved for specific companies, like IANA
- v6 - while v4 is still widely used, we can't allocate new IPv4s, so we need to have standard with higher number of uniq addresses
	- in general it is faster and more improved version of v4 with higher capacity
	- addresses
		- 128 bits - 8 portions of 16 bits, separated by `:` and represented as 8 portions of 4 hex values
			- 2\^128 devices
		- leading zeros can be discarded
			- ex:
				- `00AF` -> `AF` 
				- `0000` -> `0` 
				- `0000:0000` -> `::` // can be done only once per address
		- case insensitive (due to hex rules)
	- private addresses:
		- loopback: `0000:0000:0000:0000:0000:0000:0000:0001` OR `::1` OR some other shorthand
		- AND thats it, because we don't need to safe them anymore ;)
	- adoption is hard due to legacy AND worsen UX, when working with such "ugly" numbers

DNS (Domain Name System) - system which basically doing conversion from human readable strings to IP addresses
- this all DNS resolution is handled by DNS servers, that contain tables for conversion
	- note that partial tables can be cached on any edge(browser, device, router, ICP, Country etc) of network
	- DNS servers are preconfigured on device, BUT this list can be reconfigured
		- reconfiguration can lead to DNS hijacking, where legit DNS is changed to route to non-legit IP
			- there is even dns module, built in in Node, that can do lookups and other related stuff
				- Node will auto-resolve DNSes for you, if domain name is passed instead of IP
	- built on top of TCP and can be built even via Node
- each PC has private DNS table, for things like `localhost` + caching, mentioned before
- great not only for UX, but to stabilize network, because single DNS can correspond to dynamic IP, or several IPs(great for keeping multiple servers on different edges of network and serve IP of closest one)
