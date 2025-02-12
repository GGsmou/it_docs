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
