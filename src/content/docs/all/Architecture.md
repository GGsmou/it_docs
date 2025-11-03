---
title: Architecture
---
>Architecture is way to separate and abstract direct integration with machine, like HTTP request, from business needs

## Base principles for good architecture
- Have general naming, that can be understood not only by devs
	- example: AccountSelect - selector for Account entitie
- Use: DRY, KISS, SOLID, GRASP, GOF, OOP, MVC

## Design Patterns
Pattern is a typical solution to common problem, that acts as customizable blueprint, meaning it can be changed to particular situation
- it is not an algorithm with defined steps, but more like high-level concept
- pattern consist of:
	- intent - briefly about problem and solution
	- motivation - deeply about problem and solution
	- structure - describes how each part of patter interacts with each other
	- example in code
	- applicability
	- relation with other patterns

Firstly, in popular media, patterns arrived with GoF book
- historically, they were supposed to be used with Object-oriented design, but nowerdays, that's not the only case

It is good to know and remember about patterns, caze they are like a toolkit to your work
- pattern can also give an idea to how to approach not connected problem to it
- it is important part in dev-to-dev communication, like common language

be careful with patterns, caze they can bring to you:
- over abstraction
- inefficient solution(when used without adaptation)
- using pattern, where simple solution is enough
	- > If all you have is a hammer, everything looks like a nail.

patterns differ by complexity:
- idioms - low-lever pattern, often bonded to single programing language
- architectural - high-level patterns, that can be used in many languages and used as base for application design

patterns differ by intent:
- creational - provides flexible and reusable object creation mechanisms
- structural - provides flexible and reusable object combination mechanisms
- behavioral - provides ways of how to effectively build a communication between objects and how to assign their responsibilities

## Code Refactoring
Generally refactoring is systematic process of improving code, without creating new functionality
- it is preferable, when this process makes codebase better and resolves tech debt ;)
- good tests for codebase will make refactoring safer

- dirty code can rise because of many reasons: inexperience, tight deadlines, mismanagement, shortcuts
- clean code is kinda subjective term, but generally it can be viewed as
	- readable and can be easily understood
		- good naming
		- non-bloated classes/methods
		- no magic
	- maintainable
		- no duplications
			- it is about DRY, but also about situations, where you need to add update to feature and it is results in change in every corner of codebase
		- keep it short and simple
			- less bugs, less parts to maintain
	- covered with tests
	- makes final product higher quality and easier to develop

tech debt is a term, that originates from banking, where you can take a loan to move faster, but too much interest from loan will slow you down(or kill)
- causes:
	- business pressure
	- lack of experience
	- monolith-like structure of code
		- slows down development, can cause breakage in non related parts
	- no tests
	- no documentation
		- slows down onboarding, can kill project if too many core maintainers left the team
	- lack of peer-to-peer interaction
		- some people may work with outdated techniques or even worse, onboard new people by them
	- long development in separate branches
		- trunk based development is key to moving fast
	- delayed refactoring
		- some parts of a project will become rusty overtime, if not refactored in time, they cause more debt, because other parts are based on them
		- it is also harder to onboard, when different parts of codebase look/work in different ways
	- lack of monitoring
		- leads to devs writing code as they want

to determine whether to refactor you can use some rules:
- rule of three
	- doing for the first time just get it done
	- doing smth similar for the second time just do it anyway
	- doing smth similar for the third time start refactoring
- when adding a feature try to refactor a bit, so it is easier to work with code
	- it is generally good advice to improve code, that you work with/close to
	- it is also useful with bug fixing, case some refactoring can eliminate bugs
- when reviewing
	- works better with pair-reviewing

general advises of how-to refactor:
- do it in small portions
- do it in background(if possible), so there is no need to sell it to the management

check-list if you done a good job:
- code should become cleaner
	- it can be not, when working with large chunks of code in tight timings
	- when working with too bad code
		- it might be better to start rewriting, BUT you need to have tests for code + good amount of time
- try not to mix feature development and refactoring
	- in span of commit, when working on feature
	- in span of MR, when refactoring only
- tests must pass
	- this is obvious, BUT other aspect to it, rather then bug, is the you need to refactor your tests too

#### Code Smells
Code smell is indicator of some deep/shallow problem in code, that can be spotted and addressed, while refactoring

- bloaters - methods/classes, that are so big, it is hard to work with. Evolves overtime with project's grows, so don't forget to kill monoliths :)
	- long methods - too many code for one function
		- be careful with adding to much code into one method
		- to fix break code into separate functions by behavior with descriptive names, so there is no need to read how it is implemented
			- conditional parts is good sign of what can be extracted
		- payoffs: easier to understand and maintain, less code duplication
	- large classes - class contains too many methods and fields
		- be careful with infinite class expanding
		- to fix break classes by functional, use subclassing
		- payoffs: less mental overhead and code duplication
	- obsession with primitives - using primitives over small objects for complex data(currency), constants for info or as field names
		- be careful with adding a bunch of primitives, that simulate a data type
			- better to create a real class, that logically groups this fields and methods, that operate on them
		- be careful with storing map+key strings inside class to accessing some additional data
			- better to create a separate class or expand current class's interface
		- payoffs: flexibility, better understanding(data incapsulated with methods and described by class name), less duplication
	- long parameter list - over 4 parameters for a method
		- long parameter list can signify about:
			- too much behavior for one class
				- juts break it into parts
			- incorrect data manipulation
				- often method must receive data from it's class
				- if no needed data is in class:
					- you can receive it by calling some external method
					- you should pass it as whole object, rather then breaking into parts
						- increases understanding, but be careful with passing whole object, when we need 1-2 fields from it, because it is preferable to pass as little info as possible for flexibility, in order not to cause too much dependency
					- if you need to much data aggregation change parameter list to one object
			- payoffs: shorter and readable code, less code duplication
	- data clumps - turn similar set of variables/parameters into classes, instead of keeping them as is(also can be result of breaking whole class into separate fields and passing them partially)
		- often result of copy-paste
		- do it when it logically make sense
			- also good idea when behavior can be extracted too
		- payoffs: better understanding and organization of code, encapsulation
			- be careful with increasing dependency between classes
- abusing OOP - incomplete/incorrect OOP principles usage
	- switch statements - too complex `switch` or `if/else` sequences
		- it is often better to use polymorphism or Strategy instead of switch
		- also long conditionals are signals of bloated method, so break it
		- payoffs: avoid shotgun problem(also can be done by incapsulating switch), code organization
			- avoid when: switch performs simple operation, in Factory
	- temporary field - some fields are not always needed(or needed for one method as parameters), so often can be empty of harmful
		- causes problems, with fields with strange meaning and not value
		- extract this methods into separate classes, or introduce this fields as parameters
		- payoffs: better code clarity and organization
	- refused request - unused/unimplemented inherited methods
		- cause problems with incorrect hierarchy and arrives from need to just re-use superclass's methods, without close connection between class and subclass
		- to fix this, without introducing duplication use delegation of work to other class
			- if inheritance is correct, just extract unused methods from superclass and put into sibling class
		- payoffs: code organization and understanding
	- alternative classes with different interfaces - classes have same functionality, but different method naming
		- arrives from lack of communication
		- to fix
			- rename methods
			- inherit from same interface or move duplicated logic into superclass
			- delete unneeded class(optional)
		- payoffs: less duplication, easier to read and understand
			- be careful with over engineering and merging classes, where the is no scenes to it
- change preventers - it is harder to introduce new functional, because change in many other places is needed
	- divergent change - when changing one class, many changes to class's unrelated methods are needed
		- comes from copy-paste programing, pure abstractions and structure
			- introduce abstractions to your code
		- payoffs: less code duplication, faster development, better organization
	- shotgun surgery - when changing one party of code, many changes to other parts are needed
		- be careful with splitting code too much
		- to fix:
			- add common interface OR delegate work
			- place logic tighter(encapsulation)
		- payoffs: less code duplication, faster development, better organization
	- parallel inheritance hierarchies - when extending one class, you need to create similar extension to other class
		- to fix: merge hierarchies into one, use delegation
			- be careful with merging and avoid bloated code
		- payoffs: less code duplication, faster development, better organization
- dispensables - parts of code that not really needed and can be avoided
	- comments - explanatory comments
		- arrives when comment is needed as explanation
			- better to rewrite/rename function to something easier to understand
			- better to break expression into smaller expressions
			- better to move code section into separate self explaining method
		- still comments are useful to point to some intricacies or explain "whys"
		- payoffs: duplication(need to change code and comment)
	- code duplication(DRY) - when separate chunks are almost identical
		- arrives from lack of communication or time constrains
		- to fix:
			- extract code into functions
			- pull up method to superclass
			- change same algorithms with different implementations to better one
			- use Template pattern
			- merge code with adding conditional behavior(be careful with this to not bloat helper function)
		- payoffs: better maintenance and readability
	- lazy class - each peace of code costs time to maintain, so code that don't do much must be deleted
		- arrives when class lost most of it's functional after refactoring, no longer used etc
		- to fix merge code(collapse hierarchy or inline class)
		- payoffs: better maintenance and readability
			- be careful with bloating code or removing some code that will be used a bit later
	- data class - class that contains only data fields + getters/setters with no additional behavior
		- problem comes from breaking encapsulation and keeping all related logic outside of class
		- to fix: move related methods into class, make some fields private(if needed)
		- payoffs: less duplication, better code structure and understanding
	- dead code - any unused code(usually signal of obsolete code)
		- happens after big changes or when some conditional becomes unreachable
			- it is important to spot such places and clean codebase, because dead code requires maintenance too, while been unused
		- to fix: use IDE to spot dead parts, inline logic, collapse hierarchy
		- payoffs: better codebase support
	- speculative generality - code that unused at the moment, but created "for future"
		- just delete dead code and don't create new because JUST IN CASE :)
			- when working on lib it is ok to include some functionality, used only by users and not by lib itself
			- it is ok to keep some code, for testing purposes
		- payoffs: better codebase support
- couplers - excessive coupling or too much delegation between parts of code
	- feature envy - methods works more with other class's data, that with it's own
		- usually happens when data moved to data class, without behavior
			- it is ok to ignore, when behavior splitted from data on purpose(Strategy pattern fro example)
		- to fix: move method fully to other class, move method partially
		- payoffs: less data duplication, better code organization(encapsulation)
	- inappropriate intimacy - class interacts with internal method/fields of another class
		- too mush interaction between classes may be a sign of coupling, it is preferable to keep as little interaction as possible
		- to fix:
			- move methods from one class to other, if appropriate
			- use delegation for not connected classes
			- use inheritance for connected classes
		- payoffs: simplification of code, better reusability and support
	- message chains - to get some data a chain of aggregation requests need to happen
		- problem is that change in chain result to change in client
		- to fix: use delegation, restructure the code
			- be careful with not over hiding logic with delegation, it is important to keep clear how data is moving
		- payoffs: less bloat and coupling
	- middle man - we don't need class, that only do delegation to other classes
		- happens with aggressive fixes to message chains smell OR when breaking logic from class, but keeping it as a shell
		- to fix just kill this middle man
			- do it when appropriate, sometimes it used to avoid interclass dependencies OR with patterns like Proxy, Decorator
		- payoffs: better understanding of code
	- other
		- incomplete library class - foreign library need changes, but it is impossible to do so(library is read-only)
			- to fix: extend library(big changes), add custom overhead of logic(small changes)
			- payoffs: no need to create own library when you can extend existing one
				- be careful with this, because now you need to maintain your changes

#### Refactoring Techniques
Refactoring Technique is step by step guide on solving some problem. It can have it pros and cons, so should be applied with caution

- composing methods - techniques to group methods, break large methods and remove code duplication
	- extract method - extract logical part of function into other function and perform a call to it
		- why: to keep functions easier to understand, reuse and compose, with additional code isolation
		- be careful with introducing too much small methods
	- inline method - merge methods together
		- why: to make code easier to read(no need to do context switching), no need to keep too short methods
		- be careful with coupling too much code into one place
	- extract variable - if expression is hard to understand create a better name or break into parts, that can be easily combined
		- why: make conditional, arithmetics and string manipulations easier to understand
		- keep names long and expressive
		- be careful with introducing too many variables
		- compiler optimizations will be lost
	- inline temp - if variable is not storing result of heavy operation or used as explanatory it is ok to inline it
		- why: less bloat
	- replace with temp query - move temporary variable to separate method and get it by calling it
		- why: keep common variable separate from places it is used to avoid duplication, code readability improvement
		- be careful with heavy operation(cache can be introduced tho)
			- it still can heart the performance, because we are doing calls to functions, BUT you are using react and 300 libs for DX, so don't worry ;)
		- usable only if variable is constant and calls to method won't change state
	- split temp variable - avoid variables with intermediate values and keep 1 value to 1 variable ratio
		- why: it is always hard to refactor code with global state, single responsibility, better understanding(each value has a name)
	- remove assignments to parameters - it is generally bad practice to reassign parameter, just create new variable
		- why: loosing original value, unexpected cases when passing new value instead of original one(basically problem with state), single responsibility
			- situation is even worse when working with references
	- replace method with method object - to break complex method with interconnected local variables you can change it to class with variables as fields and easily break
		- why: easier and smaller methods, less duplication, problem is scoped to class, no need to pollute original class
		- be careful with introducing small unneeded classes
	- substitute algorithm - if method implementation is changing, but interface stays the same, just change implementation
		- why: it can be easier to kill and rewrite bad method, better or already made solution may be found(we don't need to change interface and do big refactoring to incorporate library)
		- be careful and keep return values identical
- moving features between objects - methods to safely reorder code in your program
	- move method - if method is mostly used in other class, just move it here and use by reference
		- why: keep classes internally coherent, lower dependency
		- it is ok to: move a bunch of methods together, rename them, delete methods in old places and entirely use delegation
		- keep an eye on class relationships and use polymorphism/etc if needed
	- move field - if field is mostly used in other class, just move it here and use by reference
		- why: keep field and it's users close, lower dependency
	- extract class - if one class do two things, just break it into two
		- why: single responsibility, class is easier to change and maintain
		- don't over break classes, the is no need in 100 too small classes
		- don't forget to change name of original class
		- it is ok to make second class private and expose it via first class
	- inline class - class is only used in one place and do almost nothing, so there is no need to keep it
		- why: don't keep unneeded classes, make code easier to understand, optimization
			- happens after partial refactor
	- hide delegate - client gets info from one class and passes to other class, thus depending on both, so you can pass this dependency to one of the class and make client do one call
		- why: remove dependency between both classes and client(make only classes depend on each other)
		- be careful with introducing Middle Man problem, do it when only classes are dependent on each other
	- remove middle man - class consists of methods, that only call other methods, so they can be removed
		- why: there is only delegation logic and no overhead to it so no need to add complexity and dependency between classes, remove need to add delegation to each new method that was created
	- introduce foreign method - if one class don't contain useful method, just add this helper method to some related class and pass instance of class, that needs to be extended
		- why: remove code duplication
		- note:
			- it is ok to locate code in sub-optimal space(but it may be confusing, so comments are welcome)
			- if you need to do several foreign methods, it is better to fully extend class
			- you WILL need to do more maintenance, when lib is updated
	- introduce local extension - if you need to add several methods to read-only class, you can wrap or inherit from it with additional functionality
		- ways:
			- create subclass(not always possible due to realization)
			- create wrapper(more maintenance, harder to setup because needed methods must be delegated to original class)
		- why: no need in random helper methods from place to place, better code structure
		- note:
			- don't forget to add conversion methods
			- you WILL need to do more maintenance, when lib is updated
- organizing data - methods to handle and store data properly with proper classes. It can also introduce better class associations
	- self encapsulate field - access private field via getter to introduce flexibility
		- why: do additional operations when querying/modifying data, ability to change this behavior in subclass, make data read-only by not introducing setters
			- examples: lazy initialization, validation, caching
		- be careful with not overcomplicating code, use this only when needed
	- replace data value with object - move data fields and their behavior into separate class and use it as object instance in original place
		- why: encapsulation(join simple field(s) with their behavior), less duplication
			- useful to store one object for each value
	- change value to reference - replace identical instances with one object and access it by reference
		- there are two approach to thinking about objects:
			- references - one real-world object to one instance
				- references are often stored in some map and can be prefilled or created on fly
					- don't forget to deal with cases, where object is not exists
					- work with map is managed by factory
			- values - one real-world object to several instances of class
		- why: enables sharable state, optimization
			- tho be careful, because sharable state is a pain(especially in parallel)
	- change reference to value - avoid maintaining lifecycle of object that small and really changes, by converting them to regular instances
		- why: shared state is hard so no need to work if there is no reason to do so, problems with parallelism, harder codebase
		- note:
			- it can be less performant
			- no benefits of state
	- replace array with object - replace tuple of different types with object
		- why: easier to work with(especially when many fields are present), no need to `find` or keep indexes of data, behavior can be moved with fields, easier to document
	- duplicate observed data - keep domain data separate form GUI data, meaning you should have separate Entity class and separate class to display that Entity
		- why: less duplication when working with multiple platforms, single responsibility, no need to change domain when working with GUI
		- note: such technique can be different or no applicable for WebApps
		- this technique is also about creating reactive interface via observable, where you create Domain class instance, which, when changed, will sync GUI class instances' data
	- change unidirectional association to bidirectional - if classes need to communicate in both sides, change their communication to bidirectional
		- why: resolve some complex cases
		- note: it makes both classes depend on each other, such code is harder to implement and maintain
		- can be done by breaking classes into "dominant"(one who controls reference to other one) and "non-dominant"(one who provides helpers to establish connection)
	- change bidirectional association to unidirectional - if classes have bidirectional connection, but one of them don't need it(or it can be changed to smth else), just use unidirectional
		- why: less coupling, easier code(no need for additional methods), potentially lowers RAM usage because it is easier for garbage collector to remove objects that aren't referenced by anyone
		- one way to refactor is just pass one object as method parameter
	- replace magic number with symbolic constant - replace number with meaning to code constant, with self-explanatory name
		- why: self-explanatory code with no additional comments, better maintenance(easier to find references of usage, less risk of changing same number by value and not by meaning), less duplication
		- note:
			- obvious numbers aren't magical
			- sometimes magic number can be changed to method call(example: get last element of array)
	- encapsulate field - make field private and add access methods to it if needed
		- why: encapsulation(it is harder/impossible to maintain public code, so we need to expose only what is necessary), access fields can do some additional logic(possibility to lower code duplication)
		- be careful, because this introduces additional function calls, that can slow down performance in heavy loaded parts
	- encapsulate collection - collections are often passed as references, so, for encapsulation sake, it can be better to change getter to return copy/read-only value and change direct setter to mutation methods
		- why: prevent exposing the internals(encapsulation), more control over collection(like API layer in front of DB), reduce coupling(collection can be changed to other data structure)
		- note: setter as is should allow whole change of collection, so better to use named methods
	- replace type code with class - class have field with type code, that have only semantic meaning to it, so it is better to change it to class
		- type code is some primitive value(string, number) with some meaning to it, that is used with other type codes of similar meaning(user roles: admin - 1, user - 2)
			- they are normalized, because often replaced with symbolic constant, which looks not so ugly
		- why: if your language don't allow types with primitives(example TS's: `name: "Bill" | "Peter"`) you have a risk of taking a non-intended value into your field, benefits of classes, static hints via IDE
		- don't use for control flows, or other cases, where value has other meaning, except semantic
	- replace type code with subclasses - class have field with type code, that used in code, so it is better to create class + subclasses for each type code
		- why: encapsulation and better code structure(behavior of subclass is controlled by itself), easier to write control flows(via `instanceof` or even polymorphism), open/closed(we only need to add subclass for each new type code), IDE hints
		- BUT:
			- don't create dual hierarchy(if you already have one), it is better to use delegation
			- use delegation, if values will change on fly
	- replace type code with State/Strategy - when inheritance can't be used, delegation is the way to deal with type codes(just plug in needed type with some implementation of generic interface)
		- why: often inheritance isn't an option because we already have one hierarchy, we need to change value on fly, open/closed
		- drawbacks: more code even for simple type code cases
		- note, if you need to do only picking of needed operation, Strategy is the way, if you need to consider different fields etc, State is better
	- replace subclass with fields - remove subclasses, if their only role is to keep some, same by meaning, constant values. This values can be moved to parent class
		- why: make code easier by removing unneeded class hierarchy(when it contains only set of values and no functionality)
		- you can use builder to keep a presets of configuration of one class
- simplifying conditional expressions - conditionals can get complex overtime, so it is important to keep their state healthy
	- decompose conditional - break complex conditional into smaller(easier) parts, name them and combine
		- why: easier and maintainable code, less mental overhead
		- you can do this for even small conditions or just add names, like `isSmthTrue`, so your code is even simpler to understand
	- consolidate conditional expression - if several conditionals lead to similar result, just combine them together
		- why: less mental overhead(less flows for reader to follow), less duplication
		- be careful with: 
			- not making conditional too complex, better to use with Decompose Conditional
			- conditions that have side effects or other differences in final result
	- consolidate duplicate conditional fragments - if several conditionals have same code inside, restructure duplication out
		- can be caused by lack of peer-to-peer communication
		- why: less duplication, safer code(you don't need to remember to do something in all control flows)
		- often done by moving code before/after a set of conditionals
	- remove control flag - don't use boolean, that acts as stopper for all conditionals in function, just use `continue`, `break`, `return` as default control flow operations
		- why: easier to understand code, more error prone
	- replace nested conditional with guard clauses - flat list of conditionals is always more readable and preferable over nested
		- why: easier to understand flow of program
		- often done by isolating some if -> return cases to top of function first and refactoring form there
		- it is ok to introduce some duplication
		- be careful with side effects
	- replace conditional with polymorphism - change conditional that performs action depending on object type to set of objects with similar interface
		- why: easier code maintenance OR open/closed(no need to change each similar conditional for new added case), tell-not-ask principle(ask object to do proper action, and not inlining the decision process in-place), less duplication
		- note: it can blow code with additional hierarchy, so don't overuse
	- introduce null object - if you have cases, when class object can be null, avoid null checks with additional logic, by adding NullClass that extends BaseClass with implemented additional logic
		- why: less null checks, more compact logic placement(via adding new methods or redefining existing)
		- drawbacks: may be more mental overhead(new class), always fully implement all methods
		- note: don't forget to include some `isNull(): boolean` method for ease of use
	- introduce assertion - if part of code can be accessed only if statement is true, change condition to assertion, that will do fallback or throw(if system in unexpected state)
		- example: `invariant(cond, "error msg")` 
		- why: assertion acts as live documentation by narrowing types and stating that this variable must be some type(otherwise we are in error state), less tests because code fails by itself, corrupted state === error
			- good point to add assertion is to check if explaining comment is present near conditional, that can be removed by adding assertion
		- note that throwing unnamed exception can act as assertion, but it is generally better to use named exceptions for known errors and assertions
		- don't overdo assertions, if you app should work normally with other state, it is the case for condition
- simplifying method calls - make methods calls easier and simpler to understand, with addition of better class-to-class interaction via this methods
	- rename methods - name must explain the behavior
		- cases: bad name in a first place, functionality changed but name stayed the same
		- why: better code understanding
		- note: when working with public interfaces, add new method with proper name and make old method just redirect call to it, with marking it as deprecated
	- add parameter - add required parameters to methods
		- why: access occasional or frequently changed data that is pointless to store in private field
		- drawbacks: long parameter list, coupling(it can be better to move parameter to current class or move method to class, that contains a parameter)
		- note: when working with public interfaces, add new method with new parameters and make old method just redirect call to it, with marking it as deprecated
			- parameters can default to `null`, `0` or `""` placeholder
	- remove parameter - remove parameter that unused in method
		- don't add parameters "for future"
		- why: extra code to run, extra logic to understand, additional dependency
		- don't delete if parameter is used in some parts of hierarchy
		- note: when working with public interfaces, add new method without unneeded parameters and make old method just redirect call to it, with marking it as deprecated
	- separate query from modifier - make method perform single read/write operation, not both
		- why: single responsibility, no side-effects when reading data, command and query responsibility segregation
		- note:
			- it is ok to keep caching as part of query flow
			- it is ok to receive some data after modifying, but not modifying when queering data
	- parameterize method - combine similar methods, that have small difference in behavior, by adding parameter that acts as an option
		- why: less duplication, easier to extend
		- be careful not to create large complex methods
		- be careful with combining methods that do smth similar to activate/deactivate, it is better to keep them separate
	- replace parameter with explicit methods - if parameterized method becomes to complex or handles several different flows, split it
		- also good case is set of methods, that rarely grows in size
		- why: easier to understand and maintain code
	- preserve whole object - if you need many fields from object, just path whole one
		- why: simplify parameter field, no need in destructing object, if object fields are changed it affects only methods and not places were they are called, no need to rewrite all method calls when adding new "field parameter"
		- be careful with increasing dependency, it is impossible to use method, that needs only couple fields from object in place with this couple of fields and nothing else
			- we need to somehow construct full object, when it is not even needed
	- replace parameter with method call - if data is externally queried, remove it from argument list and call directly in methods
		- why: params are easier to read and understand, no need in pre-calculations for each method call(it is good to combine it with Extract Method, moving pre-calculations to separate method and calling it from inside our method)
		- drawbacks: more coupling(but sometimes it is ok, and moving value to a parameter can be a useless "make future proof")
	- introduce parameter object - group of methods have same parameter list, so change it to object
		- why: less duplication(parameter list + operations on this parameters can be moved to new class itself), more readable params list
		- be careful with moving only data and no behavior to the class
	- remove setting method - remove setter for private field, if it needs to be immutable, assigning it's value only via constructor
		- why: encapsulation, public interfaces are always harder to manage
		- if needed you can directly change field, but don't overuse it
			- there is not point to mark it as immutable and disregard it
	- hide method - properly set method to private or protected, depending on it's usage
		- why: encapsulation, public interfaces are always harder to manage
		- strive to keep fields/methods as private as possible
			- unit testing and static code analyzation can help with this
	- replace constructor with factory method - if constructor have additional logic to it, use Factory pattern
		- why: return different subclasses as result of method, caching, better naming depending on what is done
		- note: factory always delegate actual creation to constructor, it might be useful to make constructor private
	- replace error code with exception - if you need to indicate error, return Error value or throw exception, instead of some value with such semantic meaning(like: -1)
		- why: reduces mental overhead, proper indication that error needs to be handled, exception can have own methods to deal with smth, possibility to use in constructor(when throwing error)
		- note: it is ok to use such values in languages like C, where it is standard practice
		- never use exceptions to direct flow of program(like if/else), they are only for error cases
		- don't forget to add signatures(`@throws`) OR update return values, if it is possible in your programing language
	- replace exception with test - avoid unnecessary exceptions, by changing them to conditions
		- why: program should enter error state only after some unexpected behavior happened and not just condition missed, it is more obvious to work with checks that with throw/catch
- dealing with generalization - manipulate abstraction properly
	- pull up field - if two classes have same fields, move it to superclass
		- subclasses can grow in isolation, introducing unnecessary duplication
		- why: less duplication
		- note that `private` fields with become `protected` 
	- pull up method - if two classes have same methods, move it to superclass
		- subclasses can grow in isolation, introducing unnecessary duplication
		- why: less duplication
			- it can be also used to merge subclass redefined method with superclass method, if there are no much difference between them
		- note that if there is no field/method needed for method's work, you can pull up this field/method too(maybe even abstractly)
	- pull up constructor body - if two classes have similar constructors, move this similar parts to superclass
		- why: less duplication
		- notes:
			- in some languages constructor can't be inherited
			- it is required to call superclass's constructor from top of the class's constructor
			- move only shared parameters to superclass
	- push down method - if method is not used/implemented by all(or at least most) of children, remove it from super class and declare separately for each child
		- happens when: some pre-planed features aren't implemented, code removal done partially
		- why: class coherence improvement, localization of behavior
		- note that you can create intermediate subclass, to avoid duplication
	- push down field - if field is not used/implemented by all(or at least most) of children, remove it from super class and declare separately for each child
		- happens when: some pre-planed features aren't implemented, code removal done partially
		- why: class coherence improvement, localization of behavior
		- you will introduce duplication, so push down when field have uniq meaning for each subclass or used by some of subclasses
			- note that you can create intermediate subclass, to avoid duplication
	- extract subclass - class have features that aren't universally used, so extract them to subclasses and use in those cases
		- why: keep rare use-cases connected but a bit separate from main class, less bloat
			- several sub-classes can be create for each use-case
		- be careful with inheritance
			- can make code harder to understand and maintain
			- impossible to use in some cases
				- alternative is Composite, Strategy or other examples of Delegation
		- don't forget to use polymorphism here
		- move methods first
	- extract superclass - if two related classes have same functionality, move this functionality to superclass
		- happens because classes are developed separately, without pre-planning
		- why: less duplication
		- it is hard/impossible to combine classes from already existing hierarchies
		- don't forget to use polymorphism here
		- move fields first
	- extract interface - if two related classes have same interface parts, move this parts to shared interface
		- why: indicate classes role in code, describe what operations can be done with class(es)
		- note that extracting interface is more about semantic and won't help deduplicate code
		- it acts good in combination with delegation
		- don't forget to use polymorphism here
	- collapse hierarchy - merge subclass and superclass, if they are mostly the same
		- happens when superclass grows to subclass or vise-versa, when subclass degrades into superclass
		- why: lower complexity, easier navigation and code structure
		- be careful with creating bloated class
		- collapse can be done in both ways
		- remember that partial collapse is an option(with proper inheritance structure), BUT don't violate Liskov substitution
	- form Template method - as said in Template method, move similar steps of an algorithm into superclass and leave different steps in subclasses
		- why: avoid complex duplication and shotgun problem, Open/Closed
		- don't forget to use polymorphism here
	- replace inheritance with delegation - if inheritance isn't working(hard to create hierarchy, parallel hierarchies, Liskov substitution is violated), change it to delegation, by delegating work to methods of other class
		- why: no bloat with unneeded methods, Strategy can be implemented
		- drawbacks: delegation methods will appear
	- replace delegation with inheritance - class contains many simple methods that only delegate, while can be inherited with no consequences
		- why: delegation is powerful option but useless when you delegate to all methods of only one class, nicer interface, no need to create "proxy" methods
		- don't use when:
			- Liskov substitution is violated
			- class already has parrent

## SOLID
Principles(not rules) for program creation
- note: applying SOLID beforehand is premature optimization, as said in refactoring, develop via Pain-Driven Development, where you refactor something, when it is painful to work with it

- Single Responsibility - method do one thing and incapsulates it AKA module has only one reason to change
	- otherwise we get two coupled methods
	- as one way of achieving this, you can break app into parts, that have single dependency and can be combined with one another
		- basically module encapsulates one responsibility and delegates other
			- to validate your code ask: "what are responsibilities AND what are reasons to change for this code?" and if you will have "and", you should consider refactoring
		- FE example: if you need to change BE integration, you change only this code, if you need to change design, you change only styles and markup
	- examples of usage: layered architecture
	- pros: lowers coupling and boosts cohesion, helps with separation of concerns(in it's core principle of least knowledge)
	- note that it bloats code, so it can be harder to understand and unnecessary on low scale, but must have for bigger systems
		- it also affects performance, but when talking about higher level systems, like micro-services
	- don't overuse it and do 1 method classes, this will complicate code in unneeded manner
- Open/Closed - code can be only extended, but not changed
	- software is changing a lot, but this changes should be easy to perform, so more reasonable approach is to think in terms of interfaces, where you can't change interface, but implementation can
		- Strategy pattern
			- Plugin Architecture can be build via Strategy, where system knows only about itself and about interfaces, it needs, and all functionality comes from Single Responsibility plugins, that knows nothing about system and only fulfills interface, can be easily changed and modified
	- this makes code: Stable(no changes to consumers), Flexible(easy to extend one part, without affection another one)
	- there can be some reasons, including most obvious bugs, to modify code
	- don't overcomplicate code, but rather try to predict fragile places and introduce Protected Variations to it
		- if you can't predict, do incremental changes and optimize as needed
		- abstraction level can be different depending on situation
	- how to in real code:
		- introduce parameters, that can be a point of extension, Inheritance(be aware of tight coupling), Composition, Strategy, DI
- Liskov Substitution - children must implement all of parent's functional, not creating errors, additional conditions or change in behavior(example: clean up)
	- e.g. children can be used instead of parent
	- it is also valid to remember about principle, when changing interface
- Interface Segregation - think how your interface will be consumed and used later, keep it small and abstract. Another explanation of this principle is that class can't be forced to implement some methods(again, keep interfaces small and abstract)
	- one big < several small
		- react example: big object as props < several small properties
	- example:
		- if you have email integration, do it via MessagingService(not EmailService or just with integration library)
			- it is easier to refactor and work with such codebase
		- if your EmailService do OTP and News, break into into two separate once, so both of them have single responsibility and can be changed independently
- Dependency Inversion - think in terms of interfaces first, how they communicate and used, don't depend on behavior/implementation. In another worlds, classes should communicate via high-level abstractions, where high-level modules don't depend on low-level once
	- keep unified naming for abstractions
	- in real world achieved via DI:
		- manually passing dependency
		- using some context or helper, that can auto-pass/bind dependency

## OOP
Object-oriented programing - model, that organizes program as objects

- Encapsulation - keeping logic and data togather(opposite to procedural model)
- Hiding - splitting data to privat and public(part of encapsulation)
- Inheritance - extending base class functionality with possibility to reuse code
- Composition - alternative to inheritance, where we instead of inheriting from base class combining functions from small objects into big one
- Polymorphism - possibility to have same flow for different objects that inherit from base parent
	- ad-hoc - by request
	- subtype - by type
- Abstraction - use smth without need to know about realisation. Design object on a way, so only important thing are public 

## MVC
- Model - store and work with data
	- storage, api operations, auth handling etc
- View - visualize data
	- visualize data and handle local state(input state, form state etc)
	- stupid component
- Control - layer that connects model and view
	- data processing, method calling from model etc

## DRY
DRY - don't repeat yourself principle in coding

DRY is also includes SST(single source of truth) principle, that tells that system must have only one source of data, that other parts relates to

## KISS
KISS - keep it simple and short principle in coding

KISS ensures that system should be simple, clear and make complication if needed

## GRASP
General Responsibility Assignment Software Patterns - group of 9 principles, that helps define responsibility for each part of a system
- good in combination with SOLID

In Software Architecture, responsibility is obligation:
- to do task:
	- perform object creation, calculations, data processing
	- action coordination
- to know information:
	- private/public data
	- object references

Principles:
- Information expert - assign responsibility to class with most of information needed, to fulfill it
- Creator - to choose candidate, that should become creator, it must fulfill most of requirements:
	- Creator includes/aggregates object
	- Creator own object
	- Creator uses object
	- Creator have most of data needed for object
- Controller - define object orchestrator, that can take delegated Commands and perform some system-wide operations
	- candidates:
		- system/root object - object that represents system as is
		- use-case object - object that represents scenario, in which operation occurs
	- examples: Mediator, Facade, "use-case" etc
- Low coupling - assign responsibilities, so coupling in code remains low
	- coupling - measurement of how much one part relates to another
	- pros: low dependency == higher reusability + easy to change one class without changing other
- Indirection - to avoid close coupling between classes add other class(Mediator) to handle it
	- remember that by introducing mediators we loose in overall understanding of a system, so don't overuse it
- High cohesion -  assign responsibilities, so cohesion in code remains high
	- cohesion - measurement of how much responsibilities of an object are related
	- to achieve:
		- keep only related responsibilities inside one object
			- remove useless methods, or methods that used only externally
		- break big classes/interfaces to small
- Polymorphism - if we have similar & related behaviors, that diverge by type, use polymorphic operations to work with them
	- this can be viewed as OOP's polymorphism with base class and inheritance, BUT in GRASP's opinion it is done via Strategy pattern, by creating shared interface and different implementations, that plugged in
- Protected variations - identify weak points, possible variations and instabilities in your code and change them in order to maintain ease-of-change
	- it is key metric in code quality
	- achieved by:
		- Open/Closed, GoF, Encapsulation, Law of Demetre(principle of leas knowledge, where object knows and interacts only with close "friends"), Mediator, Event-driven Architecture etc
		- iterative development(do, identify weak parts, refactor on small scale, scale-up, repeat)
- Pure fabrication - if you are having functionality, that can't be assigned to any entity, without violation of Cohesion/Coupling, create separate functional entity to do the job
	- basically we aren't introducing Cohesion, because we keeping this functionality separate AND Coupling remains low, because other objects are bound to functionality only by interface
	- if talking from Domain Driven Design perspective, it is called as Domain Service

## GOF
Gangs of Four - book about 23 design patterns

#### Creation(5)
- Singletone - only one class instance can be created, while providing global access point to this instance
	- solves problems of:
		- keeping shared state globally accessible and in single example
		- keeping shared resources like DB connection, logger instance same across all app
	- to implement simply make constructor private and expose it only to static `create` method, that will call it and save result to `cache`, which will be returned, when next call to `create` is done
	- NOTE
		- PROBLEMS
			- violation of single responsibility principle
			- shared state
			- coupling
			- harder testability
		- be careful when using in multithread environment
- Factory - function for object creation(instead of default constructor), with possibility to override type of object we are creating
	- done by moving `new` calls into some factory method, which produces "products", that can become needed type
		- type is overwritten by subclasses of a class
	- used to solve cases, where we need to create objects, that implements similar interface
	- via it we can achieve polymorphism, because users of this factory will work with similar interface and hidden implementation
	- NOTES
		- FactoryMethod can be just a part of some base class, it is still ok to put some logic into it
		- it is possible to couple one factory to multiple outcomes, depending on input
		- based on inheritance, so be careful with it
	- WHEN TO USE
		- need your class to be expandable(can be done via classical inheritance of constructor too)
		- need to return already existing objects(not possible by definition of constructor)
		- need more robust interface, that constructor can give you
		- need context to create instance
			- context can also determine subclass, not only configuration of instance
- Abstract factory - pattern for creating similar factories
	- used to solve cases, where we need to create sets of things(set is some category, like material)(thing is some object, that can be categorized)
		- all sets must be equal
		- each thing must inherit from abstract thing
		- it is important that factory itself returns abstract product and not is't variation to lower coupling
	- basically, firstly user of abstract factory determines which set we need to use, after that creates this factory and the rest of an app can use it
	- WHEN TO USE
		- need to work with families of objects
		- need to have expandability
		- one class starts dealing with multiple types at once
- Builder - enables object creation in a step-by-step manner. Allows to produce different types with a single constructor
	- it is possible to make builders, that have similar interfaces, but different inner implementations
		- note, result of this builders can be different instances of different classes
		- it's main use-case is to produce different instances with similar configs
	- you can add director, that will execute some builder steps, without needing it implement them
		- director can work as interface to client
		- director can't give the result, to avoid binding director to concrete builder
	- builder can act as owner of instance it's building(create, manage, return with reset to new object) or instance can build itself(`new`, do operations)
	- WHEN TO USE
		- have too mush optional parameters for constructor
		- need to create different representations of same product
		- need to defer execution
			- such flow is better to do with builder-owner, caze it hold object until done and don't give add ability to access partial solution
		- need to build tree
	- example
```js
const pc = new PC(requiredData).enableWifi().build();
```
- Prototype - create/copy obj instance from other instance, without class dependence
	- direct approach is to use class constructor with passing all the fields, but there are problems:
		- some fields may be private AKA impossible to pass from outside
		- dependence on a class
			- for example when working with object+interface and no class implementation(often case with 3d party libs)
		- logic spread(if you add new field, you need to go through all code base and fix copy operations)
	- usually done by declaring interface, that forces clonable objects to have some method(`clone`), that delegates copy operation to object itself
		- note, clonable object is called "prototype"
	- other use cases is to create a bunch of configs, save them and copy if needed, without need to manually create each time
		- you can even build some registry(hash map with additional methods) to store this configs
		- useful when you need to reduce number of subclasses
	- NOTES:
		- it is recommended to make construct handle copy from parameters and make `clone` as caller to `new` 
		- be careful with subclasses, because they might not have access to superclass's private fields, so call to `super` may be needed
		- be careful with deep clonning

#### Structural(7)
- Adapter/Wrapper - provides communication possibility between different objects
	- basically we converting interface of one object to other, so it could be understood
	- it is very useful, because we decoupling our code from other interfaces(usually 3d party) and can do easy migrations, just by changing adaptors
	- one way of implementing is to do multiple inheritance of both interfaces with method overwrite(when needed, you still mostly should rely on one of the interfaces, doing only adapting)
	- CONS // single responsibility, Open/Closed
	- EXAMPLE
		- you have some class that renders data to user, you specify interface for data and write adapters, that can change 3d party data format to yours
			- it can be done with just mapping data, but when talking about adapter it is more about wrapping one code into adapter layer, that provides an interface to communicating to it(so not only data exchange, but also method calling)
				- we are doing composition
- Composite - compose different objects into one tree-like structure(graph), where all objects have same interface
	- example of same interface: Product and Box have same `getPrice` method, but Product just returns field, where Box need to recursively travers children
	- useful when your app can be represented as tree, when you need to work uniformly with simple and complex structures
	- structure
		- Component - defines similar interface, that composite and client are using
		- Leaf - executes
		- Container - stores children(don't know exact type, and treats all of them as Components), delegates work
	- note, that Interface Segregation Principle is broken here, because some Container methods(like `addChild`), when added to Component interface, will be non implemented(empty) for leafs
	- it is useful to use builder for building trees, because it can work with tree like structures
- Proxy - provides substitute or placeholder to another object, meaning it allows to do some action before or after request gets to original object
	- when working with restricted or resource intense operations it can be useful to add some optimizations, but it is not always possible to do it directly into original code, so we can use proxy wrapper, to avoid code duplication in all places, where we work with this object
	- proxy's interface duplicates original interface with delegation of work to it
		- it is also possible to make proxy as subclass
	- proxy is doing object management by itself, without client interference(it stores reference to original object instance)
	- you can wrap original object creation into method, that can return original or proxy instance
	- use-cases: lazy initialization(virtual proxy), logging(logging proxy), caching(caching proxy), access control(protection proxy), local execution and network management(remote proxy), smart reference
		- & lazy initialization delays object initialization to time it actually used, to save system resources
		- & smart reference manages object usage, meaning proxy can check(from time to time) is object been used, and if not dismiss it
		- & network management - hide implementation details from client, make object available on initialization state(queue requests for example)
- Flyweight/Cache - pattern that aims for code optimization, by sharing common objects between parts of an app from the cache
	- important part is that we are caching immutable state(or extraction immutable/intrinsic parts of state from general state)
		- intrinsic state - constant data, that lives inside an object
		- extrinsic state - mutable data, that altered from outside
	- basically we are breaking one storage into two, from which methods can take the data
		- for mutable storage we can just create data, for immutable it is important to check if needed data exists
		- for easier access we can place pointer inside mutable data to immutable for easier access
			- other variation is to always get immutable data from the pull, but it can introduce higher CPU usage
	- it can be useful to create factory for flyweights
	- flyweight pattern need to be implemented if RAM problem exists(or potentially can be), there is no need to overcomplicate code
		- use-cases: large object duplication, large state duplication
- Facade - creates a simplified interface for complex object or set of objects(library, framework etc)
	- it faces the problem of coupling your code to 3d party code
		- arrives when working with complex code, where you need manage initializations, configs, order of execution etc
	- basically we providing simplified interface(it can be limited in compare to original one), that hides complexity and will be used in app
		- it is also useful for building layered architecture
	- it is possible to make several facades and combine them(or use independently)
	- system behind facade can't know about it
	- facade redirects all calls to underlying system(it can't create additional logic), but it also can do inner management(initializations, state etc)
	- don't couple facade too much
- Bridge - separate/decouple related classes into abstraction and implementation with bridge between them, letting them evolve in separate ways, but stay connected
	- explanation
		- in other words, we are creating bridge to communicate with one object from other object
		- abstraction is some interface, that delegates all work to implementation
			- implementation can be viewed as adapter layer between some other methods
	- implementation may look like this, do some abstraction with high-level interface, write implementation, that exposes interface of low-level operations to abstraction
		- abstraction can be extended, but with usage of same implementation
	- useful when
		- need to break monolithic structure into separate smaller structures
			- multiplatform
		- some structure need to be extended
		- hide implementation details
		- also, it allows to change implementation on fly
			- to do so you need to pass and keep instance of implementation inside abstraction
	- provides Single Responsibility + Open/Closed
	- example
```js
const red = new Color('red');
const square = new Square(red);

square.printColor();
// (inside) this.color.print();
```
- Decorator/Wrapper - adds new behavior to object, by wrapping it inside special object
	- for proper work Decorator must follow interface of what it is wrapping
		- this way app can work with 1 interface, that have some inner implementation
		- also it adds a possibility to create several types of wrappers, that can be put inside each other and stack the behavior
	- basically we extending the behavior of base class, but with composition and not inheritance
	- it is important to keep order of doing decoration and calling inner wrapper consistent
	- decorators always delegates work to what it is wrapping, otherwise the chain will be broken
	- use-cases:
		- object behavior can be changed at runtime
		- it is harder to do the job via inheritance
		- your logic can be stacked
	- note:
		- it may be useful to create base decorator, that acts as a proxy to wrappee and extend other decorators from it
			- to avoid confusion with Proxy pattern, Proxy is managing lifecycle of what it's wrapping by itself, where decorator is managed by client
		- it is hard to remove decorator once assigned
		- it may be useful to have some abstractions to configure needed decorator
	- example: HOK

#### Behavioral(11)
- Template method - define superclass template with/without implementation of methods, that will be implemented by subclasses, with one non-overridable "template" method, that calls other methods in specific order
	- you can break large operations, with similar steps to execute, into methods with some(or not) base implementation, that can be overwritten by sub-classes
		- it also enables polymorphism when later working with such sub-classes
		- basically we are moving similar code to base implementation, while keeping different code in sub-classes
		- it is also possible to add hook methods, that do nothing by default, but can be overwritten by sub-class to perform operations
			- usually placed before/after major operations
	- use-cases: steps of algorithm need to be changeable but not algorithm itself, set of classes have same algorithm with minor changes(avoids shotgun problem)
		- removes code duplication
		- makes large algorithm partially changeable
	- notes:
		- avoiding limiting functionality, but keeping structure, where it is not needed
		- Liskov Substitution Principle is broken here, because subclass can't be interchangeable with superclass
		- maintenance may raise with number of steps
	- example: react class lifecycle methods
- Mediator/Controller - restricts dependencies between objets, by becoming centralized communication method between them
	- direct communication between object can prevent code reusability and couple them to specific place(for example button, that knows too much about components incurrent form, can't be reused elsewhere)
		- the solution is to couple object to centralized component Mediator, that can redirect calls to other components
		- for further decoupling we can make general form interface, that specific forms will implement
		- mediator controls only part of the logic, with delegating other part to it's related components
		- components interact with a black box
	- one way of implementing a Mediator is by creating general interface with notify method, that object will call and interface's implementation, that will react on such calls
		- notify method should have same sufficient protocol for all components
	- mediator can be implemented with events, as observer
	- in a way, Mediator is bi-directional Command
	- Mediator need to store references to all components and can manage state
		- moreover, mediator can control lifecycle of a component
		- be careful with making iterator a God Object
	- try not to create more then 1 mediator per batch
	- use-cases: decouple complex dependencies, create a way to reuse components in different contexts
	- example: tanstack form react can be viewed as mediator to other components of a form
- Chain of responsibility - pass request along chain of handlers, where each handler can process(or not) request and pass(or not) it along the chain
	- there are approaches to it, depending on requirements:
		- do I need to pass it(routing middleware)
		- if I can process I will do and stop passing it(useful in GUI, remember how event bubbles in DOM and can be stoped)
	- similar to proxy, but for sequential operations
		- unlike proxy, we can break whole operation to small steps(single responsibility) and construct different "proxies" by combining this steps in a different manner
	- to implement you can create a class(all handlers must have same interface and can extend base class to remove duplication), that stores reference to next handler and have one method to do operation, which calls next handler OR you can create big Middleware class, that can do chaining
	- handler should be self contained and immutable + can be executed in any order
	- it is important to remember that requests can not reach to the end of a chain, or be unhandled
	- use-cases: access control, request handling(middleware), different types of handling defined at runtime, handling tree structure communication
- Observer/Event-Subscriber/Listener - subscription mechanism, that let notify multiple objects about any event that happened to object they are observing
	- enables notification flow for observers, instead of more default approach of checking if something changed
		- avoids redundant requests
		- avoids spam notifications(notify only subscribed objects)
	- implementation
		- create Publisher object, that have something to notify about with array to store subscribers and methods to add/remove one
		- when something happened, Publisher triggers some predefined method, that each Subscriber must implement and sends some data with it
			- this way we are coupling Publisher to Subscriber interface, to make different Publishers work with any Subscribers we can give access to Publisher's inner state(or use some generics)
			- it is also possible to make one Publisher handle several types of events via more robust storage system(`Map<EventType, []>`)
	- use-cases: notifications, dynamical set of subscribers, limited time observability
	- note that notification order is semi-random
		- usually notification is done in order subscribing, but it is not fully reliable metric
	- example: EventListener(JS), useState(react)
- Strategy - define a family of interchangeable(at runtime) classes
	- allows defining a set of solutions to some problem, that can be chosen at runtime
		- note that each solution can't know about other ones
		- basically we are removing code coupling and doing single responsibility
	- implementation may look like this: Context class with field to storing current Strategy and methods, that delegate work to current Strategy
		- Context or Strategy can't change current Strategy, it is received in constructor and can be set later by Client
		- all Strategies have same interface(usually can be even only one `execute` method), that Context will call(so we can avoid coupling)
	- use-cases: object need to use set of algorithms without coupling logic(separate implementation from business logic, avoid large conditionals), selected algorithm needed to be changed at runtime, there are many classes with similar/same interface but different behavior, inheritance can be changed to composition
		- if you wanna do it in more inheritance and static way, you can use Template Method
	- notes
		- don't overcomplicate code(if there are not too many algorithms, if algorithms won't be frequently changed)
		- client is coupled to and manages Strategies
		- this pattern can be implemented as just function that passed as argument
	- examples:
		- (react) we have component that needs to render two things, instead of if/else we can implement two independent "small" components and pass them conditionally as prop
- Command - turn request into object with all needed information
	- helps with separation of concerns, via layering an app into parts, which communicate with requests
		- note: part don't directly trigger method on other part, it triggers method on Command object, which collects needed data and triggers needed methods
		- basically we are building uni-directional communication gateway
	- by design all commands should extend base command, that have only one `execute` method with no parameters
		- to send any data command should be preconfigured or be able to aggregate needed data on it's own to prevent coupling(for example we can have one button, that stores command, but commands can be different)
			- important that configuration is done by external object(or client)
	- use-cases: pass request as parameter, add delay(possible to add command serialization), add queue, support undoable operations(via state history track(RAM problem) or revert operations(not always possible))
- State - object has state and can change it's behavior, based on it
	- main concept behind state is Fine-State machine, that works like this: there finite number of possible states in program and program is always in one of them, but can change to another, depending on current state(program is performing transition, where there are finite number of transitions)
		- state can be calculated from one or more fields
		- straightforward solution is write `if/else` statements, but it resolves in hard to maintain and understand code(coupling, breakage of single responsibility)
			- state machines can grow and bloat over time
	- to deal with bloat we can extract each state into own class, that inherits from same interface and pass each class instance into Context, that delegates all actual work to state class and exposes method to change current state
		- kinda similar to Strategy, but in this pattern one state class can know and operate(change current state to) with it
		- NOTES: interface can't have useless methods and must be fully implemented by each State, State can(and most often should) store reference to Context
		- if you need access to private fields in Context use: class nesting, make needed fields public, delegate work back to Context
	- use-cases: state change behavior of object(with large number of states and/or frequent changes to state logic), class polluted with conditional statements, need to reduce code duplication between state(even if it is state transition logic)
		- for FE: keyboard controls(several nested modals are closed on-by-one with `esc`, by changing current KeyboardControl)
		- try not to overkill with this pattern, don't use with:
			- low number of states
			- not frequently changed code
- Visitor - performs different operation on group of similar objects, separating algorithm from object it is operated on
	- used to fix problem, where you need to operate with set of different objects, without bounding execution logic to them
		- instead of integrating logic you can place it into separate class
	- there separate ways of how to choose method needed for specific class:
		- visitor can perform `if/else` checks to determine `instanceof` which class is our object and do it's magic
		- using Double Dispatch, we can call `accept` method(that must be present on each object), that accepts visitor instance and calls needed method to operate on their own
			- this way we altering implementation of objects, but we aren't bounding some alien logic to them and just adding sort of hook, that allows any visitor with base interface to be used with this object
				- even more, we can do method overload this way and keep interface simple
			- why double dispatch if we can just overload? Simple, often compiler uses safe path of early+static binding, where it finds the most safe variant before compilation to figure out if this operation is valid and, mostly it will result in call to base class and not the one, that inherits from it
	- note
		- visitor must be updated, when new class is added to hierarchy
		- visitor can't access private fields
	- use-cases
		- iteration over different types, with possibility to prohibit iteration of other ones
			- good in combination with Composite
	- example:
```js
class AreaCalc {
	static visit(shape) {
		if (shape instanceof Sicrle) return ...;
		if (shape instanceof Square) return ...;
	}
}

const areas = [cirle1, square1, circle1].map(AreaCalc.visit);
```
- Interpreter - solve problems, that a defined with set of grammar or in language-like format
	- basically we providing some grammar, that can be interpreted into actions
	- implementation can be done by so:
		- define an abstract expression, that have `interprete` method and inherited by other expressions
		- implement terminal expression - simplest building block of grammar, like leaf node in Composite
		- implement non-terminal expression - container for terminal or non-terminal expressions, like Container in Composite
		- add Context, that can store additional data
		- client can build expression in for of AST, consisting of expressions, passes it to interpreter, which parses in in a tree way
	- use-cases: expression evaluation, language parsing, problem is represented as AST
	- be aware that it is hard to scale an maintain
	- examples: `eval`(JS)
- Iterator - creates a way to traverse through a group of similar objects, without exposing underlying implementation
	- used to decouple implementation from traversing logic for different of data structures, even if they aren't implemented via list
		- main idea is to extract traversal logic to iterator with standard interface(`current`, `hasMore()`, `next()`, `prev()`), that will manage all underlying logic(it is important to incapsulate this logic, so multiple iterators can work at the same time)
	- as a recommendation, collection should always provide a way to travers it
	- it should be possible to create iterator from client, but more often it is collection's responsibility
		- iterator class is linked to other class via constructor
	- use-cases: remove traversal code duplication, hiding implementation details of traversal, creating similar way for client to traverse unknown beforehand Data Structure, stoppable iteration
		- note: don't do an overkill for cases, where iterator is not really necessary
	- example: `array.map() // JS` 
		- it is introduced by default in many modern languages with possibility to write own iterators co custom Data Structures
- Memento/Snapshot - save and restore state of an object, without revealing it's inner implementation
	- there are some cases, like undoable operations, where you need to record a snapshot of an object, but there are some problems with direct approach:
		- object may have private fields, that can't be accessed from snapshot method
		- changes in object require changes in snapshot method(shotgun approach)
		- Snapshot class will need to expose all it's state, thus making dependent code on it even more coupled and fragile to changes
		- this problems come from broken encapsulation(we are trying do the copy, instead letting object do it)
	- this problem is solved by letting owner produce a snapshot in form of memento object, that stores state and have some minimal interface to expose name, createdAt etc, but not actual data
		- in this solution `restore` is also must be implemented by owner and take in a snapshot, so history manager(caretaker) can just pass task to owner and don't operate with actual data
			- caretaker->owner communication can be implemented via Command
	- Memento must be immutable and should be linked to concrete owner instance, thus we can support something like multi-window history
	- original implementation is done via nested classes to make private fields of memento accessible to owner
		- other implementation is done by creating memento interface, that caretaker will work with and memento implementation, that exposes it's data and used inside owner
		- other implementation is done by creating memento that coupled to specific owner, so it can keep it's data private and perform `restore` by itself, instead of letting owner read it
			- in this case owner must have public setter to it's state
	- notes: remember about RAM, caretaker should track owner's lifecycle to remove old mementos, JS and other "bad-boys" can't guarantee that memento is private, Prototype is simpler analog for Memento(but it also can be used only with simple objects)
	- use-cases: undoable operations, direct access to object will violate it's encapsulation, need separate history maintenance

## Layer Client-Side Architecture
*I think I have written about this one, but I couldn't find it, so here we go again* 

A guide to build flexible, testable and scalable architecture for web(React) app

#### Basis
- MVC(model view controller) - pattern to split/layer the app, when working with UI
	- model - data and logic
	- view - rendering
	- controller - react to user events, by taking actions with model
	- in a nutshell: user sees view, user interacts with controller, controller changes model, model changes view
	- it is core for modern web-dev(View - FE, Model - BE, Controller - API)
- MVP(model, view, presenter) - MVC deviation for FE apps
	- view - rendering
	- presenter - layer between view and model
	- model - data and logic
	- in a nutshell: view is updated by presenter and passes user events to it, presenter updates model and reacts to model's changes
- problem: MVC&MVP are too generic, mainly because of "M" with too many responsibilities, so better architecture is needed
	- most common use-cases:
		- state management
		- network: fetching, optimistic updates, metadata(isLoading etc)
		- logic: validation, interaction/app logic, domain logic
		- authN & authR
	- better architecture via restrictive framework OR general rules, that applies to written code
- benefits from architecture:
	- better communication
	- ability to choose proper tools for each task
	- separation of concerns
	- where put what(logic, networking, state management)
	- what need to be tested
	- etc etc etc

#### Basics 2.0
This architecture is built upon industry knowledge, mainly adapted from BE

As example, it was time, when server apps grow so much, that MVP wasn't sufficient enough, so principles like clean architecture(which, like many other, explain more what "M" should do) arrived, in it's core it break "M" into:
- Infra - controllers, routes, DBs, caches, ORMs
- Adapter - infra and third-party endpoints access
- Application - features of an app in form of use-cases
- Domain - models, events
- basically we write core of an app in Domain and Application, create Infra and hook our app to it via Adapter

Such layered architectures are hard, BUT:
- we know what layer need what tools
- concerns are separated
- easy to find what need to be tested(main logic)
- easy to mock or swap things

So, we need analog, but not copy, of smth for FE
As guideline, as a result we need to have an app that:
- testable
	- if you are doing unit tests, mocking and separation of concerns is a way to go
	- write units, when you have many app logic or need to verify accuracy of operation
	- write integration tests, when primary use-cases are observed via UI changed(your basic CRUDs)
		- in such cases, view is an implementation detail, smth that not need to be tested
- flexible
	- changing libs/technologies is not common use-case(still nice to have), but changing view components is often the case and something that better be done without messing with app logic
	- be careful with restricting developers too much or introducing poor DX, flexibility must be in architecture AND DX
- maintainable

#### Principles
All in all, our goal to separate and structure our code

###### Command Query Separation
Separate logic of changing state from getting state
- basically we have:
	- command/mutation - changes state and might return result
	- query - returns state
- we are forced to reason about code into two paths, so responsibilities are de-coupled, risk of accidental state problems reduced, easier testing, easier cache invalidation(invalidate on mutation only)
- to keep maintainable file structure you can use co-location(like GRASP for file storage, where we place related files as close as possible)

###### Separation of Concerns
Enforce logical boundaries between parts of an app
- it is not only about separating class from class, but also about working with similar logic by the same principles(delete, activate, deactivate should "look" the same)
	- basically think about how-to do a job, place it onto appropriate layer, make a job do only what it supposed to do

###### Slices
How place feature into layered app? Imagine it as vertical line, that slice through layers and have functionality in each one

It greatly reduces time to think about code(choose tools etc), because now you have kind of matrix to each peace of a feature

#### Layers
- view
	- presentation components - render ui + create user events
		- component here treated as implementation detail of feature
		- component is volatile(changed a lot), so it makes sense to keep them as dependencies(set of components in library)
		- there might be a problem with components that rely on outside data, because now you need to hook into queries and mutations
			- you need to keep this logic close, BUT not intertwine with component as is, add some middle layer, that reduces risk of large migrations and also can keep some additional reusable logic
				- this layer can be called as `use-case` 
		- when testing presentation components, we need to test agains UI logic(behavior) and not how component looks
			- we can unit-test components in UI lib tho, but it is a separate story, for testing the behavior Integration testing is a way to go
	- ui logic - view behavior, local state
		- view behavior is basically about some conditional logic(show this/that, call this/that)
		- STATE TYPES:
			- local state - some single component related state, that often can be extracted to hook
			- shared state - some state that shared between several components, that should be abstracted out to some store/context to keep components independent
				- sometimes it doesn't make much scenes to put state of closely related components in a store
			- remote state - some state outside our app, that queried and saved locally, with global access to it
			- meta state - state often used to describes remote state(async operations process)
			- router state - state of browsers URL
- container/controller - glue layer between view and model, that often represented as single Page
	- after hooks container components lost part of their functionality, but it is still useful as "glue" layer to manage several components, work with some shared logic/state, manage features
	- in its core we can call container as another component, but it will bluer the line of who takes what responsibility
	- note, such components should have small amount or even no logic, just take smth from model and pass it to actual components
		- so we can even avoid testing them, or tests can be pretty lightweight
- model
	- interaction layer - part of model that interacts with our app(container), aka the behavior of model
		- it is responsible for logic and decision making
			- like validation, mapping, shared logic, global rules, aggregation, auth, logging, complex rendering logic, metadata
		- basically we call each part of interaction layer a use-case, that can be just a proxy to mutation/query OR have some logic to it
		- it is pretty easy to test such use-cases, with "Given-When-Then" tests
		- interaction layer includes shared behavior - behavior that used by any part of an app and includes hight-level rules of interactions in app
			- includes: auth, logging, domain models, constants, utils etc
	- infrastructure
		- networking and data fetching - API interactions and meta-state changes
			- responsibilities: know about every service, create responses, marshal data/errors, report meta-state
		- global state management
			- responsibilities: store data in-cache, update cache, provide places to hook into to observe updates
			- in this place we make copy of remote state into our global state, with caching layer
				- it is also possible to do mixing of client global state and remote global state in cache
			- global store should be implemented as facade, meaning we have data in it, but it can be accessed via some layer
		- notes:
			- it is kinda ok to mix global state management and networking into 1 thing, to make it easier to work with
	- ---
	- approaches to write a model:
		- plain react hooks
		- state machine that hooked into hooks
		- vanilla JS with observers and notification mechanism to connect to react
#### Conclusion
All in all, when building for scale you must layer your app in one way of another, BUT you always will loose in DX(onboarding, speed etc)
- key note here, that you must loose in DX only when it is required by app's complexity AND not introduce complexity just because

## Hook, useCase, Entity
To split responsibilities for logic inside app(React) we can operate with two things:
- Object - class, that handles some static logic(calculate how chess piece moves)
- UseCase - operates with reactive logic and with states(fetch api, change loading state)
For React we can say that hook is wrapper for UseCase

## Dependency injection (DI)
Pattern that helps achieve Inversion of Control(IoC)

Basically we can pass some object to class constructor and use it from inside, without creating instances
- also possible to inject by setting property

If generalized, can be viewed as Strategy pattern, but with flavour of blackbox for creating object

Usually it is useful to write custom class to manage DI, for example to save state across all injected objects, by creating or taking from cache instances
- We can expand and add DI scope into other DI, so we can use one set of properties from smaller DI first and if smth missing go to upper DI

Useful for testing, because we can flush all state easily

## Monads
Monad is a function that adds layer of abstraction into functional programing, so we can work with well known pure functions, but with hidden logic

Extends Functor:
- function with data inside(context)
- map - receive function, apply to data, return context with new data
- get - return data
- \--- extensions
- of  - receive data, return data in context
- flatMap/chain - receive function, apply to data, return context with new data avoiding any nesting of contexts

Useful monads:
- Promise / Future - to work with some time delays
	- not 100% sure that it is a true monad
- Maybe - returns smth or nothing(never for TS)
- Either - returns smth or smth(often left - error and right - value)

it makes sense to incorporate such abstractions to avoid dirty code and make it composable
- so it is note useful to pack and 3 lines later unpack a monad

## Stable Dependency Principle
Every system has stable and volatile dependencies
- stable dependency - some high-level policy or just dependency that found it's role in architecture, all problems in it were addressed and it has little reasons to change
	- examples:
		- language constructs
		- domain models, events, constants
		- BE to FE specification
- volatile dependency - some low-level detail or new dependency, that wasn't stabilized yet
	- it is ok to have such components, but we need to have little direct dependency on them, to prevent destabilization of stable dependencies
	- examples:
		- front-end in general
			- mostly it is about styles, layouts, tags, but behavior also shifts(still, when writing tests, behavior is number 1 thing to test)
		- components with no single responsibility, because it has a lot reasons to change

## Colocation
> Place code as close to where it's relevant as possible
> Things that change together should be located as close as reasonable.

Good codebase should be understandable from outside(not only by codeowners and maintainers), there are some techniques of achieving this and one of them is colocation

comments
- as a general rule of thumb, you should right comments to explain something unusual in your code
- usually we place comments as close to code as possible, to ensure that:
	- comments stay mostly in sync
	- no need to context switch to read a comment
	- less risk of missing some comment, that written somewhere else
with this example you can see basically all advantages of proper code colocation in your system

examples of colocation:
- HTML template is always near logic(as separate file, near some JS file, or combined in form of JSX)
- CSS can be placed right near HTML, that it is used for OR even done as css-in-js
- tests(units) should be placed near the module they are testing
	- we are talking about files here, BUT it is kinda possible to do it in scope of one file(don't think it is a great idea, but might be cool to implement)
- state is better to be placed as close to view as possible(because of maintainability and also optimization(less of a tree changes, when state is updated))
- utils - sometimes it is ok not to move reusable function to garbage `/utils` folder, because it is possible that one day it won't be used at all, but still left and maintained as part of codebase
	- one approach is to keep this function inside file it is using, and separate only when needed, BUT in some nearest utils folder
		- nearest meaning that mocks should have some utils, features should have utils, view should have some utils etc

benefits:
- all that described before
- possibility to extract some group of nearby files(often placed in single folder) to separate package, lib or(for God sake) micro-frontend

"exceptions":
- if you need to write docs or integration tests for some chunk of an app, just place it in top folder, that contains that chunk
- for e2e tests it is better to move them outside `src` at all, because they should not be changed by such implementation details

## Signals
Based on observer pattern. Subject don't know about observer. Observer knows only that subject can change
- Risk of infinite loops is present

SolidJS is observer and all of it components are subjects. So when output of components changes SolidJS is triggered and rerenders html

```js
let current;

function createSignal(initialValue) {
  let value = initialValue;
  const observers = [];
  const getter = () => {
		if (current && !observers.includes(current)) {
	  	observers.push(current);
		}
		return value;
  };
  const setter = (newValue) => {
		value = newValue;
		observers.forEach((fn) => fn());
  };
  return [getter, setter];
}

function createEffect(fn) {
  current = fn;
  fn();
  current = undefined;
}

////

const [isSuccess, setSuccess] = createSignal(false);
createEffect(() => console.log(‘We have ‘, isSuccess() ? ‘success!’ : ‘no success yet…’);
// The above line will log “We have no success yet…”

setSuccess(true); // Expected result: We have success!
```

## API Design
#### Namin
Naming must be short, descriptive, consist(style, case)

#### Data
API must not give out useless data

## Mutex
Mutex is a pattern, that used to avoid race conditions and similar problems, when working with async

(*JS example*) One of the way to "cook" it, is creating sharable `Promise`, that can be `hold` and `released`, so if one async operation is in progress, other will be locked, awaiting for the Promise, so:
- removing race condition
- queuing events

## Domain Driven Design
To reduce mental complexity in long run, it is important to use shared language
- this language must be shared through you company(product, tech, non-tech, legal, compliance etc)
- this language is related to domain, you are working in
	- example: for University Management System we can't `delete` student, only `graduate` or `kick` him
- achieved via global "Shared Language" document

## Architect Path
- try Team Leading first to change mentality from code & single contribution to managing and higher scope
- you need to coordinate several teams
	- create artefacts (tasks, docs etc) to create direction for dependent peers
