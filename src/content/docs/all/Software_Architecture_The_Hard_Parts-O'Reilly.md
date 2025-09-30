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
