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
