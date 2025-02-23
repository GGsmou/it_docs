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
