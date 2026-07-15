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
