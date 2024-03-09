---
title: General
---

## Analytics
- used to make data-based decisions
	- helps find a vector of grows for product
- must: be quick, be precise, collect as much data as possible
- it is ok if raw analytics data is hard to read

#### Quantity
- main way: we have object that contains data(name, event type, details) that sends when some event triggered
- investigate groups of people that have some patterns
- tools: google analytics

#### Quality
- main ways: polls, hit-maps, focus groups
- investigate how some patterns lead to general(quality) things
- tools: microsoft clarity

best way is make quantity analytics and based of that make quality research

analytics is not liked by regulators

#### Tools
- microsoft clarity(heat-maps, cursor track, scroll data etc)
- google analitycs

## Logging + Monitoring
Logging collects data and monitoring helps analize data

We log and monitor to
- collect statistical behavior(response time, how often breaks etc)
- hardware usage in general(memory, cpu etc)

By this we can find that something went or potentially will go wrong

#### Tools
- grafana - backend
- sentry - frontend

## Cache
used to store result of some costly operation, so we can use some memory space to save on computation power and lower computation time

main problems:
- cache invalidation
- memory leak(fixed by proper invalidation)

#### Cache invalidation
- SOLUTIONS:
	- ideal: data comes to an app and system updates/invalidates cache
		- hard to develop/update, slow, costly
	- simple: invalidate after some period of time(usually 5min) -- Time Limited Cache
		- can cause memory overflow if there is unexpectedly large request count at short period of time
	- fixed in size queue systems:
		- LRU(last result used) - if full, release something from back and add new to front
			- can't optimize for frequently used resources
		- LFU(last frequently used) - build simple map to track how often resource is used and prioritize its place in queue based on this number

#### FE cache
- in-memory(global object)
- cookies
	- have build in time limit
	- small, works everywhere
	- under 60kb in total size
	- can be set to domain and used across it
- local/session storage
	- locally save page state
- file system(read-only, write is deprecated)
	- basically it is API that is used to manipulate with some folder, that user gave permission to
	- works in chrome to write, but in MDN marked as deprecated and read-only

#### Other
- react deals with memory leaks with JS garbage collector
	- if we need to change memoized value we just recreate it with hook and old hook value just dies
- cache can be written with DB or even handled in-memory only(like done in GO)
#### Tools
- redis - back-end cache

## File Upload
for most use-cases can be handled with S3(Amazon solution for file handling), which is an industry standart

#### S3
based on custom protocol

based on bucket system, where each bucket is a key(url to file) - value(file + metadata + config) pair


## WebSockets
technology that allows to create connection between client and server
works similar to eventListeners, where you can send event and listen to it

pros:
- easy to create
cons:
- it is hard to maintain two way communication, because you basically will re-invent HTTP inside websockets

#### Alternatives
- short-poling - front-end sends request with small delay to receive info
- long-poling - front-end creates connection, which is closed when server have some updates
- SSE - infinite HTTP connection is opened, from which back-end is sending info to client. Only one way

## CI/CD
CI/CD(continuous integrations / continuous delivery) - flow of development process

#### CI
- always keep changes close to main branch
- main branch - representation of current program version

#### CD
- all changes constantly sent to production

#### Generally
- CI/CD must be fast, reliably, automatic
	- ensures constant relies flow and development efficiency

Flow:
- run unit tests, linting
- compile build and pack to zip
- send to server
	- FE - S3, CloudFront(cache invalidation)
	- BE - docker
- integrate with other resources(Sentry(logging), Jenkins(AQA), Jira, Slack)
	- it is hard to integrate with Sentry, because we don't won't to have sourcemaps on production, so way out - use Sentries tools to map before build
- blue/green

Tools:
- Jenkins, GitHub(have ready to use market of CD tools), GitLab(good for custom integration tools)

## CDN
CDN(content delivery network) - network to distribute content globally

#### FE
###### AWS + S3(Amazon) - main way todo
pros:
- cheap, reliable, fast
cons:
- bad Africa support
- less flexible

###### Nginx
proxy server engine for static files(alternative to S3)

pros:
- self hosted
- flexible
cons:
- harder to setup
- worse global distribution(same problems as with BE CDNs)

#### BE
main problems:
- DB sync
	- can be optimized with region specific data stored in that region DB

###### Lambda/Serverless
pros:
- easy to use, reliable, fast
cons:
- expensive
- addictive(hard to change to other architecture + has unscalable prises)

## IT teams
#### Delegation
It is important to delegate work, but do it properly, for that you need:
- to have plan of actions, with steps and statuses, so you can make quality checks on each step
- to have PM/PO as pair of eyes, so you have other expertise
- to be able to find info on you own

Micromanage - bad way

#### People
Each team should have this roles(one person can take both positions / one position can have more people):
- PO - directions, in wich team moves
- PM - decomposition of PO view + time delegation
- Business analytics - in-depth knowladge of domain/task + good descriptions of tasks
- Designer - design :)
	- can work as BA in cases where design is integrated to product
- FE+BE devs - implement tasks
	- can work as BA if there is no BA
	- can work as AQA
- QA - auto+manual checks of tasks
	- can grow to BA or to auto testing

## Stack & Heap
Each program takes some space in memory in this way(memory layout):
- TEXT - instructions of program
- initialized data + uninitialized data + stack - all with fixed size, which is pre-allocated before program run
	- stack is always limited
	- stack data is stored as close as possible
	- can't be used for large OR dynamically sized data
- heap - some memory region that can be expanded in any time via system request
	- systems requests are requests from our program to OS, which is passed to hardware
		- it is slow, because we are including some overhead, like load/unload previous snapshot of CPU state, our current command load etc
			- it is main reason why stack is much faster, because it is already pre-allocated
		- also heap is slow, because we need to search for free memory space
	- all heap data is still take some stack space in form of pointers
	- heap suffers from fragmentation(when we have huge amount of small chunks of non-continuous space between other data)
		- happens because data in heap can be added/removed in any order, unlike the stack
	- dynamic data in heap is handled via data structures
		- linked list, so we write data in place, where there is just enough space
		- array list OR vector - basically array that can resize+realocate itself
	- be careful with heap because of
		- null pointer - pointer that points to nowhere
		- memory leak
		- dangling pointer - pointer to deallocated memory
