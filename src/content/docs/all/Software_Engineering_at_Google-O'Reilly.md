---
title: Notes of "Software Engineering at Google" by O'Reilly
---
*notes of "Software Engineering at Google" by O'Reilly* 

## Preface
It is important to build not only scalable, BUT also sustainable software, that can adapt to potential changes, while been accessible to other devs

This book will also explore the difference between development AND engineering
- software is becoming more and more included into our day2day lives, so it is important to engineer it, not just develop and pray
	- thats for other engineers has practices and standards

Overall, here you can find processes, practices and tools, used by Google to achieve healthy codebase, that explored through this topics:
- effect of time over sustainability
- effect of scale over viability
- design trade-offs

When creating software, remember:
- how code will adapt over time
- how code will scale with business
- what trade-offs can be adapted to scale faster OR grow in more sustainable manner

Main topics will be:
- Google's culture
- Processes at scale
- Tooling (internal AND open-source)

Note, that this is all about the way, how Google operates, not one for all fit list of advices

## What is Software Engineering
As software engineers, we have a responsibility to:
- think about time
- think about scale
- make complex decisions

Basically, development is process of writing code, which, if combined with modification, maintenance and team-work, becomes software engineering
- often you need to decide how long-lived your program will be AND this will result in what will you do(program or engineer)
- if you can't adapt to potential changes, you create high risk situation for yourself
- introducing several devs require process, BUT will benefit in long run

Always remember, that unsustainable practices will introduce deferred cost

###### Time and Change
As said, with scale comes need to adopt for more and more fundamental changes, and, if it is not done before-hand, it WILL back-fire hard, because:
- there are many hidden things, inside program, that will slow-down upgrade
- it is not enough experience overall in this field
- it is long and costly process, where you need to JUST do migration alone
- \---
- to avoid, generally, invest in incremental updates
- focus on possibility to overcome any update forward, not just first one, it is constant battle
- remember that any dependency CAN and most often WILL change(usually because new feature, optimization or bug is found)
- ideally, you need to reduce that cost of change, by paying upfront and investing in it overtime, OTHERWISE you have risk of been stuck in impossible to change state, where you defer to get more resource, but deferring causes more need of them
	- such problems often slowly become worse overtime, until hitting critical point
- never do changes for the sake of change

###### Hyrum's Law
This law states, that no matter what contract defines, giving long enough time period, all observable behavior of public API will be depended-on by user
- ex: if you return internal details in error response, that aren't defined by contract AND stopped, this will break someone, who decided to parse them
- note: we can mitigate it, but never overcome
- when deciding to change something, you must include the cost of mitigating breakage problems
	- it works both ways, ex: when using hash-map you can depend on order of items, BUT if you will it will make your code less sustainable; when changing algorithm behind your hash-map library, you eventually will cause bugs in someones code
	- generally, avoid been "clever", don't depend on implementation, depend on interface

###### Policies
Everything need to scale(codebase, dependencies, machines etc), including policies

Scaling problem can be spotted, if process can't be automated, thus requiring more resources, with more scale
- remember, that scale of smth(ex: codebase) often will produce non-linear resource requirements(ex: number of maintainers), SO automation is even more important

Examples of bad policies and alternatives:
- force dependent teams to do migration -- perform migration by dedicated team OR team of devs, that introduced need for migration
- develop in large branches -- trunk based development

Examples of good policies:
- if breaking change wasn't detected by test suits before merge, this is not a problem of author, this is problem of test owner
- knowledge sharing process
- work on improvements of found problems, not just assume that they won't repeat
	- this will make upstream changes easier and cheaper
- in general:
	- automate
	- isolate low-level details
	- share expertise
	- introduce improvements constantly
	- keep major policies well known

###### Shifting left
It is cheaper to fix early problems, so it is important to invest in tools and polices, that will catch any problems on early stage of development

###### Trade-offs
Have a reason(often backed by data) to do something, don't don for sake of doing OR "just because"
- in general, do things because: "you must" OR "it is what's best, because of...."

When speaking of trade-offs, cost evaluation is key, BUT cost isn't about money, it is about resources in general(including profits, that won't be made, because change isn't done)
- also remember about societal cost, which is crucial at scale
- remember, that engineers' happiness is key metric as well
- be data driven, BUT always evaluate data and all underline pros/cons, DON'T just trust it

When taking a decision, consider such process, as an example: if I do change X, that will take 2 weeks of my time, gain Y RAM benefit and K CPU loss, will it be beneficial AND, if so, is it the best thing I can spend my time for
- it is important for company, to share some cost numbers, so it is easy to do calculations

Some decisions can't be based on measurements, because underlying things are unmeasurable, thus experience AND knowledge + some practices can help to do estimations

Remember, that some decisions may backfire unexpectedly, ex: google built a distributed build system to speed-up build-times, SO engineers bloated dependency lists of their apps(because it is not too much slower anymore to add new stuff in)
- policies and constraints was added later, to mitigate this problem

To fork or not to fork
- benefits: control over dependency, possibility to fine-tune to specific needs
- problem: you now a maintainer, so scalability and sustainability suffers
- general solutions:
	- if it is short project - fork to move faster
	- if it is timeless project, be careful with forks AND, if forking, keep interface same/similar

###### Making mistakes
It is ok to make wrong assumptions OR decision, it is bad not to admit them
- even if decision is data-driven, data can change, so change in direction is needed too

## Culture
#### How to work on teams
Software engineering is all about team work and collaboration, so it is important to build related processes well, BUT you need to align your behavior first and then try to "fix" others

People problems:
- insecurity - people don't like to share work in progress, because it might reveal smth bad about them
	- it can also lead to stolen ideas
	- hiding WiP code is harmful, because:
		- you can't be sure, that you are on right track
			- > Many eyes make sure your project stays relevant and on track
		- knowledge sharing is non-existent
		- it is impossible to get external help
		- it blocks "shift left" / early detection of problems
		- your project will die, if you stop working on it, because there is no other contributors
			- that's why you need co-owners AND docs
- genius problem - people want to be seen as geniuses/idols in there field
	- you must remember, that always behind big names there is a group of talented people, that was organized by BigName, but we can't credit only leader of a group
	- this can often lead to stealing credit for group work OR just been a jerk, which is bad and only sabotages development
- socialization - if people placed in large groups, no one will speak, if people isolated, no on will speak
- impatience - be patent with each others ;)

main pillars of human interaction and collaborative work:
- humility - you aren't center of universe or perfect in any sense, always improve
- respect - treat people and their achievements with genuine care and appreciation
- trust - trust that people competent AND can do work by themselfs
- \---
- this pillars are important, as prevention of complex situations in human relationships. It is a way to make messy humans to interact easier
- why? such "small" things will make playing social game easier, thus creating strong relationships

how to achieve pillars:
- loose your ego, BUT leave self-respect
- build team ego, by sharing accomplishments
- don't try to be main character in the room, even if you owner of some secret knowledge
- learn how give and take criticism:
	- NEVER criticize personal stuff
	- be constructive
	- make criticism lead to changes
	- be polite
	- \---
	- don't take criticism personally
	- remember that you != your code

failuers:
- innovation and risk MIGHT and often WILL result in failure, AND it is ok
	- but, remember to fail as early as possible
- good way to make failure result in something is doing a postmortem(analysis of situation), BUT it must be good:
	- don't be pointless
	- don't be juts to excuse
	- include explanation of what went wrong AND what is going to change
		- this must be followed along
	- common structure: summary, timeline, root cause, impact, action items and their owners to execute, actions items to prevent future problems, learned lesson

notes:
- it is ok to change your mind, BUT don't do it to often
	- the best way it to listen, before acting, thus you won't discover and change too often in other's eyes
- let others influence you AND you will be able to influence them
- choose your battles wisely
- don't be afraid to say "I don't know" OR "I made a mistake"
	- you collab with your team, NOT compete
- find a culture and work style fit
	- ex: it you can't work remotely efficiently, just don't

be googley:
- be able to solve problems in hard and non-deterministic environments
- value feedback
- change status quo
- put the user first
- care about team
- do the right things, even if it is hard

#### Knowledge sharing
Collectively, organization must always know domain better, than external people, BUT to achieve this org must have experts to have initial knowledge AND mechanisms to share it, such as:
- culture of asking & answering questions
- writing docs
- knowledge sharing events
- culture of learning
- culture of admitting that you don't know smth

challenges:
- fear of been seen as stupid
- knowledge fragmentation between teams, that leads to:
	- incomplete general picture
	- information duplication
	- several ways of doing same thing
- culture of "let me do this for you, because it is faster"
	- results in single point of failure, where single person holds all the knowledge
- parroting - people mimic behavior of other, without knowing the reason
	- ex: using patterns, just because
- graveyards - people afraid to touch some part of code OR practice, because it can lead to problems

philosophy:
- all people start as beginners
- "I will do it for you" doesn't scale
- single point of failure is always a problem
- documentation scales well, BUT it must be maintained and can be not sufficient for edge-cases of learning
	- docs help avoid tribal knowledge
	- knowledge holders will still be needed, because they can point to right docs OR right person, actualize docs, help with edge-cases, BUT they can't be main point of information
- learn continuously

how to overcome challenges:
- psychological safety
	- embrace process of trial and error
	- assign mentor per each newcomer(ideally mentor can't be a direct manager, tech lead or peer)
		- mentor must have enough knowledge
		- mentor is first person to ask, if you don't know smth
	- facilitate asking questions AND will to answer them
		- this is even more important in group context, so person won't be afraid to ask question AND someone will answer, without been attacked by other peers
		- to do so:
			- don't be surprised about question
			- don't be biased towards person OR try to assault
			- guide in proper direction
			- be patient
			- try help and not showing off
			- establish discussion
			- don't be pedantic
			- don't interrupt ongoing discussion
- always learn
	- ask questions
		- it is ok to struggle a bit, BUT don't be stuck for too long
	- remember that you can't know everything
		- seniority != know everything
	- find environment to learn smth new
	- figure out the context behind decisions/design/code etc, first ask why and dive deeper AND only then act
		- you can't act on thing, if you don't know the reason why/if they are needed
		- it doesn't mean that original thing is right
		- document your reasoning

###### Community knowledge sharing
when you find smth new(in general OR from 1-1 session) write it down and share to community
- this helps preserving knowledge

there are several complementary strategies, when it comes to knowledge sharing in community:
- group chat
	- types: topic-based(have large audience), team-based(more specific topics can be discussed, safer for new people)
	- benefits: you can get fast response for some question + other members can find new knowledge from there
	- problems: have no structure and such knowledge hard to preserve
- emailing list
	- similar to group chat by benefits, BUT scalability problems can be mitigated, by archiving threads AND indexing them via wiki search engine
	- problems: slower then chats, can be noisy
	- notes:
		- remember to refer final answer(if it is several messages, write a wrap-up)
			- this prevents situations, where you don't know if thread is closed OR just frozen
		- on personal basis, set-up filters and other automations to deal with email flow, BUT as company, restrict emails to send them to target group, not just "CC @everyone"
- Q&A platform
	- similar to emailing list, BUT with additional UI/UX benefits, such as: custom interface, "mark as answered" etc
	- require additional set-up and maintenance

there are several ways you can teach someone:
- office hours - events, where engineers gather and discuss some question/problems
	- problems: problematic to organize, sometimes people don't know what to ask OR some questions hard to discuss in such way(specific, urgent etc)
- talks and classes - events, where engineers teach others somethings new
	- can be even non work related, just for building the community
	- types:
		- talks - share some knowledge
		- classes - share some knowledge with active participation in class from audience
	- when to create talk/class:
		- subject has a lot of demand
		- subject is stale enough
		- subject involves teacher AND is hard to self-taught
- documentation - written knowledge, that has main goal to teach reader smth
	- reasons to contribute:
		- update - you can learn somethings new + learn how to contribute to docs
			- it is same rule, as for refactoring, leave place cleaner, that it was before you
		- create - if you created some new flow, discovered new things OR just gain valuable knowledge - share it with others
			- locate properly docs, so info can be found easily
			- ideally, place docs near relevant code OR place links to this docs
	- good docs must have such systems:
		- comments(can be with auto creation of Jira tasks to fix them)
		- review and diffing
		- possibility to mark status of doc(draft, relevant, obsolete etc)
		- be located OR linkable to code
	- how to promote docs (it is time consuming process, that will benefit many people in long run, so it is important, BUT may be hard to promote)
		- save time, by pointing to docs, instead of answering
		- enforce sharing and contribution docs
			- this leads to docs to be noticed, thus leading to moral boost of an author and acts as great incentive
- code - code is written knowledge too, thus making code clear and readable makes sharing knowledge easier
	- docs and comments are boosters of knowledge sharing via code
	- code reviews are boosters of code quality AND help share new practices between author and reviewer

cultivate knowledge sharing as culture via:
- respect others
- create incentives top->bottom:
	- how: make it part of senior position responsibility, make it part of KPIs and review
	- responsibilities: become mentor, share knowledge(code reviews, docs, talks, classes)
- create incentives bottom->top, so person receives acknowledgement from colleges
	- peer bonuses, rating, public "kudos"

establish canonical source for important info
- prevents information fragmentation, BUT it is harder to maintain
- such docs MUST be owned and provide an option for feedback, that will be changed by owners directly
- such docs can be team, office, org etc based too
- subtype is dev-guide docs, that can provide insights on how-to develop, what style or tooling is used etc

tips:
- establish short, stable urls for docs
	- ex from google is "go/", redirect to URL service, that easy to remember+link and will be always stable, even if underlying url has changed, like `go/python` 
- if possible, consider creating learning platform
- automate some knowledge, via shared linter/prettier configs
- big to small updates must be shared, so author gets acknowledgement AND people can find new info, this can be done via:
	- newsletter
		- note: never spam with letters, keep only relevant info in them
	- communities
		- creating communities prevents info fragmentation
		- note: each community can have different level of formality OR even be non work related

###### Code Reviews
google's practices:
- be picky with first couple reviews of new hires, to establish best practices of how code is written in company, thus preserving it's consistency
- for important MRs, require check from certificate person, that has deep domain and language knowledge to make a review
	- such reviewers act as teacher, when reviewing code
	- discussion is welcomed
	- such process is great for docs sharing and explaining
	- be aware that such process is hard to scale, BUT it is worth tradeoff, to achieve knowledge sharing AND consistency
		- part of this process can and should be automated with tooling

#### Software that enables greater good
As said before, one of key values, that engineer can have is to respect users of it's product fully and equally
- remember to think as your user would

all people have some bias by default, often an unconscious one
- if you don't have enough representment of each group in your company, it will be biased too
	- Google's ex: image recognition algorithm, at some point, didn't recognized black people as people, because of poor training data
- still, bias is expected, when targeting specific auditory
	- BUT, if you have enough market share, underrepresented groups are great targets
- \---
- such problem can lead to loosing reputation & market share

how to prevent bias:
- trainings
- proper distribution of stuff AND equal opportunity
	- this will also bring a flow of people to your company
- always remember your target audience
- recognize and work toward fixing biases
- use proper data-sets
- always question current and future decisions
- listen for feedback AND be data-driven in your approaches

remember about:
- phycological safety of each one in the team

#### Leading a Team
Group of individuals is dysfunctional without a leader, BUT leader can be not one
For teach team it is beneficial to have two leaders, with same goals, BUT different perspectives and skill: Manager(PM), Teach Lead
- team will be dysfunctional, because it will has no aim to move to
- this is important chapter of individual contributors too, for better understanding of your management
- both roles can be taken by same person, for smaller teams

PM - role that responsible for aligning company goals with engineering happiness, do plannings etc
- individual and company goals might not align, so it is hard job
- ideally, product must have engineering background

Teach Lead - highly technical role, that manages any large tech decision, priorities, tech level of teammates, in scope of the team
- lead can be IC too, BUT it is often more beneficial to delegate
	- especially on scale

TL+PM - acceptable only for small teams, otherwise person won't perform good enough

Remember, that it is possible to influence large amount of people, BUT don't be authoritarian, by:
- speaking
- explaining and aligning goals
- be human, respectful and trustful to everyone
- not micro-managing 

###### How to be a manager/lead
You don't have become manager, BUT it may happen so, thus it is helpful to know how to transition

problems with management:
- it is hard to quantify what manager does
	- to fix, remember that team efficiency AND happiness is what you do
- bad managers make look all managers bad
	- learn how-to, try and decide wether you like been a manager AND then fully promote

why to become:
- you limited in amount of code, you can write, BUT you can stere many people under you

problems of managers:
- micromanagement
- ignoring low performing teammates
- \---
- remember, NEVER over-manage people, try serving your people
	- otherwise you will loose hard to replace workers, that can't work in such atmosphere
- don't forget about social aspect of a team

> Traditional managers worry about how to get things done, whereas great managers worry about what things get done (and trust their team to figure out how to do it).
