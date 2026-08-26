---
title: Notes of "SRE at Google" by O'Reilly
---
*notes of "SRE at Google" by O'Reilly* 

## Preface
- how google keeps systems reliable and scalable on all parts of lifecycle
- most cost comes after system is running
	- Site Reliability Engineering focuses on software after it is released (fixing problems, building scaling infra, forcing SLO/SLA/SLI)
	- the earlier you start worrying about SRE, the better
- system must account for human errors and allow for recovery
- > SRE Way: thoroughness and dedication, belief in the value of preparation and docu‐ mentation, and an awareness of what could go wrong, coupled with a strong desire to prevent it.

## Intro
#### Intro
- common approach is to have devs and ops (ex: sys admin)
	- pitfalls: 
		- direct cost
			- team of ops scales with application
			- manual labor
		- indirect cost
			- communication and miss-communication between different teams
- SRE can be described as ops team ran by engineers
	- high focus on automation, manual labor is capped
		- much of the work is development
		- if too much labor exists, managers involve product devs to handle it
	- prevents ops/dev split, because SRE are engineers
	- SRE must have management support to enforce policies (ex: to meet error budgets)
	- liabilities: availability, latency, performance, efficiency, change management, monitoring, emergency response, and capacity planning
- SLO basics
	- don't aim to 100%, you will be too slow (development, execution)
		- first of all consider: user satisfaction, what availability competitors provide, is it possible to have partial degradation
	- "100% - your_percentage" is available error budget, that you can spend for feature development, BUT development must be shifted is budget is broken
		- > An outage is no longer a “bad” thing—it is an expected part of the process of innovation, and an occurrence that both development and SRE teams manage rather than fear.
- monitoring
	- is something happens (often threshold is met) system notifies human to take action
		- ideally human shouldn't have to do any interpretation, this is system's job
		- commonly system can produce:
			- alerts (take action now)
				- ideally system should require as least human intervention required as possible, because it slows down time-to-fix
					- basics: gradual rollouts, problem detection mechanisms, automatic (or semi-automatic) rollbacks
				- other cases should be handled ASAP (playbook with common steps could help)
			- tasks (take action later)
			- logging (not actionable data just in case)
- future proofing
	- regular load tests and planning for grows are key things to account for
- resource management
	- proper machine resource allocation
	- monitoring on resource usage
- > SREs predict demand, provision capacity, and can modify the software.

#### Internals
- BE distribution can decrease load on single region, allow for partial degradation and act as optimization
- always consider peak load AND cases when critical parts of system (ex: caching) fail

## Principles
#### Embracing risk
- users won't notice higher availability after some point (commonly because other parts are less reliable then yours: network, etc)
- balance in reliability percentage is crucial
	- can be achieved by balancing:
		- cost of machine redundancy
		- cost of engineering time spent on system's resilience development
- measurements are often done from perspective of unplanned downtime the system could have (in other words we need to proved some percentage of availability (often 3-5 "nines", ex: 99.9%))
	- availability can be measure by `uptime / serving time` (less representative for distributed systems) or by `success requests / all requests` (not all requests are equal so it is an approximation, this can also be used for non-user facing systems like batch-processors)
- > Which is worse for the service: a constant low rate of failures, or an occasional full-site outage? Both types of failure may result in the same absolute number of errors, but may have vastly different impacts on the business
	- ex: missing profile data will cause poor UX, but service can still run, WHILE critical security problems are better been handled by first killing service to prevent any data leak
- always consider does "new nine" cost will be offset by benefits it gives
- notes
	- remember about other metrics except just availability that can be crucial
	- by choosing proper infra based on trade-off you can reduce cost for non-critical parts WHILE keeping critical parts in good shape

- error budgets
	- SREs has tension with Product teams due to opposite-ish goals, so we need to have some means to come to agreement
		- budget should be formed based on data
		- SLO can be formed based on Product needs
		- uptime is monitored by system
		- it must be set that breaking the budget means no feature development
	- if you have more error budget, you can take more risks
	- SLO don't have to be constant

#### SLO (Service Level Objective)
- each service is uniq, so owner must define it's:
	- SLI (service level indicators) - some critical (request latency, error rate etc (what do you and your user care)) metrics
		- not all metrics are SLIs
		- try to keep SLIs standardized
		- keep it simple
	- SLO (service level objectives) - values/ranges that metrics defined by SLI must fall into
		- remember that improving one metric can degrade another one
		- aggregation may hide important details
		- ideally work from needs to indicators (backwards logic may result in poor choice of indicators for the task)
		- SLO can be defined as percentiles OR as separate objectives for different use-cases
		- track SLO trends
		- don't pick target based on current performance
		- keep number of SLOs small
		- public SLOs can have some leeway in contrast of internal
		- overachieving SLO can be harmful for infra, because users will rely more on actual result, SO deliberate throttles and downtimes may be necessary
	- SLA (service level agreements) - statement of what is going to be done in case SLO is not met (often viewed from product perspective)
		- SLA is often exposed through the contracts, BUT you may have internal only SLAs for something like public website

#### Eliminating Manual Work (Toil)
> If a human operator needs to touch your system during normal operations, you have a bug.

- toil is redundant overhead in work
	- often: manual, automatable, repetitive, reactive, doesn't improve service, grows linearly
- toil is bad in big quantities, because it:
	- lowers moral
	- slows progress
	- doesn't scale
	- stagnates career

#### Monitoring Distributed Systems
- reasons:
	- analyzing long term trends
	- A/B testing & over-time comparison
	- alerting (alert only if something truly off)
	- dashboards with SLOs and "golden signals"
	- debugging
- keep monitoring and alerting as simple as possible, THUS more understandable
	- remove unused stuf
- differentiate between symptoms of failure AND what exactly caused it
- differentiate between parts of system (ex: slow FE can be caused by problems with JS, server, DB or just due to network)
- golden signals of monitoring:
	- latency (time to serve request, diff between failed and ok requests)
	- traffic (number of requests in time window)
	- errors (directly failed requests, requests that successfully served something wrong OR broken SLOs)
	- saturation (resource consumption (often most constrained one) of your system)
		- can be used for predictions, like DB will be full in N time
- resolution
	- higher resolution requires more resource consumption AND not always necessary
	- higher resolution can be achieved by on-service sampling
- alerting:
	- alerts should fire:
		- without duplicates (between people and same person shouldn't get multiple pings)
		- when thing is actionable, non-ignorable, urgent AND (commonly) lead to user-side problems
		- without inclusion of test traffic
	- automation in alerting should be done without human intervention

#### Automation
- must be applied properly to proper things, OTHERWISE it is as harmful is it's non-presence
- pros:
	- scalability
	- consistency
	- faster repairs and early problem detection
	- faster action
	- time saving
- not everything must be automated, especially on early stages
	- also differ autonomous vs automated
		- ideally system should be autonomous, BUT it might be not worse it OR even harmful, when you can't manually hop into the system, due to autonomous restrictions
- ideally automation should be a part of an app, to prevent any divergeon in functionality between system and automation, BUT it might be problematic to keep them so (automations require testing, product team may not have resource to update automation)
	- especially infrequently running automations suffer from divergeion
	- hierarchy:
		- no automation
		- external automation:
			- system specific
			- generic
		- internal automation
		- system without the need of automations
- auto-tests are also important part of automation (especially good once, with understandable output etc)
- automations very in next aspects
	- accuracy
	- latency of execution
	- relevance to real problem
- strive for decoupling and clear API contracts

#### Release Engineering
- process of making releases automatic, reliable, consistent and fast
	- wraps source code & config storage, compilation, testing, packaging and deployment
- principles
	- serve-served (practices and tooling must be self-used by product teams)
	- high velocity (allow for TBD)
	- hermetic builds (self-contained, env independent)
	- proper policies and procedures (enforced quality gates, review requirements)
- build and deployment
	- build
		- tag your builds to identify them
		- keep build hermetic for reproducibility
	- branching
		- you can release from the main OR from the separate version-release branch, that can cherry-pick commits from main
	- testing
		- test changes (before and after merge)
		- run tests only on relevant version of main (avoid v2 tests testing v3 that was merged right after)
	- packaging
		- when storing packages associate uniq id, hash and labels (version and generic like `canary`) with package
- config management
	- common problem cause for incidents
	- patterns
		- store as code (enforces review and standard process, BUT requires redeploys AND has version skew)
		- merge configs with binaries for simple apps
		- store as packages (allows versioning, app's package can depend on config package with specific version)
		- configurable OR frequently changed configs can be stored in DB separately

#### Simplicity
- balance of speed and stability is key to good software
	- stability can enable speed (proper deploys enable TBD)
- fight accidental complexity
- remove redundant code
- APIs: keep minimal, versioned, modular, without breaking changes
- TBD
- > Every time we say “no” to a feature, we are not restricting innovation; we are keeping the environment uncluttered of distractions

## Practices
- health system, like health human, has pyramid of needs (from most important to least)
	- monitoring
	- incident response
	- postmortems and root-cause analysis
	- testing
	- capacity planning
	- development
	- product

#### Practical Alerting from Time-Series Data
- complex system must avoid outliers in alerts, BUT allow their inspection for debugging
- you can monitor on different levels of your system  (ex: cluster, region), and aggregate metrics of lower level in higher one
- monitoring should also store wether connection to service was successful, health check response, what time did it took to collect metrics
- threshold your alerts to avoid false alerts
- you can collect internal detailed metrics for white-box monitoring AND do black-box monitoring via probs to verify proper behavior of system
	- ideally probs should allow to scrape metrics out of them (ex: see final latency)
	- probs can be pointed to different levels of the system (fe, be), than results can be compared for fine-grained alerts
- configs:
	- reuse between targets
	- test config changes via tests against mocked/real data
	- standard metric vars and labels are great way to reduce complexity

#### On-Call
- engineer, ops OR SRE is a candidate for on-call of service he owns
- on-call involves both working and non-working (for less critical systems/actions) hours
	- international teams should back each others during night times to reduce load
- duty should react to incident in some SLO defined frame
- escalate to team and search for solutions
- several people can be on-call, considering requirements and load
- rotation should be often enough to avoid getting off touch
- load for single person must be manageable to avoid poor resolutions and ensure proper postmortems
- ideally should be compensated
- be careful with immediate automatic reactions when been on-call
	- still good escalation paths, automatization (ex: auto status page updates) and handbook are important to make actions quicker
- ideally 1 incident should have single alert (1 aggregated alert of multiple)

#### Troubleshooting
- troubleshooting must be learned and taught
- focus on how in general and on system internals
- idealistic flow: get alert with problem, understand state of system (via logs/metrics), understand what went wrong, test, fix
	- refine and repeat steps
	- pitfalls:
		- miss-reading state
		- looking for wrong state
		- not knowing how to test hypothesis
		- going with improbable OR already happened theories
			- prefer simpler explanations
		- working with correlated problems
- details:
	- alert:
		- should be detailed
		- ER+AR
		- consistent form, searchable and created via automation
	- triage:
		- stay calm
		- escalate when needed
		- focus on making system work ASAP, not finding root cause and moving to ideal state
	- examine:
		- good logs should have traces
		- ideal logging should be queried easily AND have possibility to be tweaked live on fly (verbosity, sampling etc)
	- diagnose:
		- use predictable tests that can be done against each component involved in system (you can investigate from start to finish or via bi-search)
		- ask what, where and why
		- understand when system was working and what resulted in degradation
	- test:
		- ideally test should be able to rule out several theories
		- remember that improper test might mislead from root cause
		- perform from most likely to least
		- test may have side-effects
		- it might be hard to reproduce issue so it is ok to have less evidential test in place
		- note what you do to then revert and trace
		- negative tests will rule out false theories
			- negative results should be noted too
			- in general publishing failed experiments will prevent people from doing same mistake twice
	- cure:
		- fix
		- if possible, verify that problem isn't repeating
		- write postmortem

#### Emergency Response
- don't panic
- escalate if needed
- be quick
- don't forget to clean-up
- keep postmortems and action on them
	- always ask challenging "what if" questions
	- do deliberate testing

#### Managing Incidents
- process should be properly designed to avoid miss-communication, improper actions and keep incidents resolution fast and efficient
	- everyone involved must know their role and responsibilities
		- common roles:
			- command - main role that delegates to others
			- OPS - person OR team of people that have exclusive access to modify failed system (they must be coordinated within each other)
			- communication - person responsible for internal and external incident communication
			- planning - supportive team that helps OPS with less technical activities
	- incident should have a:
		- chat (ideally preserved for history)
		- live document that contains incident info
		- handoff process (it is important to clearly switch staff for long incidents)
	- "it depends" when you declare an incident on your company rules, but better early then late (generally customer impact OR the complexity OR the problematicity is key sign)
- notes:
	- consider different paths to incident resolution
	- routinely practice incident management

#### Postmortems
- allow to learn from failure
- commonly includes: incident, impact, actions taken, root cause, actions to be taken to prevent such incidents with proper priority
- it takes time, so should be written for serious staff only (ex: user impact, data loss, mitigation was quite problematic OR long, incident was discovered manually not via monitoring)
- postmortem can't shame people/teams
- must be reviewed by peers & management
- to introduce postmortems:
	- create a workflows
	- reward proper postmortem & highlight result
	- enforce

#### Tracking Outages
- postmortems highlight large problems, but smaller fade away
- analytics over alerts, outages and similar events allow to see trends, problems and evaluate impacts better
- for better future usage alerts could:
	- be tagged
	- aggregated with each other under single incident

#### Testing for Reliability
- testing reduces uncertainty in changes
- tests are great way to automatically "repair" broken system by not allowing it to be delivered at all
- e2e tests can be quite complicated and unreliable, because they are ran on not hermetic env (source code change should produce green suit, but it fails due to improper config changes)
- tests configs
	- fail in config tests is clear blocker to app deploy with this config
- canary tests are great way to safely rollout changes, BUT consider that failed canaries might produce broken data OR inconsistent system state
- how to cover existing system with tests
	- prioritize important parts of the system AND parts that are dependencies for other teams
	- add primitive smoke tests
	- add tests for each new bug
	- CI/CD with tests
		- notify engineers if tests are red
		- ideally tests against affected by changes code
	- set explicit coverage goals
- it might be challenging to test eventually consistent systems, so additional method should be introduced
- chaos monkey testing can be helpful
	- failed cases should be reproducible via logs
	- failed cases should be converted to proper tests
- rerunning tests and seen statistical output of failures and passes can signify test flackiness and change of it's level due to changes
- some tests failures are more critical then others
- SRE tools should be tested too
- force deployment is critical for fast releases
- test bad & good scenarios (note that not everything can be tested against prod)

#### SE in SRE
- SE is important part of SRE, because it allows to put in-depth SRE knowledge into tooling creation, that adds automatization and similar benefits to whole system
	- this result in great in-house tooling
- service capacity planning
	- focus on intents from service, not on instructions when counting needed resources
	- account for your dependents
	- set priorities on what intents are more important
	- account for: performance, budgets, resource availability & forecast data
- SRE teams might need to learn details of project development
	- communicate benefits from SE
	- hire people that can fill gaps of PM/PO for SRE team
	- launch fast and iterate
	- keep-up same standards (review, testing etc) as for normal development
- note:
	- when building fuzzy things focus on clear interfaces, modularity and generality
	- adoption of new tooling
		- raise awareness of problem and efficiency of your solution
		- listen to your audience
		- have strategy
		- have upper-management support
		- give proper promises (good enough to consider your solution, BUT not too much) AND set clear roadmap
		- find your audience
		- give support to adopters
		- success != 100% adoption
	- don't design too generalized OR too focused software

#### Load Balancing at the FE
- DNS
	- receive user request, calculate set of closest not very loaded machines, send back a set of IPs (Virtual IPs) back to user
		- remember about:
			- caching at different layers
			- size of DNS response is limited
			- client might not load balance received IPs
			- different DNS resolvers are used by different amount of people, based on location
- V(irtual)IP
	- VIP allows user to connect to some machine, that will reroute request to different machine, while preserving the IP
	- prefer stateless protocols and use consistent hashing for stateful
	- ideally machine should response directly to request maker, not via load balancer to avoid network consumption by large responses

#### Load Balancing at the Datacenter
- we must keep a bit of leeway of CPU capacity per app, BUT not too much to avoid waist
- protecting against overload:
	- if throughput of service falls, stop sending requests
	- if service asks to reduce traffic - reduce
		- also great for graceful shutdown
	- don't connect to too much instances at once (both instance and balancer will be overwhelmed)
		- monitor instance load and correct this number
		- to load balance connections don't shuffle randomly, you need proper shuffling algorithm to even distribution, WHILE keeping things shuffled (thus fault tolerant)
- load balancing algorithms
	- round robin
		- simple, but not as effective, due to
			- different query costs, different states of instances, different machines capabilities
			- load balancers may have different request rates on them thus causing more load to instances too
			- other problems like: neighboring tasks increasing load on machine, task restarts consuming more resources to boot
	- least-loaded round robin
		- do round robin on subset of least loaded tasks (account that if task has high error rate it must be ignored due to been unhealthy)
		- limitations:
			- we aren't accounting load, only number of requests
			- we aren't account requests from other load balancers
	- weighted round robin
		- do round robin on subset of highest scoring tasks (account for: requests, error rate, resource utilization)

#### Handling Overload
- server degraded responses
- rely on cache
- handle overload errors properly
- model capacity non by queries per sec, BUT via give resources to service
- restrict and limit traffic for high volume clients
- throttle on service AND on load balancer
	- avoid throttles on spikes
- serve more critical requests and drop less
- retry requests downstream as new separate request
	- be careful to not self DOS your system with retries (limit retry count per request & per client, retry only one level deep in request chain)
- live connections can cause performance issues
	- killing and spawning connection may be more efficient
	- use single proxy that will handle all connections and single be that will keep one connection

#### Handling Cascading Failures
- failure of one/set of machines will cause increased load onto other machines, causing cascading overload
	- even if you can spawn processes to compensate, you need to have in-between time to spawn instance and wait for app to load and stabilize, before serving at proper speed
- to prevent
	- test & configure load balancing such it prevents cascading issues
	- serve degraded or declined results (decline can be done by service OR balancer)
		- requests can be dropped by priority AND/OR filtered by suspicious activity
		- remember to fine tune and test degraded mode from time to time
	- do capacity planning
	- keep request queue size small to prevent queue overflow, timeouts and constant resource drowning
	- drop long waiting requests (there is great chance that user deadlined OR refreshed the page, which resulted in new requests ready to be handled)
	- use randomized exponential backoff on retries
	- limit shared resources usage by client
- deadlines
	- to small will result in retries of heavy requests, to high will drain resources and create bad UX
	- decline should propagate across request chain (decrease deadline by some fraction to account for network)
- cache
	- cache can be used to reduce latency OR as a way to add capacity to service (prefer first type, be very cautious with second one)
	- if cache need to be warm, limit incoming requests to instance
- be careful with instance to instance communication due to: locks, additional load, more complex startup
- testing
	- look at system under breaking load
		- ideally breaking should equal serving errors, not dying
	- test cold and hot instances
	- test how system recovers
	- test different part of system in isolation too
	- test on real traffic (prepare spare capacity in case of failure)
	- test non-critical parts too
- addressing failure: increase resources, temporary reduce health checks & tests, restart instances, drop traffic (drop, fix root cause, renew traffic), remove additional optional load, block "DDOS" traffic
- notes:
	- rollout of new binary might cause short performance degradation
	- if possible, communicate with clients on usage patterns of service to be prepared

#### Managing Critical State
- critical state is often best managed by using distributed systems
- distributed consensus is basic primitive distributed systems are built upon
- distributed consensus allows for next patterns (hire-order building blocks of DSs):
	- Reliable Replicated Datastores (base on Reliable Replicated State Machine)
	- Leader Election (must be dialed-in properly with some randomness involved to avoid several Prosers dueling for leadership thus system been non-alive for that period)
	- Distributed Locks & Barriers
	- Distributed Queues, Atomic Broadcast
- DS are hard to implement and might have performance penalties if done wrong
- reads can be scaled through replication, which can be consistent via:
	- consensus
	- read from leader
	- quorum leases (gives guarantee that local reads are up to date)
		- have write penalty
		- give lease to read for some up-to-date replicas for short time, write must be acknowledge by quorum, if some quorum member dies writes are disabled until lease is active
- fast paxos may no be faster then regular paxos if connection between nodes is slower then with leader AND it is harder to do batching this way
- stable leader is great but clients far away from leader may suffer, so doing leader rotation from time to time can be beneficial
- paxos requires disk writes (multi-paxos even more), so we can optimize it by batching with application disk writes and co-locating writes in optimal manner
- deployment
	- for Byzantine system use 3n+1 instances and for non-Byzantine 2n+1 instances to tolerate n failures
		- note that more node == more cost, bigger overhead
		- less nodes == higher risk, lower maintenance abilities
	- in critical failure, you either have to recover state of failed machine OR risk data loss
	- location is a tradeoff between failure zones AND latency
		- consider criticality of failing part
	- account for required capacity
		- adding replicas increase capacity, BUT it may increase load on leader, add latency, decrease availability
	- remember that in leader systems leader can be a network bottleneck
	- in case of leader failure other nodes must have enough network bandwidth too
	- leader election mechanisms should prefer: longer-running processes, leaders near the bulk of clients, better performing nodes (remember not to overload single node and do proper load balancing)
	- spread quorum members evenly
- monitoring
	- are all members alive
	- how many members lag behind
	- is leader exists
	- how often leader changes
	- are consensuses reached
	- seen vs agreed proposals
	- latency (proposals, between parts of system)
	- time spent on durable logging

#### Distributed Scheduling
- simple cron
	- if machine fails, no job starts
	- cron config must be persistent
	- cron doesn't retry jobs, it doesn't handle idempotency (in general there is no single solution for system with side-effects, base line is to prefer skipping task, monitoring skips and resolve separately)
- cron at scale
	- must be reliable and deployed on multiple machines
		- state must be shared (either via shared storage OR each machine should have replicated synced state (can be achieved via single mutually exclusive leader)), and machines must be hot-swappable to fastly execute task without time delay
			- can be achieved via Paxos or similar algorithm (which requires storage of logs (can be done on each machine with replication WITH snapshotting to external machines))
	- task must be isolated via container
	- cron must have recovery mechanisms set in case of partial failures
		- each operation of a job must be idempotent AND tracked in some external storage to understand whether it was performed
	- each job must be launched as sync transaction (state that launched, do actions, state that finished with timestamp)
	- distributed crone will have spikes because people tend to run it at midnight hours

#### Data Processing Pipelines
- single computation in pipeline is phase, multi-phased pipeline will have N depth (N - number of phases)
- problems
	- periodically run pipelines have issue with organic grows and spikes, causing deadlines and resource exhaustion
		- deadlines will lead to restarts and waisted resources
		- too many jobs will lead to cascading degradation
	- uneven chunking of data will throttle the whole pipeline
	- it might be problematic to allocate resources just in time
	- monitoring of failed jobs is harder, because process is not continuous
- Google way
	- store data in external storage, store pointers to data in in-memory storage with durability, keep actual workers stateless issuing commands to manipulate storage, keep additional shared logic as plug-in solutions
	- pipeline is broken in stages, that processed by different workers
		- work is executed exactly once by some exact worker holding the lease
			- for additional safety worker writes are isolated from each other AND versioning is applied AND validation by token between data store and worker is applied
		- logs are stored in distributed storage to ensure work can be continued after "death" of a system

#### Data Integrity
- users should have access to data, and it must be accurate
	- any failure must be short lived and thus fastly detected, otherwise users will loose trust
- backups
	- backups must act as restores (always available and easily loaded to system data), not archives
	- must be frequently made
	- must work as continuous point-in-time recovery points
	- each layer must have redundancy (db is backed up into storage, storage is replicated (ideally between several cloud providers))
		- note that adding layers increase backup time, so it is a tradeoff
	- problems: infrequently backups will cause stale data, application versioning might cause data corruption, replication is not backups (malformed data will just propagate through the system)
	- early detection (bad data will be replicated, backed up and decrease overall quality)
		- always validate data, don't trust algorithms
		- validation can be done via product specific rules as batch jobs (potentially with auto-fixes AND with tooling to verify validation results and do actions)
		- always test backups and recovery mechanisms
	- principles:
		- every system has potential bugs in it
		- trust but verify
		- hope is not a strategy
		- have multiple stages of defense
	- notes:
		- some data losses may be unnoticed over weeks, so backups must be kept for a while
		- data should travel next flow: user moves data to trash, trash is emptied via soft delete, data is purged from system
			- alternative to soft deletion is lazy deletion (deleted data is unavailable to app, but kept in system by default and purged automatically)
		- to ease service load you can do full backups at off-peak hors with incremental backups
		- it is ok to use "colder" storage of older backups
			- still storing too old data is hard task, because of migrations and schema changes, SO prefer investing in early detection
		- replicate backups & date (you can safe time and resources using redundancy saving mechanisms by layering consecutive changes with algorithms)
			- additional time savings can come from:
				- sharding data to backup in parallel (be careful with siblings)
		- urgent backups should be available 247
		- recovery process must be possible to monitor

#### Reliable Product Launches
- SRE enables fast & reliable launches and iterations
- practices
	- write checklist (must come from shared template that maintained over time)
	- create coordination group (audit, coordinate, gatekeep, educate)
	- anticipate failure scenarios
- process must be:
	- lightweight
	- robust
	- consistent
	- scalable & adaptable
	- \---
	- focus in basics, adapt to your case, provide simplified processes for similar launches
- use & develop common infra
- checklist:
	- architecture
	- stakeholders
	- integrations (including external once) & infra
	- capacity planning (account for initial spike, do regional launches)
	- working with failures (network, datacenters, DoS, dependency failures, partial failures, deadlines)
	- client behavior & rate-limiting (jitter automatic requests)
	- processes (including any non-standard processes in dev, rollout & configuration process) & automations
		- also plan for not meeting launch deadline
- techniques:
	- use gradual rollouts (with urgent rollbacks)
	- use feature-flags (critical change testing, A/B testing, theory verification)
		- keep them consistent for single user
	- use hot configs that clients can fetch and update their behaviors
	- categorize launches and simplify processes for non-risky once

## Management
- SRE is always about working in team and within teams

#### Accelerating SREs
- proper onboarding, training & docs is key to fast team grows without too much interruption for senior staff
- remember to listen new hires and convert their entusiasm into aciton
- training
	- patterns
		- learning program, reverse engineering, postmortem culture (both to read & write them), controlled outages & role-playing (can be based on postmortems), shadow duty (first newcomer is shadow, that he shadowed by senior), mentorship, project work, build learning path with a goal from some starting point
	- anti-patterns
		- "do work to study", train only by playbook, don't sharing expertise, solo duty without prep, not changing study program, give only chore tasks
	- after couple successful solo on-calls learning is self-directed, onboarding is done
	- verify proper understanding of the system by student
	- skill to focus on:
		- reverse engineering
		- statistical thinking
		- improvisation & zooming out
	- notes:
		- controlled outages must be performed under real OR synthetic load
			- exercise can be done from good to bad state (collect predictions first) OR from bad to good state
		- you can ask newcomers to contribute to docs as part of studying
		- update docs and do knowledge sharing

#### Interrupts
- types:
	- pages (always has short response SLO)
		- managed by primary and secondary duty
	- tickets (some has response SLO)
		- can be done via duty OR by team members
		- might be planned OR ad-hoc
	- operational responsibilities (toil)
		- can be done via duty OR by team members
		- might be planned OR ad-hoc
- prioritize interrupts based on:
	- SLO response time, severity, frequency, number of available people, possibility to backlog
- techniques:
	- maximize flow state time and minimize interrupts (note that for duty project work is more of an interrupt from duty)
	- avoid context switches AND try to block time either for interrupts OR for project work
	- bring more people
	- always have duty and prioritize interrupts for them
	- handle interrupts by priority
	- pass tickets to duty OR to separate ticket person
	- toil must be standardized, so it is easy to pass between duties
	- duty and ticket roles should be passed to next person with hand-off (meetings to review tickets are also great, because they allow to see broader picture)
	- you can mute alerts if you have task to fix it waiting in queue
	- your team sets the effort and provided service (it is ok to push something to customer, it is ok to have policies in place)
- notes:
	- distraction is part of work, BUT overall team should not feel distracted

#### Embedding an SRE to Recover from Operational Overload
- SRE can be temporary embedded to another team to fix processes and practices to reduce tickets and operational load in future (avoid just helping doing toil)
- TODO as embedded SRE
	- learn team & context
		- identify largest problems and focus on fixing them (push team to learn from it and do the same, unreliable service is often first problem to tackle)
		- identify future problems (knowledge gaps, unmaintained OR unowned systems, dependence on "we will improve it with next big thing", common alerts aren't fixed, missing SLI/SLO/SLA, no capacity planning, actionless postmortems)
	- share context with a team
		- lead by example (write good postmortems for future problems)
		- don't blame people, help them grow
		- sort problems (to fix, to build tooling/process to reduce problem)
	- teach peers and drive change
		- small, understandable processes will move team to better state
		- start with SLO/SLI/SLA
		- assign people to do long-term task AND review the process
		- write docs and encourage to do the same
		- alway explain actions & reasoning (even if nobody asked)
		- ask question (try to embed metrics ANS SLOs in them, ex: how this impacts SLOs of service?)
	- write post-embed document, telling: perspective, examples, explanations, action items
		- keep an eye on team for several month, BUT don't engage too closely (reviews are ok)

#### Communication & Collaboration
- common values and approaches create more homogenized env
- for proper communication:
	- establish data flow through you
	- provide "API" to communicate with you
- production meetings - meeting to share common status & agree on smth related to service between SRE and other invitees
	- keep it weekly, not to long/short
	- common agenda: upcoming changes, metrics, outages, micro view on some pages, micro view on events that didn't page (or didn't required to page), existing action items
		- prepare agenda in advance
	- attendance
		- ideally all SRE from team, potentially SREs from neighboring teams, representative(s) from product team, stakeholders
		- if it is problematic to invite someone:
			- invite another member that can substitute, collect info and share meeting results in async manner
- collaboration (especially cross-team) is critical for any large and substantial project
	- the more local collaboration the faster it gets, BUT throughput reduces
		- good processes, work splitting and defined ownership enables scale
	- contributors must be involved and interested in the project
	- contributors must be designed properly and agreed upon
- diverse team with somewhat structured scope tend to perform better
- SRE must be involved in product team as early as possible

#### The Evolving SRE Engagement Model
- it might be not enough SREs to cover all projects, so projects need to be tackled somehow
	- in queue by priority (number of users, dependees, severity of problems)
	- engage as early as possible to shift left
	- build platform of infra, that covers common problems and requires little to no SRE involvement to use
- SRE engages to improve project's
	- architecture and dependencies
	- instruments, monitoring, metrics
	- emergency handling, change management, capacity planning
	- performance
- not all services need close SRE engagement
	- still SRE can consult (note: SRE won't have deep enough understanding of system), share docs etc
- models
	- simple production readiness review
		- team asks to review
		- SRE(s) chosen
		- SRE study requirements with a team, plans trainings and syncs
		- SRE study system (checklist and best practices are verified)
		- SRE finds what isn't in compliance AND what can be improved (sorts by severity, agrees with team, participate in refactoring)
		- SRE team is trained to manage the service by PRR lead and product team
		- SRE acquires permissions etc for management of project
		- SRE iterates upon service with dev team involvement
	- simple production readiness review with early engagement
		- problems with simple PRR: communicational overhead, high involvement of SRE person, lack of shit-left
		- services that potentially will require SRE engagement are great candidates to do early engagement
		- it is ok if team engaged, but never fully took on the service
	- SRE platform
		- more variety consumes time and increases PRR effort (which already quite big)
			- also mistakes get repeated
