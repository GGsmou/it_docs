---
title: Notes of "Software Engineering at Google" by O'Reilly
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