---
title: Notes of "Designing Data-Intensive Applications" by O'Reilly
---
*notes of "Designing Data-Intensive Applications" by O'Reilly* 

## Preface
- business has large volume of data & traffic to deal with
- business must be fast & reactive
- open-source has large adoption
- parallelism is only way to scale
- IaaS is key component of any infra
- maintenance is unacceptable
- data-intensive app is app, where we deal with too much data, so it becomes bottleneck
- every choice is trade-off
- don't do premature optimization regarding performance and scalability

## Foundations of Data Systems
#### Reliable, Scalable & Maintainable
- main problem of modern apps is volume, complexity & speed of change for data
- common needs for data system:
	- have DB to store data
	- have cache to speed-up reads
	- have searching capabilities via search index
	- have async communication via messages & streaming
	- have batch processing of data
	- \---
	- often one system can cover several needs (but more often we combine several general-purpose components into single systems via application code)
- common concerns for data system:
	- reliability - system should withstand system/human errors
		- app works as expected, tolerates load & human errors, system disallows abuse & unauthorized access
		- we mainly focus on fault tolerance (can system not fail if some part starts deviating from expected behavior)
			- proper error handling & chaos testing can help
		- faults:
			- hardware
				- add redundancy as back-up for each component
				- make it possible to swap your software between machines
					- makes it possible to do patches, rollouts & changes without downtime
			- software (often more disruptive, because we have copies of software all over the hardware)
				- be careful with assumptions about env
				- test
				- allow system to restart, monitor & measure
			- human errors - human operator OR human-written configs are error prone
				- build proper interfaces to intensify proper behavior (avoid too much restrictions)
				- provide testing envs
				- test
				- present data-roll back & deployment roll-outs
				- use metrics
				- train your people
		- we can cut corners here, when doing MVP/PoC, but be careful with it
	- scalability - system must be adaptable to higher loads
		- scalability is about how to coupe with different load scenarios
		- flow
			- measure (choose critical measurements for your system)
				- metrics are done measured in batches, because they can differ for same conditions
				- measure in percentiles to see what your users experience
					- p50 is often good metric, BUT p90+ allows to see more data about outliers
						- don't focus on high percentiles too much, they often not worse it
				- always measure from client's perspective
			- increase load (with additional resource, without additional resource given to system)
		- distribute work on write & read times
		- Latency and response time are often used synonymously, but they are not the same. The response time is what the client sees: besides the actual time to process the request (the service time), it includes network delays and queueing delays. Latency is the duration that a request is waiting to be handled—during which it is latent, awaiting service
		- SLOs & SLAs often define what service performance is expected
		- note that bad p90 is ok for low loaded service, but bad for high load, because more requests will hit bad values
		- note that if one operation requires several services, final result will highly damaged by slowest result (tail latency amplification)
		- note that slow operations in queue will slow down all consumers (head-of-line blocking)
		- percentiles must be calculated dynamically on dashboards (or at least approximated)
		- coping with load (try to rethink architecture, when load increases)
			- combine horizontal & vertical scaling
			- it is ok to have manually scaled system (if it has low load changes over time)
			- The architecture of systems that operate at large scale is usually highly specific to the application - there is no such thing as a generic, one-size-fits-all scalable architecture
			- An architecture that scales well for a particular application is built around assumptions of which operations will be common and which will be rare - the load parameters. If those assumptions turn out to be wrong, the engineering effort for scaling is at best wasted, and at worst counterproductive.
			- use common patterns for particular scenarios
	- maintainability - system must be easily changeable (most of cost is maintaining, not creating)
		- mainataine system to avoid legacy
		- design system with maintenance in mind
			- keep system easily operatable
				- operations involve: health & monitoring, restores & restarts, tracking problems, patching & updating, monitor how services affect each other, plan for future problem fixing, establishing platform tooling, complex migration, keep prod stable, writing docs
				- operations must be done easily so system should: be easily monitorable, integrate platform tooling, env agnostic, proper documentation & understandable execution flow, configurable (with sane defaults), self-healing, controllable
			- keep system newcomer friendly & simplistic (avoid big ball of mud, non-simple systems are slow to modification)
				- symptoms of complexity: explosion of the state space, tight coupling of modules, tangled dependencies, inconsistent naming and terminology, hacks aimed at solving performance problems, special-casing to work around issues elsewhere, and many more.
				- fix accidental complexity (such, that created by implementation)
				- use proper abstractions
			- keep system easy to evolve & adaptable for unexpected use-cases
				- constantly refactor
				- keep system agile

#### Data Models & Query Languages
data model is about how we think & represent our problem in code
- can be layered (often to each layer hides complexity other other one)
	- each layer is connected via some abstraction
- you need to choose proper data model for you app

relational model (SQL):
- data organized in relations (tables), whose are unordered collection of tuples (rows)
- relations for understandable interface
- query language acts as abstraction over accessing data (thus it is easier, that manual access and allows for underlying optimizations)

NoSQL model (collection of non relational technologies)
- driving forces:
	- need for higher scalability or write throughput
	- specialized querying operations
	- desire for less restrictions

object-relational mismatch - SQL must be mapped onto programing language's objects
- ORM (object-relational mapping) reduces boilerplate, but has it's own downsides
- using JSON reduces mismatch, but we now have problem of been schemaless

dictionaries
- why to use :
	- consistent style and spelling across profiles
	- avoiding ambiguity (e.g., if there are several cities with the same name)
	- ease of updating - the name is stored in only one place, so it is easy to update across the board if it ever needs to be changed (e.g., change of a city name due to political events)
	- localization support - when the site is translated into other languages, the standardized lists can be localized, so the region and industry can be displayed in the viewer’s language
	- better search - e.g., a search for philanthropists in the state of Washington can match this profile, because the list of regions can encode the fact that Seattle is in Washington (which is not apparent from the string "Greater Seattle Area")
	- deduplication of stored data
	- note that not always normalization is great, it has it's own tradeoffs
- having dictionaries forces 1toN relationship, that requires joins (by DB or via multiple queries & application code)

relational vs document DB
- different fault tolerance
- different concurrency handling
- different data models (thus performance, schema flexibility, mapping, joins, relationship management)
	- document is useful for
		- not very deep tree-like 1toN data
		- schemales data (no explicit schema, force by DB)
			- relational can handle it via often migrations OR JSONB type
		- cases when you use entire document (ex: render whole document on single page)
			- performance boost & no need for aggregation
			- if you often need only part of data omit such data model OR use small documents
			- in some relational DBs you can describe locality to boost performance
	- relational is useful for
		- NtoN data
		- join dependent data
			- you can simulate it by app, but it will be less efficient, that SQL

data querying
- often don in declarative manner via som language like SQL
	- you avoid implementation details, keep API simple & allow for optimizations and parallelization
- techniques to parallelize & optimize query execution can be also introduced from outside, like MapReduce pattern (that rarely present as API for querying in modern solutions)

graph-like model
- common for complex NtoN data-sets
- data consists of nodes, that connected by edges
	- nodes & ecges can have same OR different type/meaning
- sub-models
	- property graph
		- each node has: ID, incoming/outgoing edges, properties
		- each edge has: ID, tail+head vertex, label, properties
		- has no restrictions on connections
		- we can traverse in any direction
		- easy to extend & evolve
		- great for complex queries, due to ease of traversions
			- you need to have abstract query language to simplify traversion & allow for optimization (travers from more optimized part of graph to least)
	- triple stores (conceptually same to property graph)
		- consist of subject (Jim) predicate (likes) object (bananas)
		- subject is always vertex, while object either other vertex OR primitive value, used to describe property of subject

#### Storage & Retrieval
- fundamental job of any DB
- you need to understand to it understand trade-offs of solutions (and their settings) to match your case

most basic engine can be viewed as log (append only sequence of records, stored in some file, that stores records and reads them from tale of file)
- getting data is inefficient here, so we can utilize indexes
	- it is additional structure, derived from main data & used as kind of metadata for optimization purposes
	- it will often boost reads & downgrade writes
	- types:
		- hash index (same as hash map, but stored in memory & on disk, in form of snapshots) - common building block for more complex things
- log file must be compacted over-time (process of removal of duplicated keys)
	- to avoid hitting large sizes of single file we need to break it into several fixed sizes & basically merge them into new, while compacting
- to make it more usable you need to have: concurrency management, recovery mechanisms etc
- performance gains:
	- sequential writes
	- easier concurrency & crash management
- problems:
	- hash index must fit in-memory to be performant enough
	- range queries are hard

SSTables with LSM-Trees
- Sorted String Tables (SSTables) is basically similar to log files, but we require to keep or keys sorted
	- advantages over log with hash index:
		- more efficient merging (like mergesort)
		- you need to keep partial hash index, because data is sorted and you can traverse, based on neighbors
			- we can compress this chunks before writing to trade-off CPU over I/O
	- as data structure you can use red-black trees or AVL trees, to write data in any order & read ordered (in-memory structures)
		- basically you write into memory for some time, then loadout tree as SSTable
		- we use simple log to track in-memory tree & restore it, in case of a crash
- Log-Structured Merge-Tree (LSM-Tree) is basically built upon SSTables
	- problems:
		- querying unknown words is slow - use bloom filters

B-Trees (most common indexing data structure)
- stores sorted key-value pairs (for range queries & fast lookups)
- breaks storage into fixed-size blocks, that can refer in tree-like manner (but on disk)
	- this blocks can be traversed by their ranges to find needed value
	- number of branches is limited by storage
	- updates are quite fast, additions may require rebalancing/restructuring the tree
- to keep it crash resilient we store all commands in write-ahead log
	- alternative is to copy modified chunks, instead of updating & keeping WAL
		- great for version control
- locks need to be done to prevent concurrent writes
- for performance tree is laid sequentially on disk
- for faster scanning we can include more pointers
- pointer can be abbreviated to reduce size

B-Trees vs LSM-Trees
- read first vs write first
	- B-Trees wears down SSDs faster
	- LSM-Trees faster with HDD due to sequential writes nature
		- modern B-Trees can mitigate this
	- B-Trees have higher fragmentation thus take more storage
- LSM problems
	- compaction takes down I/O & CPU performance
		- often negligible, but high percentiles are unpredictable
	- compactions can downgrade performance at scale
		- if you have improper config, compaction can be even slower, than incoming writes, thus failing out disk
	- key might be duplicated, thus it is impossible to bind locks to tree (unlike in B-Trees)

other indexing structures
- for secondary index we can use both LSM & B -trees, BUT we need to account, that each key won't be uniq, so we need either add row number to ID or store keys in batches
	- this index needed for faster joins
	- values are often stored in heap, while each secondary index just stores pointer to avoid data duplication
		- great for in-place updates, while suffer from heap-overflow (all indexes need to be rewritten to point to new heap)
		- alternative to heap is clustered index, where you just store values in-place to boost reads
			- will downgrade storage, writes & transaction integrity will require additional resource
- to index multiple columns you can:
	- concatenate their keys (impossible to find one key in index this way, BUT great, when you logically need to query for several values at once)
- fuzzy index for efficient fuzzy searches (can be done via: algorithms for distance search, ML, document clasifications)

it is easier to work with RAM, so some DBs are in-memory (first of all, because their not large enough)
- often it is acceptable to loose data in such DBs, but it can be somewhat negated via logs on disk
	- great for backups & analysis
- main advantages:
	- faster reads
	- faster writes (we don't need to manage complex data structures on disk)
		- can be async for cost of durability
	- can be used to store complex data-structures

DBs often operate with transactions (several reads and writes, that not necessarily ACID)
- note that analytics tasks are problematic with classic transactions, because we often query only some columns within huge number of rows with need for some aggregations & transformations
- we can use one DB for transactions & analytics, but often analytic queries are quite costly, so we better be having some dedicated solutions like warehousing
	- data is dumped or streamed onto separate system in read-only format
	- we can do pre-transformation of data (extract transform load - ETL) OR post-transformation
- we need to use specialized DSs for analytics data for performance
	- schemas
		- star - we have central analytics goal (fact, ex: sales) & tables (dimensions), that are referenced by central table for additional data
			- dates often can be encoded to store metadata, like: holidays
		- snowflake - variation of star, but we break dimensions into sub-dimensions to avoid data duplication and just reference (ex: products)
		- notes:
			- tables are often wide to include all comprehensive info
	- column based storage is used, because main use-case is to query only several out of 100+ columns, but in large amounts
		- unlike transactional DBs, where we query complete rows at once
		- all files have same ordering of data, so you don't need to store keys
		- due to data been repetitive & contain some small number of distinct values we can use bitmaps & run-length encoding to compress data
			- some queries can even directly operate with compressed data
		- we can introduce sorting to speed-up reads (even sort several columns)
		- if you do data duplication you can also sort it in different ways for different queries
		- B-trees are ineffective here, so LSM is used
	- for aggregate operations we can create materialized views (copy of data with additional calculations backed in, which might even effect, how we store data)
		- downgrades writes
		- not flexible, BUT has great read performance

#### Encoding & Evolution
Data evolve (extended OR reformatted)
- ideally system & updates should be both backwards & forwards compatible

data encoding
- data can be either
	- in-memory (CPU optimized, allows for DSs)
	- encoded (changed to some self-contained format for transfer OR storage)
- formats
	- lang-specific formats (encode DS to bytes)
		- tied to one lang
		- have security problem, because we can manipulate bites & initialize arbitrary objects
		- bad performance, bloated, has bad versioning
	- standardized (JSON, XML, binary)
		- > They are widely known, widely supported, and almost as widely disliked
		- text based (XML, JSON, CSV)
			- human-readable & simple, widely adopted & often good enough
			- problems with: number encoding, binary encoding (base64 can save a bit), lack of schema, optimization problems (text is often larger then bytes)
				- CSV is separate beast, because it is too vague
		- binary
			- binary is often more optimized (even JSON can be changed to BSON to be more optimized)
			- great internally, because you don't need to conform to standard
			- protobuf & similar to them formats have strict schema
				- we avoid encoding field names, by using numbers (as aliases) and referencing schema
					- aliases can never be reused
			- your code is easily forward compatible, because older code will just skip unknown data, while backwards compatibility allows for appending optional fields only (deletion has reverse concerns)
				- data types is risky, but possible to change, due to byte size diffs
				- you can evolve single to multi values in protobuf
			- some format like Avro allows for two schemas (reader & writer), that may differ, but must be compatible to do translation
				- writer schema can be stored directly with data, referenced or exchanged
				- works great for dynamically generated schemas, because we don't need to manage aliases
			- for statically typed langs you need codegen to view data, BUT for dynamically typed or to just view the data you can convert it on fly to something operable / readable
			- schema is great docs & can be statically checked for breaking changes & inside programing language
- data flow - how data transferred from one thing to other
	- via DBs - writer encodes data to DB and reader decodes it from
		- forward & backward compatibility is required
		- be careful with updates, you need to preserve unknown fields
		- for evolution you can: do migration, add defaults, add computed defaults
		- try to normalize schema & add analytically adapted data when archiving
	- via REST/RPC - common way to transfer data over the network
		- REST is common for web, but may be used anywhere (basically you app need to become client to connect to server)
			- allows for microservice architecture, where you chain requests+responses
				- each service can impose business rules & restrictions on it's clients
				- each service must be owned by some team & evolve independently from other services
			- alternative to REST is SOAP, that is compatible, BUT not dependent on HTTP and uses custom XML format, based upon Web Services Description Language (WSDL)
				- allows for codegen
				- impossible to operate with without tooling
				- have many flavours
				- often more complex, than just REST
		- RPC
			- problems:
				- main problem that it seems like calling a fn, while been over the network
					- hides network layer under abstraction, while we still need to handle network problems
					- response may not been returned due to timeout or error
						- in general function can take a lot of time
					- has no idempotence
					- translation between languages is messy
				- more complex, harder to debug, problems with support, can't be used as public API
		- versioning:
			- by number inside URL
			- by number inside HTTP Accept Header
			- by mapping client <-> version, if endpoint is authorized
	- via messaging
		- data is transferred over the network & managed by intermediate entity, called message broker
		- allows for async communication
			- note that this implies one way communication, HOWEVER we still can built quests in two ways
		- benefit:
			- improves availability by acting as buffer
			- auto-redirect messages to active processes
			- acts as API-GW
			- message duplication for several receivers
			- low coupling
		- actor model - model when we avoid dealing with concurrency, by working only with set of entities, that has message communication, BUT scheduled one at a time
			- this can be transformed to distributed actor model via network messaging
		- notes:
			- preserve unknown fields to compatibility
			- message is just bytes with any encoding on top

notes:
- compatibility is important due to impossibility to force client update & requirement for rolling updates

## Distributed Data
We need to distribute data over several machines for:
- scalability
- fault tolerance
- latency reduction

it is possible to scale vertically OR have array of disks, but you often will hit bottlenecks, so distributing data might become a necessity

ways:
- replication - data is copied
	- improves availability, latency & throughput
	- single leader
		- each node with data is replica
		- only one replica can do writes & tell other replicas via some stream of logs to do same action
			- this can be done in sync, by blocking the response from leader OR in async manner
				- sync can be quite slow, because some replicas can be under high load OR recover flor failure (thus need to reapply huge log)
				- for sync data is always in sync, thus leader can fail & we have no consistency issues
				- you can mix approaches, by having 1+ sync followers & other async, so data is always in sync, while keeping with normal speeds
					- sync followers can be rotated with async
			- to add follower you need to take consistent snapshot of leader, apply snapshot to follower, start applying changes from log after snapshot
		- follower replicas can be used for reads
		- recovery:
			- follower failure - follower keeps track of last operation, so it can re-apply needed operations from leader's log
			- leader's failure (failover) - some follower is promoted to leader with reconfigurations of other followers
				- can be detected by timeouts (need to be properly configured)
				- all nodes need to agree on new leader via consensus (often the most up-to-date node wins)
				- all nodes need to listen for writes from new leader (& ignore old one, if it reboots and thinks, that it is leader)
				- notes:
					- in async systems we often ignore failed writes, because we often can't save them OR merge with new writes
					- data in system might become inconsistent, because new leader might have older state, then some cache etc
					- split brain might happen, when you have several leaders in single-leader system (meaning you don't have any resolution of conflict writes)
						- ideally system must downgrade one leader, BUT not both
		- methods:
			- leader duplicates raw SQL strings
				- will basically work, BUT be aware that:
					- if query depends on data (`WHERE smth`), it must be executed in order as leader
					- if query has non-deterministic function (`NOW()`), they must be replaced by values from leader
					- if query has side-effects, they must be predictable
			- write-ahed log (WAL) - leader shares it's log over the network
				- great way, but main problem is that this protocol is low level & often disallows version mismatch between replicas (thus zero downtime upgrades are impossible)
				- alternative is logical log, which is somewhat similar, but describes in higher level changes to each row
					- also such log can be used to share data internally
			- via triggers - we can execute, code to change our write in someway, before replicating it
				- quite complex & error prone, but great for filexibility reasons
		- replication lag - to allow for read-heavy workflows you need to have many follower & async replication, which will lead to replication lag inside the system due to eventual consistency
			- common problems:
				- data is not seen for some time after write
				- data appears inconsistently (first you see data, than you refresh & see no data, that you refresh & see unordered data)
			- to mitigate (not all solutions can work for multi-device setups due to local state):
				- read your write - user, who made a write, is guaranteed to read same data
					- great for info, like user profile, that only user can edit, so we always know what requests to route to leader
					- always read from reader data for short period of time to mitigate replication lag (suitable for small lags)
					- client remembers timestamp of write & requests only up-to-date data
						- query can be held, until replication lag is mitigated (suitable for small lags)
				- monotonic reads - to mitigate problem, when different requests are sourced from different replicas, you can assign replica per user
				- consistent prefix reads - to mitigate data been unordered, you can batch writes into single operation & write them in order
				- distributed transactions - execute distributed operations in transaction-like manner with guarantees from DB (not application code), that operation is fully done
- partitioning/sharding - splitting data into separate chunks
