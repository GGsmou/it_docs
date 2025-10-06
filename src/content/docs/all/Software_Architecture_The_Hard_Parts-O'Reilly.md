---
title: Notes of "Software Architecture The Hard Parts" by O'Reilly
---
*notes of "Software Architecture The Hard Parts" by O'Reilly* 

## Preface
Book covers solutions and their tradeoffs on the topic of building distributed systems
- most of solutions are can be adopted for your needs
- main focus of this solutions is on data (flow, owners, managers etc)

Not all problems have best solution, due to nature of problem OR just because of current company's landscape
- it is task of architect to find it (some solutions can be generalized and shared, but it doesn't mean that the are the best)
- look for least-worst set of tradeoff, that, ideally, future proof

Book focuses on decision making and docs

> Software architecture is the stuff that’s hard to change later.

> The software development ecosystem expands and evolves in completely unexpected ways.

> Data is the most important asset in a company.
- so we can build architecture around it
- some problems arrive from relation between data and it's management and some architectural principles
- types:
	- operational - key data, business can't operate without it, used for all transactions, almost all CRUDs are built for it, often transactional and relational
	- analytical - data used for long-term decision making and analysis, not always relational OR/AND transactional, not required to have

ADR (Architectural Decision Record) - document to provide explanation for architecture solution
- can have different formats, but recommended to have at least context, decision, alternatives and consequences

It is important to convert design to reality, so we need a way to oversight that our solution is implemented
- some code may be reviewed manually, BUT, as all other parts of SE, this process must have not only have tight feedback loop, BUT also automations (fitness functions in context of the book)
	- feedback can be achieved via CI and trunk-based development
	- automation must be characterized by concrete, measurable and achievable goals, set by architect
		- some characteristics are too vague, so they need to be more specific, thus possible to measure and asses
		- some characteristics can negatively impact other (Holistic once), so we need to also measure negative effects
		- similar solution to fitness function is unit test (it also assess some requirement, BUT it requires domain knowledge)
		- notes:
			- you can verify many things, if your app properly layered, if you you avoid circular dependencies etc
			- some fitness function can take data (ex: num of users) as input and calculate output in form of dynamic threshold
			- some functions can't ran on CI, because they require manual actions and it is fine, BUT can't be overused
			- don't overuse fitness functions and focus only on important stuff

differ architecture from design
- focus on why one solution over other
- drop implementation details

definitions:
- orchestrated coordination - service coordinator does main job
- choreographed coordination - all services have a duty to do some coordination
- atomicity - if some workflow have persistent state across it's lifespan, we call it atomic
	- alternative is eventual consistency

## Pulling things apart
We can differ coupling into static things (how small parts communicate with each other) and dynamic (how large systems communicate with each other AND what contracts do they establish)
- it is beneficial to pull apart and isolate large pieces to keep them understandable and manageable
- ultimate decoupling is impossible and will overcomplicate contracts, communication and will make system too shattered
- > Architects design fine-grained microservices to achieve decoupling, but then orchestration, transactionality, and asynchronicity become huge problems. Generic advice says “decouple,” but provides no guidelines for how to achieve that goal while still constructing useful systems.
	- we need to worry about transactions, because we need to worry about data AND data, in modern systems, lyes within bounded context of single microservice

Try to focus on interconnections and coupling first and work within framework to untangle systems
- Find what parts are entangled together.
- Analyze how they are coupled to one another.
- Assess trade-offs by determining the impact of change on interdependent systems.

> Determining the proper size for microservices seems a pervasive problem - toosmall services create transactional and orchestration issues, and too-large services create scale and distribution issues.

architecture quantum - independently deployable artifact with high functional cohesion, high static coupling, and synchronous dynamic coupling. A common example of an architecture quantum is a well-formed microservice within a workflow
- quantum is great communication term: architect view it from coupling standpoint, developer view it from behavioral standpoint, DevOps operates with is as with single deployable unit
- quantums must have proper size and granularity, based on set of tradeoffs
- qunatums must be independently deployable, thus services with shared DB aren't separate quantums
	- also services, bounded to mediator (for example for event orchstration) are also not pure quantums
	- services, that don't have DB of their own, but highly depend on other services with DB are part of their quantum
		- even highly coupled UI will make set of microservices a single quantum
			- one way to decouple UI is to convert it to microfrontend, related to microservice, that orchestrated by, BUT not highly coupled to UI
- highly decoupled systems enable high developer velocity
- drawing quantum diagram enables better understanding of system and can highlight things, that need to be decoupled
- communication - multidimensional space
	- communication - sync/async
		- affects: synchronization, error handling, transactionality, scalability, and performance
	- consistency - atomic/eventual_consistency
	- coordination - orchestration/choreography
		- more complexity == more coordination
- notes:
	- if two services have different performances and have sync communication, we can we them as a quantum for the moment of call, because one server is limiting factor to other
	- scalability is the ability to support a large number of concurrent users; elasticity is the ability to support a burst of user requests in a short time frame
	- to sell architectural decision to business you need to have proper research, docs and justification with concrete gains

architectural modularity - large monolith doesn't provide enough scalability, agility and extensibility to handle modern applications
- modularity helps: break-up the load, enable fast pace of changes
- justification for modularizing app must be present and often comes from:
	- agility - compound architectural characteristic made up of many other architecture characteristics, including:
		- maintainability - ease of making changes
			- affected from: coupling, cohesion, cyclomatic complexity (indirection, nesting), size, technical vs domain partitioning
			- increasing modularity will define strict boundaries between systems, making it possible to easily change only part of it
		- testability - ease and completeness of testing
			- monolithic system will have too large suit to run AND single change will trigger non-related tests, that might be fluky
				- note that too much coupling between services will require additional testing been performed, thus circling back to existing problem
		- deployability - ease, frequency and risk of deployment
			- for safety deployments must be frequent, thus easy
			- too much modularity can and will make deployment harder
				- > If your microservices must be deployed as a complete set in a specific order, please put
			- define proper contracts and be careful with shipping breaking changes them back in a monolith and save yourself some pain
		- ---
		- can be achieved with properly modularized monolith
	- scalability of a system - breaks into
		- actual scalability - how systems adapts to grows in number of users over time
			- about modularity of system
			- monolith is impossible to scale partially
		- elasticity  - how systems adapts to bursts of traffic
			- about service size
			- single service must be resilient to bursts
			- system must be able to quickly spin-up service instances
				- it achieved via size of service AND technical characteristics of it
			- system must have protections set
		- sync communication lowers general scalability
	- fault tolerance - wether different parts of system can function without one-another
		- failures in monolith is harder to isolate
		- sync communication OR high coupling lowers fault tolerance

architectural decomposition - process of breaking architecture apart
- eating elephant piece by piece - simple & understandable, but have low structure and can lead to big ball of mud in process
- component based decomposition - set of patterns to break, extract and refine components step by step
	- implies refining monolith into module, than (optionally, but also can be goal) into service-based and only after to set of microservices
		- service-based is useful for:
			- As a stepping-stone, it allows an architect to determine which domains require further levels of granularity into microservices and which ones can remain as coarse-grained domain services
			- Service-based architecture does not require the database to be broken apart, therefore allowing architects to focus on the domain and functional partitioning prior to tackling database decomposition
			- Service-based architecture does not require any operational automation or con‐ tainerization. Each domain service can be deployed using the same deployment artifact as the original application
			- The move to service-based architecture is a technical one, meaning it generally doesn’t involve business stakeholders and doesn’t require any change to the organization structure of the IT department nor the testing and deployment environments.
- tactical forking - process of copy-pasting code all codebase and removing redundant chunks of it, until single service is formed
	- useful for well-structured applications
	- flow: clone monolith, proxy traffic for new service to clone, slowly kill non related functional in clone AND remove duplicated functional in original monolith
	- generally code is easier to delete, rather then extract
	- use tooling to locate leftover code
	- be aware that duplicated code might stay in form of types, that must be kept as similar as possible for future extraction
		- consider moving duplicated to shared libs
- \---
- don't decompose without a need
- to determine how to decompose we need to understand internal structure of system and if it is decomposable (it is impossible to decompose non-structured application, so we need to impose structure first and then chip and refine), it can be done via some metrics
	- afferent coupling - incoming connections to component
	- efferent coupling - outgoing connections to component
		- some parts, like shared models, will have high number of outgoing components, thus we need to decide who owns it, by most of connections
	- abstractness - systems with low abstraction levels are hard to understand, BUT with too high aren't usable
	- instability - score on how much changes are required, when current component changes
		- low instability signifies high level of duplication, BUT hight level signifies of tight coupling and improper abstractions

component-based decomposition - set of patterns to refactor large monoliths into distributed apps
- identify and size components - app need to have components, that properly sized
	- focus on keeping all sizes around the mean (size can be roughly measured by number of statements AND number of file in relation to overall system)
	- when sizing components use domain driven approach and break large components into smaller subdomains
		- note that not all components are breakable
	- fitness functions:
		- notify about new components
		- component's relative size can't grow too large
			- "size" can differ, based on application size
		- number of statements can't be much more than some deviation from mean
- gather common domain components - process of identifying and collecting common functionality into separate components
	- slight differences in functionality should be clamped together for simplicity
	- to identify look for:
		- shared inheritance parents OR reused logic all around the code
		- common naming inside different parts of an app (ex: FinanceEmail, BillingEmail etc)
	- note that not all code should be moved to service, BUT could live as a lib
	- fitness function (mostly manual):
		- find common naming patterns in leaf-nodes of namespaces
- flatten component's structure - remove any namespace nesting to keep component structure flat and understandable
	- nested system can be characterised by:
		- Component - A collection of classes grouped within a leaf node namespace that performs some sort of specific functionality in the application (such as payment processing or customer survey functionality).
		- Root namespace - A namespace node that has been extended by another namespace node. For example, given the namespaces ss.survey and ss.survey.templates, ss.sur vey would be considered a root namespace because it is extended by .templates. Root namespaces are also sometimes referred to as subdomains.
		- Orphaned classes - Classes contained within a root namespace, and hence have no definable component associated with them
	- ways to flatten:
		- merge root and component (simple component)
		- de-parent component from root to create two components
		- move all code from root to separate components (complex component)
			- this will convert root to namespace and kill orphaned classes
			- note that shared code must become separate component (ideally with generic name)
				- too much shared code is hard to break-up due to shared library management, so it need to be refined into proper size
	- fitness functions:
		- no code in roots
- determine component's dependencies - process of understanding how components are wried to find-out proper size for each future service
	- this will also help with understanding how hard would it be to break things apart
		- some apps is just better to rewrite from scratch
	- look for coupling between components only
	- build visual diagrams
	- high coupling can be a signal for need for prior refactor
	- fitness functions
		- restrict max number of coupling for component
		- restrict dependency between certain components
- creating component domain - component can itself become service, but it is often too granular and several components can be formed in domains, that can become services
	- this is highly related to DDD
	- fitness function:
		- disallow creation of new domains without approval
- create domain services - move each domain into deployable service, forming service-based architecture
	- single ui -> API GW (optional) -> number of services -> DB
	- it is ok to stop here and not break down services to quantums, if your system doesn't need to have them
	- fitness functions (govern that each component is consistent):
		- all components should have same namespace
- notes:
	- architecture can have his backlog in form of stories about things that need to be changed in some manner and why to change them

breaking data apart
- breaking data is hard, because:
	- it is valuable & high risk asset
	- it is more coupled to application
		- still it has similarities, when broken apart, like: components translate to data domains, class files translate to database tables, and coupling points between classes translate to database artifacts such as foreign keys, views, triggers, or even stored procedures
- data should be broken when:
	- too many services impacted by data
		- migration - breaking changes in DB structure
			- impacted dependent services need to have coordinated deployments to adapt to new format
				- it is hard to find what services are impacted
			- keeping DB and service in single quantum reduces change surface
				- DB can't be accessed by other service for proper context, thus you can keep service2service contract different from DB schema
		- downtime - single DB is single point of failure
	- DB can't handle performance
		- connectivity - each service requires at least one connection to DB, which can be overwhelming
			- when considering splitting DB, look for connection waits data
			- note that when shared DB is used, each service must limit maximum possible connections to DB
				- you need to distribute connections between services properly
					- take into account functionality and scalability of each service
		- scalability - DB might become a bottleneck, when scaling a service
			- database connections, capacity, throughput, and performance are all factors in determining whether a shared database can meet the demands of multiple services within a distributed architecture.
	- you need to have quantum
	- you need to handle different data in different formats
- data should be kept together when:
	- data is closely related (FK, view, triggers)
	- data is transactional and need to be kept consistent
- decomposition process
	- create data domains
	- create separate schema for each domain
		- create synonyms for different schemas for easier cross-schema interactions detection in future
	- restrict each service to use only related schema and access other data via other services
		- in this state you have benefits, when talking about ease of change, BUT performance and failure are still issues
	- move schemas to separate physical DBs
		- options:
			- backup and restore
				- back up each schema with data domains, then set up database servers for each data domain. They then restore the schemas, connect services to schemas in the new database servers, and finally remove schemas from the original database server. This approach usually requires downtime for the migration.
			- replicate
				- teams first set up database servers for each data domain. Next they replicate the schemas, switch connections over to the new database servers, and then remove the schemas from the original database server. While this approach avoids downtime, it does require more work to set up the replication and manage increased coordination.
	- remove old connections and deploy DB+service as single unit
		- now you can optimize scalability, connections, DB type etc
- DB type selection
	- characteristics to consider:
		- learning curve
		- ease of data modeling
		- scalability
		- availability
		- consistency
		- product maturity, community, language support etc
		- read OR write priority
	- types:
		- relational - Relational databases (also known as an RDBMS) have been the database of choice for more than three decades. There is significant value in their usage and the stability they provide, particularly within most business-related applications. These databases are known for the ubiquitous Structured Query Language (SQL) and the ACID properties they provide. The SQL interface they provide makes them a preferred choice for implementing different read models on top of the same write model
		- key value - NoSQL DB, based on hashmap structure, which has string keys with arbitrary values and allow for get, set and delete operations, using keys
			- often come as persistent and non-persistent
			- have great performance (especially for reads)
			- subtype is NewSQL DBs, that aim to enrich relational SQL DBs with scalability
		- document - NoSQL DB, based on JSON concept, that is easy to read, has tree structure and self-describing
			- read focused
			- indexable
		- column family - DB that, have rows with varying numbers of columns, where each column is a name-value pair. With columnar databases, the name is known as a column-key, the value is known as a column-value, and the primary key of a row is known as a row key. Column family databases are another type of NoSQL database that group related data that is accessed at the same time
			- easy to scale horizontally, highly write efficient, easy to cluster
		- graph - NoSQL DB, that based on graph data structure
			- edge direction has significance
			- great for ML and analytics
			- read focused
			- great for relationship querying
			- edge types and relationships are costly to change
		- time-series - DB that optimized for tracking a set of data-points in some time window
			- append-focused with required timestamp for each data-entry
			- read first
- notes:
	- related tables, views, FKs, triggers etc can be grouped as single data domain
		- some artifacts need to be removed, when data is decomposed
	- you can use different types of DB for different data
	- you can create broader domains, if underlying data is too tightly coupled and can't be broken apart
	- data is always has some schema, but in NoSQL world it is just less explicit (thus more flexible)

service granularity - not every single thing should be a microservice
- each service should have single responsibility, BUT you have to decide how broad is this responsibility
- terms:
	- modularity - constructed with standardized units or dimensions for flexibility and variety in use
	- granularity - consisting of or appearing to consist of one of numerous particles forming a larger unit.
	- is SE we break things into modules, that have some size, thus modularity and granularity
- to objectively track size you can measure:
	- number of statements
	- number of public interfaces
- consider breaking service when
	- service scope and responsibility
		- determined by cohesion and pure service size
		- if you can't properly name your service, you have scope problem
	- code volatility (do we often change only some part of service, while others are stable)
	- scalability (different parts need to scale differently)
	- fault tolerance
	- security (if service has parts with not-required security AND required security you can break them to reduce maintenance burden)
		- it can also reduce access related risks, because you don't need to share different access levels in single service
	- extensibility (how often service is expanded with new context)
		- consider only when you are certainly planning on service expansion
- consider merging services when
	- is transactional integrity required
	- do we need to coordinate services
		- high levels of service2service communication decrease system's fault tolerance and availability AND negatively impact latency
		- if you have more requests, that require service2service rather than been atomic, you have a problem
	- do services need to share code
		- while it is possible to share code, you now have single point of change that impacts all of your services AND it might be hard to coordinate library updates
			- it is ok to share architectural things, ex: logging; BUT domain code better be kept together
			- if shared code changes frequently it will be painful to maintain it
			- shared library can reduce time to market
				- it can have opposite effect too
	- can DB be broken apart
- build your final decision based on business needs
- note that you can delegate code shareability, security etc onto design

## Pulling things back together
After system is broken you will be presented with set of challenges to keep it is one understandable and cohesive things, that can be overcame with patterns and techniques

reuse patterns - code reuse is common, but it can have different forms and flavors with their tradeoffs
- code replication - each service has copy of share functionality
	- while it is often told to avoid sharing too much, you still need to have it in some form for maintainability (hard to change AND keep consistent)
	- some simple, low volatile code (often some interfaces OR utils) can and better be replicated
	- keeps ideal bounded context
- shared lib - shared code lives separately and bounded to app at compile time
	- libs must
		- have proper granularity
			- too coarse will require constant changes and adoption of potentially useless functionality, BUT too fine grained is hell for dependency management
			- prefer smaller libs with dedicated, cohesive responsibility
		- be versioned (always)
			- you have lower impact by each update, BUT time to market decreases
	- consider deprecation strategy and support for older version
		- high volatile libs should have better support for older version
			- avoids too much maintenance burden on consumer
	- always pin your versions AND remember that any patch version can lead to breaking changes
	- note that bundle size increases with each lib AND multi-language environments are problematic (unlike in shared service pattern)
- shared service - shared code lives separately and accessed via some interface of a service
	- it has great time to market, BUT breaking changes need to be adopted upfront or versioned via API AND risk of breaking consumers is generally high
		- note that versioning is still hard her AND reduces time to market, but it may be the only option for some changes
	- shared service becomes single point of failure
	- performance is impacted
		- mainly in form of latency
		- still you can utilize async communication patterns OR proper protocol to mitigate some performance
	- scalability may be hard OR service may even become a bottleneck
	- notes:
		- inheritance is not accessible with this pattern, only composition
- side car - shared code is attached to each service (utilize fitness functions to verify that) as external dependency and lives separately from domain logic
	- great for logging, monitoring and other infra components
	- can be maintained by infra/platform teams
	- each sidecar can establish connection with sidecar in other service, thus forming Service Mesh, that can give additional insights on connections inside system
	- there is concept of orthogonal coupling in architecture, where two independent things need to be coupled for some reason
		- side car solves operational part, where you have shared, pluggable component, that solves infra needs of each microservice, while preserving their independents
		- in other words it is consistent way to create isolated coupling
	- notes:
		- similar to hexagonal architecture, where you have set of ports and adaptors, that allow to connect to stable domain core
		- sidecar per language is required
		- ideally sidecars should be tested on subset/all services it is used
		- put in sidecar only stuff that widely used
- notes:
	- reuse can be harmful, due to been single point of failure AND overcomplicating things, when it comes to domain reuse (each service may have some additional expectations from `Customer`, so they will overcomplicate shared model, duplication is better choice here)

data ownership AND distributed transactions - after data is pulled apart we need a way to provider each service with needed data, handle transactions AND decide on data ownership
- ideally writer to table owns it, BUT it won't work for multiple writers
	- for single writer - writer is owner
	- for many writers - dedicated service is created to become writer/owner
		- you can have sync/async requests to do writers by other services via API
	- for several writers - choose one below:
		- split tables into separate per service so each owns respective data
			- we will create need for communication and transactional consistency
		- put services with DB in single domain context AND single quantum
			- avoid transactional consistency and service2service communication
			- When choosing the data domain technique, always reevaluate why separate services are needed since the data is common to each of the services. Justifications might include scalability differences, fault-tolerance needs, throughput differences, or isolating code volatility
			- changes to schema will impact both services, DB performance can become a bottleneck
		- assign single service to become owner AND use other one to do writes via it in form of delegation
			- ownership is assigned either to service with most operations priority (the one who must be more performant) OR to service that is closer from domain standpoint
				- better go with domain for simplicity of understanding the system and proper bounded context AND solve performance via design (cache, queue etc)
			- creates service2service communication bride (that can be sync OR async) (performance degradation AND transaction problems for write operations)
			- services are coupled and become single quantum this way
		- combine services into single one
			- you trade-off independency and scalability for single data ownership
			- it will be harder to maintain such service if it becomes too coarse
			- fault tolerance is at risk
- distributed transactions
	- common type of transaction ACID transaction, single atomic units of work
		- Atomicity means a transaction must either commit or roll back all of its updates in a single unit of work, regardless of the number of updates made during that transaction. In other words, all updates are treated as a collective whole, so all changes either get committed or get rolled back as one unit
		- Consistency means that during the course of a transaction, the database would never be left in an inconsistent state or violate any of the integrity constraints specified in the database
		- Isolation refers to the degree to which individual transactions interact with each other. Isolation protects uncommitted transaction data from being visible to other transactions during the course of the business request
		- Durability means that once a successful response from a transaction commit occurs, it is guaranteed that all data updates are permanent, regardless of further system failures
	- transaction in distributed system can't be called ACID by nature, they are called distributed OR BASE
		- Basic availability (the “BA” part of BASE) means that all of the services or systems in the distributed transaction are expected to be available to participate in the dis‐ tributed transaction. While asynchronous communication can help decouple services and address availability issues associated with the distributed transaction participants, it unfortunately impacts how long it will take the data to become consistent for the atomic business transaction
		- Soft state (the S part of BASE) describes the situation where a distributed transaction is in progress and the state of the atomic business request is not yet complete (or in some cases not even known)
		- Eventual consistency (the E part of BASE) means that given enough time, all parts of the distributed transaction will complete successfully and all of the data is in sync with one another. The type of eventual consistency pattern used and the way errors are handled dictates how long it will take for all of the data sources involved in the distributed transaction to become consistent (different patterns with different tradeoffs exists)
			- background synchronization - separate service do data syncing from time to time in batches
				- longest to become eventually consistent
				- can be achieved via events OR by some algorithms to read table and sync target tables
					- in any case sync service need to know and have access to data, thus breaking bounded contexts
				- great for closed systems, that don't share data between each other
					- it keeps services decoupled
				- system is responsive
			- orchestrated request-based orchestration - orchestrator is managing single request AND request is completed/failed only after all transaction is done
				- orchestrator is tightly coupled to orchestrated services
				- orchestrator can be
					- one of some services
						- often bad solution, because service is highly coupled with others AND have too much responsibility
					- separate service
				- systems becomes consistent pretty fast, but each transaction is slow
					- for better responsiveness you can utilize parallel operations, BUT rate of rollbacks will increase
				- error handling is hard due to rollbacks, retries etc
					- and how to response (200 OK OR error(if error, do we need to retry or not))
				- service must allow for restore operation OR we need to create/update entity, which might trigger unwanted workflows
					- and what to do if this operation fails too :/
				- request become atomic this way
				- services are decoupled from each other
			- event-based synchronization (most modern, popular and reliable) - events/commands are sent via pub/sub messaging system to each service with event preservation
				- eventual consistency is quite short, BUT still takes time
				- responsiveness is great, if you don't need to wait for response
				- services are decoupled
				- message need to be available for reasonable time AND subscribers must be durable, meaning they must be able to receive messages from past, when they were inactive
				- error handling is still pain for more complex scenarios
					- common solution is to have dead latter queue, where you send unprocessed events for later automatic/manual resolution

distributed data access - unlike in monolithic apps, with direct DB queries, in distributed systems you need to choose some specific way to access data with set of tradeoffs
- interservice communication - one service asks other for data via network
	- problems:
		- performance degradation (network latency, additional DB calls)
		- services are coupled via sync calls
			- fault tolerance reduction
			- scaling must be done for both services
	- advantages:
		- simple
		- no data duplication
- column scheme duplication - data duplicated in each service's DB
	- problems:
		- data sync is required AND often data is only eventually consistent due to async nature
		- data duplication
		- no concrete owner of data
		- services are coupled (loosely) due to data sync requirement
	- great for high responsive OR/AND high volume of data systems
- replicated caching - cache is kept in-memory, BUT constantly updated in bg via async events, thus all services has same data on hands
	- problems:
		- startup timing is slower, because we need to populate the cache (or fallback to service2service calls, that can be risky)
			- also we need to wait for second service to boot
			- it is problem only for first instance, other can copy cache from already running once
		- if amount of data is too big, we would spend to much to keep it in memory
		- we still have latency, so high volatile data isn't suitable here
		- service discovery may be problematic
	- benefits:
		- single data owner, that can access to write to cache
		- no need to do sync service2service calls
		- responsiveness
		- fault tolerance
		- scalability
	- notes:
		- pure in-memory caching can be used here, but we aren't gaining benefits of constant syncing
		- distributed caching(cache is located in separate service and constantly updated to avoid service2service communication) is often a bad solution here due to:
		- fault tolerance
		- data ownership (can be somewhat fixed if only owner writes to can)
		- network latency
- data domain - combine two DBs into one and enclose both services into single domain
	- we avoid all problems with data consistency & syncing, latency, ownership, service coupling etc, BUT in cost of sharing DB between services (with it's fault tolerance, security AND change impact problems)

managing distributed workflows - how combine and build communication between several services to do some task
- orchestrator - orchestrator/mediator is used to perform coordination (ordering, state, error handling etc) activity between services
	- orchestrator is used per workflow for couple of services, not for whole system AND can't contain domain logic, outside of scope of orchestration
	- advantages:
		- centralized workflow & error handling
		- recoverability (due to access to internal state)
		- state
	- problems:
		- bottleneck in form of orchestrator (scalability, fault tolerance, latency)
		- service coupling point is created
- choreography - each participant of workflow triggers next step execution
	- triggers are often implemented in form of async messages
	- we have no state owner so there are different ways of managing it:
		- front caller - first service in chain holds and used to retrieve state
			- creates a pseudo-orchestrator, which simplifies workflow
			- increases communication & coupling
		- stateless - keep no state and calculate it on fly
			- keeps services decoupled and scalable in cost of complexity and potentially latency overhead
		- stamp coupling - pass state as part of messages
			- we can't query state on demand
			- contracts are more complex
	- advantages:
		- responsive, fault tolerant & scalable with low coupling 
	- problems:
		- system is more complex, because workflow & state is located through it's participants
		- recoverability is harder
		- service coupling (semantic)
			- semantic coupling means cross context coupling that arises when we need to implement business requirements, that require domain interactions
			- ideally you need to model implementation as close as possible to semantics to avoid large semantic coupling

transactional sagas - 
