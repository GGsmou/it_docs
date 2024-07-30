---
title: Testing
---
> Testing is a hussle, so it is important to make it fill good

> It is important to remember, test must break, but not too often

> Test can't be too big or too small

## Manual
Check changes by human

- pros: precise, don't need additional setup
- cons: slow, takes many resources, useless on large scale changes

## End2End
- pros: checks whole app, works with real APIs and program, simulates user behaviour
- cons: slow on big apps
- done with virtual browsers that can perform operations on real app instance

## Integration
- pros: partially test some feature so faster then e2e
- cons: still can be slow on big scale, need to be mocked
- tools: cucumber(dead but may be used as legacy)

## Unit
- pros: fast, check every function/class, can track covered/uncovered parts of app
- cons: pain to maintain(every change must be done with unit tests too), mocks are needed
- unlike other tests, often done by developers
- other
	- there are sociable(rely on dependencies) and solitary(mock dependencies) approaches to write unit testing

## Other
#### Front-end testing
- check how app renders in different browsers
	- tool: browserstack.com
- check how components changed vissualy
	- types: check pixel diff, smart checks(accounting for text content change etc)
- check how components changed programmatically
	- create json description of react component, compare json after changes

#### Load testing
- check how app behaves on high load situations

#### Functional
- check if application is performed well based on customers requirements
- black-box testing of how app is doing some functions and if it is implementing business needs

#### Structural
- verify implementation of code
- white-testing of how software implemented and if is covering different edge cases relative to code itself

## Generally
Ideal pattern for testing is a pyramid by count of tests(manual -> unit), but can be different depending on needs of app
- for example we don't need to 100% cover start-up app with unit tests because it is dynamically changing overall

Testing must help and not annoy or slow down things

Often project can have separate AQA team to maintain tests, but it is also common when devs write tests(especially unit) on some js framework

unit testing is important BUT not essential

it is important to name tests correctly, so we can easily understand project by looking to tests
- for unit testing:
	- block of tests must have proper name(ex: slice)
	- test must be general, but still understandable and not to long(ex: cutes between 'begin' and 'end')

#### Testing variations
- white box testing - test function with knowing how it is written
	- can be bad if we are too coupling to function inner working, because slight change in implementation will break test
- black box testing - we test function without knowing implementation and often communicate with some interfaces and expect some predefined behaviour

## Tooling
#### Jest
jest is a lib that helps to unit-test your js code
(can be called with npx or as devDep for project(+ @types/jest) + there is useful VScode plugin)

vitest is alternative for jest when you are using Vite bundler or just want faster tool

all tests are living in `fileName.test.js`

good patterns:
- each test must have it's own result value and not depend on global one for all
- tests can't have common object that may mutate
- it is better to write one good test, instead of many simple
	- example: .toBeInstanceOf(Array) + .toHaveLength(3) + .toEqual(\[1, 2, 3]) === .toEqual(\[1, 2, 3])
- write tests for different classes of equivalence
- test should be independent from each other(not depend on order/presents of other test)
- we can put tests in for loop to test them with different mocked values(it is not always best implementation)
- to test random we can pre-generate some array of data and check each value in a loop inside tests to increase possibility to find random problems
	- there are some libs to help with such cases

main funcs:
- describe('func name', () => {// all tests for some func})
	- we can also group tests by files
	- we can add beforeEach(() => {}) and afterEach(() => {}) functions that will run before and after each test in block, so we can move some preparations to this funcs
		- also there is beforeAll and afterAll if we need to run only once and for each test
- test('Test name', async (done) => {})
	- test() === it()
	- ADDITIONAL FUNCTION // test.skip(), test.only()
		- same for describe
	- ASYNC
		- tests are always sync, so we can use helper function done(), that indicates finish of test(by default it will just go through all code and finish)
		- another way is to use jest.advanceTimersByTime(number) to skip some time in ms
- expect(result)
	- .toBe(testVal) // can be used with typeof to check primitives
	- .toBeInstanceOf(type)
	- .toHaveLength(number)
	- .toEqual(nonPrimitiveValue) // similar to ".toBe", but used with arrays, objects
	- .toThrow() // for it to work as result we need to pass callback that calls our function
		- also we can test what error was thrown, error msg etc
	- .toBeUndefined()
	- .toMatch(regex)
	- .toBeGreaterThanOrEqual(number)
	- .not. // can be placed before other operations
	- .toHaveBeenCalledTimes(number) // check how many times jest.fn() was called
	- .toHaveBeenCalled() // check if func was called
	- .toHaveBeenCalledWith(arg1, arg2, arg3) // check if func was called with args
	- .toHaveBeenNthCalledWith(number, arg1, arg2) // check if func was called with args at N call
- jest.fn()
	- .mock // object with some details about mock func ussage
		- .calls // array of all calls with results
	- .mockReturnValueOnce(valueToReturn) // override first result of function + we can chain it to override other results ++ works only for first func call if func is called in a loop
	- we can pass callback as an argument that will be called, but also info about each call will be saved
- jest.spyOn(object, "method") // wraps method with .fn() functionality
	- .mockImplementation(callback) // replaces method with our own
	- .mockRestore() // reverts mocking
	- works only if we are using full module, but if we using some functions from it it won't change original function, so we need to use jest.mock()
- jest.mock("./path/to/module.js", callback)
	- jest under the hood mocks required module
	- callback returns object with some methods
	- this implementation will mock full module
- jest.useFakeTimers() + jest.setSystemTime(Date) + jest.useRealTimers()
	- change global dateTime to defined by jest + set required date + change global dateTime to default

mocking(some functions can do some operations without a mutation/return of data, so we need to check them differently):
- write a callback to check how many times function was called(or use jest.fn() - default mock function)

other:
- happy flow - flow of function that must be done
- classes of equivalence - means to classify tests by their logical difference
	- divide(2, 1).toBe(2) is equal to divide(3, 1).toBe(3) -- both test happy flow, BUT not equal to divide(2, 0).toBe(null), because it is testing edge case
- if function is not public it is not necessary to handle wrong data types, but may be needed to handle specific variations of type(number: NaN, Infinity, float)

#### Cypress
lib used to complex testing
	unit, component, API, e2e

can be configured with GUI
all tests live inside cypress/e2e/test.name.cy.js
all utils live inside cypress/support/generateSmth.js
all fixtures live inside cypress/fixtures/name.json

supports adding custom commands inside cypress/support/commands.js
- this commands can be used to hide some logic or make simplify some actions

good patterns:
- create file for each page
- check if page loaded correctly by checking corectness of h1
- while developing we need to add some classes/data-attr to interactive elements, so it is easy to select them from tests
	- it is not always possible, so we can use more complex selectors(by placeholders etc)
- if we need to do some preparations, we can do it with API requests, instead of UI interactions
- it is better to break tests to smaller parts, so it is easier to find why smth is breaking

main functions:
- describe('block name', () => {})
- it('test name', () => {})
- cy
	- .visit('url') // check if we can open page
	- .get('selector') // can return array of elements
	- .should('command', 'some data', 'some data')
		- contain.text
		- exist
		- include
		- equal
		- have
			- .attr
			- .length
	- .contains('text') // find element with text
		- contains('selector', 'text')
	- .url() // get current url
	- .hash() // get current hash
	- .debug() // turn debug mode on some part of test
	- .pause() // add stops on test run
	- .then(element) // cy object is async, so we can use then for debugging
	- .type('text') // simulate user input
		- '{Enter}' // simulates button press
	- .request('METHOD', 'endpoint', body)
	- .intercept('METHOD', 'endpoint').as('customName') + .wait('@customName') // wait until some request is processed
		- it is also possible to save some value(for example userName) with .as and later .get(alias).then((userName) => {})
			- we can use function(instead of arrow function) and get this data simply with this.userName
	- .setCookie('key', 'value')
	- .task('taskName')
	- .fixture('name') // get data from fixture as object
	- .interceptor('METHOD', 'endpoint', body) // mock incoming response to own response
		- body can be custom OR {fixture: 'name'}
- Cypres
	- .config() // return a config obj
	- .Commands
		- .add('name', () => {}) // add custom command that can be used from cy
		- .overwrite('name', (originalFunction, ...args) => {})
		- NOTE: to have IDE autocomplete you need to describe your commands in `index.d.ts` file

other:
- to get IDE autocomplete we can add `/// <reference types="cypress"`
- config:
	- baseUrl: string
	-  viewportWidth: number // change default width
	- viewportHeight: number // change default height
	- defaultCommandTimeout: number // change timeout of tests
	- env, retries etc
	- setupNodeEvents(on, config) // allow to perform some server actions
		- on('task', {async commandName(return null)}) // add callable function commandName that can do some server-side actions
- based on JQuery
- all commands are async, so if we are getting some response from command we need to use await/then
- to perform login it is not enough to just make api call, cookie management and other additional moves may be needed
- to store some test info(user) we can use fixtures and store data in json format

#### Faker JS
lib used to generate fake data

main functions:
- faker
	- .internet
		- .userName
		- .email

#### React Testing Library
light-weight library to write maintainable tests for React component without knowing about implementation details

based on DOM testing libray + comes preinstalled with create-react-app
alternative to Enzyme
testing framework agnostic, but jest is recommended way to go

interacts with actual DOM nodes in the same way as user do(giving same interfaces)

#### Puppeteer
headless/headful high level API to interact with Chromium browser

main use cases:
- generate screenshots and PDFs
- crawl SPAs, generate pre-rendered content(SSR)
- automate form submission, UI testing, keyboard input, etc
- create an automated testing environment
- capture a timeline trace(diagnose performance)

similar to Cypress and Playwrite(allows to work with Safari too)

#### Cucumber(*kinda dead*)
tool to write tests with plain language(you still need to describe this actions via JS)

```
Feature: Greeting

  Scenario: Say hello
    When the greeter says hello
    Then I should have heard "hello"
```

## TDD(test driven development)
TDD is an approach to write code by writing unit tests first and after that implement code that satisfies this tests

we have some feature and we thinking it through in a test way and after that implement

There is 3 stages
- red: write tests that fails
- green: fix tests
- blue: refactor code