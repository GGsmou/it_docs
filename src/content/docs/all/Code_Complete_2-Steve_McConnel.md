---
title: Notes of "Code Complete 2nd edition" by Steve McConnel
---
*notes of Code Complete book (2nd edition) by Steve McConnel* 
*this could by a part of Architecture note, but it is already kinda big :)* 

## Preface

This is a book about nearly every aspect of software development, with many and many examples of code, best practices etc, that came from different source(been white papers or just some new arising tech solutions)
- in its core, all of SE is built upon this practices, no matter the language or environment you are working in

SE includes many parts(testing, building architecture, planning), but the main one is code construction, that is main part of all software development, that can't be avoided or shourtcutted

## Foundation
#### Software Construction
Software construction - process of building/developing software(this includes testing, planning, designing etc, but for the most part it is about creation)
- basically creating a software is complex process, that includes many parts, that may or may not be included in particular process, depending on it's scale, formality etc
- note that detailed design, coding, debugging, integration and testing(manual and automatic) is also a part of development/construction
- why it is important:
	- it is a central part of development cycle
	- code is main source of truth, so it needs to be good
	- construction always needs to be done

#### Metaphors
Creating and learning metaphors in field you are working at is important part in communication, building understanding and creating something new, because it helps to grasp some hard parts by looking at similarities with smth simple
- metaphors can be bad, or just irrelevant, so they are evolving in their own way
- metaphor in software engineering is not about algorithmic approach to something, it is more about general idea, that can lead to some solution(or at list be a guide on how to find it)
	- it is like algorithm vs pattern
	- this comes from fluent and diverse nature of SE
- metaphors can be combined

common metaphors:
- developing software == writing code
	- brings to us that code must be readable, easily understandable, process of developing is built upon trial&error(in a way its true, but we always should account for planning first)
	- not accounts for planning, multiple developers in one project, maintenance, originality(it is better to use pre-existing solution, then imagine new one)
- developing software == doing farming
	- bring to us that we should do a bit at a time(incremental development)
	- not accounts that you still have control in-between process(after you plant seed and harvested the result)
- developing software == accretion
	- bring to us that we should scale system incrementally/iteratively/adaptively, we should form a base first and grow upon it, agile
- developing software == building
	- *(compatible with accretion)* 
	- bring to us that we should:
		- pre-plan
			- how and what we plan can differ, depending on what we are doing(small scale projects can go without planning at all)
		- define a problem, architecture, design, construct, optimize, review, test
			- otherwise, on scale, you will loose a lot of man-hours of re-doing
				- and if you don't re-do, project will become a mess
		- use already created libraries, tools and languages
			- however, some parts can be written in-house to account for needs
		- use different planning approaches(sometimes just general planning, sometimes in-details)
			- this also includes accounting for changes, as development goes
		- be documented
		- be dived into parts, with assigning responsibilities for each one
- applying patterns == using toolbox
	- bring to us that we should use proper tool for each problem

#### Prerequisites
Preparation is key in developing a software, but preparations can differ, depending on requirements
- if no planning is done, only think you can really do is damage control in process of construction

why pre-plan:
- to make your software high-quality, it need to be in a good quality in all phase
	- quality at the end == testing
	- quality at the middle == construction
	- quality at the beginning == planning, designing etc
		- includes: problem definition, planning and designing the solution
		- with bad beginning you can only back-up and re-do
- risk reduction

what can go wrong in planning:
- person don't know how-to do it OR just don't want to
	- if you don't want to, just consider arguments, or fail couple of times on scale :)
- not enough time to do so(strict deadlines, management etc)
	- it is important to find time for planning, with argumentation and arguing for it, here are some ways of how to argue:
		- don't :)
			- quit or "just say it is what it is"
		- pretend that you are
		- try to educate management on why you need to do so(all in all it is also part of your job)
			- appeal to logic - you can't do smth big with no plan
			- appeal to analogy - house building, food chain(bad crop will poison you, eating a cow)
			- appeal to data - more changes later == more money to spend, because we need to rework each affected part(on scale)
				- it is about finding bugs as left as possible on scale of planning -> release
					- its like saying I want to live happily for 50 years of my life and party, than go to the gym(but you can live happily to 100 otherwise)

as said, you need to know your software, to plan properly for it, so, here is guide
- I am too lazy to note all of this, so just know that with more scale and criticalness, you need to do more planning, testing, architecturing, inspections, formality etc

hand-in-hand with pre-panning comes iterative approach
- basically we split whole project into chunks and after finishing each do improvements to whole system, taking in consideration new things
- it is still important to have pre-planning, because it reduces cost and risks, but choosing to iterate over do whole thing sequential will add more reduction, as well as make every change come in portions(otherwise, after finishing the whole thing we need to invest some more time into improvements)
	- it is impossible to do 100% iterative or sequential, BUT it is useful to either pre-plan most of things and don't deviate or pre-plan core stuff and mostly iterate
		- pre-planing is great for stable & predictable system, with fixed requirements, that has little risk and will be hard to change downstream, OTHERWISE choose iteration

problem definition is important part of planning, that defines what task are we solving
- problem definition is foundation of what we are going to do, it can't define any solution or go too much in depth
	- it is ok to go deeper, if topic of project requires it
- usually it is done in user language
- wrong definition will make you not solve problem at all

requirements/specification - next step after problem definition, that defines what software required to do, without concrete solutions
- it is easy way to define user needs, not how programer sees it
- requirements is a way to resolve arguments on program scope
- stable requirements ensure that project won't be changing in it's core
	- it is a holy grail of SE, but it is not realistic, because with project development your and customer's understanding of it will change, SO you need to adapt to this changes:
		- always stop and adjust if you requirement feel wrong
		- explain cost of requirements change and turn them into "nice to have" or "will be done later" or "out of scope for now"
			- still taking feedback is important, so create some procedures to take and implement it
		- develop in cycles OR iterative approach
		- kill project if it is out-of-hand
		- evaluate is change of requirements is profitable to do
- requirements to specify:
	- system inputs/outputs(data, how to work with it, validations etc)
	- external dependencies and ways to interact with them
	- use-cases by users
	- security
	- performance
	- reliability(consequences of failure, vital data, error handling, recovery)
	- flexibility
	- what need to be achieved and if we achieve is it enough to release
	- can users understand and agree with requirements
	- are we achieved tradeoffs between requirements
	- do we have enough, but not too much details
	- are requirements relevant, testable and what risk of each one changing
	- what are unknowns
	- is it reasonably possible to implement

next step is planning the architecture - frame that holds overall details about whole system and done as some document
- it acts as a structural guide to the system, that helps to independently maintain project by multiple dev. teams, while preserving quality
- it must make development easy and understandable
- architectural changes are pretty costly, but if you must do one, do it asap
- when creating architecture it is important to consider many approaches and state why one has been chose over other
	- such move will act as future guidance on things done as they are
- architecture is based of components:
	- program organization - broad system overview, that defines all parts of a system, assigns concrete roles to each of them and connects(direct/indirect relationship OR no connection at all) them together
		- parts can differ in size from class to smth like Front-End in general
		- principles of localization and least information(part A knows as little as possible about part B) are important here
	- major class organization - similar to program organization, but in scope of classes, with such details as state changes, hierarchies, class organization etc etc
		- specify only most important classes
	- data design - describe how data is stored, accessed, all chosen data structures and table designs, present in system
		- important principle is data encapsulation, where it can be accessed only be responsible system OR via some APIs, that this system provide
	- business rules - state all rules/requirements and how they effect the system
	- user interface - more detailed description(that already present in requirements) of UI part of a system
		- modularization principle is a key, so we could change one interface to other, without changes to business logic or data
	- security - explain details on how we deal with authN&authR, how data/error exposed to user, how we work with user input, encryption etc
	- performance - if there are specific requirements for performance, architecture should state in what ways we are going to achieve them
	- scalability - explicitly state that scalability is not a concern OR define how system is going to scale in different directions(users, DBs, services etc)
	- interoperability - describe how resources are shared
	- i18n + l10i - if talking about low level staff it is about how we encode strings and why, for UIs it is a lot bigger problem :|
	- I/O - how to deal with it
	- error handling - program consists not only from happy path, so it is important to state how we are working with errors, by answering this questions:
		- what errors are recoverable and what not
		- how notify user about errors
		- how to log errors
		- will we prevent errors(validation of input for example) OR deal with the(wrong input is accepted with failure in process)
		- will error break the flow of program
		- conventions on error messages&details
		- how to handle errors
		- who is responsible for validation and error handling
		- how we work with errors(via built in instruments, lib or smth custom)
		- how failure tolerance(basically in depth recoverability of system) will be done
			- back-ups, algorithm/service swap if one that used is down or degrades, auto-restarts
- feasibility - investigate(usually done with POCs) if system could be build in first place
- prevent overengineering with stating the requirements
- build/buy - investigate and state what can we use from open-source or buy and what need to be done in-house(with explanation how)
	- other case that similar to this topic is reusability of parts from previously built architecture
- change strategy - provide a ways for a project to be flexible and adapt on fly
	- it is more about of finding volatile parts, that can change in your system(ex. data format, service integration) and provide a way to localize interactions with them, so change won't effect whole system
- architecture must be understandable, easy to read and natural in a way it solves problems
	- never state "we've always done it in this way"
	- architecture should be done in right size
	- it should provide multiple points of views
	- it must make sense

all in all prerequisites should take as much time as needed, with possibility of future improvements(that also take time and can be resolved by you OR with DRI of project)
- tho, you need to start somewhere, so don't plan too much
- the time you spend planning will always correlate with size and formality of project
- be careful with not making/keeping prerequisites volatile, it is better to take time and develop them properly
- architecture can be a separate sub-project of a project

#### Key Construction Decisions
Chapter about how-to choose right instruments for your job, to successfully build software, that was planned in prev. chapter

choosing programing language - important faze, because it will influence how you think about your problems, what steps you need to do, how your approach solutions
- it is very important from optimization perspective etc, BUT choosing wrong tool will lead to more problems in development, because you will constantly fight chosen language
- development team must be familiar with language of choice to be productive
	- also big problem is writing in one language with mindset of another, this way you will have 0 benefits of chosen language and all problems of one from mind set
		- *and also you will fight and hate chosen lang :)* 
- high-level language brings speed, reliability, expressiveness and ease of hiring
- certain languages is better in expressing and working with some problems more than other languages

great large systems must have not only great architecture, but be consistent in details(naming, formatting, comments, file structures), otherwise you will end-up with semi structured mess, that requires more brain capacity to understand and maintain
- this concept is called low-level integrity
- it is important to state such details beforehand, because it is almost impossible to make ongoing system consistent without them in a first place

always program "into" language, this means decide what you need first AND only than try to implement with existing tools
- by doing things this way you can create much more complex things, that aren't restricted by the env you work with
- if you env is too primitive for your needs, you can switch or expand it
	- to expand: create conventions, standards, libs etc

all-in-all, good practice is to incorporate other good practices into your programs :)
here some of them, that wasn't mentioned:
- define what procedures code should go through to be "merged into main"
- is there place for pair programing in development flow?
- decide what should be tested, in what form(unit, integration e2e etc), in what period(upfront, after been done), is there a place for manual testing and how to do it
- define a set of tools(lang, programs, frameworks etc), that are needed to develop

## Creating High-Quality Code
#### Design
Design is important part to think through before start coding, BUT it often skipped in architecture, because it contains plenty of low level details
- it is possible to write detailed design, so coding will be done only mechanically, but mostly you will do some design with coding process

problem with design is that requirements can shift, making design irrelevant OR after creating solving the problem, some unexpected part is revealed and design must be rethought
- it is generally hard to find right solution, with enough details and so on and so on
- finding right tradeoffs, priorities, restrictions - key to good design
- basically it is open-ended question and non-deterministic problem
- it emerges through design reviews, discussions, writing and reviewing code

to write good design, you need to understand some concepts
- complexity - project become more complex as it grows, this complexity will come from two sources: technical problems like managing tech stack etc, complexity of problem itself that need to be solved
	- when project fails due to technical reasons, it is often the problem of complexity(no one can fully understand what's going on and how each change effects the system), SO it is important to manage complexity
	- to manage complexity, you should break program into independent parts, that you can work with one by one, keeping scope tight and small
		- *our brain is small, so don't force it to work with large context ;)* 
		- so
			- use single responsibility
			- divide system to sub-systems
			- work with domain problems and avoid low-level implementation details
			- keep things abstract
	- complexity rise for:
		- complex solution - simple problem
		- simple solution - hard problem
		- wrong solution - any problem

good design can be characterized as:
- minimal complexity
- ease of maintenance - when designing, imaging that someone will maintain your code
- loose coupling
- extensibility - change in one place won't effect other places
- reusability
- high fan-in - low level classes are highly re-usable through-out all codebase
- low-to-medium fan-out - keep dependency list of a class small
- portability - ease of migration to other stack
- leanness - don't keep unneeded code in codebase
	- it is great general advise when doing something, "don't finish when there is nothing more to add, finish when there is nothing more to remove"
- stratification - each level of system must be independent from another one
	- interfaces are great to tackle this problem
- standard techniques - stick to default approaches, if possible

levels of design
- whole system
- sub-systems and packages - how system is divided into parts and how those parts communicate
	- key point is to keep connections as loosely coupled as possible, to preserve order and structure
		- (loose->tight coupling) A interacts with B interface -> A shares classes and logic with B -> A classes inherit from B classes and vise versa
		- keep an eye on cyclic dependencies, they are harmful to have
	- common sub-systems:
		- business rules - some set of rules, related to your program
		- UI - set of one or more independent(from other parts and from each other) systems, that used to display data
		- DB access - layer that hides details of querying the DB, usually some API level
		- System dependencies - direct calls to system that your are working with(like OS) should be moved to separate sub-system, so it is easy to change envs
			- often it is already done by libs, BUT this doesn't mean that you should spread your lib all over the place, maybe use some patter(like Strategy) to access abstract system via interface and some lib implementation can be passed in
