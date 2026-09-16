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

#### Product Objectives (OKRs)
- > Never tell people how to do things. Tell them what to do, and they will surprise you with their ingenuity.
- > When performance is measured by results.
	- The idea here is that you can release all the features you want, but if it doesn't solve the underlying business problem, you haven't really solved anything.
- OKR (Objectives & Key Results) Techniques:
	- objectives qualitative, results quantitative
	- results should be relevant to business results
	- IC OKRs should contribute to team OKRs which contributes to higher team OKRs etc up to company's OKRs
	- state & check OKRs periodically (quarterly, annualy etc)
	- keep number of O and KRs small
	- track progress
	- OKRs must be focused on keys things and don't have to cover all team work
	- failed OKRs must be re-visited in retro (team must have ownership and responsibility over OKRs)
		- OKRs must have someone responsible
	- have OKRs scoring
	- be strict with OKRs with deadlines
	- be transparent with OKRs
- main OKRs are assigned by business and related to product, BUT OKRs from other teams to resolve dependencies OR OKRs from functional departments (aka AQA OKRs for AQA Engineer) are also applicable, BUT they aren't more important then business/product OKRs and must be properly managed

#### Product at Scale
- large order == more process AND requirement for PV & PO
- OKRs
	- it is ok to distribute company's OKRs among the teams not equally
	- platform team OKRs must be focused on enabling product teams
	- use tooling to handle OKRs from all the teams
	- use delivery managers to work with deadlined OKRs
- how to sell a product:
	- use prototype
	- share the pain
	- share how your product contributes to overall PV
	- share what you learned from product research
	- share credit
	- give great demo
	- gather info and data, be prepared
	- be excited and enthusiastic
	- spend time with team

## The Right Process
- > Combination of techniques, mindset, and culture.
- Discovery
	- we need to find single solution to fit many customers
		- > To do this, we need to be able to test out many ideas, and we need to do this quickly and inexpensively.
	- > Second, we need to ensure we deliver a robust and scalable implementation that our customers can depend on for consistently reliable value.
		- keep right balance between delivery speed and reliability
		- > I always try hard to reserve the term product to describe the state at which we can run a business on it. Specifically, it is scalable and performant to the degree necessary. It has a strong suite of automated regression tests. It is instrumented to collect the necessary analytics. It has been internationalized and localized where appropriate. It is maintainable. It is consistent with the brand promise. And, most important, it is something the team can release with confidence.
	- building something product grade is hard and slow, SO we need to do discovery first to avoid wasted effort
	- focus on gaining knowledge from customers with minimal engineering involvement AND minimal pushes to prod
	- principles:
		- > We know we can't count on our customers (or our executives or stakeholders) to tell us what to build.
			- we responsible for final solution (still it can't be found without evidence and validation)
				- evidence and validation must be found fast and cheaply
		- establish value
			- most critical thing
		- focus on UI/UX
		- > Functionality, design, and technology are inherently intertwined.
		- > We expect that many of our ideas won't work out, and the ones that do will require several iterations.
		- understand your business and how it makes money
	- discovery might need to think about ethics too
	- techniques:
		- framing (big project require alignment and complex - proper risk (tech/product/business) evaluation)
			- agree on OKRs and DoD
			- focus on disagreements
			- focus on problems to be solved, not solutions
			- opportunity assessment: define OKRs, what customer problem will be fixed, what are target customers (don't target all of them)
			- customer letter: write product release card of imaginary product as a way of framing
			- startup canvas (more suitable for new product development):
				- aka lightweight version of business plan
				- evaluate > A much broader set of risks, including validating your value proposition, figuring out how you intend to make money, how you plan to get this product out to your customers and sell to them, how much it will cost to produce and sell this product, and what you will measure to track your progress—not to mention determining whether the market is large enough to sustain a business.
				- also can be used by new PMs to study existing product
				- focus on large risks first (often it is value risk, other comes next)
		- planning (scope and plan discovery)
			- story map (useful for: planning, framing, communication, design etc)
				- map of -> user activities and v user tasks (top left is most common activity with critical task)
				- enables > Holistic view and consider where to draw the line in terms of different releases and their associated objectives
				- can be converted to backlog
			- customer discovery (for large effort things)
				- discover reference customers AND products for them
					- ideally discover 6 customers (for b2b, for b2c it can be 10-50) in single market
						- no more then 8
						- > if you find you are having real trouble recruiting even four or five prospective customers for this effort, then it's very possible you're chasing a problem that isn't that important, and you will almost certainly have a very hard time selling this product.
					- > We don't want to turn on the sales or marketing machine until we have evidence that we can help them be successful, and the reference customers are our best evidence.
					- look for existing customers OR potential that are in need (have some pain)
						- avoid someone interested only in technology side of things
						- ideally: customer will spend time with you, customer is well-recognized
				- your aren't building custom solution OR several solutions, BUT a generic product
				- customer must agree to participate publicly
				- this customers could become your future early adopters of other features
		- ideation (generate right ideas to solve business problems, remember to validate ideas)
			- customer interviews (most powerful technique)
				- focus on: finding right customers
				- figure out: do they have problems you think they have, how they solve them, how force them to switch products
					- rules:
						- keep frequent, not prove anything to customer, focus on your market, ideally offline, include PM+designer(driver of meeting)+dev, focus on current state AND then wishes, sync with colleagues, keep promises to customers
				- interview can be converted to customer tests if time allows
			- concierge test
				- do customers work to study them AND understand process they are going through
					- easier alternative is just to spend time with customers
			- allow customers to mis-use product, observe, adapt product for new needs
			- organize themed hackathons
		- prototyping (developing throw away product to test)
			- prototype can test different things:
				- feasibility (done by devs to test possibility of doing something)
					- note that it might be better to just use another approach that avoid feasibility problem
				- user (test simulated product on users)
					- can be low fidelity wireframe just for exploring OR high fidelity near real UIs built by devs OR designers
					- be careful with user validation (user like prototype != converted user)
				- live (send live traffic over prototype and collect needed data)
					- live prototype != final & ready solution
			- > Remember that product discovery is all about coming up with the fastest, cheapest way to test out our ideas.
			- principles:
				- learn something fast (must be much faster then developing something)
				- dive deep
				- potential collaboration space to share knowledge
				- choose right level of fidelity
				- focus on some product related risks (value, usability, feasibility, or viability)
			- notes:
				- prototype can become spec
		- testing (test core questions to be true)
			- value
			- usability
				- recruit users from proper market (email, call on website, public lists, events)
				- ideally live (compensate user for their time) with high fidelity prototype
				- PM, designer & dev are included
				- test common use-cases
				- learn from tests
				- if you tests on customer's device, pay attention to device properties
				- flow: briefly discuss current customer problem, tell to give radical feedback AND remember that it is prototype, keep user using UI not criticizing it first, avoid helping user BUT encourage them (look for success, success with struggle, not finished flows), discuss with user what he is doing
				- find friction points and learn from them, share learnings with the team (prototype can be adapted to new learnings)
			- feasibility
			- business validity
	- notes:
		- it is ok to be wrong in discovery, don't be over conservative too
		- sometimes political factors can be more important then validity
		- good product must drive sales, not sales that force changes in product
		- try to convert customer into reference customer (the one that will recommend your product)
		- PMF
			- > Product/market fit shows up in terms of happier customers, lower churn rates, shortened sales cycles, and rapid organic growth.
			- access PMF:
				- survey core customers with question: "how they'd feel if they could no longer use this product"
			- PMF enables development of product AND doesn't mean that product is done and ideal
