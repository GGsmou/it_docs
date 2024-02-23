---
title: Architecture
---

## Base principles for good architecture
- Have general naming, that can be understood not only by devs
	- example: AccountSelect - selector for Account entitie
- Use: DRY, KISS, SOLID, GRASP, GOF, OOP, MVC

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
- Singletone - only one class copy can be created. Example of factory
	- problem: shared state
- Factory - takes similar inputs, but return different classes, based on inputs
- Abstract factory - factory for factories
- Builder - create class step by step
	- example: SQL query builder for backend
```js
const pc = new PC.PcBuilder(data).enableWiFi().build();
```
- Prototype - create obj instance from other instance

#### Structural(7)
- Adapter - provides interface for different entities to communicate
	- example: you need to migrate from one lib to other lib without changing other code, so you write adapter layer to communicate
- Composite - compose different objects into one structure(graph), where each object are treated as same
- Proxy - provides other object that controls access/behavior to/of obj
- Flyweight - cache immutable objects for memory efficiency
- Facade - creates a wrapper that acts as interface to communicate through with other object
- Bridge - separate/decouple implementation by creating bridge to communicate with object from other object
```js
const red = new Color('red');
const square = new Square(red);

square.printColor();
// (inside) this.color.print();
```
- Decorator - add some functionality by wrapping object into other object
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

#### Useful monads:
- Promise / Future - to work with some time delays
- Maybe - returns smth or nothing(never for TS)
- Either - returns smth or smth

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
