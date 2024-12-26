---
title: System_Design
---

![](../../../assets/it_9.png) 

![](../../../assets/it_8.png) 

## Redis
- it stores cache in-memory, BUT have option to dump data into disk

## Interview
- always start with understanding problem and gathering relevant details
	- relevant details: why we need this system, what functional will be included into system, requirements(functional and non-functional)
		- functional requirements - describe what tasks system must perform
		- non-functional requirements - describe how and on what constrains system must perform
	- when stating some requirement, explain why it is relevant
- define system constrains and estimates:
	- estimate priority (reads OR writes)
	- estimate number of: request per second, needed storage, bandwidth used
- define large parts of system and broadly APIs, define each part of a system in details, refine and repeat, memory(for caching purposes)
- summarize the decisions with possible alternatives

#### How to design
###### URL Shortener
- why we need it
	- optimize link size
	- hide original URLs (ex: affiliated links)
	- track link performance
- functional requirements
	- given URL service must return short/custom alias for it
	- when alias is accessed, user is redirected to original URL
	- each alias must have expiration time, with possibility to override it
- non-functional requirements
	- high availability
	- redirects must happen with minimal latency
	- short links can't be predicted
- extended requirements:
	- performance tracking
	- public REST API
- assumptions and constraints
	- New URLs - 200/s || URL redirections - 20K/s || Incoming data - 100KB/s || Outgoing data - 10MB/s || Storage for 5 years - 15TB || Memory for cache - 170GB
- API
	- Public API can be based on REST
		- example of endpoint: alias, that will expose CREATE, PUT, DELETE, GET
	- RateLimiting
		- can be done per-customer, by API_DEV_KEY
		- can be done per-api to prevent DDOS
- DB Design
	- notes:
		- service is read heavy
		- billion of records will be stored
		- each record is small
	- schema:
		- user <- alias
	- technologie: NoSQL
		- reasons: low number of relationships, billion of records, easy to scale
- Main algorithm variants:
	- encode actual URL into SHA256(or similar) hash format + transform it to readable, fixed size string via Base64 + crop part of it
		- 6 chars length is sufficient enough and will produce 64^6 variations
		- problems:
			- by slicing part of string repetition may occur - add shuffling to mitigate it
			- same URLs will produce same aliases - add salting OR user metadata(performance impact)
		- to mitigate uniqueness problem we need to add retries
	- generate keys before-hand and store in DB, serve keys on demand
		- benefits:
			- easy, cheap and fast solutions, with no collision problems
		- problems:
			- concurrency
				- move part of keys into memory and serve directly from there to avoid concurrency in-between slow calls to DB
				- mutex OR synchronization is required
			- single point of failure
				- introduce replica
- Additions:
	- redirect is done via 302 (Redirect) response
		- failing look-up should resolve into 404 OR redirect to default page
	- we should allow custom aliases with more then 6 chars, BUT prevent too large strins

## API Design
Describe how each part of the system works and why

#### Main Types
- REST
	- flexible, data-oriented, has mass adoption
	- JSON and text based protocols
	- used for Web products, public/internal APIs, cloud apps
- RPC
	- high performant
	- JSON, protobuf(have lover support, because uses bites to communicate)
	- used for IoT, microservice architecture
- GraphQL
	- single endpoint, strongly typed and self documented
	- poor performance, has security risks
	- used for complex APIs

#### Communication Strategy
- sync - all requests done in sync, via HTTP
- async messaging - service post messages into queue and subscribe to it, to receive any response messages
	- usually done in 1 to 1 manner
- publish-subscribe - service producer publishes messages into shared topic, services consumers can subscribe and receive any messages from this topic
	- done in 1 to many manner

## Scalability
Thing about how many users and requests system needs to handle. What types of this requests(reads or writes)

types:
- vertical - add more machine power for single machine
- horizontal - add more machines and distribute load

#### Replication
Process of copying data, that has several purposes:
- creating back-ups
- hosting data near locations of usage(US region, EU region etc)

Depending on purpose you need to consider several questions:
- is data need to be replicated?
- how often replications will happen?
- how accurate duplications need to be?

#### Partitioning
Process of breaking large DB into some logical parts, that will be stored on the same/external server, in order to make DBs more manageable, faster and more available
- the general focus of partitioning is to reduce cost of queering large data sets

examples
- introduce numeric ID per data-entry and partition by ranges
- partition by date ranges
	- great for migrations, because you can migrate only relevant data and keep historical partially empty

types
- vertical - each partition will have subset of columns + some key to connect them
	- great for splitting many columns and queering commonly used separately from less ussed
- horizontal - all columns stays the same, only rows are partitioned
	- optionally, data is distributed across several independent servers

benefits:
- higher response times, faster reads-writes, higher availability
- faster maintenance(back-ups, migrations etc)
- more storage per partition
	- several servers only
- outages are isolated
	- several servers only
- access control per partition
problems:
- introduces complexity
- higher possibility of errors
- poor and unbalanced partitioning will slow down system
- takes more space

###### Sharding
Type of horizontal partitioning, where we break large data into small chunks(shards) and store each shard/collection of shards in separate machines

To query data you generate and assign shard-keys per shard
- example: store users in shards, depending on their region, so all US users will be in US shard and all EU users in EU shard, thus making most of calls from each regions more optimized(request takes less time to travel), without overhead of full doing DB replication
	- note: we aren't accounting for number of users per region, thus US shard can be much larger and require separate sharding step, in comparison to Australia

great for dealing with traffic and data amount grows

#### Load Balancing
Technique to evenly distribute traffic amount several machines

benefits:
- outage of single machine won't affect whole system too much

#### API Gateway
Technique to create single entry point to system, that can handle several functions:
- authN + authR
- caching
- request transformation
- rate limiting - limit number of requests per some amount of time
	- usually done by tracking how much time elapsed from previous requests from same IP(or by signing each request with some other metadata)
	- response from rate limiter can be either 429(too many request) OR requests can be held in some queue
- reverse proxy
- monitoring + logging
- serverless functions

#### Caching
###### Types
in-memory - data stored in RAM, so there is no need to add network overhead, BUT this way cache can be only local

shared - cache stored on separate machine, so it is accessible to all services
- cache is available, even if some service failed
- cache is consistent for each machine, so no need to create local caches
- problems:
	- network overhead is present

###### Main terms
- number of items cached
- how much RAM or Disk Space is consumed by cache
- cache miss & hit - on way to measure cache effectiveness is to look how often we hit it, instead of going to DB or doing requests etc

###### Strategies
- write-through - data is saved into main storage + cache at the same time
	- all writes are slower
- read-through - when request misses cache, cache holds request, auto-populates itself from DB and returns response
	- non-cached reads are slower
- cache-aside - when request misses cache, system goes into DB instead, populates cache and returns response
	- non-cached reads are a bit slower
- write-around - write requests are pushed into DB, data cached only after a number of read requests
	- frequently accessed data is prioritized
- write-back - write requests are stored inside cache and unloaded into DB once per some amount OR time period
	- writes optimized

###### Implementations
- in-memory - often via some libs or structures, like `Map` 
- redis - robust, stand alone, in-memory cache
- memcached
- AWS Elasticache
- GCP Memorystore

###### Use-Cases
- storing user sessions
- reduce overhead of microservice communication
- caching frequent DB operations (reads OR writes)

###### Invalidation strategies
- time based - invalidate after some time
	- types:
		- time to live (TTL) - each data has some time, that it can live, after been cached, after which it will be refetched, if accessed again
	- great for tokens
- event based - invalidate after some event occurs
	- types:
		- purge - remove cache
		- refresh - invalidate cache and request new one
		- ban - remove cache and stop caching
		- stale-while-revalidate - serve cached versions, then update
			- often used in CDNs

###### Cache eviction
Cache size is limited, so we need some method to make a room for new one, by efficiently removing other

- Least Recently Used (LRU) - remove last used data
	- web pages in browser
- Least Frequently User (LFU) - sort data by frequency and remove one at the bottom
	- search engine queries
- First in First out (FIFO) - remove data in order it was cached, similar to Queue
	- messages in messaging app
- Most Recently Used (MRU) - remove first used data
- Random Replacement (RR) - remove random data
	- data set with no priority between items, like assets in game
- Least Used - globally sort data by frequency and remove OR avoid caching ones at the bottom
- On-Demand Expiration - cache can be freed only manually
	- the case, when managing in-memory cache in languages like C++
- Garbage Collection - cache freed automatically
	- the case, when managing in-memory cache in languages like C++

###### Common problems
thundering herd problem - multiple cached items expired, thus all requests will miss and overload the system
- solution: warm cache in periods of in-activity

 cache penetration - user DDOS service with non-existent data, thus preventing any cache hits and overloading the system
 - solution: input validation, rate limiting of request

cache breakdown - cache breaks, thus all requests will miss and overload the system
- solution: implement failover and auto-recovery mechanisms, introduce health checks and system monitoring

stale cache - cache data is invalid, thus system operates on improper data
- solution: add logging to catch this issues, use stable technologies and patterns to avoid caching problems

## Other concepts
#### Single Sign-On (SSO)
Tech that allows for user to sign once and access all parts of the system after it
- as benefit for devs, removes need to create separate authN flows per each app

can be detected by redirect to separate login page

implementation strategies:
- sub-domain + cookies - straightforward way, done by hosting all apps under single domain, thus allowing all of them to share cookies
	- benefits: easy to implement
	- problems: limited by sub-domain, specific implementations will arrive on each consumer, depending on their technologies
- separate auth service - create service that will be a single source of authN&authR truth
	- implementation notes:
		- based on token model(access + refresh), where token can be in JWT or some other hash format
			- such token contains all info about user and can grant full or partial permission to system
			- JWT (JSON Web Token) - format of encoding JSON into Base64 to transfer through net
	- benefits: cross-platform, one service handles all user & auth management, broadly adopted standard, user permissions can be granted partially(it can also depend on application, you logged in)
	- problems: it is hard to recover lost token so additional safety measures need to be implemented
