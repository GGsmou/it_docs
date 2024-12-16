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
