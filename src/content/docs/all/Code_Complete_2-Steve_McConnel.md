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
	- can be skipped for small systems
- classes - decompose all sub-system into classes, with defined interfaces and connections
- routines - specify all private methods of class and how are they called
	- often done mentally, while coding
	- can influence level 3
- inside the routines - describe logic of each routing
	- often done mentally, while coding
	- can include writing pseudocode, but not really necessary

heuristics - ways to think about design, that act as guidance to it
- design is non-deterministic, so instead of concrete steps we can use heuristics to do it
- we are using heuristics as main way to hide complexity by: hiding details to reduce cognitive load, protecting variations
	- variations can include: algorithms, types, structures, boolean flags
- \---
- identify real world objects - define set of real and synthetic objects, and iteratively add more details to each object OR build better general composition
	- identify set of objects with data+methods
		- identify only properties, relevant to the system, not for general object(ex. human can have different eyes color, but we don't care about it in LibraryApp)
		- we can add synthetic properties, relevant to system, but not for real world
	- answer what can be done to each one
	- answer what each object can do to others
		- inheritance and object nesting included here too
	- define public/private parts of each object
	- define object's public interface
		- don't forget about protected one too
- form consistent abstractions - use abstractions for higher levels of planning, to avoid unnecessary details, when talking about some concepts
	- example: base classes with only public interface
	- important to keep system easy to understand and operate with
	- it is used on any design level
- encapsulate implementation details - more restrictive abstraction variation, that forbids to look at any details, you only allowed to work with general picture
- inherit if it makes things simpler - inheritance and polymorphism are keys to simpler systems, BUT don't overuse it, it increases systems coupling
- hide info(encapsulation) - basically an OOP's encapsulation, where you hide private properties of class inside of it
	- in it's core it prevents usage of method, you marked as private, there for you can easily change it and do as little refactor as possible
		- when talking about public API, you won't be able to change it at all, so don't overexpose things
	- this is performing complexity hiding
	- it might be useful to hide types this way, for example use some generic IdClass, that will expose possible operations with ID, but don't give out value and it's actual type to outside world
	- ways to hide info:
		- hard coded value -> constant
		- extract UI and any interactions with it separately from BE and vise versa
		- direct use of global data -> some getter/methods of accessing the data
		- avoid circular dependencies
		- avoid premature optimizations, that aren't needed, but reduce encapsulation
	- always and always ask yourself: "Does this part need to be exposed?" or "What should I hide?" in all levels of design
- identify areas that will likely change - it is about protected variation from GRASP, basically we striving to identify areas that can change and try to keep effect from change as low as possible
	- to achieve:
		- identify what can be changed(from requirements or by analyzing)
		- encapsulate this part via some Class or other structure
		- keep public interface of this structure stable, so it hides all volatile details
	- what can be changed:
		- business rules
		- hardware(OS), software(libs) or similar to them dependencies
		- input/output data format
		- unstable or bad designed parts
			- especially when migration from old approach, it is great to interact with it from one place inside system, so if smth goes wrong, you need to modify only this one part
		- boolean status -> enum status
			- also, when working with several states, it is great to hide logic of working with them inside respective class(this way `if (!error && statusCode == 200)` won't spread everywhere)
		- hardcoded values -> constants
	- if change is less likely, it can be more poorly isolated, BUT if it is not likely, but easy to account, it is always better to isolate
		- ex: it is not reasonable to encapsulate React from your app, BUT maybe testing lib will be changed in future, so create a wrapper
		- good unchangeable candidate is system's core
- loose coupling - keep distant systems parts as least related as possible
	- relationship must be loose, flexible, simple and detached from each other
	- criteria:
		- size - number of parameters, public methods, connections
		- visibility - all actions must be understandable and easy to spot
			- ex: mutation-query separation
		- flexibility - ease of reusability and connectivity between parts
			- ex: take several properties of an object as parameters and not whole object to make it easy to reuse function elsewhere
	- kinds:
		- data-parameter - all parameters passed inside are primitives
		- object - one object is coupled to other object
		- transitive - one object uses other object to get access to third object
		- innerworkings - one object knows that other object has some logic to be performed before it can perform something else
			- passing specific flags
			- modifying global state
			- calling specific methods
			- module2 knows that it will get baseObject from module1, so it performs additional casting
			- ---
			- it is the worst way to couple things, because it will silently break after any change to logic
			- basically try to build abstract communication between modules and avoid any details knowledge
- use common design pattern, like GoF
	- benefits:
		- common language with other devs
			- great benefit is you can shuffle through options much faster, when discussing solutions
		- ready made and tested solution for discovered problems
			- it is more error prone
			- can be evolved into more specific solution, for non-standard problem
	- never force your code/thinking into patterns, such solution may not be valuable for your case
		- shifting towards pattern can improve understandability, but never shift just for that
	- never use pattern just to use it
- other heuristics:
	- high cohesion - how strongly related functionality of your class/method/module etc
	- organize code in hierarchical manner - keep structure of an app from most abstracted thing(ex: page) to leas abstracted thing(ex: button and it's properties)
		- great as layering technique and smth, that let's you achieve information hiding and abstraction
	- formalize class contract - clear stating what, how and in what constraints class can do AND what can be done with it, makes process of creating, maintaining and using class more resilient
	- assign responsibilities - always ask what this object must do
	- design code for tests - reduce dependencies and responsibilities of each part of code, so it is easy to test it
	- always consider what could go wrong
	- choose when do to what in code - doing smth to early or upfront makes code easier, but less cohesioned and less flexible
	- move logic to some predefined place - ex: don't inline calculations, place it inside class's method and call it like so, so it is easy to find and change it
	- consider brute force if elegant solution is hard to achieve
	- use diagrams
	- keep design modular
		- each module is black box, for abstraction reasons
- \---
- how to use heuristics:
	- understand a problem
		- restate a problem for better understanding
		- consider working with part of the problem or with abstracted problem
	- create a plan
		- base it on previous plans
		- base it on unknowns
	- cary out with plan
		- always check if you on the right way
	- looking back
		- always check if you solution is what actually needed for this problem
	- all in all, try different approaches of thinking about the problem OR just take a break and come back later OR solve part of it and come back later with more info and knowledge

design practices - some steps to produce great design
- iterate - design couple of times, with new knowledge
	- try different approaches: focus on low and high levels separately
- divide and conquer - divide design into parts and work with them separately
- work with Top-Down and Down-Top approaches
	- Top-Down - start from most abstracted parts and add details
		- it is easy for brain to work with generalities and small number of details
		- start from abstract, decompose until it is easier to code, iterate until system is understandable
		- benefits: it is easy to break big into small, no need to worry about details(that can change) on early steps
	- Down-Top - start from smallest part of system and generalize
		- some systems are so abstract, that it is hard to start, so try to focus on what the system need to do(in most simple representations as possible) and iterate from there
		- hardware/system restrictions can be low-level details, that will shape overall picture, so also great way to start
		- benefits: final system will be more compact, easy to find what can be reused
		- problems: hard to use exclusively and can result in partial final design, you can start from the wrong place
- experimental prototyping - if you are blocked by unknown parts, try to find them out with writing a minimum, throw away code, that will be used as base for completing the design
	- please, don't do real development on this stage, just some testing
	- always state clearly what are unknowns that need to be solved by prototype
	- always write throw-away code
		- if it is hard, don't use production language or choose garbage naming
- collaborative design - always collaborate(formally and especially informally), when designing
	- white boarding, coffee talk, pair programing, formal meetings, ADR/PRD/RFC, try to forget what did you do and later do self-review, forums
	- creative approaches are the first what need to be done, but finalization is always must be formal
- how to capture the design:
	- in code: readme, comments, examples, docComments
	- internal wiki(just a great tool overall)
	- write, share and save summarize of large design decisions
	- make a photos of whiteboards
	- do charts, diagrams(UML) etc
		- UML and similar solutions is great, because it has standard notations in it
	- CRC cards

> The more dogmatic you are about applying a design method, the fewer real-life problems you are going to solve

#### Classes
Class is great tool for building encapsulation(this can be encapsulation of data+functionality OR just some service functionality, like helpers, with no related data)

ADT(abstract data types) - collection of data and operations that operate on data
- it is key term for building OOP style classes with good encapsulation and high cohesion and not just loosely related collections of data + operations
- it defines, that we should treat data and operations in sync, with abstraction element(example: we aren't just adding entity to array, we adding customer to the orders queue)
- benefits:
	- we can hide implementation details(ex. types)
	- encapsulation and localization of changes
		- testing will be easier this way
		- more error prone approach
		- data is localized and always accessible
	- we can create more understandable interface for our class
		- self-documentation comes as a bonus
	- no knowledge of low-level details is needed, when working with interface
		- as said before, we don't treat list as list, we treat list as some real data collection, with specific operations bound to it
		- note that you can layer ADTs, for example create custom ADT for Queue and then wrap it inside some AppointmentQueue ADT
			- note that name AppointmentQueue includes "Queue", because it defines functionality, not an algorithm, it is a bad practice of exposing more details than needed, when using names like AppointmentFileStorage, because you can't reuse it as AppointmentCacheStorage, while it can have identical interface, but differ in implementation
		- don't neglect creating small classes, it is easier to extend and the benefit of self-documentation is here
	- polymorphism
- how to work in non-OOP env(if you happen to be unlucky `:)`)
	- create a manager wrapper, that can keep track of data, related to instance, via some id, passed as param
		- alternative is to create one method, that will set currentlyInUse ADT, that will be shared by all other methods, so we need only one method to accept id and no one else
			- note the problem of shared state
	- manage data by user of ADT and pass it directly to ADT methods
		- be careful not working with data in any other manner, because it breaks the encapsulation
	- work with your ADT as with Singleton
		- note the problem of shared state
- why not classes?
	- Class is ADT, but on steroids, like inheritance, polymorphism etc

how create class interface
- keep it abstract
- keep high cohesion
	- if it not cohesient enough, it must be consistent instead OR fixed
- always make internal things private/protected
	- be careful with inheritance here, you can try do smth like UserList extends List, BUT it can be dangerous, because now we state that UserList "is a" List and will expose all low level operations
		- if it need no expose operations, overwrite them with more abstract once, it it not, better not to expose and do smth like UserList.#listInstance and delegate all work to this private instance
			- Facade is great here, because we can expose only needed parts, change inner logic easily without breaking changes etc
- keep it single purpose(employ operations can't be mixed with list operations)
- check if you need an opposite operation(add - remove), BUT add only if it is needed
- be careful with interfaces, that have operation that must be called in order
	- it is unmaintainable, will be misused, need comments as explanations
	- hide this details inside OR ensure clear errors(ex: invariant)
- always recheck this list, when extending class

how properly encapsulate - strongly related to concept of abstraction and helps preventing to even have possibility to look into details
- always tend to make access stricter, even if you not sure
	- remember about “Law of Demeter"
- exposing getter+setter > exposing data field
	- note that it can make classes more bloated, so be careful with this concept, BUT it makes code type independent, makes it easier to expand the behavior etc
- avoid making assumptions about how class will be used
- be careful with introducing two highly coupled classes
	- State patter is one of possible exceptions
- prioritize read+maintenance time over write time
- don't introduce violation of semantic encapsulation, some examples:
	- interface have optional props, BUT not passing this props results in error
	- you know that `.initConnection` call can be avoided, because `.queryUser` operation will do it for you
	- using not related constant `ANIMATION_TIME` in context of debouncing query, because they have same value of `250` 
- make class complete, so there is no need to build upon it's functional
- \---
- all in all, when you need to look at the implementation, to work with class, consider that your encapsulation is broken
	- it is generally better to ask code author to reimplement interface, then check implementation details of ask for explanation

some common implementation and design issues within classes
- if you have "has a" relationship, use Containment
	- be careful with using private data field of Contained object inside a class
		- if it is supported by your language
		- it creates a discussed before "friend" classes
	- be careful with introducing too many Containments(no matter if it is plain data type or complex, like object)
	- generally, when you need control over your interface, use Containment, otherwise inheritance is valid option
- if you have "is a" relationship, use Inheritance("is a" means some class is a more specialized version of it's parent)
	- helps removing code duplication, but increases coupling, so be careful
	- always ask yourself:
		- will method have default implementation or will it be overwrited down the road
			- basically we have: abstract method, implemented overridable method, implemented non-overridable method
		- will field be accessible to child or not
	- remember about Liskov substitution principle
		- it avoids details leakage and problems with semantic encapsulation
		- use composition, if you see yourself breaking LSP
	- mark non inheritable class as "final"(if you lang supports it)
	- if you don't need to inherit all method, use delegation instead, OR change inheritance tree
	- don't reuse names of non-overridable fields in child class
		- this breaks polymorphism
	- tend moving common functionality as high in tree as possible
	- be careful with singletons, they often can be confused with simple objects
	- don't design ahead, creating base class, that has only one child, it increases complexity
		- there might be need for future-proofing, but in general avoid it
	- avoid deep inheritance
		- too much complexity will be introduced
	- polymorphism > type checking
		- if talking about inheritance, type checking is still great for diffing different types
	- private > protected, otherwise encapsulation is broken
		- great way to introduce such child-parent connection is via some protected method, that acts as indirect access layer to private field, IF such connection is needed
	- avoid multiple inheritance, to avoid mega complexity ;)
		- it is appropriate for building independent, non expandable, mixins
- how to implement class properties
	- minimize number of methods, BUT don't overdo it
		- creating "super" classes is bad, BUT breaking and coupling them too much is even worst(and kinda pointless)
	- make property or constructor private if needed
		- private constructor is great thing to do, when creating Factory or Singleton
	- be careful with introducing coupling between classes, where one class is too much dependent on other one
	- be even more careful with indirect calls like so: `this.aObj.bObj.callMethod()` 
	- initialize all properties of objects
		- reduces type problems with partial object AND highlights places, where object is misused
	- try to always deep-copy(often performance tradeoff is negligible, but complexity reduction is drastic, ESPECIALLY for smth like React)
		- it is complex task for nested objects, BUT some libs or avoiding deep nesting is great strategy

reasons to create class:
- model real-world object - each real-world thing need one object with respective fields attached to it
	- great for achieving DDD
- model abstract object - it might be beneficial to abstract common things of real-world object into some abstract objects to enforce DRY or reusability
	- non-deterministic process and can result in different abstractions for same problem
- reduce complexity - hide any details inside an object, to make project easier to work with, understand, DRY, maintainable and correct
- isolate complexity - create one thing in isolation and reuse it
	- if you need to modify, fix, change it - only one place is effected
- hide implementation details - hide types, external integrations, libs etc
- isolate points of change
- hide global data - create a StateManager object and expose data via methods, not directly
- merge multiple variables into one object(if they are related)
- create Controller class - work with points of control(DB connection, in-memory data etc) in one centralized place and way
- create reusable code
	- can be viewed as utils OR as code, that can be even shared between programs
		- this way we can easily create "family" of programs, that have many similar parts
			- it is often called a "platform" part of all codebase
	- don't create reusable code, it it doesn't make much sense and adds complexity
- \---
- note: even if you don't have Classes, always modularize your app, BUT if you have, Class can be a part of some bigger module too
- be careful with:
	- god/super classes - too big classes, classes that interacts too deep with other classes, classes that know too much
	- redundant classes - don't keep classes just because
		- also class with no behavior MIGHT be redundant
	- avoid behavior only classes
		- detected if class is named as verb(`StringBuilder`)
		- it is more often then not can be specialized and merged into dependent class

other about classes:
- always keep an eye on language specific staff(how it works, what common agreements/patterns exist)
- it is beneficial to pack group of related classes intro packages
	- if it custom build system, always enforce standards for private/public, code&project organization

#### Routings
Routing \== method/function, invocable for single purpose, in this section will be presented how create high quality once

smells of routine:
- poor naming
- no self-documentation
- inconsistent code style and unreadable layout
- param modification is present
- direct global data access
- multi-purpose
- no validation
- magic numbers
- unused vars/params
- working with ref param as value param and vise versa
- too many params
- poor params order
- poor params naming

base goals of routine:
- code readability
- code reusability

reasons to create routine:
- reduce complexity (as you might expect `:)`)
	- less duplication
	- easier to change code
	- no need to remember implementation details
- introduce abstraction
	- break routings into smaller once
	- document code purpose
- DRY
	- fixes shotgun problem
- subclasses extension - easier to override smth small and understandable
- hide operations order (reduce complexity)
- hide pointers (reduce complexity)
- improve portability - any non-default feature/dependency can be broken to reusable routines
- simplify boolean - create self-documentation to boolean operations, that are always hard to read
	- or any operation to be fair
	- we also have an opportunity to better structure operation itself
- improve - any improvements are easier to make to one part of code and not all program

ALWAYS tend for smaller routines, while it is beneficial sometimes to do otherwise, almost always breaking the code is good
- also don't be ashamed of creating small or "stupid" routines
- it might be, that small routine will grow eventually(validation etc), so small is good place to start

how-to design routine:
- cohesion is important here, it determines how closely related operations inside routine are
	- routing, that performs multiple actions, will have low cohesion
	- among everything else, it makes your code error-prone
	- ways to achieving cohesion
		- do only one thing (main way)
		- perform operation sequentially close
			- ex: I need compute date of birth, age and salary, SO it must be done in this order, not with salary in between
				- to achieve you can structure your code in such way OR force `calcAge` use `getBirth` inside and don't accept as param
		- don't place operation closely, that relate only to data, that provided to them from above
			- it is better to initialize/receive data as close as possible to code, that it will be used by
		- avoid direct execution of related functionality, rather delegate it
			- ex: `Init` code may have may things inside of it, BUT if it delegates those things to other routings, rather then executing directly, it is ok
				- we have cohesion by purpose this way
	- what to avoid, so cohesion is high:
		- don't combine calls in order, that have no need to be combined in first place
			- ex: I need to get array of 3 values about user, so I will call 3 gets in a row here
				- it rather be changed to getting all user data, OR some other way of destruction
		- don't combine calls with boolean flags
			- ex: if this I will do *some large part of code*, else *other large part* 
				- better to split it into two separate actions
				- if you need shared data, just access it from hire context, like class
			- note: event handle OR command dispatcher is great pattern, that is exception here

how-to name a routine:
- use name that fully describes your routine
	- if you notice `and`s in your names, this probably means, that this routine has too many responsibilities
- be careful with too elastic names like `CalculateSmth, PerformSmth, DoSmth`, it is better avoid them
	- exceptions are cases, like `HandleSmth`, when used in context of handling events
	- if it is hard to pick other name, it is a clear signal that routine has too broad purpose, related to it
- don't use numbers to differ routines, it will lead to indistinguishable functions
- strive for clearness in a name, don't try to make it short
	- good point is that routine can be bound to class, so `User.getReport()` has same meaning as `User.getUserReport()` and you can use shorter variation
		- `getReport` - example of verb+object name type, that is great example of creating an understandable name
		- `User.getUserReport` - is not only redundant in size, but it will break inheritance, example:
			- `Check` overrides `printDocument` to "print checks", BUT naming `Check.printDocument` is stays the same, so it is confusing
- use opposite naming in same format
	- if we have `OpenFile`, we can't have `fClose` or `FileClose`, IT MUST BE `CloseFile` 
- establish same conventions for common naming

don't introduce too big routines...by amount of logic/data, length doesn't really matter

how-to work with params:
- establish consistent order of parameters, examples:
	- sort by role: input, input + output, output
	- sort by role C-style: output related, input
	- onError callback goes first
	- ---
	- keep similar order between similar functions
- if value can't be changed mark it as `readonly`, `const` or some other way, that ideally is backed-up by your language
	- otherwise conventions are here to help
- remove unused params
	- linters are here for you, to enforce it
- don't modify params directly
	- this will make impossible to use them later in routine AND will require contextual knowledge about routine, when working with it
	- this will make variable multi-purpose
- add comments, invariants or asserts to state that parameter has additional requirements to it
	- otherwise, handle this requirements inside routine(as validation step)
- keep an eye on number of params:
	- too many params result in harder to understand code
	- passing too many params between routines result in high coupling
		- if this routines are connected, put them into class and access data from-inside a class
- how pass objects?
	- first way - only requires fields from it
	- second way - full object
	- ideal middle ground - "it depends" on how routine works with object, if it coupled to object or connected, better to pass full object and keep it flexible, IF it just needs some data and it is not intentional for it to originate from same object, accept only 3 params
	- indications of problem:
		- passing non-complete objects, OR create objects in place, for routine itself
		- frequently changing number of params, that could be accessed directly from object
- always pass params of specified type, don't hope for a chance that it will work OR for compiler to save you

procedure VS function
- note: in modern languages it has only semantic meaning
- procedure can't return anything, but still can take and change pointer values, SO it is used to perform actions
	- can return status still, but it is debatable
- function can return only one value, determined by it's name, and it is it's sole purpose
	- notes:
		- always return stated value(linter or compiler is here to help)
		- never return pointer to local value, it will invalidate after function is completed
- \---
- does it makes much scenes for some TS dev to remember it? Can't say, it is a semantic things, so use it if necessary, BUT try not to overcomplicate things

#### Defensive programing
Create code, that can survive inappropriate usage, with proper behavior
- this means we always assume, that data will be invalid and need to work with it accordingly
- we can avoid checks, if they already done by compiler, linter etc, BUT it is not always that easy and additional help from us is important

Basically, "garbage in == garbage out" out is bad strategy, it is better to result in some strict way: error, no response, compilation failure etc

Basics of defense:
- check data: number ranges, string sizes, format of data, SQL/HTML injections etc
	- it always relevant for working with external data AND might be relevant on per function level
- decide what is suitable to do AND do it
- note: defense isn't first resort, when talking about routines, great design and abstraction is key, BUT it still can be useful there

ways to defense:
- assertion - perform runtime check, do nothing, if everything is ok OR throw error, if smth is wrong
	- great for large problems to trace any issue OR avoid mess of recovering from state, that isn't possible in first place
	- always document assertion meaning
	- it is possible to remove assertions from compiled code, it their main goal is help in development
		- some assertions are helpful to detect production errors too
	- remember that assert is ment to be used, when dealign with critical, non-recoverable cases, it can't be used as error-handling flow, external data validation(internal is ok, because you in control of calling methods, thus you need to change code and assert is great way of checking it)
		- basically assertion firing means, that smth is messed-up in code itself
	- asserting is great way to verify contracts(postconditions and preconditions)
	- it is not recommended, but possible to assert code AND then still add error handling block around it
		- this way we still detect critical program state, BUT it will fail gracefully or even keep running
			- if assertions aren't compiled, we won't have any errors, but this will result is safe flow inside of a program on prod, because data is verified
		- great for large, long standing projects OR something, that aren't allowed to "just exit if everything is bad"
- error-handling - if error is expected, you need to handle it, here is how:
	- return neutral value - for bad param, return some "default" value(ex: `""`, `0`, `null`)
	- ignore it - for corrupted video frame it is easier to ignore it and display next in the stream, that dealing with it
	- return same value - related to previous example, if you have rapid stream of data, it might be ok to duplicate response, rather then dealing with broken frame
	- assume closes legal value - if it is appropriate, use closes legal value(if you can't work with negative, "round" it to `0`)
		- it is not always good idea to do so(statement is applicable to all other variants btw)
	- log - used in combination with other, so we can prevent similar cases in future
	- throw/return error - if it isn't responsibility of function, just break and notify function user about it(this may cascade, until responsible for handling won't "catch")
		- try catching as close as possible, so you can easily handle and access details
		- some centralized class can be used to handle errors, BUT it will couple all system to it, so use it with caution and do some DI to reduce coupling
			- logging is somewhat part of such object
		- if you don't have throw or return mechanisms in lang, create your own via returning custom statuses or setting them via pointers
	- kill program - if it critical software, better to kill it, than assume smth or try to deal with error
	- ---
	- all in all, we have a trade-off between robustness(better some result, that nothing) and correctness(better no result, that somewhat incorrect)
		- it is matter of requirements(architecture in first place) to decide, what we need to embrace more in our program
		- it must be followed consistently
- throw/return error (exceptions) in depth - if current part of code can't deal with error, it can `throw` it up the chain and hope, that someone can `catch` and deal with it
	- use it wisely, otherwise, program WILL become a mess
	- some use-cases:
		- break program flow and notify(with propagation) higher parts, that somethings wrong
	- when not to use:
		- for cases that can be handled in simpler manner
			- otherwise you break encapsulation and make program harder to understand
				- basically, now you need to know implementation of code you are using and it is bad
		- when something can be handled locally
			- no need to break encapsulation
		- when it break interface/abstraction of routing too much
			- for example some low-level, implementation dependent, errors are leaked into outside
			- if you need to throw, map error into highly abstract object and work with that
	- advices:
		- include as much info, that can help solve exception, as possible
			- be careful from security perspective with it, it might be ok to expose some data for programers, but keep it abstract for user
		- don't create empty catch block
			- this is indicator of exception for no reason OR unhandled exception
			- it you need to, at leas comment why OR better log that smth went wrong
		- if type system don't allow stating that smth will throw, read the docs(or even code) and treat it appropriately
		- enforce standard of what part of code and how should manage exceptions
			- also some non-default ErrorObjects are possible, especially if you can throw anything
				- it is easier to work with and create "infrastructure" around, like logging etc

barricade approach - concept of dividing a program into parts, where each part will contain any error inside of it and prevent any spread into outside of it's boundaries
- we state that some parts of program are responsible to work with untrusted data or any other source of error and have responsibility to validate and handle it, SO other parts can work with safe, "clean" data
	- this way we encapsulate any validation in one place
- we can have multiple layers of validation
- validate data as close to "input" as possible
- this way we can easily distinguish error-handling and assert use-cases
	- assert inside "clean" zone, otherwise handle any errors

debugging advices
- dev version of program can be less optimized, less safe and more exposed to user then production
	- if done correctly, it helps debugging a lot
	- overall, don't fear of slowing down your dev env with some additional checks
		- ex: react will re-render twice in dev, so it is easier to detect re-rendering anomalies
- consider spending some time to create/integrate and learn debugging tools
- use offensive programing - technique of making your program crash, log or behave less error prone, when in dev mode
	- examples:
		- assert will kill program in dev
		- any unexpected case will kill program
		- make problem worst(allocate more memory, do double re-renders) to make it noticeable
- remove debug functional as much as possible
	- make build system include/remove debug parts from code
		- can be done with:
			- preprocessors
			- macros
			- stubs: have two version of a function, one with functional, other - empty, so you will have minimal resource penalty on using it
				- great, when you can't remove code completely, when building it
			- smth more suitable for your lang
	- if possible, create several switches for different debug levels
		- now you can turn on/off different debug modes

when going into prod, you mostly want your errors as silent as possible, so here advices on what should be removed on prod builds:
- leave any critical checks, it is better to fail, that create wrong results
- non-critical checks could be swapped from crashes to messages, logs etc
	- if we can't not crash, except save any work in progress, that user is doing and then crash
- some debug code can be left, so user can try to investigate OR somewhat mitigate the error
- always attach logging/exporting errors
- swap detailed error messages, to smth that not exposes too many details AND understandable for user
	- additional data can be dumped into log files

#### Pseudocode programing process (PPP)
Technique, used in class & routine design, that aims to reduce work and enhance quality
- in it's core, a way of creating code via plain English, with some techniques, that make this process effective and such, that it results in good code later

general steps in class creation:
- create general class design, where you can describe public interface, abstraction level, what class will encapsulate etc
- go in depth for each routine - things about what it will need, how it will interact with other routines etc
- review + test(if you are already creating code)
- \---
- this is iterative process, where you can several times finish part(all even all of them) and iterate over

general steps in routine creation:
- design routine
- check the design
- code routine
- review + test
- \---
- this is iterative process, where you can several times finish part(all even all of them) and iterate over
- one of ways in approaching routine creation is PPP

how to PPP in theory
- precisely describe operations in natural language
- don't bound to any concepts of language you are planning to use
	- the key is to do as abstract design as possible, SO less describe a solution and rather intent
		- general principle is thing if this pseudocode can be used as comment and not code itself
- after general pseudocode is done, reiterate to lower-level of abstraction, so pseudocode can be translated into code
- it is useful to develop som pseudo-syntax, when creating a pseudocode, for ease of understanding

PPP benefits
- great for creating low-level design
	- acts as a layer between high-level design and actual coding, thus another possibility to iterate
		- thus it is easier to change it, rather then do code again
- easier to review then actual code
	- no need to worry in programming related staff
- can be reuses as comment(part of it at least)
- helps to detect insufficient design

how to PPP in practice (for routines)
- note: we are talking about complex routines, this is too much effort for some simple getter/setter routine
- each step is done in order, after creation of general class layout, for each routine
	- re-iteration is key
- design the routine
	- check if routine is actually needed, stated in design and have at least general requirements
	- define the problem it needs to solve in high-level
		- can be skipped, if design is sufficient enough
		- it should state: operations inside routine, inputs, outputs, preconditions, postconditions
	- create a good name for it
		- name must be clear and understandable
	- check created solutions
		- check public/company libs, standard lib etc and use part/whole it's functionality OR, at least, it's ideas
			- existing algorithms is generally a great way to go
	- things how routine will handle errors
	- things about efficiency
		- if efficiency not important - go hard on DX
		- if efficiency is important - implement it, accordingly with design and requirements(what is more important, memory or speed etc)
	- create general pseudocode + reiterate to make it more low-level(when reiterating decompose it as much as possible)
		- always start with general comment, that will state the main purpose of routine
		- then create pseudocode itself
	- think about complex data manipulations (if any)
		- define key data types, that will be in-use
	- do self-review & external review of the pseudocode
		- always aim to conceptual understanding of purpose of the routine
- code the routine
	- write general declaration + place general comment above it
	- put pseudocode inside of a declaration
	- write first and last statement
	- fill middle of the routine by iterating over pseudocode
	- clean-up unneeded comments + refactor code if needed
		- move large, reusable chunks into separate routines(applying PPP)
		- if chunk is large, but makes little scenes to move out, use PPP to work through it AND ONLY THEN do refactor
- check the code - some errors can be found only after code has been fully written, SO perform addition check
	- mentally execute the routine
		- always understand role of each line of the code AND why it works
			- otherwise you aren't really checking if everything is ok, only assuming
	- ask for external review
	- compile, lint, build, pre-process etc etc
		- don't compile too early, there is a risk of not properly do mental execution and side-track into other, more trivial parts
			- trivial, because it is easier to fix what machine has found, rather than understand everything by yourself
		- general rules:
			- make compiler as pickiest as it makes sense
			- ALWAYS understand why warning has appeared and fix it
				- otherwise you won't notice any warnings, because of their amount
	- use debugger
	- manually test
		- if needed, you can write "scaffolds" - other dum routines, that will call your routine with test data
	- if there are too many errors and problems - rewrite from scratch
- clean up - perform checks, to see if routine has enough quality and can be used
	- check: interface, design, variables & params, naming, layout, documentation, remove redundant comments

alternatives:
- TDD
- Refactoring - write garbage code, iterate on it
- Design by contract - create (post&pre)conditions for each routine and iterate from there

notes:
- overall, if you are stack, don't know where to start, what to do next, hacking around - use PPP or alternative
- don't stop at first solution
- class design and routine design are coupled processes, that can and will effect each other

## Variables
Using proper data-type is key in finding solution

#### General issues with Variables
###### How-to create variables
declaration:
- always declare variables, if language allows auto-declaration
	- linters will help here
	- also keep naming consistent, to avoid situations, where you try accessing non-existent `ID`, instead of declared `id` 

initialization:
- problems: var has no initial value, var has out-of-scope value, var has partial value(partial objects, uninitialized pointer)
- good practices:
	- always init on declaration
	- declare, init and use as close as possible
		- if your lang supports, enclose variable+usage in scope as much as possible
		- basically, keep related actions together
		- exception: global constants(or any non re-initializable data)
	- use `const`, `readonly` and `final` as much as possible, to prevent unexpected things
	- be careful with accumulators and counters
		- also, if reinitialization is needed, don't forget to put it in loop too
	- initialize routine variables inside routine + class data inside constructor
		- always free/destruct inited data
	- use strict linters, mods, compilers etc
		- auto checkers for bad pointers is great tool too
	- check params for validity(if non-valid data can be passed in)
	- use recognizable filler values, if you initializing memory before-hand

###### Scope
One way of thinking about scope is thinking how many parts of you program know(has access) to some data

Scope can be handled differently, depending on lang you are using, so here are some general advices on this topic:
- keep variable declaration, initialization and usage as close as possible
	- more error prone
	- less context jumps, when working with code
	- localized behavior is easier to refactor-out
	- (this is one more reason to avoid any global state)
	- advices:
		- keep loop and related variables as close as possible
		- use proper grouping, that minimizes "distance"
			- sometimes, it will reveal that group can be refactored-out
		- extract related functionality into separate function
		- always tend to smaller scope(`private` first, local > global etc)

always prefer small scope, as it results in code that easier to read an maintain

###### Persistence (aka life time)
examples:
- block-scoped variable won't be accessible out of block
- object in GC lang will be removed by GC, object in non-GC lang must be deleted by hand
- global variables will live, as long as program is running
- some data can live externally from the program, thus "forever"

how-to deal with inconsistent persistence:
- assert critical data for reasonability
- set unreasonable value for non-used variables
	- ex: set pointer to `null` 
- always assume non-reasonable value, if not guaranteed otherwise

###### Binding Time
Point in time, when variable gets it's data assigned
- later it happens == more flexibility you have, BUT more errors are possible

examples:
- hardcoding to some value:
	- via magic numbers (binding at coding time)
	- via named constant (binding at compile time)
- creating function to get value
	- binding on program load
	- binding on object creation
	- binding just in time(on each update loop)
	- \---
	- how function gets value can be changed via code or even at runtime, if needed

overall:
- use one variable for one purpose
- create proper variable names
- avoid temp variable as much as possible
- avoid adding any hidden meaning
	- ex: adding special values like: `-1` for "bad" value, adding different meaning for positive and negative ranges
- always use all declared variables(use linters here)

#### Naming a variable
Proper naming of anything in code is key for readable, understandable and maintainable code
- it is great source of self documentation too
- main goal of name is to fully describe what variable represents
	- keep in mind, that name mustn't act as abbreviation, it should be understandable and clear
	- keep it as specific as possible
- avoid implementation details in names, use domain as source of inspiration
	- deleteStudent -> expelStudent
- using some common naming like: `T` or `i` is ok, but often it is better to give them more meaning(if you have multiple "i"s and "T"s)
- some short names, like `i`, can state that variable is short lived and will be used only in some small scope, ex: loop
- if you have namespaces, always specify from what namespace variable comes
	- if you don't, standardized prefixes are great source of distinction
- create/adopt naming standards, ex:
	- where to place qualifiers: expenseTotal OR totalExpense
	- where to place actions: handleDelete OR deleteHandler
	- using opposite pairs: visible WILL ALWAYS be inverted to invisible (not nonVisible etc)
- naming specific data:
	- loops:
		- if used inside loop, use: `i`, `k`, `j` 
			- never use such names, outside of loop context, because it is a general convention
		- if used outside loop, use proper naming with `count` or `index` part
			- also required for long loops, nested loops etc
	- statuses: avoid flags in favor of enums, booleans, names constants
	- temps: don't use them, each var must have a meaning :)
	- bools:
		- agree on standard for naming them
		- have names that can be understood as booleans
			- error -> isError, errored
		- some default booleans: success, done, error, found
			- this defaults are just a base, you can customize them, give them more meaning etc
		- use negative bools with caution
			- avoid smth like: `if(!notIsErrored) {...}` 
	- enums: if you lang won't prefix your enum names, prefix them by hand
		- January -> Month_January
	- global constants:
		- if appropriate, keep them in ALL_CAPS format
		- never describe their value in name, only meaning
			- ex: `const FIVE: number = 5` is bad and give you nothing
- always add structure and consistency to your project, by naming conventions
	- even if they arbitrary
	- use linters, if possible

conventions(they might be useful to know and consider, but most often try keep your conventions as similar as possible to lang's you are using)
- different styles, depending on type of a name: function, class, variable object, etc
	- different cases
		- be careful with case in-sensitive langs
	- different key words, prefixes etc
		- less readable in general
	- different level of descriptiveness in naming
		- `class Widget` BUT `longNameWidget: Widget` 
		- names can be hard to come-up sometimes
- identify: global vars, typedefs, class members, names constants, enums
- state whether param can/can't be modified
	- especially useful for langs like JS, where you pass everything by reference
- use capitalization, underscores and dashed for better readability
	- never mix several styles

prefixes and abbreviation - great way to complicate your code-base :)
- UDTA(user-defined type abbreviations) - bound to some specific type and don't correlate with language data types
	- ex: fn - fontName, doc - document, wn - window etc
	- abbreviation can be used in standalone way, as typedef
- semantic prefixes - prefixes, that describe how variable is used
	- ex: i - index, g - globa, t - type etc
	- somewhat universal
- \---
- generally, can make code more compact and a bit easier to read, BUT overusing will cause drop in readability and impossible entrance barrier
	- fast way of adding more context
	- no problems with different naming `mx` or `max` or `maximum` 

ways to make variables shorter(for readability reasons, never do it just for sake of doing)
- remove needless worlds
- use shorter synonyms
- abbreviate
	- some standard ways: use standard abbreviations(ex: `fs`), remove vowel, use first worlds of each letter, keep several letters of world, truncate some letters, remove suffixes etc
	- note
		- never change meaning
		- don't make vars hard to read
		- abbreviate consistently
		- create pronounceable names
		- document some specific abbreviations
			- can be on project level, block level, file level etc

what to keep an eye on:
- confusing abbreviations
- similar names(in general, by meaning, by sound)
- avoid numbers in names
- don't misspell names
	- linters ;)
	- alternately try avoiding this worlds, if possible, BUT...Eng is a mess, and it is impossible to spell anything, so don't worry
- don't assign real meaning to capitalization
	- ex: FI == first and fi == final
- keep single natural language, with single dialect, for names
	- preferably choose from:  British or American English
- don't use reserved names by language itself

#### Fundamental data types
Fundamental DTs are basic building blocks for your program, so it is important to nail them

###### Numbers
- magic numbers -> named constants or global constants
	- benefits: ease+reliability of refactoring, easier to understand, code is more reliable
	- note: keeping 0 and 1 for incrementing or in loops is ok
- anticipate devision by zero, when doing devision operations
- convert types(ex: int -> float) explicitly, avoid uncertain auto-convertions
	- applicable for comparisons, math operations etc
	- compiler is here for you :)
###### Integers
- do division last
	- benefits: avoid uncertainties(`7 / 10 * 10` may equal 0, because devision is casted to int)
	- all-in-all, always use brackets to enforce math
- anticipate overflow problems
	- even if everything is fine for current values, think if it is possible for this, for example, id int to overflow 2^8 in future
	- same goes for intermediate values, when doing math
###### Floats
- remember about precision problems(ex: `1/3 ≈ 0.3334`)
	- when precision is required, it is often better to work with integers + 10^n separately
	- if you still need to do any math with floats, try to do operations with sorted set of numbers(you will loose precision more often, with operations on numbers, that have great magnitude difference)
	- same problem appears in comparison(sum of `0.1` x10 won't result in `1`)
		- doing loose equal(with some fixed precision to check) is fine enough
	- precision will appear in rounding too
	- some more way to concur precision:
		- use float with more precision
		- use binary coded decimal
		- use int64 + magnitude
		- use ready-made solutions(standard-lib OR 3d-party lib)
###### Chars+Strings
- magic stings -> named constants OR global variables
	- benefits: same as for magic numbers, i18n/L10n, memory(for some systems it is efficient to a-locate memory once and reference it)
		- speaking of i18n/L10n, it is must have to decide on how to deal with them early on(where to store translations, how bake them into builds etc)
- make explicit decision for Unicode usage, when dealing with non-UTF languages
	- as light-weight alternative to UFT, consider ISO-8859(extended ASCI-2)
- keep all strings in one format and do necessary mapping as close to point of change as possible
- for some languages like C, where it is hard to work with high-level concept of strings use such approaches:
	- add prefixes to diff arrayOfChars and pointers
		- avoid pointers, if there is no memory constraints
	- use standard operations to copy or compute strings
	- be careful with string length(when a-locating memory, length must be 1 more then base)
		- conventions are here to help
	- initialize string with 0(zero terminator), to avoid endless strings
###### Booleans
- name booleans
	- benefits: self-documenting code, ease of understanding
- define custom booleans, if language doesn't have a built one
	- often done by enum OR `0` and `1` 
###### Enums
Enum(enumerated type) - type that can allows to describe each member in plain English
- use enums to add more readability, ease of understanding, ease of maintenance and reliability to code
	- often great as params
	- reliability can be achieved easily with linters
- can be used as more descriptive or expandable(in future) booleans
- always do exhaustive checks for enums in if/else or switch-case statements
- you can enforce some standards for enums:
	- state that first element is always invalid (applicable for string->number enum)
	- state first and last elements explicitly, so you can loop easily through enum values (applicable for string->number enum)
		- be careful with cases, where you can assign numbers not in order, so looping is impossible
- global variables OR classes can be used as enum simulators (if you have no built-in once)
	- if possible, try to make them type-safe
###### Named constants
Variables, that can be never re-assigned and represent some logical value
(basically, we are putting some value into "parameter", that can might be changed later)
- benefits: single point of change, clarity
- always name any literals
	- it might be useful  to even name your indexes(`i`)
- name any specific data
- simulate named constants, if needed
	- try to enforce scopes too
- always use named constant, if you have one, never mix literals and named constants
###### Arrays
Simplest structured data type. In it's simplest form can contain group of same-typed data, that can be indexed by numbers
- always keep an eye on out-of-bounds problem
- consider alternatives first(set, queue, stack) and only then array
- name indexes meaningfully, when working with multidimensional arrays OR nested loops
- use built-in length getters, instead of constants, if possible
###### Custom types (Type Aliasing)
If possible in your language, create custom types for places, where types might change(protected variations), so you could easily mitigate changes
- ex: similar types like `int8` `int16` etc, strings/arrays with fixed length
- you can do information hiding this way
	- but remember to keep name abstracted from implementation details
- you can create linter/compiler rules to enforce things like fixed length
- you can create missing types this way
- great way to achieve self-documented code
- be VERY careful with redefining standard types
	- it not prohibited for cases, like standardization, where you need to have same INT32 for different platforms
- if you need more flexibility, use classes

#### Unusual data types
A bit more about types, that aren't common in high-level languages

###### Structure
Data type, that built-up from other data
- similar to class, but can have only public data fields
	- that's why it less common then class, but has it's reasons to be used

reasons to use:
- clarity - group related data together
- encapsulation of logic, simplicity and reliability - perform operations on group of related fields, rather then on bunch of variables
	- in some languages you can copy structures like so: `newStruct = oldStruct`, or like so: `newStructu = {...oldStruct}` etc
- simplification of parameter list
	- note: don't group unrelated params, don't pass whole objects if only part is needed(basically we can encapsulate some data in routines, BUT in this case we do encapsulation from routine, so it will stay more generic)
- transportability - by having less capabilities then class, it is possible do do serialization, transportation and deserialization of struct data

###### Pointers
Pointer gives you great power, BUT you must be careful with it
- basically, pointer errors are number 1 problem for languages, that give access to them
	- note: even if your lang doesn't have a pointers, things like passing objects by reference are still pointer dependent, SO such knowledge is useful
- pointer operates on two pillars
	- location in memory - pointer value is some value(often 32bit hex), that points to some region in memory
	- knowledge about memory contents - memory is just a raw bytes, so pointer needs to associate location with data type, to interpret this raw bytes
		- this interpretation is device, OS CPU etc based
- pointer errors are different, because it is hard to locate it, reason been, pointer changes raw memory, thus wrong manipulation with it can cause all sorts of problems, that is hard to debug

general tips - in general, try to predict errors via extra measures AND look for any symptoms of potentially existing errors to detect them ASAP
- encapsulate pointer operations within function or class
- declare and define pointers as close as possible
- allocate and deallocate pointers in same scope
	- even if not possible to do in same scope, do on same level(constructor - destructor, in sister routine etc)
- add validity checkers(for pointer value, for value that pointer points to)
	- can be done via getter/setter
	- ex: if address is in range, between some predefined values
	- alternative: fill existing memory with garbage to mark as freed
- add "tag field" - when allocating struct in memory, add constant value field and check if it remains unchanged + corrupt it on pointer deallocation
	- you could perform one check before deletion OR multiple, for ease of finding root cause
- don't re-use pointer variables
- pre-allocate some buffer memory, for cases of RAM-overflow, so you could save work and gracefully shut-down
- set pointers to `null` after deleting, thus preventing any writes to freed(dangling) pointer
	- note: reads are still possible
	- if you add null checks, before deletion, this will also help you
- create global dict of pointers and check if their exist, before deletion
	- it is a global state, so meh :\
- all this advices could be packed into some helper function/macro, to work with pointers
	- this macro can have different behavior in dev/prod mods
- just don't use pointers or langs with pointer ;)
- in some langs like c++, we have references and pointers, where pointer could be changed, but reference is constant and will refer to object(it can only refer to object), after initialization
	- const references allow to clearly state, that you will pass reference to read-only object
		- unlike JS, C++ will always pass by value, meaning copies of object
- some more advices: declare pointer type, don't cast one type to other

###### Global Data
Some data, that can be accessed by any part of the program(or shared between large parts of a program)
- same as pointers, great power, great number of problems, SO it could have some benefits, but it is more a last resort thing OR a solution to specific problem(like cache)

common problems:
- modularity, single responsibility, maintainability, encapsulation, scalability etc is lost
- side effects
	- async too
- aliasing by local variable
- sharing data between thread
- code isn't reusable anymore
- testing and debugging problems

reasons to use:
- shared values
	- sometimes it may be better to group parts that depend on value into class or module
	- try to make var private first, it is hard to lower visibility later on
- named constants or enum simulation
- eliminate props drilling

advices:
- create getter+setter function for lower coupling and encapsulation in some way
	- basically same reasons as for class getter/setter methods
	- function can(and mostly should) be changed to classes, if you can, and now you have Storage Singleton with all you data, that somewhat encapsulated ;)
		- if you can't, create some standards to enforce routines over direct access
- group related data into some Classes, Structs etc
- if there is a need, establish some mutex(or similar locking system), when working with global data
- built domain abstractions on top of global data, avoid implementation details
	- also keep abstraction level consistent
- on scale, create a list of well-known and broadly used global data in program
- don't use global vars for temp values

## Statements
Organization of statements is also important in achieving quality, readability, maintainability etc
#### Organizing linear code
- statements, that need to be executed in specific order
	- key rule is to make data-flow and dependencies clear(it must be easy to understand why smth is done in such order, without need to know implementation or domain details)
		- don't initialize data in non-appropriate functions
		- state dependencies by names(ex: `init` in name is great signifier, that this function is required to be executed first)
		- state dependencies via params list
		- comment any uncertainties, if self-documenting code is not possible
		- use assertions or throw errors for validating dependencies
			- be careful with introducing complexity this way
- statements, that can be executed in any order
	- order can be any, because there is no dependencies, but you still should structure it, to keep readable and performant
	- main principle is to keep related actions together
		- by reordering, you may find that some group could be refactored-out into separate function
	- keep code readable from top-to-bottom
		- it is also important to avoid too much context switching, when code is read

#### Organising conditionals
Execution flow can be controlled in runtime via conditional structures(if-else, switch-case), so it is important to give them proper structure

###### if-else
- write normal path first OR, alternatively, error path first 
	- if you doing early returns, error first is great, otherwise it more convenient to have normal path first(because you see "answer" earlier worry about errors if needed)
	- try not to mix both paths
	- note: this is just advices, if it lowers code readability, screw them
- keep an eye on
	- equality comparisons, especially for included/excluded cases
	- accidental reversal of logic
- don't write empty conditional blocks
	- if needed, add comment, explaining why
- test all conditional paths
- simplify checks with named booleans or calls to named functions, that return boolean
- sort multiple if-else statements by commonness
	- same for switch-case
- add assert to final else, if it not expected to be called
	- same for `default` value in switch-case
- use switch-case over multiple if-else statements

###### switch-case
- note: this construct may not be supported or implementation/capabilities may differ from lang to lang
- for large switch-cases, it is great practice to organize them:
	- alphabetic/numeric/etc order
	- order by commonness
	- order by normal first, error last
		- or vise versa
- keep code in each case short and simple
	- if needed, extract code into function and call it from `case` 
- if it is hard to write case value, it is a great indicator, that if-else should be chosen
	- often mapping values to enum can be a good practice, that allow using switch-case
- use default for real default, or for assertions, don't write last `case` as default
	- self-documentation and error detection abilities are lost
	- it is harder to add real default later
- use default for error detection if not used
	- if used, maybe rewrite it so default is checked separately, so you could always be sure, that you switch-case covers all cases(ex: all enum values)
- keep an eye on always writing `break` for each case, except when logic is easy to understand
	- ex of easy logic: `if A or B -> do smth; break;` 
	- document any complex missing breaks, for better understanding of why
- avoid nesting control structures OR any deep nesting :)

#### Organizing loops
Loops can be hard, so their organization is key

- selecting a loop
	- types: loop that will be executed pre-defined number of times, loop that will be executing until `break`, infinite loop, iterative loop(ex: `forEach`)
	- control structure to break can be placed: at the begining, in the middle, at the end
	- combination of this two factors will result in some loop structure(while, for, do-while etc), that comes with its trade-offs
		- usually it is more reliable to choose iterative or fixed-size loops, but doing raw `while`(or `goto`) can be quite beneficial for some cases
			- still, be careful with `goto` and other unusual or nested structures
	- `for` loop
		- choose this type when you need to setup loop once(usually for known number of iterations) and forgot about it
		- doing additional controls or `index` manipulations is good sign to change to `while` loop
	- `forEach` loop - choose over `for` loop, when your doing iterations over some data container(ex: array, linked list etc)
- controlling the loop
	- generally, keep it simple
	- treat insides of the loop same as function(reader don't need to read all of loop's body to understand it, keep as much data outside of the loop as possible)
	- entering
		- enter from one point
		- put initialization as close as possible to loop body
		- keep proper loop type
			- ex: don't do complicated calls inside `for` loop header, use `while` instead or at leas put those inits outside of header
	- dealing with body
		- always use `{}` for loop body, for readability reasons
		- avoid empty loops, for readability reasons
		- try to group control manipulations(breaks, variables change) at the end or start of loop body
		- keep 1 loop per 1 task
			- for efficiency reasons it can be disregarded, but it need to be readable non the least
	- exiting
		- think through how loop iterates
			- after doing so, do debugger check, with stops at start, middle and end of the loop + additional checks in places of interest
			- never debug with your guts, always find the reason problem occurred
		- make termination conditions obvious
			- main rule is to keep point of termination in one place
		- don't kill loop by changing index value
			- use `while` loop, on `break` controls
		- don't reuse indexing value, outside of a loop
			- better to create some boolean flag or similar variable, to keep track, for example, if loop finished without early break
		- for critical loops, you can check if index is over some global limit of iterations AND IF SO, kill loop with error
			- be careful with introducing inconsistencies and additional errors this way
		- never leave infinite loops ;)
		- exiting early
			- don't introduce some flag values or additional if-else checks, when you need to simply `break` out of the loop
				- reduces complexity and nesting
			- be careful with nesting and any complicated code in loops, it can lead to unexpected exits or non-exits from the loop
				- if you need to nest, better use labeled break points to clearly indicate from what part of code you are exiting
			- look for too many breaks, it can be indicator of single responsibility violation
			- group continue/break calls and place them at the top
				- if you can't, this is a clear indicator that if-else might be more suitable
			- note: by using break/continue you makes loop harder to understand, so do it with cautions
- using loop variables
	- use integers or booleans for controlling a loop
	- use meaningful index names for nested loops, complex of just large loops
		- make loops easier to read and understand, helps avoiding cross-talks of loop indexes
	- keep as mush loop related data inside of a loop as possible
		- same goes for index value
		- note: some simple things like scoped index variable for `for` loop might not be scoped at all(depends on compiler implementation, language spec etc)
- long loops
	- keep them short. ;)
	- limit nesting
	- indicator of good loop is possibility to extract all it's body to function
	- make long loops easy to understand

other:
- to write complex loops, that hard to think about, write them in: PPP, TDD, inside-out(start from one case, wrap it into loop, repeat)
- always code into language, ex: take practices from FP and create some functional-like traversal methods for easier and safer array manipulations, without the need for actual loops

#### Unusual control structures
Some control structures are non-universal, underpowered or have other problems, so they are "unusual", but still exist

- multiple returns - structure to force break from routine and give back control to caller
	- use to enhance readability, reduce nesting("early return")
	- be careful with missing clean-up, making routine harder to read
- recursion - routine do small part of whole problem and calls itself to repeat
	- great for large problems, that can be decomposed to small once
		- often the most elegant solution for set of algorithms, BUT for cases like `Fib` it just not efficient enough to go this way
	- be careful with
		- missing condition to break from recursion(always place it near the top of the function for safety)
			- for complex conditions introduce max depth of recursion and break(`return` OR `throw`) from it
				- max depth is also great to safely prevent any stack overflow
		- stack overflow, because of deep recursion
		- making solution hard to understand
	- restrict recursion to one function, don't call other function, that will call original function back
	- always create objects on the heap, to prevent fast stack overflow with auto objects
- goto - structure, that allows "jumping" from one place of program to other via command
	- often is prohibited and marked as bad practice, BUT it is still worth to discuss, because it kinda appears as multiple returns, named breaks, multiple loop returns, error handling
	- arguments against:
		- code is hard to format
		- program is harder to optimize
		- any non-linear code is hard to think about, BUT it can be powerful for some cases(async, throw/catch etc)
	- arguments for:
		- can lower duplication
		- can make code faster
		- overall, you don't need to avoid, most oftenly you just don't need to use it, because there is better alternatives
	- appropriate examples:
		- do early return with clean-up
			- avoid duplication of clean-up code and just go to the end of the function to do clean-up and return
			- for some cases it can be re-written to similar code, but often it results in complications, that not worse it
				- note: you must use consistent approaches in your code base, don't mix try/finally and goto
		- avoid code duplication
			- often can be re-written to use helper function, BUT it is less effective resource-wise
		- emulate control structure, that is missing in language
			- emulate 1-to-1 as it should work
		- efficiency improvement
			- always measure and document this improvement
	- notes:
		- don't use too many gotos
		- use all labels
		- be careful with unreachable code
		- use goto only to go forward

#### Table-Driven Methods
Alternative method to logical statements, that allows to look-up any info via table scheme
- can be great solution to avoid complex logical statements OR complex inheritance, BUT still more complex, than doing simple if-else/switch-case
- example of great usage:
	- you can change regexes or complicated char_code checks to determine what type of character you received(letter, number, other), by creating and pre-filing Map(look-up table), that has structure like `{char_code/string: "letter" | "number" | "other"}` 
- overall data tends to be more flexible then code, so for cases, where you need to process large amounts of different types of somethings, you can describe how they need to be processed in table-driven format, load into program and execute logic, depending on the data

main problems:
- how look-up data - can be quite easy with indexed array for month OR tricky with large data-sets
	- direct access - access value directly via some index, combination of indexes inside array/matrix
		- if you don't have enough data or input can be out of range, you can deal with it in several ways:
			- introduce placeholder data into table
			- normalize input value to be in-range
	- indexed access - similar to direct access, but instead of using array you use two arrays(main and look-up table), to account for data, that hard to normalize
		- basically you create two arrays, one that densely stores main data and other, that will have small entries of just indexes(so it can have many empty spaces, but don't waste too much memory)
		- advantages:
			- indexes take less memory
			- you can create several index arrays for single data set
			- it creates layer, similar to getter method, so code becomes less coupled
		- easier alternative might be to use Map, so you can use value directly as key, with no normalization
	- stair-step access - in this case, key corresponds to upper-limit of some range, thus all data bellow it will result in some value
		- be sure include/exclude boundary values consistently
		- this way you don't need to do any normalization at all, just plug in boundary values and thats it
		- to find needed value you will loop through all "stairs", so consider utilizing binary search here
		- note: sometimes indexed access is better tradeoff of lower speed, higher memory usage
- what to store - can be some plain value(enum, string, number etc), action(enum or string that can command what to do), reference to function to be executed

other:
- remember that data can be read from external source, thus you don't need to update code to change behavior
- avoid direct index calculations, abstract it with functions/methods

#### General Control Issues
- boolean values - used to control flow of code
	- always use defined true/false OR define them as variables/macros by hand
	- coerce values to booleans explicitly
		- *looking at JS* 
		- still exclude redundant checks like: `if (a > b) == true`, they make code harder to read
	- break several expressions to smaller one, with names, so it is easier to understand complicated logic
	- move complicated boolean check into separate function
		- it makes it reusable
		- it gives it proper name, so it is easy to understand what it for, without understanding the implementation
	- change logic/inheritance to look-up table, as discussed earlier
	- form booleans positively as often, as possible
		- flip variable name to avoid `!var` 
		- flip order of if/else to avoid `if (!var)` 
		- convert expressions to easier one, but logically equivalent
			- ex: `!displayOK || !printerOK` == `!(displayOK && printerOK)` 
			- theory: negate each operand, swap `and` and `or`, negate whole expression
	- use parentheses for clarity
		- it is also useful outside of boolean operations context, more clarity is always good
	- don't account for lazy evaluation of booleans
		- ex: `while (i < arr.length && arr[i] !== 1)` 
			- this will result in error, if compiler evaluates both sides and only then do `&&` operation, SO better to avoid such code
		- note: it might be general practice to use such features, so "it is what it is"
			- ex: in react `var && <>{var.value}</>`, won't cause problems, because JS guarantees to lazy evaluate
				- this is called short-circuited evaluation and it follows such logic:
					- `v1 && v2`, if `v1` false -> result false, else -> result == `v2` 
					- `v1 || v2`, if `v1` true -> result true, else -> result == `v2` 
				- note again: some langs may have dedicated operators, that will always evaluate both sides (for some reason)
					- like Java: `|` or `&` 
	- write numeric operations in such way, that it is easy to map them onto number line
		- examples:
			- `min <= i && i <= max` 
			- `i < min || max < i` 
	- working with zero - zero states many things(falsy, nullish, number etc), so it is important to clearly state what it means
		- if used like boolean, operate with it as with boolean: `if (value)` 
		- if used as number, operate with it as with number: `if (value !== 0)` 
		- if used as string terminator, operate with it as with char: `if (*charPtr != '\0')` 
		- if working with pointer, clearly compare with null: `if (ptr != null)` 
	- common problems:
		- be careful with mistyping `=` and `==` 
		- know your language(generally good advice):
			- distinguish: `==` and `===`, `==` and `.equals` etc
- compound statements (blocks) - number of statements, that are grouped by, usually `{}` and treated as single statement(this can include shared scope and other groupings)
	- main point here is to avoid conditions, without brackets, even if it is allowed by language, for sake of read-ability and extendability
- null statements - statements, that do nothings
	- can be met as empty conditional body, empty `case` etc
		- it is often better avoid empty conditional body and move any logic inside of it, rather then working with side-effects
- working with deep nesting
	- deep nesting creates same issue as large functions or many context to keep in mind
		- *typical problem with human-monkey brain, that can't handle too many things at once* 
	- refactor-out deep nesting as much as possible, by:
		- extract nested conditional statements with introducing additional checks
			- this might result in more complicated checks overall
		- add early returns
		- use `if-elseif-else` structure
		- use `switch/case` 
		- leave deep nesting, but refactor-out inside of each block into separate function, so you can read decision making part OR execution part
			- if nesting is too deep, you can refactor-out checks too
		- use OOP's polymorphism
		- use table-driven method
		- use status variable
		- use exceptions
	- always have a good reason for "why you need deep nesting", if not reason - refactor this code

note:
- poorly done control structures is clear source of complexity in your program, always tend to linear, top->bottom programs, without avoiding too much "jumping"
	- overall, complexity can be measured by counting decision points(ex: each keyword(`if`, `and`, `or` etc) used == +1 point), THIS NOT MEANS, that you have to do counting all the time, it is just some reference point, when you can't describe why you "feel" that code is complex
		- this metric can only be used for control complexity, BUT it also can be combined with other measurements, to decide on global complexity, like: how many vars you use, how many params, how many lines of code etc

## Code Improvements
#### Software quality in general 
Software quality can be viewed from two perspectives:
- user side(external):
	- correctness(how well system built)
	- usability(UX, learning curve)
	- efficiency(system resources)
	- reliability
	- integrity(authN, authR, concurrent operations handling)
	- adaptability
	- accuracy(how well system do it's job)
	- robustness(performance under stress)
- programer side(internal)
	- *all mentioned above* 
	- maintainability
	- flexibility
	- portability
	- reusability(how easily you could extract and re-use parts of a system)
	- readability
	- testability
	- understandability(on both high and low levels)
- aspects if internal side directly effect corresponding aspects of external side, so it is as(if not more) important
- some aspect can interact with each other(by hurting or helping)

techniques to improve quality:
- set explicit objectives, that clearly state what qualities you aim to achieve
	- objectives must be achievable and somewhat stable
- keep quality as priority on culture and process level
- ensure proper QA step from engineer first and only after by QA-team member
	- left-shift development technique
- review process(code review, customer review, audit, informal forms of review, external forms of review etc)
	- look at it as "gate", that can be passed, if software is "good enough" at this point, to continue moving forward
- assuring quality, while developing:
	- control how changes made - any unexpected or uncontrolled changes will result in destabilization of quality
	- always quantify and measure quality aspects
		- statistics is a key ;)
	- prototyping
		- overall one of the bests methods of requirements development
- use multiple techniques - overall, each technique helps detecting some portion of defects, but combining them(several type of reviews, QA, AQA, unit testing etc) will give you great results
	- some methods can be better for particular tasks and programs
	- some methods cost more per defect, so smaller companies should evaluate each of them, before applying
		- note that some methods can find defect faster, thus increasing their value, even if they are more expensive per defect
		- note that some methods can detect only symptoms of defect, so you need to invest into finding cause
	- the most effective combination to consider:
		- formal review on all development steps(architecture, doc, code etc)
		- modeling/prototyping
		- testing(more different types == better)
	- defect finding should be as strict as possible at the beginning of the project(errors at the start have higher cost) and gradually decrease to some point, where it stays to the rest of a project

general principle of software quality - by improving quality you can lower development cost
- means, that to be more productive, you must spent less time re-writing code
	- sometimes you can see this in action, when engineer write so little code per day, but still busy and productive(because he invests time into improving quality, working on requirements, architecture, testing etc)
	- improving quality reduces not only refactors, BUT ALSO debugging and associated activities(which is pretty expensive)
	- it always a game of higher upfront cost, but lower downstream
		- from this point, quality is free

#### Collaborative Development
Sharing code with other is one of the ways to reduce errors

- overview - all in all, collaborative development is process of sharing code creating with other devs, in order to tackle "blind spots" in code
	- as other quality improving techniques, this works best in synergy with others, BUT it is far more effective, when used alone, compared to other techniques
	- this technique shows great cost reduction benefit(yes, you need more devs in a team, but the overall time spent to develop and debug is much less, compared to solo development)
	- also, by introducing collaboration, you can tackle non-testable problems, like quality
	- by knowing that your work will be reviewed, you tend to do it better
	- knowledge sharing - it is easy to enforce coding standards, as part of review, as well as share new ones
		- also makes personal grows easier, because such reviews are source of grows
			- newcomer can commit their changes and study at the same time
		- any review is cultivator of code improvements in general
	- code improvements, achieved by:
		- multiple sources of knowledge
		- tribal knowledge is spread among group, so less impact of someone leaving
		- more devs can work on code at the same time
- note: collaborative techniques can be also applied to any stage of program creation

pair programing - coding is done in pairs of two, one person writes code, other tries to spot weaknesses
- advices:
	- enforce coding standards first to prevent stylistic arguments
	- "watcher" must be active too
	- don't force it, it should bring effectiveness to development process
		- you can try variations, like live-review, pair design etc
	- rotate pairs to spread knowledge more
	- keep partners matching(fast with fast, slow with slow), BUT skill-levels can differ(it will be even more beneficial, to have skill-gap for some cases)
		- also don't partner people, who don't go along
	- make somebody owner of task, don't share ownership
- benefits:
	- development done faster, with less stress, with less errors
	- code is better
	- mentoring, boosting culture, co-ownership

formal inspections - large review of program
- differs from just a review:
	- weak areas have the most attention
	- focus on defects detection
	- all participants have distinct role
		- moderator - person with knowledge in program's area, that have enough experience in such inspections
		- author - acts as an overview to project and can explain only minor details
		- reviewer - person, that will closely work with code, main objective is to find defects
		- scribe - person, taking notes
		- management - can't take part in review, BUT can access results
			- be careful not to introduce pressure on tech team
		- ---
		- keep number of people low, but not lower then 3
		- keep one role per person
	- author can't moderate inspection
	- participants have experience of doing such inspections
	- inspection is documented
	- inspection has several steps
		- planning
		- overview - remember, code must speak for itself
		- preparation - each reviewer has specific, uniq goals assigned to them
		- final meeting - don't discuss solutions, keep it somewhat short
		- final report - include data(number of problems found, time spent etc)
		- rework
		- follow-up - moderator organizes second inspection round OR just performs checks on each error from the list
		- ---
		- if you need to modify steps, always measure, if inspection became more effective
	- focus on improving code AND not assaulting author (same as general reviews)
	- author must consider all points from review, BUT it ultimately has a veto on all of them

walk-throughs - loose term, including formal/informal discussion about design or code in groups of 2+ people
- common attributes:
	- it can be moderated and should be noted
	- focus on technical issues and error detection
	- preparation step can be present
	- usually short
	- way to share knowledge, including senior -> junior
	- flexible
	- no management
- if you can't justify holding a meeting, it is better to investigate solo
- benefits:
	- can involve large amount of people in several short walk-throughs
	- easier and faster then inspection
		- can be great starting point for some people, BUT overall inspection is better practice

code reading - read code and comment on it's quality issues
- done in three steps: several people read code independently with noting problems, meeting with author is held, author fixes code
	- on meeting, focus on problems
	- meeting is optional
- benefits:
	- no need for large meeting or meeting at all
	- no need to manage people
	- most work done in async manner

notes:
- let people choose preferable ways to collaborate
- each way has set of tread-offs, that can be beneficial, depending on requirements

#### Testing by Developers
types:
- unit - testing small component in isolation
- component testing - testing larger component in isolation
- integration testing - testing multiple components and their integration with each other
- regression testing - repetitive execution of same tests in order to find new problems after changes
- system testing AKA e2e - testing whole system at once
- *and many more, that most often done by someone else, not devs* 

more types:
- black-box - testing, without knowing implementation details
- white-box - testing, with knowing implementation details (focus of this chapter)

testing is not as efficient as collaborative development, BUT it plays huge role in keeping quality non the less, BUT devs don't like tests, and here some reasons why:
- goal of tests is to break software
- having tests can't guarantee perfection of software, because tests can be bad by themselves
- writing more tests won't make software better, if just results in better measurements of quality
- you must believe, that your software have errors, otherwise you will have lower chance in finding them

results of testing:
- testing describes reliability of software by itself
- testing helps finding weak points and tackle it on scale(reviews, design, etc)

notes:
- good code coverage != good tests and indication of quality
- when testing something, start from smallest unit of code(often function) first
- white-box is great way to fully test your code, BUT as dev you will always have same blind-spots, as when writing code, so black-box is great second step to consider

recommended approach:
- test relevant requirements
- test relevant design points
- test data-flow and code execution flow
- consider creating a checklist with common errors
- it is generally more efficient to test-first, because:
	- you will guarantee testing
	- you will find more errors AND correct them easily
	- you will have better code, because you introduce a guaranteed step of thinking about requirements/design AND not just about code itself
		- this way you expose poor requirements, that can be corrected before-hand

limitations:
- devs tend to write "clean tests" more then dirty
	- clean test - test that focuses on happy pass
	- dirty test - test that focuses on any possible pass, that test subject can perform
- devs subjective view of coverage is higher then actual one
	- part of it comes from devs trying to achieve specific coverage(ex: statement), but need to achieve branch coverage, meaning to cover every path the code can follow
- \---
- this limitations is just a reminder, that you need to introduce other variations of quality control, except testing

advices:
- it is impossible to test all inputs/outputs, because of combinatorics and math, so you need to focus on testing different possibilities, THAT will form whole picture and cover all variations
- cover all flows of data/code, that program can take
	- CODE FLOW
		- it doesn't mean, that number of tests must be exactly the same as number of paths, BUT it at least must be equal
		- if number of paths goes crazy, it is signal of bad routine
	- DATA FLOW
		- before writing test, look at code and try finding anomalies, like non-used data, data defined twice, data used after definition etc
		- focus on testing combinations of possible data values and their interactions(ex: if `a` is false, then `b` is true, then result is...)
	- focus on code flow first and then introduces missed cases for proper testing of data flow
- error guessing - try to predict possible errors in tests
	- works great in combination of tracking previous common errors
- tests boundary problems OR "off by one" problem
	- ex: when testing `if a < MAX`, you need to check 3 values for `a`: `less then MAX`, `MAX`, `more then MAX` 
	- sub-type of that is testing compound boundaries, meaning checking all possibilities, that can arrive from working with data-set
		- ex: we need to sum array if int8 numbers and output int32 result, so code need to handle overflows AND at least one test must represent this handling
- test for bad data:
	- no data
	- too much data
	- invalid data(wrong type etc)
	- improper data(wrong size etc)
	- uninitialized data
- test for good data:
	- expected data
	- smallest possible data (ex: how code handles empty arrays)
	- largest possible data
	- old data, that must be compatible with new code
		- often the case in regression testing
- use data, that easy to operate one, to avoid bugs in tests
	- ex: `1234567 * 2` is harder to operate then `2000000 * 2` 

typical errors:
- errors aren't spread evenly through the code
	- this means that some routines will be more defective then others, thus requiring more focus, to prevent time loss for debugging on scale of all program
	- it is often beneficial to rewrite such routines from ground up
	- it is often beneficial to conquer defective areas first
- error classification
	- many errors come from poor requirements OR poor understanding of requirements
		- by writing good requirements and building their understanding you can avoid errors that hard to deal with
	- most errors come from developer, not instruments he uses
		- if instrument has strange behavior to you, this most often means, that you didn't read the docs ;)
	- typos is huge source of errors, SO use linters etc
	- ---
	- classify errors, measurements and statistics is a key
- larger projects will have more errors come from requirements/design
- errors in test(flakiness, incorrect data, incorrect test execution etc) - the most painful of problems
	- check your tests - develop tests as carefully, as you develop code
	- plan your tests cases, when developing
	- reuse your tests, for writing newer version
		- this way you don't write through-away code
	- create testing frameworks, this way you can avoid duplication, same mistakes etc

testing tools - ideas on what tools can make testing easier and can be created in house OR bought OR used from open-source
- create scaffolds for each test
	- scaffold - some helper object, that makes test easier and can emulate some behavior in controlled manner
	- includes
		- mocks, stubs
		- drivers - class, that creates interfaces for tested part of code
	- advantages:
		- remove problem of integration with other parts of a system
		- mocks and drivers can be re-used in multiple test
	- notes:
		- use some tools for building/developing scaffolds
		- write scaffold, so they can be self-tested OR create separate tests for them, if they include many logic
		- reuse actual logic in scaffolds, if possible
- output diffs of expected and actual results
- consider using random data generation to detect unpredictable errors
	- make generation flexible and well though, to really detect problems and not just falsely reassure yourself
- use some coverage monitoring
- include logging into your program
- use debugger and do step by step walk-through your code
- system perturbers - set of tools, that helps detecting rear anomalies in code, by modifying underlying system or code
	- fill memory with placeholder data
	- memory shaking - rearrange memory on fly
	- selective memory failing - simulate low memory or similar conditions
	- memory-access checkers - tools that can detect problematic pointers
	- mutation testing - tests that modify code in breaking manner and check if tests are failing
- error databases - DB of existing and historical errors

improvements to your testing - some recommendations to do, that can be modified to your needs, if modifications has been proven effective
- prioritize and plan for testing from beginning
- retest(regression testing) - run old tests, before applying new
	- also run full scope of tests, after each change, not only for area of changes
- automate your tests
	- lower change of been wrong, compared to manual test
	- easier to reuse and reproduce
	- possible to run as often as needed
		- result, errors detected as early as possible
	- make possible to detect most of problems, for large changes

keep testing records - data is key, so keep at as much as possible
- describe problem
- describe how to reproduce it
- describe solutions
- any relevant details and defects
- severity
- origin (step of construction)
- classification
- affected parts of program
- numbers: lines of code affected, hours to find, hours to fix
- \---
- such records can be on company scale, or personal, as an act of self-reflection and improvement

#### Debugging
Debugging - process of identifying root cause of an error + finding solution for it
- it is one of largest time consumers of dev time
- first goal is to prevent errors from appearing
	- this means, that debugging should be last resort, firstly you need to have proper requirements, write quality code etc
- second goal is to make debugging easy and fast
	- it is important, because less experience correlates with higher debugging time and worse debugging result

debugging helps:
- learn better about program, you are working on
	- this assumes, that you are trying and not just using trial&error method
- learn about mistakes you make
	- also take time to investigate & fix similar problems in other programs OR parts of current program
- learn about code quality, from reading it
	- if it is poor, take time to refactor it
- learn how you debug
	- always improve and learn new ways to debug faster
- learn how you fix errors
	- always try to fix problem from it's core AND not just "bandage" it

ineffective approaches to debug:
- guessing
	- *it involves random console.log to find issue, which I don't agree on, as JS dev ;)* 
- don't trying to understand a problem
- using "easy" fix
- blaming environment(libs, compiler etc)
	- *again, as JS dev, can't agree on this either, after spending 5 hours of debugging lib's breaking changes, with 3 people simultaneously* 
		- still it is last resort, try to find bug in your code first AND always assume that it is your error, not env's

how to locate an error scientifically(gather data, form hypothesis, test hypothesis with experiment, repeat):
- steps:
	- stabilize error - make it repeatable, if it is not, it is some timing, pointer, async or similar flaky issue
	- simplify error - find what might cause it, check each root-cause and discard irrelevant
	- locate root-cause
- tips for finding error:
	- account for all information, available to you
		- find more info if needed
	- isolate potential causes and test them separately
		- unit tests are great for this
		- to make isolation faster, use binary search
		- use comments, logging, debugger etc
		- if you can't find anything, expand and then isolate again in different region
	- use all tools, like debugger, memory checker, linter etc
	- reproduce error in several ways AND find error by similar potential causes in each reproduction
	- use negative approach, by checking what isn't causing an error
	- create multiple hypotheses
	- note things to try OR that was tried
	- remember that function/class with errors, might have error again
		- as stated before
	- run old program and see if error is present
		- use binary search for locating old errors
	- look for common problems for current program OR for you
	- talk to someone
		- if can't, use Duck approach
	- take a break
	- limit time spending in "rush" debugging
		- if easy way won't work for some time, take step back and do it properly
- brute-force tips:
	- re-write/re-design from scratch
	- use picky linter rules
	- use different envs OR create a replica of user's env
- syntax error tips:
	- don't trust line numbers from compiler(who would guess`:)`)
		- if possible, try to figure-out why compiler couldn't pin-point the error
	- don't trust compiler messages

how to fix an error (this is often easy part of debugging, BUT even more important, because poor fix will lead to new errors)
- understand the problem well
	- it leads to fixing problem, NOT symptoms
		- opposite strategy will lead to unmaintainable, unpredictable and buggy code
	- don't change code randomly
- understand the program/context around the problem
- make sure that you found a real root-cause
- ALWAYS test after fixes (manually and via AQA suits)
	- all in all, just take your time to debug, don't rush it
- make changes, so it is easy to revert them via version control
	- main principle is to make 1 change at a time
- add unit test, that resembles the problem to prevent it's reappearance
- always look and fix possible similar defects

psychological problems with debugging
- people tend to see, what they expect, not the reality, thus leading to an error
	- it is important to prevent this, by turning on meticulous and critical thinker, while debugging
	- also it is important to write quality and well structured code
		- try to write and look for similar names in variable, poor syntax(ex: no brackets for conditionals)
	- try to check other problematic zones, other then you expect, THUS removing blind spot and stop been stuck

debugging tools:
- look for previous versions of source code + pay attention to diffs
	- great for new errors
- linter/compiler warnings
	- choose as pickiest level as relevant to you
	- treat warnings as errors
	- enforce same compiler settings globally
- performance profilers
- tests
- debuggers
	- also consider using some debuggers, that won't alter program performance and run on system level

#### Refactoring
Even project with best requirements and design need refactoring, because code naturally evolves AND requirements might change eventually

software evolution - every change can cause degradation OR evolution of original code base, thats why it is important to strive for fixes and changes, that will make program better
- note that changes while construction can be done easily rather then in maintenance mode
- always introduce future proof changes AND, when going to introduce some some change it is your obligation to make surrounding place cleaner, then it was before

when to refactor(change code to be more maintainable, without behavioral modifications) AKA what "code smells" need to be addressed
- code duplication
- routing is too long (or other symptoms of bad modularity)
- deep or hard to understand control structures
- poor cohesion, high coupling, poor abstractions
- too many params
- multiple responsibilities per part of code
- shotgun problem
- parallel inheritance trees
- overuse of primitive data types
- code that has little functional
- passing temp data from one place to other with no reason
- middleman with no responsibility
- encapsulation is broken
	- part of it is presence of exposed setup/clean-up code
- poor naming
- GRASP, SOLID etc principles are violated
- code that can be self-explained, BUT uses comments instead
- global variables
- code that might be reused, BUT impossible to extract in current state
- code that was added just for "future proofing"
	- it is better to keep program simple and extendable, rather then trying to predict future

what to refactor
- *this is basically coping what I have about refactoring in separate Architecture note, so read it there OR in original book ;)* 
- missing info from notes:
	- encapsulate downcasting - routine should return the most specific type of data it knows

how refactor properly
- save initial code
- keep it small
	- if you find more things to do, plan separate refactor for them
	- if you find too many things to do, consider doing re-write, rather then refactor
- make a list of steps to take OR that was taken
- use linters
- re-test
- add new tests
- always review, even for small changes
- don't change the behavior
- refactor parts you touch OR related to them
- target error-prone OR complex parts first
- separate dirty code and clean/refactored via some interface

#### Code Tuning
Performance is not a critical issue anymore, it is generally less important then readable and maintainable code, BUT it can be important for some cases
- performance consists not only from raw number, like speed, but it can also include how fast user can perform actions, how usable interface and other UX-related things
	- this means that we must prioritize UX first, then DX and only then raw performance (generally speaking)
- performance must be considered from several viewpoints:
	- requirements - solve only problems, that need to be solved
	- design - if performance is requirements, design software in performant way + state achievable+measurable goals in design
		- this way you can estimate wether your system achieves requirements, programers know what to prioritize
		- it is also important to set goals, that don't directly tackle performance, BUT help in achieving it, like: scalability, modularity etc
	- class+function implementation - consider proper algorithms & data structures to meet design requirements
	- OS interactions
	- compilation - compiler optimizations OR proper build systems is your friend
		- consider different compilers, their strengths and weaknesses
		- compiler is tuned to work with "normal" code, so avoid premature optimizations, if needed measure and then optimize
	- hardware - for in-house code it can be cheaper option to juts upgrade the machine
	- code tuning - refers to small, refactoring, changes, that have slight improvement on performance AND if done in batches will have multiplication effect in performance improvement
		- it is an art of itself, that makes you better programer, BUT it usually not the most efficient solution AND most certainly will cause DX decline
		- one way to make it effective is to profile your program AND focus on problematic spots
		- don't try to:
			- reduce number of lines
			- do weird compiler optimizations - they might break OR become less optimized after any change to compiler
			- assume that change will be beneficial - always measure, better if done in several/all environment, that code will run + with different compiler configurations
				- don't forget to measure precisely
			- optimize as you go, because:
				- you won't guess bottlenecks this way, measurements are needed
				- global optimizations can be missed
				- UX & DX will loose in priority
		- notes:
			- write correct program first

common problematic places:
- I/O or other system calls
	- to mitigate: avoid such interactions, write/use light-weight alternatives
- large memory usage, because of memory paging OR garbage collector related freezes
- interpreted languages ;)
- errors
	- ex: debugger code in production, non deallocate memory, poor DB design, polling without timeouts etc

remember: always measure each "improvement" iteratively AND revert it if there is little-to-no effect or degradation

#### How to tune code
- don't write redundant logic
	- ex: `if (i < 3 && i < 5)` 
- early break/return from loops/functions if solution is found
- order switch/case, if/else in order of most->leas frequent
- try switch/case, if/else, table look-up AND compare which is faster
- use cache
- use lazy loading, laze evaluation and similar lazy techniques
- do non-required operations outside of the loop
- combine identical loops into one
- reduce number of checks in loop, by introducing sentinel value at the end
	- sentinel value - value, that you are searching for, but it might not be present
	- basically, instead of checking if we out of bounds, if value found and if current value is searched value, we just incrementing index, while current value != to searched and outside of a loop performs check: "are we at position of originaLength + 1", if so, value not found, otherwise value at index position
	- be careful with overflows, going into infinite loops because of missing sentinel etc
- place loop with less iterations to top level and with more iterations as nested inside of it
- use cheaper operations: addition > multiplication, mult > exp, use binary operations etc
	- this can refer to using fully equivalent operations too, like: `a^2 < b^2 == a < b` 
- use cheaper types: int > float, int16 > int32, don't use JS ;) because here sometimes number becomes an object etc
- avoid multidimensional structures or any deep nesting
- avoid accessing properties/array elements OR making computations multiple times, assign needed value to variable
- index data(by adding to main data-type OR by storing them nearby)
	- index can also mean just storing any metadata, to avoid re-computations
	- when talking about nearby storage, it can be more effective to manipulate int pointers and that change data, then jungling with large objects
- pre-compute known values OR just any results in general(in form of look-up table, for example)
	- also look for breaking calculation into parts and extract only one part, this is still beneficial
	- you can even add build step that computes smth and put's it into code dynamically
		- just an idea, generally it is painful to work with it ;)
- use simpler routines to compute value
	- this way you loose precision, BUT it can be valid tradeoff for some cases
- avoid type cohesions(especially runtime)
- instead of calling routine, inline it(in modern times have little to no sense)
- consider recoding problematic places in faster/low-level language and hook into it
	- note: write, test in general, test performance in high-level AND only then ***consider*** doing a re-write
	- as starting pointe, compile code into lower language and optimize from there

#### Size and construction
Projects can't be scaled linearly, because any increase in size leads to more problems(number of errors, communication problems etc), more preparation and more steps, that need to be taken
- BUT, this also means, that smaller projects don't require all "steps", that large one, so you can move faster

number of communication paths grows multiplicatively, proportionally to the square root of participants in project (from network theory), SO people management and communication network reduction is required
- fixing this, avoids communication errors and time-overhead
- how-to-fix: documentation, management layers

with size increase single programer contributes less to overall value, thus organization takes important role in success of project

grows of project leads to additional activities, which lead to decrease in construction time, because documentation, architecture and design takes the lead, BUT construction isn't loosing overall quality ;)

rofly we can describe such sizes:
- program - some program, that is manly used by it's developer only
- product - some program, that is widely used
- system product - group of products, that interact
- \---
- if developer has more experience working with program, he won't properly estimate product, because size change results in non-proportional time required change
	- to mitigate such errors, account that:
		- construction will take proportionally more time
		- other activities will non-proportionally take more time
		- final product will require more polishing, that large it's size

overall, carefully choose what methodologies you need to enforce, to keep development fast, but successful
- usually try starting small and then scale-up

#### Managing construction
Managing is hard, been managed is not easier, it is important to understand how to do it and why something the way it is

###### Setting standards
> Programmers tend to view managers as being at a lower level of technical evolution

- as quote implies, well respected architect OR just senior person with enough knowledge should set standards, so team of programers will stick to them
- standards are important thing in achieving quality
- choose what is best suited: strict rules, flexible guidelines, suggestions, examples
- to force standards:
	- pair programing
	- code reviews
		- it is important to include senior programer in this process, at least for important changes
	- mentorship
	- reward improvements
		- reward only worthy improvements
		- reward must be desired
	- hire people, with proper values
	- find inspiration in methodologies(Agile, Extreme Programing etc) OR in outside experience(other companies, OpenSource)

###### Managing changes
- don't assign multiple tasks per one chunk of code to avoid merge conflicts
- keep an eye on what is in-development
	- it will remove problems, when feature is developed and thrown away, because requirements/landscape has changed, BUT it wasn't aborted in-time
	- it will make movement towards final goal smoother and easier
- !!! don't micro-manage !!!
- enforce systematic changes via processes
	- collect changes into batches, evaluate and estimate and prioritize each change, do them systematically
		- don't implement changes as you go, because you might do easier and less important once
		- "estimate" part is important, must be done properly and clearly communicated, because fast estimates lead to bad changes
	- no process leads to missing terms, wrong planning estimates and poor product quality, BUT too much process will slow down development
- remember, large change often equal design/requirements flaw, so they need to be re-done first
- use CI/CD + version control to keep steady and proper flow of changes
	- also standardize build tools and configurations(including creating standard version of system, that can be loaded from image into each dev's machine)
- back-up
	- don't leave valuable data as one copy, even if it is in cloud
	- test your back-ups
	- archive and preserve historical data

###### Estimating & Scheduling
Estimate, think twice, re-estimate, add room for an error

general approaches:
- use software & algorithms
- have outside expert
- held estimate walk-through meeting
- decompose large parts to smaller peaces, so it is easier to estimate them
- consider estimations from each team member
	- especially from owners
- use historical data & knowledge

notes:
- always consider optimistic and pessimistic variants
- always define how specific you need to be
- always add room for an error
- always consider vacations and other non-related activities
- there are many factors, that influence how close final result and estimation will be, as example: team motivation :/

flow:
- establish general objectives
- plan free time for estimation process
- define requirements
	- pre-planning meeting may be required to do research on requirements
- estimate at low details level
- use different approaches, compare results, choose the most appropriate
- re-visit and update your estimates
	- this also will provide some control, so you will have higher chance of meeting estimates

how to catch-up:
- increase time
- don't just hope
- expand the team
	- be careful, because you current team need to spend time onboarding newcomers + larger team == more complexity, HOWEVER, if project is decomposed enough, this may be pretty good solution
- reduce the scope
	- works great, if you have prioritized what needs to be done, on estimation step

###### Measurements
Always measure, some data is better then no data, BUT it must be at least somewhat good and useful
- refine how you measure over time
- make quantifiable measures
- remember that people will focus more, on what's measured
- some measurements can't lead to concrete decisions(ex: number of params in function), BUT they can reveal outliners
- use tooling for measuring and analyzing
- keep measurements standardized
- start small and gradually expand data, that you are measuring
- set goals on what and why you are measuring

###### Treat programers as people
Software development is intense process, which need to be balanced by different things, to keep workers happy

notes:
- not all person's time spent on technical OR even project related activities
- small amount of people will produce the most result
	- this is true for all professions
	- this partially comes from the fact, that difference in productivity, knowledge etc can be an order of magnitude between people
	- this also represented in team efficiency, because good people cluster together
	- \---
	- overall, if it is possible to higher more expensive and professional person, it is better to do so
- people will always have "religious issues"
	- issues: IDE & utils, programing languages, naming, style, readability vs speed, practices etc
	- if you need to enforce smth try:
		- be gentle
		- enforce via guidelines, not strictly
		- enforce via tooling
			- ex: developer writes code like he wants, BUT is still will be formatter
		- explain whys
		- enforce via making it beneficial to individual person
		- ---
		- generally try avoiding enforcing anythings non-important and focus on important stuff
- make physical office a great place to be in
	- ESPECIALLY IF YOU ARE FORCING OFFLINE-ONLY
	- this results in emotional and productivity boost(from statistics and personal evaluation)

###### Managing your manager
When dealing with non-technical managers, it is important to do self-management, BUT in a way, that it comes from manager, that can be done:
- plant an ideas on what you want to do
- educate manager on what is the right way to do things
	- it implies refusing to work in different way
- don't destruct manager with implementation details, only with results
- quit ;)

#### Integration
Process of combining several pieces(small and large) of program/system together

in general - keep your program "stable" on each development step, ideally it should work, so it makes process and path clearer
- it is often performed in-between of testing an system testing

types:
- phased - integrate all at once
	- develop and test all classes -> integrate all classes -> test whole system
	- problems:
		- more error prone
		- harder to debug
		- possibility of classes not combining
	- benefits:
		- fast(great for small scale changes/programs)
- incremental - integrate program in chunks
	- develop and test system core -> (develop and test the chunk -> integrate chunk -> test integrated chunk) repeatable
	- benefits:
		- steady growth
		- easier to iterate
		- easier to debug
			- errors is easier to locate
			- errors aren't combined
		- clear path of development
		- clear progress
		- moral boost :)
		- testing done more in-depth
		- work can be done in parallel

strategies - some strategies can be not optimal for some projects
- plan order - some components will depend on other, so proper order is key
- top to bottom - write from top to bottom, stubbing the dependencies and changing stubs to real functional, when it's ready
	- requirements:
		- interfaces that specified in details
	- benefits:
		- design problems are exposed early
		- creates visible work early
		- no need to wait for detailed design to begin
	- problems:
		- pure approach leads to low-level problems to bubble up and affect higher level systems
			- pay more attention at design and requirements steps
		- slow, because stubs need to be developed too
		- stubs will be a source of errors
		- rigid
			- breaking system to chunks AND doing each chunk top->bottom will be a better way (vertical-slice approach)
		- some systems can have no defined "top"
- bottom to top - write from bottom to top
	- testing can be done with drivers, code can be ran via scaffolds, both of which can be replaced with actual implementation later 
	- benefits:
		- easier to find problems with interfaces
	- problems:
		- higher-level details can be discovered at last stages
		- higher-level integration will be done at last stage, which can be generally harder to do, so more risks
		- whole design must be done upfront, otherwise encapsulation will be broken
		- \---
		- slicing can mitigate this problems
- sandwich - less rigid way, where you implement top level first, then go to bottom and then work with middle
	- benefits:
		- less rigid
		- less stubs required
- risk-oriented - hard parts first
	- benefits:
		- you can see early if project is possible or going in right direction
- feature-oriented - system is sliced into features
	- usually done from base features first
	- benefits:
		- little to no stubs, if features are independent
		- easier to track progress
		- software can be released with missing features, if needed
		- great to work with OOP
	- problems:
		- large features will have less advantages of incremental integration
			- recursive incremental integration can be done
- t-shape - do top level, select main slice and do top-bottom, do the rest
	- benefits:
		- easier to find design problems

daily build + smoke testing - merge changes as soon as possible, to keep system stable and reliable(ensures by testing)
- benefits:
	- easy to locate problems
	- program is always stable
	- highlights unknown unknowns
- notes:
	- enforce fixing broken merges as soon as possible (it should be strict, BUT flexible at the same time)
	- tests can be not complete, BUT at least somewhat valuable
		- they must evolve too
	- automate this process
	- it make time of one+ person to keep such builds stable
	- code need to be tested, before merge
	- don't stop this practice, even if there is a time pressure

#### Tooling in general
- design tools
	- commonly UML based
	- some can generate code or do other fancy things
- coding tools
	- IDE and text editor
	- multi-file editing and search replacement
		- ex: grep + regex
	- diffing between version of file
	- version control system
	- prettier
	- auto-docs
		- ex: JSdoc
	- templates
	- cross-reference
	- class-hierarchy visualizer
	- linters
	- metrics generator
		- ex: test coverage
	- refactorers:
		- refactoring tools, ex: multi-rename
		- fast actions, ex: wrap with function etc
		- translators from one lang to other
- knowledge sharing(internal wiki)
- code manipulators:
	- compiler, linker, builder
		- it is nice if builder can have caching system as optimization step, BUT it may be less performant for some cases
		- builder can emulate pre-processing(but it shouldn't for the most part)
	- libs
	- code generators:
		- CRUD builders
		- AI
	- pre-processing
	- assembly generators
		- > A first exposure to assembler is often a loss of innocence
- debugging
- testing
- profilers
- tooling sets(ex: UNIX)
- custom tools
	- creating custom tools is common thing programers do, and so companies tend to do also
	- often it leads to software that needs more resources to be supported, BUT it is superior and cheaper, than other variants
	- ex: project specific tooling, scripts, tuned version of available tooling

new tools make developers move faster, BUT never remove need for devs
> screw you ChatGPT ;)
- note that every new tooling wave changes programing to unrecognizable state, BUT never killed it
	- reason been, that real world is messy and hard, thus we need translators, that can communicate real problem to machine

## Craftsmanship
#### Layout & Style
This topic discusses code beauty, aspect that doesn't effect code execution, BUT can improve read-ability and maintainability
- it is pretty subjective topic ;)
- this is part of "attention to details", that is important to do at the start AND will be hard to re-do later

key point to good layout is laying down the code structure via spaces and indentation
- it is done for humans, who would read your code in future and not for computers, that can interpret any syntax-correct code
	- consistent structure makes brain understand code easier overall, thus some details aren't so important(like brackets positioning) over overall consistency
		- be openminded in general :)

good styles must be:
- identify the structure of code
- be consistent
- be readable
- modification of one line shouldn't trigger multi-line modifications
	- this is main reason why you should avoid "pretty" layouts, then add indentations to align comments, switch/cases etc
- it is a benefit, if layout requires less lines to do smth

techniques:
- whitespaces
	- grouping - keep relevant chunk of code, that represents one "thought" together
		- this also opens more space for comments, that can describe group, if needed
	- blank lines - way to break groups
	- indentation - statements, that subordinate to other statements, should be have `indentation + 1` 
		- more then 4 indentations lowers readability
	- spaces - add them to show logical structure of expression OR just make it easier to read
- parentheses - use as much as needed, to avoid any uncertainties
- format single statement blocks consistently with other blocks, using brackets
	- while it is possible to avoid them, it makes such code harder to stop via debugger, change or copy paste
- break long expressions into multiple lines
	- one place, where JS beats GO ;)
- formatting goto
	- don't use them :)
	- to make labels more visible
		- write them in caps
		- add additional blanc lines and indentations around them
	- to make `goto` more visible
		- place it on separate line
- don't be scared of breaking 80-char length of a row if it helps readability, BUT remember that long lines is harder to read by default and adding breaks with help reducing deep nesting(at some point there is not enough space)
	- to break long statements do:
		- signify that statement is incomplete
			- ex: `const a = b && \n c` or `const a = b \n && c` 
			- first example makes code modification error prone, while second makes stacking of expressions easier
		- keep relevant things as close as possible
			- ex: calling a function and passing an arguments
		- add indentations to signify grouping
		- note: for long statements it is ok to go one line per statement approach
- avoid multiple statements per one line
	- because:
		- it is more standard way in general (the more standard a thing, the easier is to parse it)
		- you don't need to parse code horizontally + vertically
		- compiler hints and debugger break-points won't work
		- such code easier to edit
	- this also implies to using multiple side effects per line(ex: `fun(++a)`), because it is harder to understand AND different compilers can process this in different order
	- also implies to one declaration per line
		- add some logical ordering to variable declaration groups, if groups is relatively big
- create conventions for representing class
	- possible variation: global comment, constructor/destructor, public-protected-private data, public-protected-private methods
- if one routine uses other place them in a way, that code can be read top->bottom
	- if possible from language perspective
- separate large groups of code clearly
	- even better to use separate files, where each file is some module, often a treated as single class
- working with files
	- name file same as class it contains
	- create conventions for file structure and stick to it
		- possible variation: global comment, imports, constant definitions, macros, types, global variables, exported parts, non-exported parts
- groups logically related code together

#### Self-Documenting Code
Documentation is important part of construction, BUT it must have reasonable requirements AND can be done in different ways

- external - docs, that been kept separate from the code
	- often somethings high-level
	- variations:
		- Unit Development Folder - internal docs, that developer writes to provide design decisions, that he has chosen, over the course of construction
			- note that this decisions aren't documented elsewhere clearly
		- Detailed Design Document - broad documentation, that includes low level design in routine/class levels
			- can be done as collection of several UDFs OR all in-code comments OR collection of REAMEs OR it can be strict document
- internal - docs, that kept inside the code, often can be code itself
	- the most up-to-date and change resilient
	- can be done as comments, as self-documented code etc
	- *when to comment?* 
		- avoid comments, that duplicate OR explain code
		- good comment clarify code in high-level and abstract way
			- BUT don't use comments as a way to "save" bad code, rewrite it ;)
				- still, comment any tricky parts, that can't be rewritten
		- good comment explain all the WHYs and bring justification to made decisions
		- comments must be kept up-to date
		- notes/TODOs are ok, BUT better be backed-up by some tasks or global intent
	- types of comments:
		- code repetition - bad, because it do nothing good
		- explanation comment - bad, because we should refactor, rather then "save" the code
		- markers - note from dev that work isn't done
			- can be done via:
				- breaking the linter/compiler in specific place
				- adding specific characters to search for
			- general recommendations is to use specific characters, that is easy to search company-wide + back-up comments with tasks
		- summary - good enough as way to make reading faster, BUT will confuse people, if left outdated
		- description - great, because it is easy to find an intent of author AND answer all the "WHYs"
		- info that related to code - can't be expressed with the code, but related, so it is ok to keep it
			- ex: links, copyright info, JSDocs, references etc
	- how to comment:
		- keep comment style simple enough
			- it must be easy to change
			- it must be consistent
			- it must not consume too much time
			- nice examples: use `//` for short stuff and `/**/` for long stuff
		- understand your code fully, before commenting
		- re-use pseudocode
		- comment as you go
		- don't forget to strip comments from release version, for non-compiled languages ;)
	- techniques:
		- single-line
			- comment if line is hard
			- comment if you need to know important info for future, like possible errors etc
			- avoid comments at the end of the line
				- reasoning:
					- it is harder to read and maintain
					- it is often not much to explain in single line
					- it is impossible to make it long
				- exceptions:
					- data declarations
					- end of a block
			- avoid end-line comment for multiple lines
		- paragraphs:
			- keep a comment at a hight level, describe intent(why) and make it possible to summarize a comment into a function name
		- data declaration:
			- comments for declared data can describe specifics, that name of var can't describe
			- don't comment units, embed them into var name
			- it is reasonable to comment allowed range of value, BUT it is even better to create getter/setter, that will control such range
			- don't comment on limitations of data, assert them
			- comment bit meaning, when working with bit data
		- control structures:
			- comment can explain purpose of control structure
			- you might add comments, that clarify what bracket closes what control structure, to make nesting read easier
				- BUT, it is often a clear sign of complex code, that NEED to be simplified
		- commenting routines:
			- as for other guidelines, keep header comments simple, otherwise devs won't create small routines, making code worse
			- it is better to describe routine in general AND put details as close to actual code as possible
			- add comments for parameters, BUT try to make params understandable in first place
				- things like JSdoc is great alternative to just comments, because it is standardized way of creating documentation in code
				- specify any uncertainties about each param, like: data limits, can it be mutated, assumptions, precision etc
			- comment any changes to global data by routine
			- refer source or algorithm, if it is complex
			- re-use common keywords from JSdoc, like `@param`, `@throws` etc
		- classes:
			- in general, comment should provide overview of class
				- it can be smth similar to routines, like limitation etc
				- it can be some design notes
			- don't comment about innerworkings in top comment, this breaks encapsulation
				- if needed, place such comments near respective private routines
		- general:
			- don't comment for sake of it
			- use comment to prepare the reader
				- the main reason why we tend to place comments before the code
			- avoid abbreviations
			- establish structure(ex: main comment, subordinate comment) via indentations if needed

#### Personal Character
Programing is pure mental activity, so code is resemblance of author(individual OR team), thats why character has important role on final product

> It is matter of personal character to be good in programing, that can't be externally forced

been good isn't fully determined by intelligence, nobody can fully comprehend software, so it is important to keep everything as simple as possible, to work around our "monkey brain"
- use conventions
- reduce mental load
- keep routines shorts
- operate on domain, rather then implementation details
- use cooperative programing techniques

stay curious:
- know and learn your tools
- stay aware of new tech
- stay aware of how to build process
- learn new things through building small apps
- prototype and plan beforehand
- lear how to solve problems
- study high-level design of other project (basically lear from other's experience)
- ask other's to review your design and code with advises
- read the docs, the books, the everything
	- reading the docs and searching for new tools allows to not re-invent the wheel
	- > Pat yourself on the back for reading this book.
- join communities
- always develop
	- it is ok to be a beginner, it is a sign not to learn and grow

be hones with yourself:
- admit that you don't know everything
- understand the problem and program
- admit the problem
- provide realistic reports and estimates
	- it is not healthy for the project to say what manager wants to hear
	- it is your job to bring correct estimates AND sell your ideas to management, BUT it is their work to decide is it worth the cost

communicate with other programmer well, it include:
- writing understandable and maintainable code
- knowledge sharing
- proper reviews
- communication in general

discipline:
- any large project requires docs, guidelines and discipline in general
- establish conventions for things that don't matter AND be creative in areas that matter the most

laziness:
- it can be manifested via:
	- deferring unpleasant - generally bad and not beneficial
	- doing unpleasant as fast as possible - good and makes your efficient, can be achieved by decomposing large unpleasant to smaller, more manageable once
	- automating unpleasant - the most effective type, BUT don't automate smth, that won't give you time benefit, you will spend more time on automation
- if someone looks busy, he might just do hustling(a-lot of purposeless motion), but not really been productive, look for it and avoid

smth that doesn't matter much:
- hustle
- persistence - it can be good, but also can be bad
	- it is bad when:
		- you stuck on smth and don't want to try another approach
		- you keep debugging, when it is better to set-out and have some rest
		- overall, take break, if you fill frustrated
- experience - experience is good, BUT if you don't learn anything new, you will become out-dated in fast programing world
	- overall, relying on past experience is beneficial, BUT only for some extend
	- try been objective
	- don't feel as you earn that status and can stop developing
- gonzo programming - recipe for failure, because your mental state decline rapidly, without rest, thus quality of your output