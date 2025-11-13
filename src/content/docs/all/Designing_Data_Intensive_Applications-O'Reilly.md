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
	- maintainability - system must be easily changeable

