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
