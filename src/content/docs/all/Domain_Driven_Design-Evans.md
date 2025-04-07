---
title: Notes of "Domain Driven Design" by Evans
---
*notes of "Domain Driven Design" by Evans* 

## Crunching the Knowledge
Understanding specialized domain, without prior knowledge(or even with it) is hard AND just "sit with expert and listen his explanations" won't do, because:
- you won't grasp it all in small time-frame
- you will get too many irrelevant details
- expert might not be good teacher

To crunch knowledge you need to build an effective model of domain, you are working at, that can be done via this steps:
- bind abstract model and implementation - do early prototyping
- create common language
	- minimal explaining of details might be needed(from developer too, like what is class-diagram etc)
	- this will be used in communication later
- model must be knowledge-reach - each object has rules, specific behavior, it is not just data-scheme
- distill model - when concept is important, BUT not relevant at the moment - drop it
- brainstorm & experiment - brainstorming is fast and effective way of creating and refining model
- \---
- basically, to crunch knowledge you combine discipline(create common lang) and experimentation(brainstorming) and turn it into some prototype, that can be distilled and refined

main goals:
- create abstract enough model
	- all in all, creating abstractions is key
- choose the simplest model
- keep model rich with knowledge, BUT understandable and easy

you gain knowledge from: docs, users, domain experts, previous devs etc
- while gaining new knowledge it is important to refine old one
- feedback, refinement and communication - ways to make crunching more effective
- if programer doesn't understand the domain, he can't be creative in his work, only do the requests AND refactor the code
	- you often see, that programer will create custom model to do tasks, BUT it will be only partially connected to domain model

with proper model team will gain:
- common language
- knowledge to refine model by themself

#### Continues learning
It is important to learn, stay curious AND avoid making assumptions constantly, not only in your specialty, but also in such practices like domain development(theme of the book) AND in domain of your company

to avoid knowledge been lost, write docs
- also remember, that code must represent(usually placed somewhere Domain part of an app) such knowledge/insights AND not be hidden
	- one way to achieve this is to use Strategy pattern, that will inject needed knowledge into needed place and make it clear
		- in DDD such use of Strategy is called Policy, ex: `OverbookingPolicy` 

notes:
- even if feature discontinued, used model can be distilled and refined to be used in other parts of general domain
- process of knowledge crunching will lead to overall model refinement AND gaining new insights by experts too
- ideally, when speaking about abstract parts of code, it should be possible to read them by domain expert too
- be open to any outcome, meaning, final view of the model might be not what you expect

## Communication & Language
As said, model must have entities, with some relationships, constraints and functionalities. Such entities should be described with language, which can be represented via UML, verbal communication, docs, code etc
- it is important, because otherwise devs won't be able to communicate properly with domain experts
	- don't try to find "translators", because:
		- they will become bottleneck
		- knowledge will be fragmented OR people will use same term with different meanings
		- such translation won't be exact
	- if language isn't established and used, even one person would produce different results(ex: when talking / when writing code)

proper language includes:
- classes
- operations
- rules
- context
- patterns

be careful with:
- jargons OR contradictions, it is impossible to include into language
- small features in code, they may be also a part of the model
- \---
- this weak places will be tackled with time, making language reacher AND model more relevant, thus:
	- always use the language
	- refine the language AND model
		- don't forget to refactor code, rename things in docs etc
	- resolve confusion

notes:
- language is not artifact of design, it is core in all work been done
- always speak in this language, not only use nouns
	- if it is hard to do so - refine
	- look for communication to be simple, concise AND in boundaries of lang+model
	- aim to become fluent in language
- it is often necessary to have extension/dialect to common language, that will be used by devs or user or domain experts to discuss specific parts, related to their work
	- such dialects can't have overlapping worlds OR contradictions, see them as extensions
- it is easier to discuss something, with visual AID, thus creating UML diagrams is a great way of receiving additional focus
	- remember, that UML can show object schemas, relationships AND interactions between them, BUT they can't cover conceptual info, full picture of their interaction or other tricky details, that should be documented OR communicated out-loud OR inserted into UML as plain text
		- basically, UML can't cover meaning of object AND what it is intended to do
	- don't try to use UML diagrams as code generators, their intended purpose is to explain
	- don't try to use UML as concrete specification, it will be too much to handle in such format
	- in general, you can write text, supplemented with simplified diagrams, not other way
- creating good docs is hard, but needed, to keep with scale of your company, thus such good docs must:
	- complement code an speech
		- it doesn't need to have details, that duplicate those already present in code
		- code is great documentation, BUT can't communicate broad picture, only details
	- be kept as much in sync with reality as possible
		- it is ok to keep archived docs outdated, BUT always update active
	- use established language
- good code = self-descriptive code
	- good code must not only do the right thing, BUT also say the right thing(via method/var names etc)
	- always incorporate established language in code

#### Explanatory models
Design, communication and implementation must rely on same model, BUT you can have alternative model of same domain, that will be a base for education
- such Explanatory Model don't need to be bound to SoftwareEngineering, it can have more details, that aren't needed in distilled view of domain
	- note, both models derive from same domain, BUT have different purposes, thus view domain a bit differently AND such difference must be always remembered
- it's main goal is to teach people about domain

## Binding Model and Implementation
In DDD, general model should not only be rich, abstract and simple, it also must be bound to implementation(serve as a guide to it), otherwise you will always invent second, ad-hoc design, that will be used only for development, won't be complete and will be hard to maintain
- overall, relate code and model as much as possible, thus model will be relevant AND code easily adoptable to the model
	- as stated before, incorporating implementation into the development of general model will make such model more complete
	- creating two models will always lead to translation, communication issues, will be cost ineffective AND relevant details will be lost in a process
- it is hard to live without model, when working in complex domain
- main goal of expert is to capture fundamental concepts in comprehensive manner AND for developer to establish design, that specifies components, that will be used to effectively solve established problems, using established concepts
- \---
- all of this describes Model-Driven Design, that establishes the need for model to reflect not only domain, but serve as a guide of writing design for future software
	- try to design portion with existing model, if it is hard - revisit original model
	- always use common language
	- don't forget to change model, when code is changed AND vise-versa
	- OOP has a great role in supporting MDD, because you can easily express objects and their relationships directly in code, thus easily bounding model with implementation
		- it is often hard to express non-math domains in Procedural or FP styles. It is possible, but it can be more problematic to scale, than in OOP paradigm

MDD states, that UserModel must align with general model too, to avoid bad UX, user confusion AND additional need for mapping
- by revealing underlying model to user, you can make application more predictable and consistent

you can't separate modeling and coding:
- if expert don't care OR don't communicate with dev, model won't be able to be bounded to implementation, thus dev will reinvent it
- it is ok to have specific roles on your project, BUT they can't be isolated
	- if you are a code - spent some time learning the model AND fill free to contribute to it
	- if you are an expert - spent some time learning how to make your model implementable
	- overall, defining specific roles is key for scaling, but this roles must be defined in such way, so they can effectively coordinate high-level decisions

## Isolating the Domain
When developing software it is important to keep Domain separate from other functions of system(often related to software engineering)
- this enables us to work with domain separately(so it is easier to sync with Model) AND prevents any SoftwareEngineering related details to leak into domain

#### Layered Architecture
Main idea behind Layered Architecture is to separate your app into layers, where each layer has specific function bound to it(Domain, Architecture, UI etc)
- for idea to work it is important not to mix logic between the layers, OTHERWISE change in UI logic may change how domain behaves
- it is easier to understand such programs on scale
- testing, maintenance and making moves like monolith -> microservices are easier
- separation of concerns is base for layered architecture
- element of layer can know about elements under it OR on the same layer, upwards interactions must be done indirectly
- from DDD perspective Domain is fully represents Model AND can't know any details, like: how it is visualized, how it is stored, how network works etc

connecting layers - layers must interact, BUT still be loosely coupled
- for DDD any approach, such as MVC, observer, callbacks, Mediator etc is ok, if system is decoupled
- Architecture layer can be represented as:
	- set of services, where we achieve loosely coupled interaction via abstract interface AND hiding implementation details
		- consumer don't need to know how
	- framework, with set of rules
		- be careful when choosing restrictive frameworks, because it always will influence the Domain part of an app AND such influence may be restrictive

DDD and Layered Architecture
- there are many ways to build layers, BUT there must be one, often called Domain, that represents Model fully, so DDD is achieved

notes:
- DDD + Layered Architecture is hard pass, that require skill, effort AND might be overkill for something fast AND simple, BUT, when building for scale AND time, it is only choice
	- you shouldn't, BUT you can choose the route of SMART UI, where you mix business logic and UI together, use DB directly, as shared storage AND include as much automation in constructing UI as possible
		- this will be hard to maintain, extend etc etc, BUT it is great way to prototype smth, try new ideas etc

## Expressing Model in a Software
It is easy to draw connection between parts of a model, BUT you need to know patterns to mimic such connections in code, without creating de-sync between implementation AND Model
- pain points:
	- how to differ between object with deep meaning FROM object that used as attribute or to track state
	- where to put some behavior, that need to be done, but doesn't correspond with state
	- when to compromise purity of the model
	- how modularize your app AND keep it relative to Model

#### Associations
Design must specify how software implements association, that stated in Model, it can be:
- DB lookup
- pointer to object
- collection of object
- etc

Often associations are messy, many-to-many, bi-directional, BUT it is hard to not only implement them, it is also hard for understanding, thus it is important to simplify them
- ex with countr and president, where, for simplification, Model can be distilled to assume:
	- bi-directional relationship -> Country -> President, because it is most important of two
	- one-many -> one-one, because it is rare case, when country has multiple presidents AND it is not important for our Modal to account for that 
		- period need to be included, so we could keep historical data
- if relation is no important - remove it

#### Entities
Entity is a form of object, that can't be represented by attributes, BUT by some identity
- Entity's implementation, attributes and other characteristics may differ, BUT both objects must be somehow matched OR don't matched(if it is different entities with similar attributes)
	- wrong match OR mismatch is way to data-corruption
- main characteristic of an Entity is that it has life-cycle, in scope of with it transforms it's shape AND attributes, so it need to be put in Model in such a way, so it could maintain identity
- examples:
	- sending money via check OR by an bank app will result in creation of transactions, such transactions can be even of different types, BUT they must be matchable
- so what?
	- if you have an Entity in a Model, model must define uniq way to identify each entity, SO it could be implemented in software in form of uniq, immutable ID, that used to match
- notes:
	- in Software Engineering you can say that all objects are Entities, because basically we make a copy from DB into server's memory, that same "Entity" is passed to client, mappings and attribute transformations are done in process, BUT it is implementation detail of how data moves, meaning of Entity is separately defined in DDD
	- not all objects are Entities, if object doesn't need to have identity, it can be treated as just some object with attributes, used in some way

###### Modeling Entities
main ideas behind modeling:
- establish identity of entity
- add only required behavior
	- common behavior is coordination of related objects
- add attributes, that required for behavior
- look for duplication in behavior/attributes inside other entities
	- remove the duplicates OR move corresponding behavior to entity that owns it
- Entity must have a way to identify it
	- it is often some id attribute OR combination of attributes, that uniq within the system
	- if you choose ID route
		- remember that id must be: uniq, immutable
		- you need to add possibility for user to distinguish between to similar objects, for example by showing additional attributes
			- this comes from the fact, that ID often meaningless AND user shouldn't know it
				- exception is reservation system, package delivery etc, where user can track something by this ID
		- sometimes you can use external ID, for example hospitals can identify clients by passport number, so records can be exchanged between facilities
			- if you user something less stable, like phone number of user, it is important to provide some fallback ID OR additional attributes, like name, address etc, that will prevent collision

#### Value Object
Value object is an object, that has no meaning, it is main purpose to hold some characteristics of a thing, that can be shared AND used by Model
- note: some frameworks AND systems force usage of ID, but in context of DDD it is redundant actions for ValueObject, so it is overall redundant overhead(performance issues, ID management etc)
	- why overhead is bad? because reducing complexity is main goal of software engineering

address example:
- address is a value object, if you drop-shipping goods, because it is just characteristic, associated with user OR order
- address is entity, if you are a postal office, because you can change attributes, but zip codes hierarchy must be maintained overtime
- in summary, it depends on how you treat an address, a thing on itself OR some characteristic, associated with some other Entity

notes:
- ValueObject can be simple OR complex
- ValueObject can have rules, linked to it
	- ex: how mix colors in a system
- ValueObject can be referenced by Entity OR it can reference it
- ValueObject often used as some parameter, that created, used and discarded
- ValueObject must have some meaning
	- ex: Address -> city+zip+country
- ValueObject is immutable

design:
- we don't care about identity, so ValueObject is great tool for simplification, performance improvement etc
	- example with performance: don't assign uniq Currency object to each Order, reference needed Currency from some kind of store, so you only need to maintain pointer (Flyweight pattern)
- when to share objects, instead of creation:
	- saving disk space
	- you have a monolith, so additional network overhead is absent
	- when objects can't be mutated
- when to make objects mutable:
	- object changes frequently
	- it is expensive to create/delete
	- you have distributed system
	- values are shared infrequently
- notes:
	- if language can't support some concept from DDD, work around language, it is often more beneficial, that stick to only things that are offered
	- leave question of mutable/immutable free to choose by dev at design stage, don't bring code specific things to model
	- there is interesting tradeoff between disk space AND access speed
		- if you prioritize disk space: store objects by references
		- if you prioritize access speed: use denormalization, where you store copies of same data as close to referencer as possible
- associations:
	- keep them uni-directional
	- keep associations as simple and as low count as possible

#### Services
Service is standalone interface, that used to perform some manipulations with Entities of Values AND doesn't have it's own state
- why we need it? because creating unnecessary objects OR putting unrelated behavior onto existing objects will make Model and understanding of it harder, because we need to deal with unrelated functional, unneeded dependencies are introduced etc
- service can have side-effect, BUT not state
- it is associated with some activity AND named after it
	- naming must come from Language
- it must have responsibility, defined interface and other strictness, than implied to objects
	- interface must use existing objects
	- note, that it can't strip behavior from existing objects
- don't mix DDD's Service, that is part of Model(Domain layer), with Services that are used in Application, Infrastructure or other layer layers
	- notes:
		- Domain can't no anything about other layers, so Facade or just additional mapping need to be established for proper communication
		- such Domain Services are great place to store Model behavior, so it can be re-used OR just encapsulate and prevent leakage of knowledge into layers like Application

#### Modules
Module in DDD have similar responsibility of abstracting the details out, as it has in software engineering, BUT DDD states that Module is valid member of Model
- from DDD's perspective, you need to divide your system into modules by concepts along-side with your coding practices
- low coupling between modules AND high cohesion within is keys to good module
- modules should evolve, similar to classes
- modules must have proper naming(using the Language) AND they need to be like "chapter in a story"

refactoring modules
- modules can't be kept outdated, otherwise they won't reflect co-evolving Model

structuring modules (some frameworks may lead to pure structure, thus consider some advises)
- keep related parts as close as possible(in single class OR single module)
- don't overcomplicate things

#### Paradigms
Main paradigm that used nowadays is OPP
- why?
	- easy to grasp(if you can't understand paradigm, you won't be able to grasp the model), while been rich enough, so model AND any needed manipulations can be easily expressed with it
	- widely adopted(common best practices AND tooling is present)
		- "object" is understood even in non-tech world
- when not to use it?
	- if your domain is math, logic OR similar, where it is hard to think in terms ff objects, you should look into other places as well
		- it is ok to fit domain into paradigm, BUT it is often better to do in opposite way, by using multiple paradigms
	- remember, that model need to express paradigm too
	- when you have specific non-object infrastructure, such as SQL DB
- alternatives:
	- relational paradigm - used in SQL DB
	- rules(declarative) paradigm - write rules, that define some behavior(often how objects interact), that done in declarative manner AND complements OOP
		- rule can be done as object, BUT it may be problematic to enforce global rules this way
	- workflow paradigm - write behavior in form of steps, that executed in specific order
	- functional paradigm
- how implement paradigm:
	- domain must work together with paradigm
	- use language
	- don't restrict yourself with UML
	- always consider if paradigm worth it OR is it worth it to mix several paradigms

## Life Cycle of Domain Object
Each object has some life cycle
- exampels
	- if it is intermediate object, it will be created, used and deleted from memory
	- if it is some Entity, it needs to be created, stored and retrieved from DB, it undergoes modification, can be deleted etc
- problems
	- how maintain integrity
	- how not overcomplicate model with life cycle

#### Aggregates
Problem: imagine we have Person and related Address, when deleting Person, do we need to delete Address or not (risking deleting Address, that used by someone else OR waisting space)
- it is even more crucial in concurrent environments

note that problem can be solved on DB level, BUT it is much better if it derives from Model, that establishes clear boundaries between objects and their relations

pattern:
- aggregate is collection of object, that has boundary(what objects are inside aggregate) and root(Entity, that can be referenced from outside, WHILE other object can't AND can be accessed only within Aggregate OR through the root(ex: you can receive only copy of object))
- any operation must be performed and coordinate trough the root AND must be completed as single action
	- deleting root will remove aggregate as a whole
- everything inside aggregate must have internal identity, that uniq inside aggregate
- objects inside aggregate can manipulate and reference external roots

#### Factory
Problem: some object creation steps can reveal to much internals OR just be too complicated

pattern:
- move responsibility of creation from object itself to some helper object
	- why create Factory, when you can shift responsibility to Client(user of object)? because it will break encapsulation AND make Client an object highly coupled
	- note: calling constructor directly can be ok, BUT it couples caller to object more, that just using the factory, SO it is insufficient for some cases
- factory is great way to create complex aggregates OR ValueObjects with constraints(such as immutability) in a form of simple interface
	- by DDD it is even required as factory's responsibility, BUT it can depend on your design as well
- factory need to be abstract
- notes:
	- Factory is placed in domain layer, BUT not to the model, because it is implementation detail(no need to put it into model), that is too coupled to original object(need to be co-located as close as possible)

where to place factory:
- on the root of aggregate, so root can control it parts
- spawner object - object that don't own other object, but holds the most of creation data needed
- keep is standalone, if there is no good place

! don't use factory just because, it makes things harder and indirect, so avoid increasing complexity for no purpose !
- commonly, constructor is ok when: you have simple constructor, client have most data needed for creation, client need to know inner implementation

good factory:
- creation operation is atomic
- creation operation has consistent failure flow (invariant, return `null` etc)
	- in general, factory is great place for invariants, because it isn't required for it be result in class instance, as constructor do
	- still, if you can, you should place validations inside object (as close as possible)
- doesn't introduce unwanted coupling
	- often occurs when you introduce unrelated object as parameters, that needed in creation process

notes:
- factory for ValueObject must construct full, immutable object, while factory for EntityObject can provide only required info
	- one more difference, factory can be assigned to create IDs for new entities, BUT make it possible to provide ID too, so you could not only create "new entities", but also re-create "old entities" from existing data
		- here is one more catch, you need to somehow handle invariants, so new rules won't break old Entities

#### Repository
You need to remember, that retrieving data from DB and creating in-memory objects is basically a part of Object's life-cycle, thus it is related to DDD too
- generally there are two way to retrieve the object and their proper combination is key to successful app
	- by pointer inside other object
	- by searching via some parameters
- the main problem from DDD's perspective is blurring the domain, because some knowledge goes into query(infra layer)
	- this leads to view, where dev works with technology, not with domain

pattern:
- encapsulate actual storage technology with layer, called Repository, that basically will abstract any query OR other operations in interface, that is more domain related
- often, with some exceptions, repository is only used to work with aggregate root, because working with leafs is root's responsibility
- repository must return actual constructed objects, not plain data
- you need to have some hardcoded, common used methods + flexible query builders

benefits:
- simple, domain related, interface to work with data
- domain can be communicated via interface
- decoupling domain from infra
- easy testing

problems:
- (the biggest one) you still need to understand how things are implemented under the hood
	- it is somewhat similar to problem with ORMs

notes:
- you can leverage OOP and create single repository for different classes
- repository have optimizations built in, like cache
- keep repository client driven, don't add domain behavior to it at all
	- ex: if your app need to do "save on exit", repository might wan't to do it, but it is bad idea, because it is not his responsibility
- try to cooperate with your framework(if possible, use framework's possibilities to build Repository, BUT if framework constrains too much - discard it)

about factories:
- factories are used in two ways here:
	- repository delegates creation of objects from plain data
	- client uses factory when it needs to create new object when doing some operations
- don't combine factory and repository, it is mixing of responsibilities AND most often redundant

###### Designing Relational DB
- Ideally your DB must represent Model, BUT it may not be possible or just performant, so you need to establish clear, encapsulated somewhere(often in Repository) mappings
- DB must be accessed though one entrance, so all mappings are kept here AND variations are protected
- keep DB design as straightforward and similar to Model as possible
	- add foreign keys to show relations
	- add rules, that enforce aggregates
	- keep naming of columns same to Language
- enforce frequent migrations to keep model and DB in sync
	- if not possible, ex: you don't own DB or it is share, you always can count on mapping

## Example of creating Model bound to Implementation
*I won't note whole example, just interesting parts* 

- if you need to communicate with external system OR internal Model that is separate from your Mode, create a Service, that will protect variations, by acting as interface/translator to other model
	- when you need to receive some new type of data from this Service, wrap it in ValueObject, so it can encapsulate needed info
		- if such value object contains part of actual object present in system, it is called EnterpriceSegment, ex: Tax service need only segment of Cargo model, so Service of Tax service can create Segment from Cargo and operate with it
			- alternatively we could pass responsibility of creating TaxCargoSegment to Cargo via Strategy, but it is often unneeded overhead
	- this Service can do optimizations like caching etc, in addition to mapping(aka translation)

## Breakthrough
Iterative approach in development of Model and system in general, bound with consistent refactoring will slowly develop rich Model, without legacy and fossils
- such tiny improvements will add up to something big, BUT more important is so called Breakthrough event, that might happen
- basically a Breakthrough is some insight, that arises from deeper understanding of Model AND it is important to react to it properly

reacting properly:
- after such big discovery it is important to evaluate how much it will cost to implement AND, if implemented, will the benefits worth the cost
	- if so - do large refactoring
	- if not - think alternative way to integrate new discovery incrementally (if possible)
	- \---
	- it is a high risk refactoring, so you need to evaluate it properly

notes:
- if your model seems to "technical" for domain experts it is a clear sign, that (A) your model exposes too much implementation details, that aren't needed OR (B) your model built on wrong understanding of domain and doesn't align with it
	- or both ;)
- don't wait for breakthrough, just work on making model better and it might come AND when it comes, don't be afraid to incorporate it
- it is great way to accelerate the project and prevent drowning in complexity

## Making Implicit become Explicit
It is common change, when some implicit thing, not discovered yet, or hidden somewhere in discussions has been found and added to the model
- number of such changes may lead to breakthrough OR such change is a breakthrough

how to find changes:
- listen the language - look for cases, where you describe similar things in several distinct places, without naming them(or they can have a name, but it is not represented in the Model)
	- basically, when you don't have a name in the model for something important, that constantly brought up, it is clear thing of something missing
- remove awkwardness - if some place is complicated(hard to change, hard to explain, problematic to extend), look for implicit things hidden underneath
	- it can come from breaking large entity into smaller one
- enrich domain layer - if some important thins is floating around in some layer, it is often the thing, that this part should be moved to domain, with addition to model
- fight contradictions - expert stating contradicting thing is clear sign, that some other concept is involved, that will explain contradiction
	- alternative explanations: different experts have different understanding, you might lack some knowledge to explain contradiction, expert discovered something new and created contradiction
		- this requires not just changing implicit to explicit, BUT also crunch some knowledge
	- it is ok to have some contradictions, caused by hardness of domain
- learn - learn about your domain, thus creating strong understanding, that can become a base of your knowledge crunching and distilling sessions
	- great when there is no domain expert OR they don't have enough time
- iterate
	- don't get attached to your ideas
	- don't be afraid to make mistakes

some concepts might be tricky to implement:
- constrains - move them to separate method, that placed onto object, so it is clearly a part of domain, can be re-used and changed with little to no refactor
	- embraces separation of concerns
	- give methods clear names
	- note, placing method into the object might not always work
		- ex: external data needed, similar constraint is present elsewhere, it is huge part of design that needs to be represented more clearly
- process as object - you don't need to create object, that will hold no data, but do something, it is redundant
	- ways to mitigate: use service instead of separate object, create a number of objects(Strategies) that can be consumed in some way
	- note that we need to include service/strategy as part of the model only if it relevant to domain, not implementation
- specifications - extract complex conditionals from object into Specification, so it can be clearly stated in the model and used as part of domain layer
	- Specification is special purpose ValueObject, that based on Predicate patterns and perform needed check for input, that can be any object in a system
		- Predicate function is function, that accepts input and returns `boolean` evaluation to check if criteria is satisfied
	- use-cases: validation, selection, invariant for creation step
	- notes:
		- this is also great way to define interface that can be mocked, so tests are easier OR/AND development can be run in parallel
		- consider creating some basic implementation, that will provide a way to perform AND, OR, NOT, transitivity check(often pretty difficult operation to perform, so use only when really needed) with specifications, so it is easy to combine them
			- all in all, it is ok to extend basic functionality, if it is not overcomplicates interface AND truly needed by your system

## Supple Design
Good model is only part of good software, another part is design, that is pleasant to work with and iterate upon
- with bad design, code will degrade fast, because it is harder to refactor such programs
- aim for simplicity, don't overengineer OR overabstract
- good design must:
	- provide rich set of capabilities, so it is easy to express model
	- keep this capabilities easy to understand AND safe to change, so refactoring OR changes in model could be reflected

#### Patterns
Good design utilizes number of pattern, here are some of them

###### Intention-Revealing Interface
To fight cognitive load we need to abstract details, that can be done by encapsulation, BUT if interface is unclear, client will need to check internals, thus all encapsulation lost
- this results in need for good and proper interfaces(class, method, variable, argument names)
- communicate purpose and effect through interface
- don't reveal internals in the name
- use Language when choosing a name
- everything, from single class to sub-domain should be hidden behind proper interface

###### Side-Effect-Free Methods
Methods are divided onto two categories:
- query - obtain info about the system AKA return some data
- command/modifier  - change system state AKA modify some data

Each category have different relationship with side-effect:
- query - can't have any, main purpose is to get data, without worrying of changing something
- command - can't have too much side-effects, so it is easy to work with it AND it is easy to understand what will happen after call to command

notes:
- ValueObject is great way to reduce complexity, because some state changes can be omitted in favor of using immutable ValueObjects(often can be seen as result of some computation)
- keep strict segregation of query and command
	- query can't have modifications in it
	- command can't return data (exception: command can return result of modification)

###### Assertions
Main goal for good assertion is to make side-effect clear and explicit
- basically assertion is part of interface/contract, that need to be satisfied, in order for operation to succeed
- you should not only assert pre-conditions, but also result of operation
- assertions can be state inside model too
- if you lang don't support assertions, use unit-tests to ensure proper behavior

###### Conceptual Contours
Main problems:
- if system consists of large monolithic parts, it is hard to have proper interfaces AND functionality will be duplicated
- if system consists of small parts, client will need to know how to work with them all, thus encapsulation is lost AND concept can be lost, because it is all over the place

There for you need to decompose system in such a way, that you work with cohesive units, that encapsulate some concept, BUT don't become unmaintainable monolith
- this is achieved by: iterative refactoring of a model, intuition, alignment with the model(often domain will reveal insights about what can be OR can't be a single unit)
- clear sign of poor contours is when model refactoring isn't localized and forces changes in multiple areas

###### Standalone Classes
With each new dependency, class becomes harder and harder to understand, thus leading to ungraspable system
- this is classical problem, that is solved by modularization, aggregates and proper abstractions, BUT this is not always enough, because number of modules and their connections(thus number of dependencies per module) can be high as well
- ideally, each connection must be as meaningful as possible, WHILE overall number of connections as low as possible, THUS it is important to evaluate if dependency is needed(when adding new OR refining old)
	- basically, low coupling is your friend
- note that basic language functionality AND libraries are not dependencies in this case, BUT dependency is something they represent
	- ex: `int` is not a dependency, it is just basic type, BUT `amount: int` is
- general advice, try to factor standalone concepts in separate, standalone classes, with no dependencies, that used by some other class
	- this leads to separation of functional, high cohesion between methods of both classes AND overall to less bloated classes
- remember, as stated in Conceptual Contours, interfaces still need to be rich, don't boil everything to primitive

###### Closure of Operations
Classes must have as little dependencies as possible, BUT still keeping their interfaces rich and complete
- avoid boiling down everything to primitive

Basically, if you need to introduce high-level interface, thing if it is possible to closure it under single type, meaning that parameters, return type, implementer(those who execute method) AND type of modified state(if any) will be the same
- mostly suitable for ValueObjects
- "type" can be abstract as well as concrete
- it is pretty useful, even if closure is partial, meaning that condition is only partially true

###### In general
Keep software obvious, predictable and such that it communicates it's intention

#### Declarative Design
This concept has meany meanings, most common is that we try to write software, that exposes properly described set of parameters, that allow to control it in well understood manner, resulting in result, that predictable

main problems:
- declarative frameworks will be a burden, if you try to do something, they don't expect you to do
- code generation, that can come with such frameworks, can be hard to grasp AND sometimes unpredictable

generally, tend to use specific frameworks to mitigate specific problems, that won't restrict you in other parts of your program
- also incorporate Language into the framework, if you can, so you could connect declarative style with model even more

#### How approach refactoring
It maybe hard to start on refactoring some design, so here are some general rule on how to find targets:
- identify clear sub-domains and extract them from whole design
- use parts from already established models(common examples is Math, don't reinvent math within your domain, integrate it as part of your domain, often as some atomic operations, that later combined to execute rich operations)

## Analysis Patterns
Analysis Patterns - set of high-level, conceptual patterns, that provide a starting point in developing complex Models
- they are not tech solutions, they are guides to work on Model
- this section demonstrates sub-set of this pattern from DDD perspective

list:
- balance can be computed(rather then stored) from number of entries(positive OR negative), where computation is done by some entity(usually aggregate root)
	- reason been money can't appear, there is underlying operation to this change
- when two accounts operate on similar accounting info, instead of coupling them, introduce separate Object, that will take entry from first account as input, do calculations and return resulting entry to second account
	- there are several strategies on when to perform such calculations:
		- when new entity inserted
		- triggered by account (account looks for Objects to trigger)
		- triggered by Object (Object collects entries from account to process)

notes:
- look for complex application logic, it might be actually a part of domain
- it is often needed to adapt analysis pattern, instead of using directly how it used in other system

## Design Patterns in DDD
Design Patterns is common things in development world, BUT they can also be re-applied for some cases in DDD land(sometimes you need to shift perspective, so pattern can be used in DDD)

#### Strategy
If you need several ways for one thing to do something, implement this several ways as strategies and leave the thing just execute received strategy

In DDD it is used to express some rule OR processes
- even better if this is concrete business rule

problems:
- client need to be aware about each Strategy type
- larger number of object

#### Composite
If your system has tree-like structures, that can be deeply nested AND conceptually similar, you can define a Composite, which can hold simple "leafs" and other complex Composites, both of with will have same methods to do operations, thus client won't need to differentiate between them OR handle any traversal logic

## Refactoring Towards Deeper Insights
Not all refactoring is purely technical, also look for problems in your model

flow:
- find problematic place that bothers you
- think about solution (it can be fast and often code based OR more time consuming and often related to model)
	- finding new model is problematic think, that takes time, effort AND often involves several people
	- advices: keep changes small and scoped, optionally avoid long term planning, use Language
- look for knowledge outside(patterns, domain books, other firms etc)
- remember about keeping software design good AND model to be such, that helps software development
- don't take too long to refactor AND do it consistently
	- look for ways to: deeper domain understanding, make important things explicit, make design better
	- remember: don't push refactoring in hot periods(ex: pre-release), don't make model or design "too elegant" and hard to understand

## Maintaining Model Integrity
Each team can have their own view of same concept, THUS it is important to establish how to live with this concepts, basically you can:
- make one entity, that will hold both concepts
- separate each team with clear boundaries and make separate entities
Either way, you must keep model unified AND avoid contradictories between similar entities OR inside one entity
- we aren't living in ideal world, so at least it is important to keep key concepts unified AND have clear relationships between somewhat diverging parts
	- also it is not always needed to have same entities, some system just doesn't need some functional AND can have some uniq functional
		- also it is not cost effective to keep model fully unified too
- thus you need to establish consistent rules AND use some patterns

#### Bounded Context
Every model must have context, that it is applied in, meaning some clear boundaries(defined on organization scale), inside which model is unified and consistent
- basically model from one context can communicate with other context, BUT it don't really need to know details OR be consistent within that context
- each context uses own dialect of Language, so translation in communication will always be present

common sings of non-uniformity within a context:
- confusion in language
- interface missmatch
- behavior differences
- duplication of same concept
- false cognate - same term, that means different things

notes:
- context isn't a module, because one context can be modularized, BUT it is good practice to place context in separate module too
- don't try to build unified model IF you aren't in the same context with other party
- context can be defined by team, by sub-team, by department etc

#### Continuous Integration
Parallel work on same model will lead to inconsistencies, BUT breaking model into smaller and smaller will lead to lose of coherency, so it is important to keep model unified

Extreme Programing can help with it, BUT the most important concept from there is Continuous Integration, which aims on code been integrated(merged) as fast as possible, thus any inconsistencies will be found pretty fast
- it works both for model AND code changes, where
	- good model achieved by: communication, documentation, Language
	- good code achieved by: CI/CD, TBD, AQA, Agile

notes:
- don't deal with separate context in scope of one task

#### Context Map
When it is time to communicate between contexts, you need to establish proper, stable, uniform interface to do this task properly
- basically you do sort of translation(aka mapping)
- never blur together contexts, keep boundaries clear AND communication only via interface
	- code re-use will kill boundaries
- each context must be named, where name is part of a language
- keep changes context bound AND do massive reorganizations carefully

notes:
- not all translations are possible because of "reasons"
- as one possible design, context to context communication is done via some services on the edge of each context, where each service can do needed translation OR they can use intermediate translator, that lyes in-between two contexts AND must be maintained by both of them
	- remember to test such points of connection, they are the weakest places
- keep context map documented(each context must have clear boundaries and name)

*following patterns will describe some ways you can establish proper relationships between each context, note that you don't need to strictly follow them, BUT you can move towards achieving them step by step* 

#### Shared Kernel
It is sometimes makes practical sense for two+ teams to share subset of same context
- important: one team can't break other(build proper communication), changes from one team must trigger tests from both teams to run
- note: it might be hard to do frequent CI this way
- reasons to have: de-duplication, easier integration of several sub-systems

#### Customer/Supplier
Some two contexts may form customer-supplier relationship, where one becomes "downstream" and depends on "upstream", while not becoming "upstream"'s dependency
- problem with such relationship os them upstream can't easily make any changes, WHILE downstream need to constantly accommodate for new changes
	- so it is important to build proper process here:
		- "upstream" consults with "downstream" about cost of change AND when it is possible to plan for changes
		- "upstream" must be ready to help with integration
- force upstream to run "acceptance" tests, that will verify that downstream is ok
- such relationship can form externally, between actual customer and business
	- somewhat same rules apply here too, in addition to:
		- such customer is prioritized, BUT it can be placed on hold, until other features developed
- note: upstream must be motivated to help downstream
	- usually the motivation is overall company goals, but in the case of different companies, some consensus must be found OR non cooperative pattern, such as Conformist, must be used

#### Non-Cooperative Customer/Supplier Alternatives
When upstream have not motivation to help downstream, some non-cooperative patter must be applied, so downstream can operate properly, here are some of them:
- Conformist - when you fully depend on upstream model and it's capabilities, just conform to their design and don't provide any translation
	- be careful with this, because changes in such dependency may break you hard
- Anticorruption Layer - create translation layer, that will save your system from constant problems AND incapsulate integration inside of it
	- often useful when working with small subset of other context
	- great when working with legacy OR just poor integrations, that tend to leak into your system, causing problems
	- often needed to avoid model corruption with improper concepts
	- implementation:
		- use one or several services OR even entities to represent foreign system in isolated manner
		- use patterns like: Facade(change interface of foreign model), Adapter(change form of information), translator(can be just separate part OR separate part of Adaptor, that used for mapping)
		- anticorruption layer can be shared between systems OR be just part of downstream
	- notes:
		- if possible, change upstream interface, so you life can be a bit easier
		- you can Conform in places, where it is just too hard to translate, BUT don't overdo it
		- anticorruption can have additional functionality like logging etc
- Separate Ways - stop depending on upstream, if it is realistic to do so(often caused by integration been to expensive for what it returns back)
	- basically do things "in-house"

#### Open Host Service
If you built a high demand service, to avoid duplication in each subsystem, that will be integrated with you, create your own service, that will be a stable interface to communicate with your system
- constantly change your service to meet requirements(if they align with you)
	- if something not aligns well, create augmentation services, that can extend your base service

#### Published Language
In a way, it is more extreme version of Open Host Service, where you not just create some service, that will make integration easier, you make your model and language public, so anyone can share it
- good documentation is needed
- example is shared notation for chemistry, so all companies can use same model and exchange data easily
- basically you avoid most of translation hustle by choosing this option

#### How Draw ContextMap
Here are some advices on how to draw context boundaries:
- ideally how break large model must be decided on team-basis, BUT it is not always possible du to different reasons, so, in addition, proper team-to-team communication AND good management is keys
- remember that your focus is your context and neighboring contexts
- boundaries can be drawn in two ways, with their own advantages:
	- large context: less translations/mappings, shared language, easier to understand single coherent thing
	- small context: less clashing between devs, CI and development is easier in small teams, scales better
		- note: it can and will be harder, dialects of language will appear, duplication AND knowledge sharing will drop
	- \---
	- combination of both is key to scalable, BUT manageable model
- accept that external system is out of your scope and not always changeable
	- if it is possible - ask OR do the changes, if not - adapt
- start small, with single context AND, only if needed, extract parts of it
- deployment - it is separate problem to manage how deploy two interconnected services
	- avoid breaking changes
	- keep translation as part of service, so it can be deployed with it
	- use versioning
	- remember to test not only new version, but depended services
- to integrate this practices start with direction, aka ideal context map and slowly move towards it
	- look for more value for less disruption
- examples:
	- separate ways -> shared kernel
		- internally unify both contexts
		- create naming conventions, empty test suites for shard kernel etc
		- start by the most core functionality
		- how to merge models: mold one into other, take best from both, create new that will be suitable for both
			- both teams must work on it
		- integrate shared functionality into shared kernel iteratively
		- \---
		- if you need to go slowly, just move functionality from one context to other, until first is empty
		- avoid merging two completely different models
			- if needed, create third context, that can hold duplicated functionality
	- phasing legacy
		- define strong anticorruption layer between both systems
		- migrate iteratively
			- can be achieved by keeping both systems run it parallel
				- in general harder, requires tests for both systems AND their integration, BUT overall beneficial, when legacy is large OR UAT stage is critical
			- if possible, phase legacy and remove anticorruption layer iteratively too
				- alternatively just hide old functionality AND kill it all at once
		- focus on reducing anticorruption layer first
	- open host service -> published language (can happen when there are too many integrations OR they need to have too many access)
		- look for industry standard language, otherwise:
			- refine core domain
			- look for industry standard communication protocol(XML, JSON etc)
			- share language
			- build translation layers for each open host service
				- provides little to no disruption
			- switch
		- don't bound language and model too much, some amount of translation will enable freedom of changes in model

notes:
- be careful with breaking context to avoid it's complexity, it may hit you later, so consider patterns in next chapters, for managing complexity first

## Distillation
distillation is a process of taking only core part of some domain and solidifying it inside of a model, thus keeping it understandable and manageable

profits:
- understandable model
- model that can be described by language
- focus only on important parts of domain
- model can be easily managed and divided

similar to "Maintaining Model Integrity", patterns will help us achieving distilled model

#### Core Domain
If you can't understand system, you can't change it, can't onboard new people, can't extract value from it etc
- such will lead to fragmentation of knowledge between people

Core Domain is key part of system, while system can have other parts, this is the most important AND must have the most attention
- it is great business asset, that must be enforced by company and carved-out by devs, instead of just "making features"
- remember, bunch of features OR fancy architecture won't sell to user
- generally: keep it small, keep it clean and refined, bring here the most specialized parts AND put supportive parts aside, put as much talent here as possible
	- other parts of design must be more generic for practicality
	- refactor core first
	- speaking about talent, some technical devs might not be interested in domain and it is ok, BUT find those who will and put them in charge of core
- core is part that might be protected by MDA

why:
- you can't purchase domain, because:
	- it will be too generic
	- it is not profitable to sell it

notes:
- core is something important to your business, usually your selling point
- other patterns will focus on refining core domain
	- it is possible to apply them all, BUT some can be harder then other, SO it is ok to do smth right away, while taking time with other
		- still it is important to do hard parts, so you could get the most out of your core

#### Generic Subdomains
Some things are important for model, BUT can play supportive role OR be a common knowledge, thus making core less distilled, if kept as part of it
- generally, place any non-essentials as separate modules of model OR use available third-party tools/libs to do the heavy-lifting
	- keep this modules less prioritized AND don't put top-talent here
- lib is great choice for more generic, highly distilled domains, BUT remember that lib can be restrictive in some ways, that clash with your model
	- alternative to lib is public model, that can be implemented in your system
- generic subdomain is candidate to be outsourced, BUT be cautious with it, because it may be hard to integrate in your system in future and quality might vary
	- as advice, write in-house tests, so you can ensure quality of outsourced stuff
- generic !== reusable
	- it is key idea, that makes it ok to implement only part of public model, that you need OR, when creating custom model, again focus only on important and create tailored solution
	- it is great when you can reuse smth, BUT it is not always needed, thus it is not justified to use resources, that could be spent on Core development
	- note, that striving for reusability may result in addition of some specifics into your generic model, thus making it more complex and harder to maintain
		- this will lead to appearance of second core, that might bot be needed
- core domain is risky part, that must be handled first AND only that you should implement generic subdomains

#### Domain Vision Statement
Write short document, that will describe Core, highlight it's main value, show how Core balances interests of several teams
- write it early, revisit after insights
- it is needed as reminder about what exactly is the Core, how resources need to be allocated and why Core need to be sustained
- it is great onboarding tool
- it is great for establishing main direction
- avoid implementation details, keep it distilled, short and non-technical
	- focus more on model

#### Highlighted Core
Domain Vision Statement is great tool to broadly define Core, BUT it is not sufficient for development needs, thus it is important to have complementary document, that will define Core in more details, draw clear boundaries etc
- ideally code structure must do same task, BUT it is not always possible to refactor all at once AND some refactoring guidance is important
- basically you can use any style of documents(can be even diagram), that will do one simple task, make sure everyone have same understanding of what core actually is
- main task of document is to describe most important details of core AND relationships inside of it
	- remember, by keeping document minimalistic and abstract you allow for easier refinements, faster read times AND it will take more time to stale
- keep document non-technical
- if you already have some large document, that describes general model, you can simply highlight important parts, that create core
	- so you can state what is inside core, while not bringing in additional details
- document must be in-sync with reality, BUT any changes to it(usually caused by changes in model or code) must be discussed beforehand
	- any changes must be shared

#### Cohesive Mechanisms
Extract technical details into Cohesive Mechanisms, that can take a form of library OR framework with abstract interface, that can be integrated in your Core, while not bloating it with details
- keep core declarative and implementation details free
	- basically your core states that somethings needs to be done AND Cohesive Mechanism performs it
- look for re-use of existing algorithms and solutions, similar to Generic Subdomains
- ex: when working with graphs, don't implement all algorithms, just once that will be doing the tasks
- otherwise: you will couple model to implementation, core will be de-distilled, code of algorithm will be harder to test
- note that if algorithm is proprietary AND brings value by itself, it is worth considering keeping it as part of core domain

when considering improvement, weight cost-gain difference, by thinking how costly will be the change, how costly not to change, what benefits will you gain AND what changes will even be

#### Segregated Core
You can factor some parts of core into Subdomain or Mechanism, BUT supportive objects, bounds to generic elements and just some parts that aren't worth to move to separate domain can still cause de-distillation of core
- refactor-out elements, that aren't directly related to core, into separate modules of core itself, refine them, by establishing clear boundaries, interface AND relations with other modules
- final result is core of core, that surrounded by modules, that help with execution
- you will make relationships harder, BUT core itself will be more prominent
- basically you will make whole core less cohesive, BUT main core more
	- too big core is sign of need of segregation
- all teams must commit to process of segregation
- segregation is quite beneficial, because it highlights core AND moves aside modules, that can be later extracted as separate Subdomains

#### Abstract Core
It is possible that even the most refined core will become quite big and hard to understand
- one way to deal with it is via polymorphism, where you factor out most important stuff into separate, abstract classes AND use them as base for specific implementations in other places of core
- such trick will make relations more clear
- Abstract Core must be backed by model, it is not about code patterns

#### Deep Distill
Remember, that main focus of distillation is to break large system into smaller parts, that have clear relations AND can be used to easily describe model

## Large-Scale Structure
Important aspect of successful large system is ability to understand role of each part, without deep dive into how system works
- basically you need to establish some way of talking about the system from "birds-view", that will be backed by common rules, patterns and restrictions
- this will help with individual contributions, general system understanding etc
- this can, but not must be based on ContextMap, discussed earlier
	- often ContextMap is not broad enough

notes:
- don't use large-scale structure patterns for systems, that are small and simple
	- that not worth the cost
	- it is often sufficient to work with just modules and contexts, in such case

patterns for such large systems...

#### Evolving Order
Architecture framework OR, more generally, any rules can become burden, rather then help, causing more harm, by forcing every part of system to fit in some problematic structure, by slowing down development etc
- it is often the case, when system architecture was created upfront AND never refined

so:
- don't over constraint design
- let design evolve
- keep balance, between making system too strict(easy to manage, hard to be flexible) OR making system to loosy goosy(hard to manage, easy to find perfect solution for problem)

#### System Metaphor
Software Development can be hard to understand and one way to mitigate it is to impose metaphors
- note: all metaphors have constraints that come with them(be careful with introducing unwanted things OR not introducing wanted, because you restricted by metaphor, so always look for it AND be ready to drop the metaphor)
- basically, metaphor is some loose term, that can be used as analogy, that creates a trajectory, that system has to follow
- metaphor must become part of language

#### Responsibility Layers
There are tow parts of pattern:
- imposing guidelines on responsibilities that object can/can't have will force more structure on overall system
- breaking everything into layers(where layer can know about itself and layers bellow) will create more clear relationships
- \---
- combining both of them will create a structured system, with clear relationships, that have some meaning

good layering must:
- tell the story of the system, mainly the priorities of a business
- lower level must be meaningful without upper layer

possible common layers:
- "potential" - layer that includes resource organization and focuses on what can be done
- "operation" - layer that focuses on what is been done
	- operational objects can reference potential, but not vice versa
- "decision support" - layer above "operation", that focuses on automatic decision making, based on existing operations, potential or other data
- "policy" - layer between "decision support" and "operation", that is used to enforce policies, when making decisions
- "commitment" - layer bellow "policy", that states what we promised to the customers
- \---
- decision support -> policy -> commitment -> operation -> potential

remember to keep number of layers small(distilled) enough

#### Knowledge Level
Knowledge Level used for cases when we need to have some part of system be flexible and configurable, while configuration itself constrained by some rules
- it is tempting to remove constrains, but it is not often practical AND the less constrains, that more complexity
	- why not constraint too much for lower complexity? because users will abuse system, by misusing fields and data types to compensate
- basically we split system into to layers(not actual layers, because the co-depend on each other), one that can execute, other that can influence execution
	- influencer layer can be customizable from outside of a system

#### Pluggable Component Framework
You can design system as set of components, that can interact with each other via one shared interface, known as hub
- abstract core is common candidate for hub
- problems:
	- mature model needed
	- hub will limit possibilities that each component can do

#### Notes
Patterns need to be implemented restrictive enough to provide benefit, structure and make system easy to interpret, WHILE not forcing unneeded complexity or pushing towards worse design
- focus on: making development easier, making domain insights visible, keep system cohesive

Hard future proofing in design is bad thing, BUT not future proofing will hunt you in a long run, in general, keep things simple from the start and iterate upon what you have. Here are some ways to achieve this:
- minimalist - keep only the most important in framework, other things must be figured case-by-case
- communication - team must properly understand architecture
	- use the Language
- self-discipline - architecture must be followed
	- otherwise your code will rapidly decay
- refactor fully - when migrating towards new approach, take time to do proper refactor
	- keep system homogeneous, this will help with understanding AND future refactors
	- more refactors == deeper model and system understanding, thus easier future refactors
- keep core distilled - it is easier to work with and understand

## At the End
How move towards rich model:
- create context map, that has small amount of an ambiguity
- develop rich enough language
- identify core domain, make it clear through docs and code
- choose proper stack, that doesn't work against DDD
- pick top talent devs, that will be interested in domain

Who can enforce strategy (basically there are different ways, here are some):
- from bottom - team of organized and self-disciplined devs can achieve great architecture
	- iteration needed
	- often comes from "leader", meaning some pro-active developer
	- can even work in cross-team collaboration zones
- from top - architecture team will create and enforce standards
	- development needs must be accounted for
		- collaborate with your devs and listen to them ;)
	- iteration is key too

Essentials for decision making:
- decision must reach entire team - focus on dev communication and collaboration
- decision must absorb and account for feedback
	- keep tight feedback loop
		- ideally if architect is developer OR can sometimes act as one
- allow for evolution and iteration
	- set flexible boundaries
- put great talent to work with domain too
	- don't place all top engineers in infra, architecture etc teams, left great minds to domain, so it can be developed AND app, that based on domain, is great and maintainable
	- include high number of people with high domain expertise(in infra, architecture etc too, because they can bring valuable insights there, to make application devs live easier)
- minimalism and simplicity is a key
	- hard solutions may need hard problems, but better to find an easy one
	- humility is key, when you need to discard your "great" idea
- keep objects strict, single purposed and abstract, WHILE developers the opposite(communication, knowledge sharing etc are keys)
- keep framework away from influencing the domain
	- while domain must influence and refine framework to it's needs
		- if possible
	- don't write framework for dummies, just don't hire dum people
		- otherwise you will only restrict the smart
		- while it is ok AND even needed for framework to encapsulate and hide it's dirty details
- embrace the master plan
	- master plan - flexible plan, with some boundaries to guide the process
	- with more details all plans will become more totalitarian, while not gaining in details

notes:
- don't cary too much about your design, keeping it for too long might result in legacy
- you can't scale "quicky" architecture, BUT you can start from it and iterate upon
- you don't need to apply each and every pattern(they are called patterns for that reason), BUT aim for deep domain understanding