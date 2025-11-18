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
