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

patterns of bad managers:
- hire people that will be less smart or less ambitious then you, so you will be more important and more irreplaceable as their leader
	- problems: now team can't operate without you AND overall results are bad
	- overall, try to hire people smarter then you, they can replace you AND will challenge, BUT now you AND your team can grow
- ignoring long performers, because it is hard for you to fire them
	- problem: team will loose in performance, motivation etc
	- to deal: set-up timeframe, set-up measurable goals, set-up status check-ups
		- it is ok to micromanage, BUT with respect
- ignoring human aspect of the managing people
- try to be friend with everyone
	- problem: your subordinates will fill obligated to be your friend, because you are a boss + it is hard to be harsh with your friends
	- better to keep most relationships on the work side of spectrum PLUS some informalities put into it
- compromise hiring bar for speed
	- problem: team quality degrades, it is costly to hire bad person
- treat your team as babies, by micromanaging, don't trusting, disrespect, not giving opportunities etc
	- problem: people behave, as they are treated

patterns of good manager:
- loose your personal ego, BUT still have self-respect and self-confidence
	- cultivate team ego
	- to achieve: trust people, guide people not take their hand and walk to the destination along with them
	- respect constructive criticism
	- apologize
- mediate your emotions
	- you must let people know that you know the problem, BUT you can't overreact
	- your reaction will be mirrored by your team
	- remember, you been constantly watched by your team
- don't try to find solution, help person in finding it
- be a catalyst, by speeding-up the process, BUT not acting in it
	- as a leader, your goal is to build a consensus (ideally by team-member's hands, BUT, if needed, you can do it yourself)
	- look for roadblocks, it is often your responsibility to help with them
		- often, knowing the right person is a key, SO build a network inside your company
- remember to also be a mentor
	- junior will take more time to develop smth, it is ok, it will scale your team in future
	- to be mentor you need to: know the process, be able to explain smth, give just enough needed information
- set clear goals
	- set goals -> let people execute -> check if everything moves in right direction
- be honest
	- tell that you don't know smth OR can't tell
	- give proper feedback, even if it is bad
		- don't use techniques like compliment sandwich, it is better to say things as is, BUT include emphasis
			- without emphasis person will go into defense mode
- make your team happy
	- first and most important, ASK people what they need
	- explicitly care about people, their careers etc
- lower pressure, when persons have personal problems
	- BUT, it is ok to ask them for "compensation" later

tips & tricks
- delegate, BUT dirty your hands too
- seek replacement
	- to do: hire people smarter then you, create opportunities to tru "manager shoos"
	- why: you can grow this way
	- DON'T force ICs to become managers, just because
- act as quick as possible in some situations, like: low performers, bad hiring process etc
- shield you team from chaos, BUT keep them informed, when needed
- provide positive feedback too
- if something can be easily undone - say "yes" to it
- remember that everyone is different AND needs different approach
	- it mostly comes to: motivation, direction
	- giving direction is about finding what needs to be done AND breaking it into smaller parts, that can be assigned to each teammate
	- givning motivation
		- focus on intrinsic motivation, by providing:
			- autonomy
			- mastery - provide possibilities to improve
			- purpose - help seen the purpose in person's work

#### Leading at Scale
When you start leading one team it is natural progression to lead several teams, so this chapter talks about it
- all best practices from before apply ;)
- larger scale == higher scope == less engineering knowledge used

three always of leading:
- always be deciding - you will take more and more decisions, that must be evaluated by tradeoffs
	- focus on finding the pass, that engineers can follow to achieve something
	- to decide:
		- identify the blinders - if progress on decision was made before, gain knowledge about the problem AND identify what blind spots was left by people
		- find and explain, to everyone involved, tradeoffs
		- make a decision AND iterate upon it(identify the blinders, find tradeoffs, make a decision again)
			- always iterate, don't seek perfect solution
			- notes:
				- some tradeoffs can be represented as triangle, where you can only pick two
				- search for all tradeoffs, even if some thing seems like it is not a tradeoff at all
- always be leaving - build processes to work autonomously without you, so you could leave and work on a new problem
	- all teams must be self-driving, basically by having good leadership, healthy engineering processes AND positive culture
	- to achieve this:
		- divide the problem space - build loose organization structure, so you could divide problem to subproblems, BUT keep things flexible, so each team could iterate and communicate with each structure
			- each team must have sense of progress, ownership and accomplishments
			- make team own problem, not solution
		- delegate subproblems to leader, let them fail and iterate
			- always ask if you really the only one who can fix it
			- also ask yourself what I can do that others can AND fill such areas with other leaders
				- it is not always possible for some tasks tho
		- iterate by adjusting processes and teams
			- alternatively you can grow further in career ladder
			- don't micromanage, focus on small, but critical adjustments
				- always listen to people
		- anchor team's identity by assigning problems to them, not products(product is solution, that can be changed overtime, making team loose identity AND defeat the solution, instead of iterating upon better one for the problem)
- always be scaling - scaling the team is important, but everything discussed prior results in scaling, SO here will be talked about scaling yourself, meaning proper management of personal time and resources
	- it is common thing, when finishing the project, to gain additional project as result
		- one success results in discoveries in adjacent areas AND more scope to handle with same amount of people
		- basically you need to handle more to scale, BUT hiring can't keep-up, so you must know how to compress prior problem
	- main problem is that, with scope growth you become more and more reactive on stuff that is "thrown at you", SO differentiate urgent from important by:
		- delegating
		- scheduling dedicated time to respond OR to do important
			- based on your role, more time to do for IC and more time to respond for manager
		- track tasks through some system
		- just drop incoming request
			- you will do it anyway, because there are too many of them, so do it intentionally
			- one strategy is to breaking things into three groups: 20% of non-important, 60% of somewhat-important, 20% of important; drop 80% and focus only on what is important
				- 60% will be either picked-up OR go back to top 20%
	- focus on protecting your energy
		- partially you will adapt to work speed over time, BUT it is also important to be proactive here, so:
			- take real vacations - take week+ vacations AND avoid most of contacts with work
			- don't mix personal and work -don't take laptop to home, disable notifications on phone etc
			- take breaking when working
			- take sick leaves AND mental health day-offs when needed

#### Measuring Engineering Productivity
To be fully data-driven focus on engineers productivity too

why?
- scaling team is a way to scale company, BUT growth is not linear, because of overhead, SO by scaling individual engineers you scale company in linear-ish fashion

note: it must be done naturally AND at adequate cost

process:
- identify what need to be measured
	- it takes time, resources, makes team slower OR behave unnatural, when measuring, so you need to measure only what is needed
	- always ask:
		- what result is expected? - to prevent biased results
		- what actions will be taking if result is positive/negative? - to check if it makes sense to measure something, that will not result in any change
			- change can also mean maintaining status quo
			- sometimes you can identify what really will result in change AND measure that thing
		- who will take an action and when?
			- responsible person must be assigned
			- action must be based on relevant data, so time is important
		- do you trust this \[source of data\]?
			- seek for qualitative or/and quantitative analysis
	- it is ok not to measure when change:
		- is to costly
		- is irrelevant, because of other incoming changes
		- is going to be made anyway
		- can't be measured precisely

what metrics to choose:
- one possible framework is Goals->Signals->Metrics, where
	- Goal - what you wan't to know, not how
		- this must be a full list of goals, that covers all trade-offs
		- common areas to consider:
			- code quality
			- attention of engineer(flow state, notification distraction, context switch)
			- intellectual complexity(base complexity, unknown unknowns)
			- tempo and velocity
			- satisfaction
	- Signal - how would you know that result is achieved
		- signal can be thing that we want to measure, but it is impossible
		- it is needed to establish signals first to prevent using only available measurements, think what ideally you would need
	- Metric - basically a measurable alternative to Signal
		- something close enough, that can be viewed as signal
		- by defining what to measure upfront AND that this thing is suitable for our needs, we can prevent doing additional metrics after the result and the result will be more trustable
		- metrics can be combined to find deeper details about signal
	- \---
	- framework allows us to understand what we measure AND why, by providing traceability

data
- you can collect data in two ways:
	- quantitative - collect as much as possible, BUT with small insight
	- qualitative - collect rather small sample, BUT with reach insights

action
- after measurements are done TAKE ACTIONS, try to keep them tool-driven, so it is good tools that force processes, NOT just recommendations

notes:
- centralized "data team" can be much more effective that forcing each team to do their own data research
- if qualitative metric don't match quantitative -> quantitative is incorrect in some way

## Processes
#### StyleGuides and Rules
Define set of strict rules, that aren't negotiable AND guidances, that are recommendations

StyleGuides:
- treat your style guide as combination of style(prettier) AND conventions(linter)
	- conventions must be strict and understandable
- main goal is clear, sustainable code
- it is important to lean towards reuse of industry standard rules, BUT creating something in-house, as addition is important sometimes

Why?
- to encourage good and discouraged bad behavior
	- good and bad is aligned with company goals and can differ
- to establish common language AND patterns

Creating the Rule:
- ask what goal you need to achieve AND why
- google approach is to create strict rules, that will be less flexible, BUT more oriented towards time sustainability and disallow arguments between engineers on how to do things, so here are common themes in their rules
	- pull their weight - add only important rules, that can be less known to avoid mental overhead AND unnecessary large amount of rules
	- read-first - code is written once, read many times
		- proper names, easy to follow flow of code, easy to understand intent and what is happening, clear API contracts and abstractions
	- consistent - tooling, conventions etc must be kept consistent for ease of adoption
		- engineers spend less time on thinking about how to do things
		- code is universally readable
		- scale: easier to refactor, easier to provide tooling, less time-to-learn when changing teams or working in different codebases
		- ideally adopt all old code to new standards, BUT ideal consistency costs too much
			- use code-generation tooling to do migrations
			- one solid choice is to enforce consistency on each level first and then on level higher: file, team, project, monorepo, company
		- be, as much as possible, consistent with external community of devs
			- it is great longterm thinking
	- avoid error-prone and hard to understand constructs - prevent hard to understand things from appearing in codebase
		- if you understand it !== other people understand them now OR still will in future
		- easy code easier to debug
	- be practical
		- if performance is critical, be inconsistent
		- if you use external lib, let it be inconsistent, it is not owned by you
		- etc

What style guide should contain:
- rules to avoid danger
	- outline what functionality of language should or shouldn't be used from technical perspective
	- prevent common errors and problems
	- provide pros+cons and rationale for rule
- rules to enforce best practices
	- provide best practices to keep codebase healthy, maintainable and consistent
	- improve readability of code
	- prevent new language features and libraries from getting adopted too soon
		- first study it on small scale AND only after go for broader adoption
- rules to force consistency
	- this are some rules, that have small to no effect, BUT was chosen to prevent any debate between co-workers
		- ex: tab vs space, 2 vs 4 indentation etc
- \---
- don't include in your style guide, BUT remember:
	- don't be clever
	- don't reinvent the wheel
	- don't fork codebase

Changing the rules:
- it is important to keep rules up-to-date with industry, language, practical and automated, SO when it becomes a burden to do so, rule can be changed
	- it can't happen to often, because rate of migrations won't be realistic at all, SO evaluate each new rule and include reasoning with them for future self(you would be able not only understand why to keep, BUT also see if rationale no longer valid)
- reason for change must be real, not potential
- change must be: necessary or beneficial and relatively cheap to implement + it MUST be agreed on by community first, but finally approved by style guide owner
	- make decision based on trade-offs, NOT preferences
- note that rules CAN and sometimes MUST have exceptions

Guidance (aka the should's)
- basically guidance is form of passing collective knowledge of some topic, that doesn't have to be strictly followed, BUT it is often beneficial to do so
- some guidance can be short, in form of a tip that can be read quickly, well remembered, broadly used AND even shared as daily/weekly advice
- some guidance can be just a reference/link/example, that can explain some hard topic
	- links for internal lib docs is great way to reduce duplication

Apply rules:
- types:
	- social:
		- docs - keep them up-to date
		- classes
		- code reviews
		- spreading rules via some info-channel
	- technical: linter, prettier, compiler etc
		- such tools will make process of enforcement scalable and predictable
		- some problems are purely social and vaguely defined, so it is impossible, costly or will result in flacky results
		- allow some rules to be chosen on per-project basis, if they aren't strict

#### Code Review
Code review is process of review changes to codebase, but non-author of change, before merging this change to codebase
- this can be interpreted in different ways, in Google this means that everyone is involved in process AND every change is involved too
- basically you need process(this chapter) AND tooling(later on)

process:
- if code is comprehensible and can be well understood by reviewer -> LGTM from any reviewer
- if code has LGTM + it is appropriate -> approve from code owner(gate keeper of some codebase)
- if code has LGTM + it compiles with style guide -> readability approve from readability expert
- \---
- self-review, more that one LGTM, review from single person who is readability expert and codeowner is used to add flexibility and scalability to process
- owners - keeping small number of documented, inside some file, codeowners, that act as gate keepers for some particular part of code, is a great way to introduce strict control for quality to each individual part, because it guarantees review from domain expert
	- such files is great way to document
	- by maintaining tree-like structure you could easily manipulate code on different levels, BUT don't bother too much people for review

benefits - while common benefits are understood, it is important to look deeper AND maintain important role of reviews, keep it as part of culture(not just nice sanity check, that is actually LGTM)
- code correctness:
	- check for: structure, design, bugs, tests, efficiency etc
	- the earlier you find bug the cheaper it would be
	- comments can't be opinionated(AT LEAS PRETEND `;)`)
- comprehension of code
	- basically code review is first every inspection of code, made by someone, other then author, THUS it is a way to understand if the code is comprehendable
		- it is crucial, because code is read more often, than written
		- from this perspective, reviewer should also be interested in code's health, meaning been it's maintainer
	- try to view all questions as valid AND worse considering, because they will happen again over time
		- this means that code might be too complex AND would benefit from some change
- code consistency
	- code will be read by others, refactored by automated tooling, SO it not only must be well understood, but also standardized
	- it is also used to ensure that code is "simple"
- psychological and cultural benefit
	- code review makes author think about greater good, disregarding their own style
	- also it is a great way to learn and receive criticism
		- so keep feedback itself radical, BUT in natural box
	- it is a way to mitigate impostor syndrome, by receiving positive feedback
	- it is a way to prevent too much of cutting corners
		- overall, keep your time to reflect on your changes before review
- knowledge sharing
	- don't hesitate to sprinkle some "FYI"s into your review process
	- process of knowledge sharing is bi-directional
	- also, using commit+MR+comment combination you can find some clarification on rationale behind the change
- \---
- benefits can apply for both sides of process
- notes:
	- keep process lightweight enough, so it is scalable
	- this benefits are so important, that it is worth to slow time-to-production of change rate AND keep this processes rather strict
	- don't strive for perfect code, approve if code makes codebase better

best practices (required so process is fast and smooth):
- be polite and professional
	- ask why something is done in such way, don't go to conclusion
	- keep discussion professional
	- accept author's view, if it has valid points
	- don't view code as yours
	- take your time to explain and argument your point of view ON PER COMMENT BASIS
		- don't resolve until agreed upon
- give feedback all at once
- respond as quick as possible
- write small changes
	- it is faster to review
	- it is easier to understand
	- review will be more qualitative
	- BUT, remember that:
		- small changes might hide larger picture
		- can be impossible (feature flags, trunk based development and proper processes can fix it)
		- set of small changes can be slower then one large
- write good description and commit names
	- include all changes into it, BUT keep it small
	- it will help with bug fixing
- keep number of reviewers low
	- it is just not worse it to have too much people review at once
	- but if you have several reviewers, try to focus on different things
- automate
	- static analysis, proper CI/CD, tests
	- you can even reject possibility of review, before all pre-commit checks are green

types of review (each type need to be treated differently):
- new code
	- evaluate if it will stand the time AND scale properly
	- before any large new code additions do design(or similar process, like: ADR, PRD etc)
		- code must be done by design
	- code must be tested
	- it must have defined owners AND proper docs AND proper CI/CD etc configs
- behavioral changes OR improvements
	- if code deleted - great, if not, check if it is improving the codebase
	- new code practices apply here too
	- tests must be green
	- if change is optimization - provide reasoning AND benchmarks
- bug fixes OR rollbacks
	- fix only found bug AND change tests to account for that bug
	- any change that can cause a rollback must be easy revertable and atomic
	- rollback can be also done by effected downstream consumer
- refactoring OR large-scale changes
	- some changes are generated by machine, BUT it still must be reviewed
		- low risk - owner of codebase
		- high risk - owner of codebase + owners of chunks
	- chunk owner can review only their chunks AND comment only on specifics of their code

#### Documentation
Docs are important process, that need to be built around proper tooling and processes, so it is easy and scalable to write docs from engineers to engineers
- lacking docs is often main pain-point in day2day work, THAT can't be fixed by PM, tech lead or teach writer
- without processes it won't be realistic to achieve good docs, LIKE it was with testing prior

documentation is beneficial cause:
- code is understandable
- onboarding is smoother
- objectives are clear
- it helps with establishing proper API/interface
- it helps with non-trivial places
- it makes public API looks more professional
- you can refer to the docs, instead of re-answering questions
- \---
- benefits aren't upfront, but will help future your and other maintainers in the future

it is hard to write docs, BUT we don't need to avoid it, we need to invest in tooling
- make it easy to write docs, BUT docs must be easy to read

documentation must:
- have rules, standards, like code itself
	- in general keep it close to the code(by rules, by location, by content, source control, reviews etc)
- be owned AND maintained
- have single source of truth AND avoid duplicates
- be easily searchable
- evaluate docs from time to time for been actual
- be fixable(or at least take tickets to be fixed) by reader
- (ideally) docs must be changed alongside the code

understand your audience:
- if it design document - focus on decision making, if it is guide - focus on explaining topic etc
- treat docs as test, not your main activity, BUT very important
	- remember, you don't need to be great writer, just try your best to express your knowledge
- keep level of explaining acceptable to your audience, BUT, if possible, appeal to broader one
- take your time to refine document(remove duplicates, condense etc)
- if possible: provide TLDR
- keep docs consistent
- keep public docs of public API separate from implementation docs

documentation types:
- document must have single purpose, which means conform to single type
	- keeping doc single-purposed will make it shorter, more readable and easier to maintain
- \---
- reference doc - doc that references code usage and adds description to it, often done as comments:
	- API - docs about API interface, can't assume deep knowledge of API, can't expose implementation details
	- implementation - in-depth details about implementation of code, used to transfer domain knowledge
	- ---
	- try using standard approach to docs: .h, JSDoc, PyDoc etc
	- guidelines:
		- TLDR at the top of the file
		- in consistent style AND in consistent amount comment as much as possible
		- for files: describe contents of a file on several lines; for class: describe what class intent and what it encapsulates; for function: describe what it is doing
	- it must be strict, clear and explain all details
- design doc - must be required for large project:
	- guidelines:
		- use predefined template (this template ensure that: all concerns are covered, intent is clear, problem is described, alternatives are covered)
		- such docs must be easy to collaborate on AND to review
	- use such docs as point that must be achieved(check this fact before release)
- tutorials:
	- onboarding
	- \---
	- focus on creating some onboarding tutorial, that will act as "hello world"(make person do something easy, BUT real)
	- write tutorials when you join team, so you could document your path OR fix existing docs, if they are present
		- avoid assumptions along the way
	- state every step that must be taken in tutorial, avoid assumptions about the reader
		- if steps done by user - focus on user, if steps done by some program - focus on program
- conceptual docs - addition to reference doc, that acts as explanation behind the hard concepts, related to API
	- focus on understanding, not covering each and every detail/edge_case
	- it must be clear for engineer of any level
- landing page - doc, that describes some general info and acts as hub, ex: team page
	- identify purpose
	- keep only links to docs, information must be at minimum
	- keep number of links low, by breaking landing into separate, themed landings

review of docs:
- keep each doc reviewed
- types of reviews:
	- technical - review technical aspects
		- done by engineers
	- clarity - review that doc is understandable by outsiders
		- done by person without domain knowledge
	- writing - doc is written in proper style AND with proper grammar
		- done by tech-writer (ideally)
	- \---
	- high profile doc must have all of them checked

philosophy(opinionated part, basically "how google does it"):
- before answering "how smth is done", focus on "who need to read", "what the purpose", "when it was reviewed, updated etc", "where the document is placed", "why this doc was written"
- break the flow of text to have beginning, middle, end
	- this makes doc easier to digest and take some knowledge from
	- don't be afraid to include some TLDRs in-between paragraphs to summarize key points
- choose two of three between: complete, accurate, clear, depending on type of the document
- deprecate old docs
	- delete OR mark as obsolete(ideally with link to new doc)
	- don't be afraid to comment that doc isn't working and leaving it
	- ideally create some auto notification system, so maintainer can know, that doc is been unchanged some time

teach writers:
- teach writers are expensive, so they can't write internal docs, this won't scale
- make devs write internal docs
- make TWs: write/correct external docs, maintain structure of overall documentation, be a domain knowledge library(person that can validate some decisions)

only you, as engineer, can solve docs problem, so:
- write docs
- keep it as part of culture

#### Testing Overview
Remember, that later bug is found, the more it costs, so developer-based tests is our everything
- also keep them automated, so any change won't produce large manual work
	- basically speed of change is locked by speed of test

notes:
- keep tests as part of the culture
- if you have no tests, introduce them to new or changed features gradually
- keep tests as part of CI/CD
- your tests will help others, so it is compounding benefits
- test in different environments
- focus on fixing red tests fast

how automated test is defined:
- by single behavior you are testing
- specific input
- observable output
- environment the test is running
- \---
- number of tests will form a tests suit, that can show bigger picture

benefits of testing:
- less debugging
- been confident about changes
	- especially while refactoring
- clear tests act as documentation of behavior
- if reviewer see that code covers all cases, he/she don't need to do mental execution of it
- bad-designed code can't be tested
- short release cycle

designing a test suit:
- e2e or similar tests are can be more pleasant to write, BUT they always be slower and flakier then units
- tests can be distinguished by:
	- size - instead of classical unit, integration etc you can focus on size, because smaller size is always leads to faster and more stable tests
		- the smaller is better
		- determined by: how it is ran, what is allowed to do, how many resources is consumed
		- sizes:
			- small: ran on single process(or even thread), can't have async/blocking operations
			- medium: ran on single machine, can't talk to external systems
			- large: ran on suit of machines, ran only while building or releasing changes
	- scope - how much code is been tested at once(not executed, because you can have large number of mocks been used)
		- the narrower is better(look for 85% units, 15% integrations, 5% e2e), because it is easier to understand, create and debug such tests
			- keep testing pyramid been pyramid, otherwise you can get bad coverage OR slow suits OR just discover a lot of errors at far "right" side of development
- tests must be as stable as possible, because, on large suits, statistics will be costly(.1% of 1000 tests is 10), so your engineers will loose time, energy and believe in tests
	- you can add retries to your suit, BUT it will cost you in CPU and time resources
	- invest in removing flakiness, by investigating+fixing bad tests, by investing in good infrastructure, that could mitigate non-deterministic aspects of software, by teaching engineers how to write good tests
- good practices:
	- isolate testing env as much as possible
	- make failing test as clear as possible
	- make test as simple as possible(avoid control flows)
		- rationale: you will need to test the test for been correct otherwise ;)
	- if you have rules, like google's "size rule", enforce them with tooling
	- cover as much as possible with test
		- as state prior, large scoped changes will be accepted, if suit is green, if something is failed it will be codeowner's responsibility to fix AND expand tests
	- test for all flows, even failures(ex: slow network, network outage, broken data etc)
	- look for coverage ONLY with units, avoid it elsewhere(because with units you focus on code, with higher levels you focus on behavior)
		- overall tend to test behavior, breaking changes(in dependencies too)
	- tests can't be brittle(break because of unrelated changed), it will cause friction in changes
	- keep tests as culture: award for good tests, plan their maintenance, introduce proper tooling, establish best practices, force newcomers to do them well(even if your culture is still in-progress and old stuff is learning), introduce social pressure via statistics etc
		- don't mandate tests, this will feel forced, better to show their benefits, so people start doing them on their own
	- block most of changes without tests
- slow tests will kill your velocity, SO keep them fast by:
	- reducing dependencies
	- using techniques to speed-up, like parallelism etc
	- avoiding arbitrary `sleep`s to wait for async result
		- it is also source of flaky :/, so use polling + timeout

limits of testing:
- hard problems are still need to be found by people, BUT they must be documented as test
	- it is easier to explore weak points of an app manually, find them, fix and document
- visuals(video, audio etc) better judged by human

#### Unit Testing
- fast and deterministic, often can be ran on single thread
- narrowly scoped to only code is been developed
	- it makes them easy to write, comprehend and debug
- easy and fast to write, increasing coverage
- serve as docs for specific component of system(function, class)

maintainability - topic, that has main focus on providing practices, that will make unit tests done in such way, that it is easy to understand them, fix AND will keep them non-brittle(so you don't need to change more tests, then you change code)
- preventing brittle - test fails, but no bug was introduces
	- overall, test need to be changed only if underlying behavior OR requirement has changed
		- refactoring - can't cause changes in tests
		- new feature OR bug fix - can't cause changes in old tests, new must be added
		- behavior changes - require test changes, but in narrow scope
			- often such changed should be avoid, as been breaking
	- test against public interface
		- this will easily spot any breaking changes to consumer of an API
	- test state, not interactions
		- testing what methods was called, their order etc will introduce brittleness AND often redundant, because you don't need to care how smth was achieved, but rather what was the result(state)
	- use real objects(if they are fast enough to suit testing needs), instead of mocks
		- this will help you avoid rewriting mocks OR will restrict your reliance on details, that mocks can provide

important part of good test is it's clarity, meaning how fast engineer can understand what is wrong when test fails:
- tests that is unclear will have no value, because future engineer won't be able to understand and use it
- keep tests:
	- complete - have all related info directly inside test
	- concise - have no additional info inside test
- test single behavior per test, not method(method can grow in complexity, introducing new behavior, BUT test can't grow or change)
	- such tests are easier to read AND understand
	- such tests map nicely to `given`, `when`, `then` framework
		- you can directly use this terms OR just structure your test as (at least) three blocks of code, separated by whitespace
	- name tests after behavior, so intent and problem are communicated
		- use nesting
		- name can include given, when, then parts in summarized way
		- be consistent in naming
		- optionally, start with "should", as a way to create some name, if you stuck
- avoid logic(operators, loops, conditions etc) in tests
	- such tests are harder, more error prone, need to be tested themselfs
- make error messages clear, so it is easy to understand what went wrong(actual result, expected result, relevant context)
	- it it is not possible in your framework - add clear messages yourself
- violate DRY, be DUMP
	- DRY is great, but ultimately harder to follow, because you need to reference single place AND harder test is worse test, so avoid it ;)
	- basically DUMP(Descriptive And Meaningful Phrases) stands for embracing duplication, if it introduces clearness
		- ex:
			- create builder, that will provide mocked object with default values AND ability to override each value in it, SO you could easily construct needed mocks AND avoid top level shared constants
			- use beforeEach/beforeAll/afterEach/afterAll to hide some repetitive initializations/clean-ups, AVOID putting there any important details
	- still, helpers and proper infrastructure need to be present, your main goal is complement DRY with DUMP, not replace it
	- avoid validator methods, that check large number of things and included in each test
		- this will lead to mass test failure, when change is introduced, BUT often failing tests won't be related to actual problem
		- exception is to introduce for...assert pattern, where you want to check single behavior against set of values

testing infra - shared utils for testing across project(s)
- must be treated as production code, meaning: properly designed, changes are done in non-breaking manner, must have separate test suit, non-authors of lib don't need to tweak it
- generally tend to use established frameworks, BUT you also can write a specialized one

#### Testing Doubles
Double is object, that can be used as substitute for some real object in a system, for testing purposes

use-cases:
- emulate behavior in light-weight way
- cause rare exceptions/cases
- check inner details(with what args function was called)

for doubles to be possible code must be:
- testable - real implementation must be swappable with a double
- note: double isn't always effective solution, it can cause brittleness, flacky OR false/positive(this is related to fidelity, meaning how much double differ from implementation)
	- note that fidelity don't need to be 1to1, just good enough

problem with mocks
- mock is a variation of double, that can substitute implementation with double in such way, that doesn't require dependency management
- to much mocks will cause brittleness and maintainability problems, SO prefer real implementation

basic concepts:
- to make your code more testable:
	- utilize some form of DI, where you provide dependency from outside
		- it can be done with direct passing of an argument OR via some utility
		- alternative approach, for loose languages, is to change methods of implementation on fly
	- use mocking framework
- types of doubles:
	- fake - lightweight re-implementation of real object
		- great for doubling complex things like DB, but faker itself must be good enough, so it is challenging to write AND might require additional testing
	- stubbing - substituting existing behavior with predefined one, like stubbing the return value
	- interaction tester - double that provides info about how, how much, when and with what function was called
		- often should be avoided to prevent brittleness, because it is implementation testing, not interface

testing with real object:
- it is more preferable way, because you don't need to worry about testability and fidelity, BUT it is not always possible to test this way
- such approach will help in finding bugs in dependencies, that aren't directly tested, THUS adding more value to test itself
- it is even beneficial to provide one existing stub, faker OR make your object easy to integrate into test, when developing something and mark it is as non-mockable via linter, this way, if you want to change implementation, you don't need to fix a bunch of mocks
- use real implementation for fast, reliable and simple dependencies
	- if you can't double un-reliable solution(ex: complex external service), run it in hermetic way as a part of current environment, that runs test, SO it is more stable
	- to increase reliability mock variances, like clock time etc
	- notes:
		- fast can be related to execution OR to build time
		- unreliable test == less fidelity
		- utilize existing factories, DI utils etc to construct real objects, when testing, for simplicity(when writing test AND when maintaining it)
	- ex: most value objects

faking:
- faker is best from all type of doubles, because it can sufficiently replace real implementation with fake one, but don't introduce too much brittleness OR unclearness, WHILE been more robust then real API
- faker must be maintained(usually be the owner of real implementation)
	- considering initial cost of development + maintenance you need to decide wether it worse or not to create faker, rather then using original implementation
	- often it is beneficial to create faker for root object(ex: fake DB. not individual classes, that call it)
		- you even can go further and create faker service, while it requires additional tests and maintenance, but it can be beneficial for multi-lang environment
- faker must behave identical for cases, that are been tested(ex: ID is autogenerated, when item is saved to DB)
	- if you can't guarantee that(ex: performance testing of latency) you should use real implementation
- faker must be tested, ideally in for of contract testing(faker and real implementation are executed side by side AND results are asserted with each other)

stubbing:
- problems: unclearness(additional context to keep in mind), brittleness(by exposing implementation), low fidelity, impossible to work with state
- stubbing is great when you need function to return specific value, so system will behave in some way
- avoid too much stubbing in general AND per single test

interaction testing:
- problems: unclearness, brittleness, implementation and interaction are tested instead of behavior and state, you need to make assumptions that underlying code works correctly
- use it when: you have no choice(real implementation is not sufficient AND no faker), you need to actually check how much times something was interacted with(ex: onClick was called only once per click)
- when doing interaction testing test only mutation functions, it is generally redundant to test query functions, because they have no side-effect that should be tested

overall, you need to properly balance usage of real implementation and doubles, based on specific trade-offs
- note that balancing issue related to small-medium size tests, you almost always will be using real implementation, when working with large size tests

#### Larger Testing
Larger tests can:
- be slow
- be nonhermetic
- nondeterministic
- \---
- all of this makes them less scalable AND they can't be used in a vacuum, proper layer of units is required underneath them
	- also it is harder to scale them, because such tests impact whole system, thus it is harder to find single owner AND make such tests standardized(because system can be highly different)

Larger tests are hard and costly to keep in good shape, BUT they are key for healthy software, because only this way you can be sure that your software is actually working and doing it properly
- basically with units you check that function is ok, with large one you verify that system is ok
- larger test is the best way to address:
	- fidelity problem with smaller tests, BUT it is quite risky to strive for perfect fidelity, because you need to tests directly on production, so something like staging is important and realistic test data are important things to use
	- improper mocks
	- proper configuration of final release
		- also, keep configs version controlled AND tests changes to it
	- performance testing
	- random data testing
- still, despite all the benefits, number of larger tests must be much lower, then units

recommendations:
- keep larger tests relatively small
	- in general, the smaller some thing, the more stable it is
	- one way to achieve this is to chain output of one suit as input of other suit
		- alternative is to use doubles, BUT it can introduce bugs, due to lover fidelity
- structure - you can write anything, but often common structure will emerge:
	- obtain system under test
		- system under test can be characterized by hermeticity and fidelity(both need to be high AND both clash together)
			- there are different variations: single process, single machine, multi-machine, shared env, hybrid(ex: run FE on single machine, but BE will be used from env)
			- you need to choose proper combination, based on trade-offs
		- running on shared env is easy(because you already have one), BUT there are several problems to it:
			- you need to deploy and impact env before testing is done
			- you need to lock env, while tests are performed, so it won't scale with time
			- you can expose testing data to user
		- separate tests:
			- when testing system, test BE separately, via API, from UI, don't use UI to test BE(this will always lead to brittle BE tests)
			- separate out calls to third-party apps too
				- it can be done either by mocking them OR using sandbox credentials
		- doubling strategies - it is possible to double even entire service, via:
			- (Google's approach) record server's output and re-use it in mocking manner, when test run need to be done faster(ex: on the branch)
			- establish contract, define mocks, use mocks when doing external tests AND when testing service itself(compare mock result and actual result)
	- seed data
		- types: seeded data, tested data
		- seeding is hard problem, because complex system may need:
			- initial data
			- quality and quantity of data
			- actual data creation can be hard, because it may depend on external checks via API
		- way to mitigate problem:
			- handcraft data on small scale
			- copy production data on large scale
				- if there are too much data - sample portion of it, that needed
	- perform actions
	- assert actions
		- types:
			- manual
			- assertions (check if result is equal to expected value)
			- A/B comparison (compare two results, often manually)

testing types - complex product need complex test suit, that will contain proper amount of each test type
- functional testing - test one or more binary
	- assertions, single machine, handcrafted data
- browser/device testing - special case of functional testing, but interaction is done not with functionality of binary, BUT with UI itself
- performance/load/stress testing - test how system behaves under critical load
	- A/B of performance, single machine, handcrafted/production data
	- it is important to be as similar to production in terms of data and env(ideally run A/B test on same machine) as possible
- configuration testing - smoke test to verify that app can be launched with given config
	- assertions, single machine, no data
- exploratory testing - look for new/atypical behavior inside system
	- manual verification, prod/stage env, prod/stage data
	- basically fuzzy testing done manually
	- remember: replicate found behavior with automatic tests + this process won't scale, so it is quite limited
	- it can be even done in a meeting, like live review of product
- A/B diff testing - find broader problems or test for Hyrum's Law(about observable behavior in contrast to defined API)
	- A/B comparison, two machines, prod data
	- you can consider Blue/Green with auto-rollback kinda A/B testing done live
	- you can do A/A OR A/A/B to eliminate flakiness
	- problems:
		- diff often need to be checked manually
		- noise can make result irrelevant
		- data can't be handcrafted on such scale
		- it is generally hard to setup
- UAT - unit test will check if code is doing what it implemented to do, NOT what it is intended to, so we ned acceptance test
	- manual checks/assertions, single machine, handcrafted data
	- it can be done manually OR in some easy to use testing framework, that can be used by non-technical person, that will be the end user, to write a test suit
- probers/canary analysis
	- assertions+manual checks, prod, prod
	- probers - health check, that written in form of smoke test, to verify if everything is ok overtime
	- canary analysis - blue/green with auto-rollback if there are spikes in metrics/logs
	- remember:
		- avoid probs that do mutations, because they can cause non-deterministic behavior or user-visible testing data
		- canary analysis went wrong == users were impacted
- disaster recovery and chaos engineering
	- manual verification, prod, handcrafted(with fault injections)/prod data
	- disaster recovery - break some part of your system, in simulation, and try to recover from this failure
	- chaos engineering - continuously introduce problems to system in such way, that can be reverted(ideally system should handle them)
	- both methods are quite costly AND can introduce severe problems, so be careful
		- especially be careful with mutations
- user evaluation - collect metrics from real user interactions and identify problems
	- manual checks, prod, prod
	- types:
		- dogfooding - rollout for very small subset of users
		- experimentation - A/B test on real users
			- highly data-driven approach
		- rating - A/B test on real user, BUT with additional prompting for rates(which version is better AND, maybe, why)
			- great for ML/AI

dev workflow integration - it is important to integrate tests properly into workflow:
- separate large test from other, BUT make them a requirement to release + notify author of change if something went wrong
- make reviewing A/B diff a requirement to merge
- make tests easy to write(tooling) and run(infra)
- keep suit fast:
	- break large one into several small and run in parallel
	- react as user would do - don't just wait N time and fail, incorporate:
		- polling, event subscription system
	- if service has long sleeps(may needed for distributed infra), make them shorter for test env
	- speed-up build via: not building all dependencies(if not needed), caching, splitting builds etc
- make test easy to debug:
	- provide contact info of direct owner of test
	- make it easy to trace error via some call stack tracing
	- use proper naming and assertion techniques
- assign owners to tests
	- otherwise: test won't be maintained AND/OR fixed
	- use CODEOWNERS to mark owners of code
	- use language-based annotations to differentiate between owners in larger suit

#### Deprecation
Deprecation is process of migration from obsolete system to new one, that includes turning old system off
- this topic is important, because you can reduce cost(running, maintaining etc) and complexity of system overtime this way
- it is important to plan for deprecation
- simultaneous number of deprecations can't be too high, it will lead to blockers
	- ideally deprecate one thing at a time

why?
- code is liability, that need to be maintained over time, SO it is important to evaluate wether it need to be deprecated or not, at some point
	- note: code is liability, BUT functionality inside of it is an asset, meaning that better code is easier and cheaper to work with, meaning your asset can thrive
- if you have newer version - deprecate the old one as soon as possible
	- basically, new system won't evolve, because old one will drain resources

problems:
- you need newer system upfront
- Hyrums law
- new system must be at least same by functionality, BUT better is better, because it will force migration in non forcing way
- deprecation can be hard to sell to stakeholders
- \---
- all in all, incremental deprecation is often way to go to mitigate this problems

when designing system think:
- how problematically customer migration would be
- will it be possible to partially migrate system
- how organization will deprecate it to mitigate reputational risks

types:
- advisory - low priority, so old system continues to exist, until priority is given to deprecate it
	- basically provide users with new system and, maybe, some migration tools, to encourage migration, BUT don't force, because there is no need(no deprecation is planned)
		- new system must have substantial benefits
	- note that encouragement won't result in mass migration, because there is no enforcement
- compulsory - high priority, so old system won't exist anymore after some hard deadline
	- it is better to form some team, with enough tooling and expertise to do large-scale migration, SO process is quick, less painful and avoids fiction
	- to find who is dependent on your system use metrics+logs, static analysis tools or even try to turn-off system on staging to see who will break

warnings - great strategy to prevent new user to depend on deprecated parts, BUT to be good they must:
- be actionable - ideally link to newer solutions, that will replace deprecated system
- be relevant - warning must pop-up when user directly interacts with deprecated stuff, not when function long in use, BUT it became deprecated

tooling:
- discovery - tools that allow to iteratively(initially, for calculating milestone, after some time passed) find who depends on current system
	- static code analysis, code search tools, logging and metrics, disable a dependency and watch who will fail
- migration - moving from one system to other
	- ideally should be done in automatic manner via code generation tooling AND then reviewed via version control software
- preventing regressions - way to force integration of new system, while old is been deprecated
	- deprecated annotations, warnings, click a button to auto-migrate(if possible)

notes:
- you can establish separate deprecation team to enforce deprecation, BUT other teams need to invest some time in deprecation too
- deprecation must be broken into meaningful milestones, with direct value to users, NOT just "kill the system" and that's it
- incorporate both policy and tooling

## Tools
#### Version Control and Branches
VCS is top tool, that been used in all companies, next will be told why AND what are possible strategies to use it

What is VCS?
- I am too lazy to fully note it here, go google or read original book ;)
- basically it is a tool to track changes, establish most up-to-date version AND prevent collisions between changes via some clever(or not) locking mechanisms

Why VSC?
- it enables collaboration and team work in parallel
- it introduces possibility to map any file just via name-> content, but also via name+time+metadata -> content+metadata
	- this enables tracking changes overtime AND over author(via metadata, that can be used to identify content OR go along with it)
- it is often a legal requirement, so you can't work without it ;)
- it can provide a point to run test, checks etc + reflect on your work AND let others do so too
- overall it is pretty problematic not to use it, WHILE been pretty cheap to do so

in general, choosing VSC is just a matter of preference, general idea and implementation is similar, BUT factors like centralized/distributed can play role in scaling, so:
- centralized - developer can have local copy of content, but repository is kept as source of truth somewhere on shared machine
- decentralized(ex: Git) - any clone/fork etc of repo is repo itself, that contains all metadata and can act in standalone matter OR can be merged into some centralized copy(this "main" copy is not really main, just enforced to be so by policy) in any given point of time
	- because of policies, decentralized repo often used in centralized manner(single source of truth + single branch), BUT with benefits, as local metadata etc
	- BUT having several sources of truth can be beneficial, imagine Linux repo AND Debian repo, Debian will have single source of truth for Linux, BUT it won't be the actual Linux repo, only the copy, that will be actualized with pulls from upstream
- \---
- overall, just use git + some cloud storage(GitHub, GitLab etc), BUT if you have some specific use-case, find alternatives
- for some large enough projects DVSC can be overkill, because copying whole monorepo+metadata can be just impossible task

managing branches - it is policy based activity, that can differ from company to company
- branch is some work in progress, that hasn't been committed to centralized branch yet
- dev branches - problematic practice, that was enforced to make "main" stable, by putting changes into one large batch, testing them and finally doing one large release
	- this problematic, because you put small changes with large changes, have several devs work on single branch leading to lower ownership and harder tests to fix, overall branch lives longer leading to more merge conflicts and riskier merges
	- this practice began, because merges were consider risky, SO we need to reduce their number(which will lead to more risks), better solution is trunk-based development with: "keep main stable", "keep main green", "CI/CD + test"
		- trunk-based development is overall good strategy, based on research
	- such practice will lead to resource drainage to merge large branches

Adding changes must be fast and easy
Owners must be forced via VCS
Ideally monorepo must share same version of used libs to prevent compatibility between apps inside
Dev branches must be short-lived to avoid merge complications, duplications of functionality OR several version of single thing co-exist in scope of several branches
- imagine including fix into several files across several branches
- good tooling will act as great enforcement

Be careful with promising hard compatibility, it will lead to feature that harder to develop
- enforce rebuild+redeploy practice, when you do it from time to time to all of your services

Use release branches when you need to have large releases(monthly etc)

You can use mono OR many - repo approach, both are great for certain cases, BUT you can't allow for multi-version of dependencies, ideall
- if every project in your organization has the same secrecy, legal, privacy, and security requirements, a true monorepo is a fine way to go. Otherwise, aim for the functionality of a monorepo, but allow yourself the flexibility of implementing that experience in a different fashion.
- monorepo can be hard to customize on granular level, so virtual monorepo might be a better choice, thus you keep same dependencies, WHILE having granularity

Managing package versions can be costly, so try to avoid it
- In some languages, you might be able to spend some effort to dodge this with technical approaches like shading, separate compilation, linker hiding, and so on. The work to get those approaches working is entirely lost labor—your software engineers aren’t producing anything, they’re just working around technical debts.

#### Code Search
Modern IDEs allow for grepping, cross-referencing etc of code, BUT browsing codebase is impossible in such manner, so you need something bigger
- you should have syntax highlights, cross-referencing, VCS support, working links to external tasks

why to use:
- find somethings
	- with possible: restrictions(lang, path), ranking, sorting etc
- refactor
- understand code
- link file to others
- browse related files(header, test, implementation)
- find examples
- find author of change(ideally MR should be linked here too)

why to have:
- pre-indexing
- avoid slower IDEs
- always up-to date
- code can be easily shared(often needed to: visualize dead code, prettify logs+alerts etc)

notes:
- ideal latency for search is around 200ms
- provide current context(viewed file etc) for better ranking
- progressive indexing is still painful problem
- ranking:
	- query independent(can be precomputed) - view rate, number of linked to something
	- query dependent(must be cheap and computed on fly) - boost filenames over file content(allow to manually filter), use fuzzy search, allow to filter by pathname/base/etc
	- aim to always retrieve definition and only then usage
		- can be done by applying modifications to original query and doing multiple requests
	- keep results diverse(func, class, different languages)
	- allow to prevent ranking at all and just use some sorting
- completeness (user must trust the results):
	- avoid large and non-readable files
	- fetch prioritized stuff first, BUT allow to fetch all
	- index VCS history too
- tokenization can't be used for code, because of it's semantics
- regex can be approximated as number of fast substring searches

In terms of tool impact, no one uses a tool that they don’t know exists, so it is also important to make developers aware of the available tooling—at Google, it is part of “Noogler” training, the onboarding training for newly hired soft‐ ware engineers. For you, this might mean setting up a standard indexing profile for IDEs, sharing knowledge about egrep, running ctags, or setting up some custom indexing tooling, like Code Search. Whatever you do, it will almost certainly be used, and used more, and in different ways than you expected—and your developers will benefit.

#### Build System
Build system must not frustrate, so engineers move quickly and with ease

Key features: fast, easy, reliable(env independent), automatable(for CI/CD, for large-scale testing of platform solutions)

As soon as we end up having to deal with code from multiple languages, multiple compilation units, libs etc, building code is no longer a one-step process

Good build system:
- manages libs
- descriptive
- presents cache
- covers env OR similar variables
- extendable(pushing, publishing(docs, libs etc))
- env agnostic(build can be done directly from VCS)

The idea of “I need that before I can have this” is something that recurs repeatedly in the design of build systems, and managing dependencies is per‐ haps the most fundamental job of a build system.

Most of modern build systems are task based, meaning you provide a set of tasks, how they depend on one-another and command to run all of it
- build system should calculate dependency graph, collect env vars etc
- The problem with such systems is that they actually end up giving too much power to engineers and not enough power to the system
	- so performance is lacking, complexity is rising
	- performance can be improved via restrictions, because:
		- it is easier to parallel less complex system
		- it will be possible to do incremental builds with additional info
			- you can let human decide what to rebuild, BUT better not to ;)
- watch for: depending on env(vars, utils), depending on non-deterministic processes, race-conditions, complex dependencies

Artifact-Based build system
- Engineers would still need to tell the system what to build, but the how of doing the build would be left to the system.
- Engineers would still need to tell the system what to build, but the how of doing the build would be left to the system.
- Many problems cannot be easily expressed using functional programming, but the ones that do benefit greatly from it: the language is often able to trivially parallelize such programs and make strong guarantees about their correctness that would be impossible in an imperative language.
- Reframing the build process in terms of artifacts rather than tasks is subtle but powerful. By reducing the flexibility exposed to the programmer, the build system can know more about what is being done at every step of the build. It can use this knowledge to make the build far more efficient by parallelizing build processes and reusing their outputs.
- such build system can treat tools as dependencies, that must be specified AND retrieved from specific source, thus every build is env agnostic
	- to be platform independent you can define several toolchains, to use per platform
- to be more Turring complete you can have some strict units of work(ex from Bazel is to have actions with strict input and output)
	- to prevent concurrency unitize sandboxing of environment
- to make deterministic builds with external dependencies use versioning AND/OR hashing, so you could store each dependency via VCS, BUT not actually keep it's contents
	- additionally mirror your dependencies

remote builds for scaling
- caching of artifacts
	- you must always guarantee deterministic behavior via hashing techniques
	- When configuring remote caching in your organization, take care to consider network latencies and perform experiments to ensure that the cache is actually improving performance.
- large builds can be done fully remotely(even for dev changes)
	- cache can become a central point of communication(read-through)
	- For this to work, all of the parts of the artifact-based build systems described earlier need to come together. Build environments must be completely self-describing so that we can spin up workers without human intervention. Build processes themselves must be completely self-contained because each step might be executed on a different machine. Outputs must be completely deterministic so that each worker can trust the results it receives from other workers. Such guarantees are extremely difficult for a task-based system to provide, which makes it nigh-impossible to build a reliable remote execution system on top of one.

Build systems are all about making code easier to work with at scale and over time.
And like everything in software engineering, there are trade-offs in choosing which
sort of build system to use. The DIY approach using shell scripts or direct invocations of tools works only for the smallest projects that don’t need to deal with code changing over a long period of time, or for languages like Go that have a built-in build system

Bazel recommends
- keep 1:1 rule when working with modules(each package need to be treated as buildable module)
	- if lang don't have standards try to be granular enough(so it is easy to maintain, BUT parallelism and rebuilds aren't killed by 1 single large module)
- have strict visibility(aka private/public declarations)
- avoid transitive referencing of linked symbols, use only directly dependent once
	- (a->b->c -> a->b & a->c)
- avoid automatic dependency management(ex: version 1.4.+), because you are loosing control
	- There’s no way to guarantee that external parties won’t make breaking updates (even when they claim to use semantic versioning)
- explicitly list transitive dependencies for external libs too for safety reasons(avoids diamond dependency problem)
	- it allows to scale easier
- to mitigate security issues with third-party libs create mirrors OR vendor directly source code from your VCS

Google has learned is that limiting engineers’ power and flexibility can improve their productivity.

#### Code Review Tooling
Good processes must be backed by great tooling
- great tooling is: simple, has great UI, don't slows down(ex: no unnecessary guardrails in UI), empowers communication(easy to make comments, code change suggestions), integrations(CI/CD etc)

If situation is critical software must allow for force-\[push/merge/deploy\] etc

Google's tooling is single purpose, so it can do one things and do it great
- ex: Code Review tool won't send email notifications, it just sends events, that other services can subscribe to

recommendations:
- show diff + all CI/CD stuff for author first, so you allow self-review
- include task linkage system
- diffing must be as precise as possible + allow for flexibility in settings
- include screenshot diffing for UI changes
- include possibility to switch versions of a file
- make code analyzer produce comment to fix, not just console output
- allow devs to optionally choose a team/group to review change, BUT actual reviewers should be picked at random(avoid bias, repetition, distribute load+knowledge)
	- look for: owners, familiarity, availability
- notify author+reviewers about state of review in different ways(can be picked by user)
- allow reviewer to mark files as reviewed
- provide quick variations of comment resolve actions(done, read, etc)
- allow for drafting comments
- highlight who need to act(what reviewers are not finished, is author need to resolve comments)
- dedicate a section to see what reviews are waiting for approval OR in progress
- provide info on what need to be done to get approve(who need to approve, how many comments left etc)
	- build trust, allow for approving with unresolved comments AND  not removing approve, after fix, for speed reasons
- provide a way to retrospectively view reviews

Time spent in code reviews is time not spent coding, so any optimization of the review process can be a productivity gain for the company.
Google greatly values the educational aspects of code review, even though they are more difficult to quantify.
Trust and communication are core to the code review process. A tool can enhance the experience, but it can’t replace them.

summary: just use self-hosted GitLab, it has everything and even more ;)

#### Static Analysis
Static analysis refers to programs analyzing source code to find potential issues such as bugs, antipatterns, and other issues that can be diagnosed without executing the program.
However, static analysis is useful for more than just finding bugs. Through static analysis at Google, we codify best practices, help keep code current to modern API versions, and prevent or reduce technical debt.
Static analysis is also an integral tool in the API deprecation process, where it can prevent backsliding during migration of the codebase to a new API.

###### Scaling
Instead of analyzing entire large projects, we focus analyses on files affected by a pending code change, and typically show analysis results only for edited files or lines.

Fixing a static analysis warning could introduce a bug. For code that is not being frequently modified, why “fix” code that is running fine in production?
- For this reason, we generally focus on newly introduced warnings; existing issues in otherwise working code are typically only worth highlighting (and fixing) if they are particularly important (security issues, sig‐ nificant bug fixes, etc.).

Anything that can be fixed automatically should be fixed automatically.

###### Users
User trust is extremely important for the success of static analysis tools
- so provide a way to give feedback
	- ideally integrate buttons to file a bug OR just provide quick feedback(good/bad), for metrics
- avoid false/positive rules
	- warnings must have clear messages AND correct level of "warning", so users won't ignore OR be frustrated by them
- provide a way for users to include new existing/custom rules, to prevent future bugs/problems etc

Analyze code, when review is submitted

Good checks:
- Understandable - Be easy for any engineer to understand the output.
- Actionable and easy to fix - The fix might require more time, thought, or effort than a compiler check, and the result should include guidance as to how the issue might indeed be fixed.
- Produce less than 10% effective false positives - Developers should feel the check is pointing out an actual issue at least 90% of the time.
- Have the potential for significant impact on code quality - The issues might not affect correctness, but developers should take them seriously and deliberately choose to fix them.

Suggestions:
- analyze file references in non-code places(docs)
- mark two files as such, that must be changed together
- post build warnings(binary size etc)

Customization:
- allow for tweaks in analyzers
	- BUT on project levels, so majority of devs agree on it in the first place
- allow plug-in style analyzers

Critical errors must disallow build entirely, BUT be fast enough to check(only correctness, ignore style/recommendations/warnings)
- no false/positives can exist here

Introduce partial analyze inside IDE for quicker feedback-loop
#### Dependency management
Dependency management is complex problem, because you can't control code, that you depend on AND that could break you

Dependency equals something, that you are using, but can't control, it can be external AND internal code as well
- not that it is better keep internal code as part of single repo and avoid dependency management, BUT it not always possible
 
main problem is managing large network of dependencies, BECAUSE it is hard to keep them compatible over time
- this can be seen in diamond dependency problem, where two used libs transitively depend on different version of some other lib
	- this is generally hard problem, that can be partially tolerated via dynamic linking, BUT working with types is impossible this way

Systems of policy and technology for dependency management largely boil down to the question, “How do we avoid conflicting requirements while still allowing change among noncoordinating groups?”

Reuse is healthy, especially compared to the cost of redeveloping quality software from scratch. So long as you aren’t downloading trojaned software, if your external dependency satisfies the requirements for your programming task, you should use it.

When we start considering time, the situation gains some complicated trade-offs. Just because you get to avoid a development cost doesn’t mean importing a dependency is the correct choice. In a software engineering organization that is aware of time and change, we need to also be mindful of its ongoing maintenance costs.

Lib can have different strategies of compatibility promises: compatibility in implementation details, API compatibility, no compatibility in-between major or eve minor version
- to mitigate infinite compatibility problem, you can provide migration scripts for your users
- none of this is about technical expertise: this is purely a matter of what a project does or does not promise and prioritize.
- basically you can use anything, BUT you always must consider time aspect, and breaking dependencies aren't going to work well
- when we move from programming to software engineering, those dependencies become subtly more expensive, and there are a host of hidden costs and questions that need to be answered

consider some questions:
- Does the project have tests that you can run?
- Do those tests pass?
- Who is providing that dependency?
- What sort of compatibility is the project aspiring to?
- Does the project detail what sort of usage is expected to be supported?
- How popular is the project?
- How long will we be depending on this project?
- How often does the project make breaking changes?
- How complicated would it be to implement that functionality within the company?
- Who will perform an upgrade and maintain dependency?
	- it is especially important, when you use monorepo and every-one can re-use your newly added dependency
- How difficult do we expect it to be to perform an upgrade?

It is easier to work in single repo, because you can easily detect breaking changes prior to release AND no versioning is needed

The more that the package remains stable(not updated),the more that we are likely to accrete Hyrum’s Law problem, when updating

A stable dependency-management scheme must therefore be flexible with time and scale: we can’t assume indefinite stability of any particular node in the dependency graph, nor can we assume that no new dependencies are added (either in code we control or in code we depend upon).

Solutions:
- The simplest way to ensure stable dependencies is to never change them: no API changes, no behavioral changes, nothing. Bug fixes are allowed only if no user code could be broken.
	- this is where every organization starts: up until you’ve demonstrated that the expected lifespan of your project is long enough that change becomes necessary
	- In this model, version selection is simple: there are no decisions to be made, because there are no versions.
- The de facto standard for “how do we manage a network of dependencies today?” is semantic versioning (SemVer).
	- a changed major number indicates a change to an existing API that can break existing usage, a changed minor number indicates purely added functional‐ ity that should not break existing usage, and a changed patch version is reserved for non-API-impacting implementation details and bug fixes that are viewed as particu‐ larly low risk.
	- it is easier to calculate compatible version in diamond problem, BUT not always possible and can be resource intensive, given large number of dependencies
	- SemVer solutions to dependency management are usually SAT-solver based. Version selection is a matter of running some algorithm to find an assignment of versions for dependencies in the network that satisfies all of the version-requirement constraints. When no such satisfying assignment of versions exists, we colloquially call it “dependency hell.”
	- SemVer is unstable AND it is never safe to assume that update won't break you, due to
		- just Hyrums Law
		- A change in isolation isn’t breaking or nonbreaking—that statement can be evaluated only in the context of how it is being used.
		- not been granular enough(always bump on breaking change is not enough)
- Bundled distribution - depend on stable bundle with N dependencies in it, labeled as some sing-number version
	- it is great for end-user, BUT still requires dependency management under the hood
	- ex: Linux distros
- We call this model “Live at Head.” It is viewable as the dependency-management extension of trunk-based development: where trunkbased development talks about source control policies, we’re extending that model to apply to upstream dependencies as well.
	- Live at Head presupposes that we can unpin dependencies, drop SemVer, and rely on dependency providers to test changes against the entire ecosystem before committing.
	- Break should be made only after either the downstream dependencies are updated or an automated tool is provided to perform the update in place.
	- Changes in a Live at Head model are not reduced to a SemVer “I think this is safe or not.” Instead, tests and CI systems are used to test against visible dependents to deter‐ mine experimentally how safe a change is.  

Go and Clojure both handle this nicely: in their standard package management eco‐ systems, the equivalent of a major-version bump is expected to be a fully new pack‐ age. This has a certain sense of justice to it: if you’re willing to break backward compatibility for your package, why do we pretend this is the same set of APIs? Repackaging and renaming everything seems like a reasonable amount of work to expect from a provider in exchange for them taking the nuclear option and throwing away backward compatibility.

One possible algorithm of SemVer is MinimumVersionSelection, where you select the lowest possible version, to still update, but as least as possible, in order to prevent more Hyrum's Law

Scale tends to be the thing that shows the weaknesses in SemVer.

Theoretically it is possible to run external CI tests, to verify that your update, statistically, won't break people

providing dependencies:
- we need to think about the benefits, costs, and risks of providing software, for both us and our potential dependents.
- There are two major ways that an innocuous and hopefully charitable act like “open sourcing a library” can become a possible loss for an organization. First, it can even‐ tually become a drag on the reputation of your organization if implemented poorly or not maintained properly. As the Apache community saying goes, we ought to priori‐ tize “community over code.” If you provide great code but are a poor community member, that can still be harmful to your organization and the broader community. Second, a well-intentioned release can become a tax on engineering efficiency if you can’t keep things in sync. Given time, all forks will become expensive.
- “Don’t release things without a plan (and a mandate) to support it for the long term.”
- Releasing APIs of any sort exposes you to the possibility of competing priorities and unforeseen constraints by outsiders.
- External users of an API cost a lot more to maintain than internal ones.

#### Large-Scale Changes
There are some principles and strategies, that allow doing large-scale changes in such way, that prevents disruption (and even possible), when working with large code-bases

Before going much further, we should dig into what qualifies as a large-scale change (LSC). In our experience, an LSC is any set of changes that are logically related but cannot practically be submitted as a single atomic unit.
- worth noting, that described practices can be scaled down
- Cleaning up common antipatterns using codebase-wide analysis tooling
- Replacing uses of deprecated library features
- Enabling low-level infrastructure improvements, such as compiler upgrades
- Moving users from an old system to a newer one

Most of LSCs are pure refactoring

Centralizing the migration and accounting for its costs is almost always faster and cheaper than depending on individual teams to organically migrate

In our experience, organic migrations are unlikely to fully succeed, in part because engineers tend to use existing code as examples when writing new code.

LSCs can seems not so important by itself, BUT, on scale, you will gain happiness and development speed increase, so it is often worth it

Keep system as consistent as possible to enable LSCs

Not all changes are worth it (especially if error will be reproduced back to code base, like typos)

Atomic commit, that contains all the changes won't work because:
- VCS, infrastructure etc might not handle so much change at once
- merge conflicts + possibility to miss additions of deprecated code
- any change is harder on scope, because it affects larger number CI/CD, envs, langs etc, thus brining additional problems
- number of impacted tests can be impossible to run & fix through (and impossible if you trigger transitive test runs)
- number of reviews is hard to deal with
- it is impossible to do atomic commit across several repos

###### Practices
run tests in train way(ex: stack several LSCs in one suit)
- it is possible, due to single LSC been very narrow in scope of single file AND mostly correct

The train has five steps and is started fresh every three hours:
1. For each change on the train, run a sample of 1,000 randomly-selected tests.
2. Gather up all the changes that passed their 1,000 tests and create one uberchange from all of them: “the train.”
3. Run the union of all tests directly affected by the group of changes. Given a large enough (or low-level enough) LSC, this can mean running every single test in Google’s repository. This process can take more than six hours to complete.
4. For each nonflaky test that fails, rerun it individually against each change that made it into the train to determine which changes caused it to fail.
5. TAP generates a report for each change that boarded the train. The report describes all passing and failing targets and can be used as evidence that an LSC is safe to submit.

###### Infra
policies and culture:
- reviews must be enforced to keep quality of LSCs
- large number of people must be involved in review of LSC to make it possible
- trust must be build between LSC's author and owner code. Owner must understand the reason for change, BUT can't have veto over it. Create FAQs to prevent some questions
- language or domain expert can have veto over changes
- testing culture
- chosen language: dynamically typed is harder to refactor
- LSC have no soul to it, so it is ok to revert or reject ongoing one

tooling:
- AST based tooling to do changes
- it must be 100% correct
- it must be possible to run it on any scale, without breakage
- all large changes must be done through tooling
- tooling to split single LSC, test and process review of smaller parts
- testing infra + possibility to test each LSC shard
- auto-formatting(independent process from LSC)

###### Process
At Google, we aim to design successor systems with a migration path from older systems in mind, so that system maintainers can move their users to the new system automatically

authorization
- fill docs: why, what will be impacted, FAQ, estimations
- get approval from committee (committee can help with: local conflicts, connecting with right experts etc)

change creation
- must be mostly automatic, BUT, for sake of speed can be done by mass-labor
- auto-apply formatting

shard management
(restricted by infra resources to prevent locking of system)
- break change into shards. Keep dependent parts in shared shard and independent in different
- test (poor, flaky of non-existent tests are crucial pain-points here). Flaky tests can be ignored
- pass project specific checks (they can't be flaky)
- assign reviewers(via OWNERS files). Such reviewers will do basic check AND get knowledge transfer, BUT actual approval is done by "global" reviewer(basically we have single author of LSC and single reviewer, both must use tooling to do their job)

cleanup
- mark deprecated stuff as deprecated(or bad practice as bad etc) to prevent the need of second LSC

Making LSCs means making a habit of making LSCs.

#### Continuous Delivery
Given how quickly and unpredictably the technology landscape shifts, the competitive advantage for any product lies in its ability to quickly go to market. An organization’s velocity is a critical factor in its ability to compete with other players, maintain product and service quality, or adapt to new regulation.

Work that stays in progress for a long time before delivering user value is high risk and high cost, and can even be a drain on morale

A core tenet of Continuous Delivery (CD) as well as of Agile methodology is that over time, smaller batches of changes result in higher quality; in other words, faster is safer.

Core principles:
- Release frequently and in small batches
- Reduce or remove repetitive overhead of frequent releases via automation
- Strive for modular architecture to isolate changes and make troubleshooting easier
- Measure key health indicators like crashes or latency and keep improving them
- Data-driven decision making, use A/B testing on health metrics to ensure quality
- Roll out changes to a few users before shipping to everyone

Slow release rate is deadly to company

If your releases are costly and sometimes risky, the instinct is to slow down your release cadence and increase your stability period. However, this only provides shortterm stability gains, and over time it slows velocity and frustrates teams and users.

Modularity will always increase velocity

To keep large changes possible introduce feature flags
- flag can hide some feature, until it announced
- flag can be used to do roll-outs

Remember:
- release will never be perfect, often just good enough. "Good enough" must be tracked via metrics AND reverted, if metrics are abnormal
- release must be as fast as possible to make it real to: meet deadlines, release hot-fixes
- avoid bloat, it not only makes your app slower and harder to use, it also makes release and development more problematic. Use A/B to determine if feature is needed in first place

Keep CD configurable:
- make it possible to release: daily, weekly, after merge
- make it possible to release app modularly, ex: don't release Linux drivers for Windows release

It is not possible to test on all platforms, versions etc, so:
- pick most popular targets
- do gradual roll-outs
- use metrics
- do A/A/B tests to reduce statistical errors

Often releases allow for faster verification if change is ok AND, if not, also for easier debugging

When making trade-offs, the passion and urgency a developer feels about launching a new feature can never trump the user experience with an existing product

Keep stage as prod for better and more realistic pre-release testing

#### Compute as a Service
Managing the problem of "where to run my code"

Manual solutions never work, especially at scale, so automate:
- deployment
- scaling (in general giving human a control to parameters is bad idea, due to evaluation problems AND slow update rates)
- monitoring
- auto-restart of service (try to auto-heal the process)
- auto-alert when somethings isn't ok

Using one machine per one program is wasteful, so virtually divide single machine in such way, that each program can have isolated space, that can be dynamically reallocated
- always hard-limit shared resource to some limit to prevent failure of neighbors on same machine
- provide isolation of space, so dependencies and data of programs won't collide

Actions that, at a smaller scale, could be manual, will need to be automated to avoid a collapse of the organization under the load.

Assign load or processed data dynamically, so you account for potential failure of workers
- this avoids error been sent to users, rather it will be gracefully handled
- this allows for graceful shutdowns of service

State management:
- any long-lived data must be stored persistently outside of your workers
- persistent storage must be replicated to avoid outages
- use cache to decrease latency, NOT load, thus making sure that dead cache won't kill entire system (ideally)
- pre-heat cache
- use batch writes (when you ok to loose some OR can re-create them)

Service discovery - how one service will find other:
- service discovery must be done once on start-up AND re-done on failures
- add retries
- include load-balancing

When doing retries on write, don't forget about idempotency

one more case for idempotency: two replicas performing the same work and serving the same role are another potential source of request duplication.

Create resource quotas per dev, to avoid accidental consumption of too much resource, for some tasks

Container is great way to abstract and isolate program from outside world

A filesystem abstraction of some sort also helps with dependency management because it allows the software to predeclare and prepackage the dependencies (e.g., specific versions of libraries) that the software needs to run. Depending on the soft‐ ware installed on the machine presents a leaky abstraction that forces everybody to use the same version of precompiled libraries and makes upgrading any component very difficult, if not impossible.

Don't forget that stuff inside OS is dependency too, so it must be included (ex: UNIX commands won't work on Windows)

Keep architecture as unified as possible to make it easy to migrate, change, expand

Prioritize serving jobs over batch jobs, because first has latency as priority

Graceful shutdown is as important as graceful kill of worker, if possible

Use standardized language to do configurations

Choosing compute as service is hard due to: general Vendor lock-in, Hyrums law, tooling, custom configs, re-education etc

When creating tooling always think about what you want: limit users OR give them more possibilities, but make it more problematic to introduce new behavior

###### Serverless
A way to purely run your code as isolated operation, without need to deal with server at all

pros:
- autoscaling with possibility to scale to 0 and not consume resources
- autoscaling is fast and granular
- no need to control env

cons:
- no state at all
- can't control env

All in all, utilize mix of both, but remember that serverless might not scale well in future

###### Other
An organization using a public cloud is effectively outsourcing (a part of) the man‐ agement overhead to a public cloud provider. For many organizations, this is an attractive proposition—they can focus on providing value in their specific area of expertise and do not need to grow significant infrastructure expertise. Although the cloud providers (of course) charge more than the bare cost of the metal to recoup the management expenses, they have the expertise already built up, and they are sharing it across multiple customers.

Additionally, a public cloud is a way to scale the infrastructure more easily

One significant concern when choosing a cloud provider is the fear of lock-in
- to mitigate containerize everything AND be ready to migrate
- Two extensions of that strategy are possible. One is to use a lower-level public cloud solution (like Amazon EC2) and run a higher-level open source solution (like Open‐ Whisk or KNative) on top of it. This tries to ensure that if you want to migrate out, you can take whatever tweaks you did to the higher-level solution, tooling you built on top of it, and implicit dependencies you have along with you. The other is to run multicloud; that is, to use managed services based on the same open source solutions from two or more different cloud providers (say, GKE and AKS for Kubernetes). This provides an even easier path for migration out of one of them, and also makes it more difficult to depend on specific implementation details available in one one of them.

