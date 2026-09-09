---
title: Notes of "Inspired" by Marty Cagan
---
*notes of "Inspired" by Marty Cagan* 

## Lessons from Top Tech
- > It doesn't matter how good your engineering team is if they are not given something worthwhile to build.
- product must solve real customer problems
- company types
	- start-up
		- looking for product/market fit (PMF) before going bankrupt
		- learn and move quick
	- growth-stage
		- looking for efficient scale and grows
		- grows core business and new products/services
	- enterprise
		- looking for continuous value and product innovation
		- often can fail under it's own weight
	- notes:
		- different leadership qualities and leader styles are required for different types
- common problem in companies that they still have waterfall structure (idea, evaluation, roadmap & prioritization, requirements & design, dev & qa & release (only agile part in whole process))
	- problems: business and sales drive product, team looses ownership (PM doesn't drive decisions, designer adapts, engineer doesn't decide much), evaluation is wrong due to small context and data, most (~half) ideas flop and other need much more time to start earning money, often produces orphaned projects, waterfall
- patterns:
	- tackle risk (value, usability etc) upfront (shift left)
	- collaborative work, not sequential
	- solve real problems, not features
- > Discovery and delivery are our two main activities on a cross‐functional product team, and they are both typically ongoing and in parallel.
	- discovery comes from collaboration
	- when discovering consider: is it valuable to user and approachable, is it buildable and will get stackeholder's support
	- use prototypes to validate discovery
	- delivered product must iterate to find it's PMF and start earning
	- good product must have a future vision

## The Right People
- product is build by a team
	- proper team with defined roles is a key to success
	- important traits: cross-functional, strong ownership, product focused, not too big, flat (reporting/mentoring is done to/with some manager/mentor, that might be outside of the team)
	- task: solve business problem under some objective
- colocation is key for efficiency
- team is often responsible completely for some sub-product, user flow, type of devices/customers etc
- teams should be durable (it takes time to accommodate for a new person)
- teams must be autonomous in their decision making with as least dependencies as possible
	- team owns an outcome

#### PM
- been scrum master OR manage roadmap via outsourcing decisions to customers is !== been a PM
- > He or she is responsible for evaluating opportunities and determining what gets built and delivered to customers.
- > Every business depends on customers. And what customers buy—or choose to use—is your product. The product is the result of what the product team builds, and the product manager is responsible for what the product team will build.
- requirements
	- know your customer (their issues, pains, desires, how they think)
	- know your data
	- know your business and how your product acts as a part of business
	- know your market (competitors, expectations, trends etc)
		- > you need to be substantially better to motivate a user or customer to switch to your product
		- product must add value to ecosystem
	- skills: smart (curiosity, quick learning, problem solving), creativity (creative thinking), persistence (been able to push company out of comfort zone via facts), leadership
	- notes:
		- PM might have analyst, domain expert etc assigned after them as addition, BUT still understanding of data and domain are requirements
		- understand constraints of your stakeholders and bring them only applicable solution under this constraints
		- > The role I would argue the product manager is most similar to is the role of the CEO. But with the obvious difference that, unlike the CEO, the product manager is not the boss of anyone.
		- PO is required subset of PM, which includes backlog and dev processes management

#### Product Design
- responsibilities: product discovery, UX (and user stories), UI (including branding), prototyping, UAT, industrial design
- include designers in all processes, as early as possible
	- iterate and allow for iteration
- notes:
	- designs, wireframes by PM OR no designs at all will lead to disaster
	- it is a bad decision to separate designers from team they are designing for

#### Engineers
- have strong knowledge that you can share to devs
- gain context on development in order to have better collaboration
	- still avoid telling devs on how to do smth
- get context for existing ideas & new ideas from devs
	- it is ok that some devs won't participate in discovery, BUT it can't be all of them

#### Product Marketing
- responsibilities: market plan, messaging, competition, integration with sales
	- still it can be also done by PM
- notes:
	- business must be in the market large enough to sustain a business

#### Supporting Roles
- not present in every team and can be substituted by other roles
- user researchers (find right types of users for your product and vice-versa, craft proper tests)
- data analyst (collect and manage right data, store & work with it, interpret)
- QA/AQA (in combination with engineers responsible for automated tests and quality)

#### Role of Leadership
- people development (find, nurture and keep talent)
- holistic view on product at broader scale (product vision, strategy, functionality, business rules, and business logic)
	- often can be build by having PMs report to principal/senior PM (same applicable for design, tech and other departments)
- notes:
	- incoherent design, poor product understanding that comes from "read the code and tell me how it works" and spaghetti software are common symptoms of missing/poor leadership
	- it is near impossible to document everything, so many things still need a "head to live in"

#### Head of Product
- competence: team development (not all great products are great at leading & managing), product vision (note that CEO can substitute for product vision and CPO will just execute and develop team & culture), execution, product culture
- notes:
	- when hiring CPO make sure he will get along with other C-level on personal level

#### Head of Tech
- > The hallmark of a great CTO is a commitment to continually strive for technology as a strategic enabler for the business and the products. Removing technology as a barrier, as well as broadening the art of the possible for business and product leaders, is the overarching objective.
- competence:
	- organization (develop team)
	- leadership (represent tech side at C-level)
	- delivery (quality product is delivered on-time, manageable tech debt)
	- architecture (keep overall system in sync with proper structure, system is stable and monitored)
	- discovery (participate and enforce participation in discovery process)
	- evangelism (be a public face representing the company)

#### Delivery Manager
- person responsible for unblocking delivery AND managing "scum stuff" (can be done by PM)

#### Structuring Teams
- learn core principles and apply however suitable for your company
	- have investment in future strategy and make teams reflect that (remove and restructure teams if needed)
	- minimize dependencies
	- ownership and authority owe some product/part of product
		- having shared/platform stuff is great, BUT team must have leverage over that too
			- platform teams must have technical PMs
	- structure must align with vision and strategy
		- better is to have architecture in place to deliver vision AND structure in alignment with architecture
	- keep team size not too big
	- structure must align with user needs
	- structure must align with business needs
	- structure will change eventually
- notes:
	- give teams trust and allow for leeway (still some foundational sings and practices are shared within teams)
		- it boils to tradeoffs like speed, autonomy, integration within products etc
		- ideally product team should not focus too much on platform stuff (if team resists give them better context, discuss tradeoffs etc)
	- avoid premature standardization when developing a platform

## The Right Product
#### Roadmaps
- roadmap - prioritized list of features and projects assigned to team
	- often focused on large strategic initiatives (bottom-up and up-bottom)
	- prioritization is required, because there are often less available resources then tasks
- main concern after forming good team is to find what they will build
- focus on outcomes and business results, not plain outputs
- problems
	- often idea won't work (at least from first try) (no market fit, hard to use, not feasible, business constraints)
		- focus on iterations and staying fast
	- often focus on delivering something and not solving a problem
- problems it solves
	- prioritization aligned with stake-holders
	- possibility to assign deadlines with dates and make commitments
- alternatives
	- outcome‐based roadmaps
		- state objective that must be solved, leave details to the team (including iterations)
		- place deadlines only when they are truly needed
- notes:
	- teams must have business context for alignment, which is derived via product vision AND business objectives
		- team must understand how they contribute to BO completement
	- be careful making commitments with deadline when you have too little info about subject matter
		- generally create time buffer to do discovery and then only commit

#### Product Vision
- vision (future we are heading, something that inspires everyone) & strategy (products and releases that will be done to achieve vision, focus on PMFs / user types / regions / verticalities)
	- strategy must focus on main goals first and prioritize improvements and extension appropriately
	- both align all teams and departments
	- large orgs may have single mission, but several PVs and PSs
- PV principles
	- understand why
	- > Fall in love with the problem, not with the solution.
	- think big
	- keep it disruptive
	- inspire
	- > Determine and embrace relevant and meaningful trends.
	- account for changes
	- > Be stubborn on vision but flexible on the details.
	- good vision can't be fully validated
	- evangelize
- PS principles
	- focus on 1 thing at a time
	- align with: business needs, sales
	- focus on customers, then on competitors
		- > We can't ignore the market, but remember that customers rarely leave us for our competitors. They leave us because we stop taking care of them.
	- > Communicate the strategy across the organization.
- notes
	- market prioritization
		- focus and bigger, more accessible markets
		- first of all populate marked that you can sell on, then move on and develop new sales channels
		- account for time to market for different markets
	- you need to have some product principles that you can rely on in some cases
		- ex: > “In cases where the needs of the buyers and the sellers conflict, we will prioritize the needs of the buyer, because that's actually the most important thing we can do for sellers.”

#### Product Objectives

