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

## SOLID
Principles(not rules) for program creation

- Single Responsibility - method do one thing and incapsulates it
	- otherwise we get two coupled methods
- Open Closed - objects are open to extend, but closed to edit
- Liskov Substitution - children must implement all of parent's functional, not creating errors or additional conditions
	- children can be used instead of parent
- Interface Segregation - don't implement useless functional(make interfaces small)
	- one big -> several small
	- react example: big object as props -> several small properies
- Dependency Inversion - all connections are build on abstractions, that can't depend on realisation
	- abstractions can't depend on details
	- abstractions have unified naming

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
General Responsibility Assignment Software Patterns - group of 9 coding principles

- Information expert - info should be assigned to class, that will use/need it the most
- Creator - principles to choose who must create objects
	- Creator pass/owns data related to obj
	- Creator have many in common with obj
	- Creator uses obj
- Controller - combine small controllers into big one
	- deleteUserController + createUserController = userController
- Indirection - to avoid close coupling between classes add other class to handle it
- Low coupling: low dependency, higher reusability, easy to change one class without changing other
- High cohesion - similar to single responsibility + we should make classes packed(means: it must not have methods for other classes to use or useless methods for himself)
	- To achieve: break big classes/interfaces to small
- Polymorphism - same as in OOP
- Protected variations - create elements based on abstracts interfaces to avoid dealing with different variations
- Pure fabrication - it is good practice to create classes that don't have representation but serve to make system more maintainable

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
		- need your class to be expandable
		- need to return already existing objects(not possible by definition of constructor)
		- need more robust interface, that constructor can give you
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
- Proxy - provides other object that controls access/behavior to/of obj
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
- Template method - define abstract template with/without implementation of methods, that will be implemented by children
	- example: react class lifesycle methods
- Mediator - object that provides a centralized communication between other objects
- Chain of responsibility - pass request along chain of handlers, which choose: handle or pass to other handler
	- example: midlware
```js
const handlerA = new ...;
const handlerB = new ...;

handlerA.setNextHandler(handlerB);

handlerA('A') // handle A
handlerA('B') // handle B
```
- Observer - monitors for state change and notifies about it
	- example: eventListener, useState
- Strategy - we have multiple implementations(*for example: effective for long array & effective for short array*) and we choose what to use in runtime
	- react example: we have component that needs to render two things, instead of if/else we can implement a two small components and delegate chose of which component to render to other(but those components must be independent by them selfs) 
- Command - turn request into object and work with it with additional params(helps to loose coupling)
- State - object has state and can change it's behavior, based on state
- Visitor - performs different operation on group of similar objects
```js
class AreaCalc {
	static visit(shape) {
		if (shape instanceof Sicrle) return ...;
		if (shape instanceof Square) return ...;
	}
}

const areas = [cirle1, square1, circle1].map(
	shape => AraCalc(shape)
);
```
- Interpreter pattern - abstracts specific rules
- Iterator - standard way to traverse through a group of objects
```js
arr.map(); // example
```
- Memento - saves and later returns state of object

---

## Hook, useCase, Entity
To split responsibilities for logic inside app(React) we can operate with two things:
- Object - class, that handles some static logic(calculate how chess piece moves)
- UseCase - operates with reactive logic and with states(fetch api, change loading state)
For React we can say that hook is wrapper for UseCase

## Dependency injection (DI)
Pattern that helps achieve Inversion of Control(IoC)

Basically we can pass some object to class constructor and use it from inside, without creating instances
	also possible to inject by setting property

Usually it is useful to write custom class to mange DI, for example to save state across all injected objects, by creating or taking from cache instances
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
