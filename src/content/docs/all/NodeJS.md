---
title: NodeJS
---
## Enterprise Node by Khalilstemmler
#### DTOs as Layer of Indirection
Different parts of software must be connected in order to do somethings useful, BUT too tight connection will cause waterfall changes into downstream, when upstream introduce some change (thigh coupling)

Data Transfer Objects is one way to lower coupling, by introducing mapping of DB/ORM models into our own DTOs, thus
- introducing single point of change (by adding single mapper)
- hiding implementation details of DB
	- dependency inversion
- allowing for changes more easily
	- the easier is to change design decision the better
- creating a contract for API

You have domain objects (that your domain layer needs), data transfer objects (that your clients need), and the raw sequelize objects (that your database needs). The mapper handles transformations between all of 'em.

#### Event Based Systems
Event Based Systems go hand-in-hand with DDD and is a great way of thinking and dealing with complex problems, because it is:
- easy to express communication, ex: UserRegistered -> EmailVerificationSent -> EmailVerified
- possible to record system state as history of events
- possible to scale by making heavy operations async
- reduce complexity via indirection

#### Functional Error Handling
Happy path is not only one, so we need a way to deal with errors
- errors represent state and need to be handled properly in proper place

Errors can and should be a part of domain model, strictly defined on interface, so it is easier to work with them
- this leads to function or golang or error as value approach, where you have concepts like: `Result<T>` OR even better `Either<E, T>`, so you can return T value OR E error
	- it is pretty hard to work with types, when errors are "thrown" all over the place
	- alternatives are:
		- return `null` - lead to impossibility or error handling, because no errors
		- throw `error` - harder to type + constant try/catch
	- in model above each error must have strictly defined type, so it is identifiable in any part of the code it propagates to
- in our model errors can be generic: Unauthorized, Unknown; domain related: business(UserNameAlreadyTaken), general(UserUnknownError)
