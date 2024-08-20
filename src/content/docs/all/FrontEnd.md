---
title: FrontEnd
---

## Internet
- ![](../../../assets/it_4.png)

#### Browser Process
- Parsing
	- HTML
		- parse, convert to nodes, build DOM tree from nodes
	- CSS
		- parse, build CSSOM tree
- Rendering
	- after HTML and CSS finish parallel parsing they combined into Render Tree
		- render tree is similar to DOM, but without(`meta, script, link, display:none`) AND with(`:before, :after`)
	- Reflow/Layout
		- *layout - first iteration, other repetitions - reflow* 
		- build layout tree that is handling all elements/pseudo elements positioning
			- this process is handled by traversing Render Tree one/multiple times
		- changes of css will case Reflow
			- reflow can be done to part of tree OR all of it
			- it is better to reduce unused css and deep of tree for optimize
			- (partial list)![](../../../assets/it_5.png) 
			- `.getBoundingClientRect(), .clientLeft` and other JS operations can cause reflow
			- Reflow is done inside main thread(Event Loop) so it can be blocked
	- Paint/Repaint
		- *paint - first iteration, other repetitions - repaint* 
		- traverse layout tree and add color, bg etc
		- repaint triggerred by reflow, css, js
		- if it is animation all repaint+compose calculations are done via GPU
	- Composite
		- break all components into layers, rasterize, combine layers
		- done in separate thread
			- broken in tiles with priority to visible elements
		- LAYERS
			- transform, opacity, will-change properties move elements to separate layers

#### OSI Model
abstract network model for developing and communicating through network
- application
	- client-server communication
- presentation
	- compression + encryption
- session
	- queue of data transfer
	- handling client-server connection
- transport
	- used to handle which app is getting request by port(1-65535)
		- some of ports are reserved
	- used to break data to packets, check if data received fully etc
	- based on TCP/UDP
- network
	- used to complex data addressation via ip address
		- ip address - logical address that linked to device by network admin
			- some are reserved or may need to be registered
			- 0-255.0-255.0-255.0-255 (32 bit)
		- routers can be admins, that handle inner requests and outer request
			- they have two ip addresses: inner and external
		- all nodes are filtering out requests if they know nothing about receiver
- data link
	- check if data transferred correctly
		- usually by checking control sum
		- data transferred by small frames with linked meta-data
	- handle paralel data transfer
	- handle data path by mac address(xx:xx:xx:xx:xx:xx base16)
		- mac is linked to device on manufacture stage
	- switch, bridge
- physical
	- transfer data between machines
	- hub, repeater, modem

this model can be compressed to TCP/IP stack(layer - protocol):
- application - http, ftp, dns etc
- transport - tcp, udp
- network - ipv4, ipv6
- network interface - ethernet, wifi

#### TCP
Transmission Controll Protocol

- establish connection
	- 3 way handshake(want to connect - agree, want to connect - agree)
- transmit data with confirmation
	- STANDART TCP: send data(try again if no answer) - check if data transferred correctly, send that data received with next part of data that need to be received
	- Cumulative TCP: send bunch of data at once
- close connection
	- close - closed + close - closed

#### UDP
User Datagram Protocol(DNS is based on it)

send request(repeat if no answer) - receive answer

faster, but can loose some data(good for video/audio stream)

#### HTTP(S)
Hypertext Transfer Protocol (Secure)
used to transfer HTML, JSON, other data

message
- types: request - response
- STRUCTURE
	- method - version
	- path - status code
	- version(1.1, 2, 3) - text status

header(meta data)
- key-value
- host - required header

body(optional)

###### HTTPS
data is encrypted via TLS(SSL before) protocol

this protocol is done by system of public keys, certificate etc

###### REST
general rules how to implement API interface

methods
- GET users/ - User list
- GET users/:id - User details
- GET users?name=alex - filtered User list
- HEAD users/:id - similar to GET, but don't responds with body
- OPTIONS users/ - returns all headers that can be configured
- POST users/ + body - create new User
- PUT users/:id + body - fully update User
- PATCH users/:id + body - partially update User
- DELETE users/:id - delete user

status codes
- 1xx - info
	- 101 - switching protocol
- 2xx - success
	- 200 - OK
	- 201 - created
- 3xx - redirect
	- 301 - permanent move
	- 304 - not modyfied
- 4xx - client error
	- 403 - forbiden(auth)
	- 404 - not found
- 5xx - server error
	- 500 - internal server error
	- 503 - server unavailable

#### API
API(application program interface) - interface to interact with program

## Work with designer
#### Main points
- auto-layouts
- designer must use padding/gap instead of manual centering
- colors, fonts and sizes are based on predefined design system
- changes should be shown by comments

#### Animations
- lottie-web
	- designer makes animation for some object and send it as ready to use json
- framer-motion(react)
	- library of ready to use animations, that designers can choose from and devs easily implement

## Accessibility
Accessibility in web is big topic that includes(sorted by priority):
- keyboard controls
	- elements must be selectable by tab, forms submittable by enter etc
	- it is possible to make div natively selectable, but recommended to use only native tags(a, button, forms, inputs etc)
- screen readers(there are different types of them)
	- huge part of this topic is semantic elements, elements that have predefined meaning
		- historically `div` and `span` is used as main building blocks, but they have no meaning to screenreader and other devs, so there are number of `HTML5` elements, that work like containers(sometimes with special properties), but with this semantic meaning
		- `<article>` - independent peace of content, that can be understood by it's own
			- post, comment etc
		- `<aside>` - some content, placed aside main content
			- table of content
		- `<details>` - additional details, that can be hidden like accordion
			- `<summary>` - used to define always visible part of `<details>` 
		- `<figure>` - self contained content, like illustration, image(s), diagram, code
			- usually used with `<figcaption>`, that is semantic description of a `<figure>` 
				- placed as first or last element of a block
		- `<footer>` - bottom part of webpage, that includes contact info, navigation etc
		- `<header>` - top part of webpage, that includes headers, navigation, logo etc
		- `<main>` - main part of webpage
		- `<mark>` - highlighted text
		- `<nav>` - major block of navigation links, that contains hyperlinks inside
		- `<section>` - some content grouping, that usually has a heading
		- `<time>` - used to wrap a time text
			- can contain any data, but if it is correct time value, it will be localized by screen reader
		- `<dl>` + `<dt>` + `<dd>` - description list element, that is used with description title and description description to implement a glossary like structure
- reduce monition, dark/light themes
- low quality screens
- colorblindness(contrast issues)
- gestures
- optimization for cases where no JS has loaded

accessibility must be firstly included in design

there some countries(EU, USA etc) with laws that obligates webpages to have certain level of accessibility

## SEO (Search Engine Optimization)
helps to fool search engine

main ways to improve:
- time that user spends on page
- how people got to page
- green lighthouse

`<meta>` tags are mostly needed for bots and not SEO

SPA is bad for SEO, so SSR is used(when we send HTML + JS that makes it work)

## SSR (Server Side Rendering)
we render HTML on server and send it along side with JS that makes it "alive"
based on [hydration](#hydration) methods

improves SEO, accessibility

good for open resources, but sucks for CRUDs

## Hydration
#### Island

## Frameworks
#### React native
converts react components to native IOS/Android elements
(realizes bridge pattern)

cons:
- still slower then native, because of JS layer
- for full native app simulation you may need to setup DB
- hard to manage navigation
- you often can have edge cases, so Swift/Kotlin may be needed anyway

use-cases:
- to develop MVP

#### Electron
not a framework, but a tool to convert existing web app to native desktop app

breaks into two parts:
- chrome instance with more rites that browser to render
- node.js server to work with OS
- both parts are communicate via post-messages

cons:
- hard to update(similar to other desktop apps), so you need a dedicated server to control versions + update btn somewhere
- slower and not as good as native

use-cases:
- fast and cheep web to desktop app conversion
- ATM "OS"

## LocalStorage
store data scoped by domain

- pros: native, easy to use
- cons: sync, slow, small storage size, sereallization dependent(stores all data in string)

alternative - IndexedDB(modern browser API that gives you way to work with DB via JS objects and built-in methods)

#### SessionStorage
same as LocalStorage, but scoped by tab+session

#### Cookes 
similar for LocalStorage, but used for client-server interactions
- often set by server and can be modified/seen by client

can be set to expire

## Virtual tables/lists
In order to render huge amount of data via list/table you can use virtual technic(by lib or custom one)

For lists you are doing local lazy loading(render data partially) + set some huge `hight`, relative to array length, so you can have native scroll

## GraphQL
Way of client-server communication for complex-aggregated requests. Basically introduces it's own language to create requests

Huge step in client-server communication evolution
- introduced Query-Mutation separation to front-end
- inspired react-query

pros:
- strictly typed
- easy to use on front-end
- great for BFFs
	- however, bff can be built to return prepared aggregated entities without GraphQL
cons:
- heavy requests are hard to restrict
- auth(mostly fixed)

## Web...
#### WebAssembly
Tool to connect any language with web

pros:
- heavy calculations can done on client
cons:
- not really useful

#### WebGL
Tool to pass heavy rendering to GPU

ThreeJS is based on it

Can be used for cool 3d websites, casinos/other games, retail stuff(3d models of furniture etc)

#### WebC:
Tool to pass calculations to GPU

Can be used for AI and stuff :)

## Internationalization(i18n)
i18n - short version of internationalization

i18n is deep theme, that includes
- translation
- data-time
- different variations of same language
- design
	- right to left
	- overall page layout(example: in Japan layouts are more cluttered then western)
- *and many more* 

#### Translation
good process:
- systematic
- easy, fast, async
- automatic
- l10n with context(screenshots etc)
- no monkey job

Translation management system(TMS) - system for translator to work with translation, that integrated in development
- manages translations similar to git(push source, pull translations)
	- can be integrated with CI/CD
- have translation memory(saves all previous translations, so you don't need re-translate prev knowledge)
- tools: Crowdin

one of the best localization frameworks: LinguiJS
- easy work with plurals
- eslint integration
- universal
- rich tooling
- lightweight
- compatible with international formats
- tags(like links) can be part of translation

## Shadow DOM
Shadow DOM is part of DOM, that is used for creating parts of component, that can't be affected by CSS or JS from regular DOM
- element can't be:
	- queried from JS
	- styled by CSS selector
	- etc

Basically we are having a shadow DOM root, that points to shadow tree, that will be joined with regular DOM on render

Shadow DOM is used to create incapsulated object, meaning we can manipulate Shadow DOM as regular DOM from inside of it, but can't interact from outside or with outside DOM

JS API
```js
const root = document.querySelector("#root");
const shadow = root.attachShadow({ mode: "open" });
const span = document.createElement("span");

span.textContent = "Shadow DOM";
shadow.appendChild(span);
```
- `mode: open` makes our component open to use from JS via `root.shadowRoot` 
	- it is not strict(extension can break it) and more like recommendation


HTML API
```html
<div id="root">
  <template shadowrootmode="open">
    <span>Shadow DOM</span>
  </template>
</div>
```
- everything in template is not visible by default, so we are using `shadowrootmode` 
- on render, `template` will be replaced with it's children, creating correct DOM structure

To style we can  use JS like this:
```js
const sheet = new CSSStyleSheet();
...
shadow.adoptedStyleSheets = [sheet];
```
Or add `<style>` inside `<template>` 
Or add link to external style-sheet
- note: stylesheets won't block render of shadow root, so un-styled element may appear on screen for some time
All in all, this styles will be scoped to this Shadow DOM

Often use-case is creating custom elements, with some inner workings, like this:
```js
class Circle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", this.getAttribute("color"));

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.appendChild(circle);

    shadow.appendChild(svg);
  }
}

customElements.define("filled-circle", Circle);
```
```html
<filled-circle color="red"></filled-circle>
```
*yep, I was pretty shocked too* 

## Creating custom elements
Custom element is element that extends some predefined element, with added behavior by developer

two main types are:
- customized built-in element - extends behavior of existing element, like `<p>` etc
- autonomous custom element - extends from `HTMLElement`, and fully implements needed behavior
- note for framework devs:
	- both patterns are appliable to react(or smth else), where second is standard approach to creating components(but without need to implement `HTMLElement` interface) and the first is mainly used when creating custom elements lib, where you can create some highlight element and extend `<mark>` element props + pass it like this to main element: `{...rest}` 

CSS API
- `:define` - matches every "defined" element
- `:host` - matches host of ShadowDOM style is used
- `:host(selector)` - same as `:host`, but with possibility to pass another selector as parameter
- `:host-context(selector)` - matches all host's ancestors via selector
- `:state(name-of-internal-state)` - match custom state

API
- both types are done as class, that `extends` needed interface, with `constructor`, that calls `super` 
	- `constructor` can also add some event listeners, init state etc, BUT not interact with `children`, `tags` and break some other requirements
		- this interactions can be done in lifecycle callbacks - functions, that browser calls at specific moments
			- so smth like react-classes lifetime methods
- lifecycle callbacks
	- `connectedCallback` - called, when element is added to the document
		- used for most setup purposes
	- `disconnectedCallback` - called, when element is removed from document
	- `adoptedCallback` - called, when element is moved to new document
	- `attributeChangedCallback` - called, when attributes are changed
		- takes `(name, oldVal, newVal)` parameters
		- it is used in combination with `observedAttributes: string[]` static property, which states, what attributes we need to observe
			- example: `static get observedAttributes() { return ["color", "size"]; }` 
		- cb will be called, when DOM is inited, so it is safe to do attribute related setup here
- registering step is done by calling `window.customElements.define(name, constructor, { extends: "tag" })` 
	- name is usually lowercase with hyphen
	- extends is used with customized built-in elements
- usage is done by:
	- using `is` parameter for customized elements:
		- `<p is="some-name"></p>` 
	- using element like element for autonomous elements:
		- `<some-name></some-name>` 
- custom CSS selectors(only for autonomous elements)
	- CSS allows to react to custom properties, similar to `hover` and others via `:state(name-of-internal-state)` 
	- to make it work we need to implement it via JS like this:
		- call `this._internals = this.attachInternals();` in `constructor`, which makes element reachable from CSS and add `this._internals.states` to interact with it
		- note: `st` is not visible from outside
		- add getter and setter, that interacts with states
```js
get st() {
	return this._internals.states.has("st");
}

set st(flag) {
    if (flag) {
      this._internals.states.add("st");
    } else {
      this._internals.states.delete("st");
    }
  }
```

## Web Components
WebComponents is a term, that includes several technologies, that allow creating reusable components with encampsulated logic

Basically it is emphasis on DRY in native web, without custom UI render mess

Main pillars are:
- custom elements - reusability of component
- shadow dom - markup, style and script encapsulation
- HTML templates - creating some structure in HTML, that won't be rendered into the DOM
	- `<template>` - used to:
		- declaratively create ShadowDOM, if has `shadowrootmode` set to proper value
			- there are also other properties, including `shadowrootdelegatesfocus`, which allows to click on any part of shadowroot and delegate focus to first focusable element inside of it
				- this will also focus parent element
		- create HTML, that can be later cloned into DOM somewhere else
			- basically more declarative way of constructing HTML via JS
			- there is a pitfall to woking with `DocumentFragment`, when we appending it's clone, we are actually appending it's children, so it is important not to add handlers etc to fragment itself, caze they aren't passed over
	- `<slot>` - element, that can be later filled with some markup, aka separate DOM tree
		- it has `name`, that acts as ID and can take some placeholder as children
		- to use fill it, we need to pass element as child to our web component with `slot="name-of-the-slot"` and now this element is "slotted" to needed place
			- note: `<slot>` without a name will take all top level children of component, that don't have `slot` attribute
		- it can be useful as a pattern for rendering async data(for example, it can take `<loader-component>` as placeholder)

Basic flow of implementing web component:
- create a class for custom component with needed functionality
- register custom component
- attach ShadowDOM if needed
	- `template` with `slot`s can be attached here too
- use in markup, as regular component

## Web APIs
- Storage - used to store data(`key: string` - `value: string` pairs) in browser
	- `localStorage` - stored data have no expiration time and will be kept, until smth/smb will clear it
	- `sessionStorage` - data is stored in scope of one tab
		- closing tab or browser will erase data
		- refreshes will keep data
	- generally more efficient and have more space, compared to cookies
- WebSockets - used for bi-directional communication between client and server over single TCP connection
	- gives low latency and high speed, by excluding need to send new requests
	- main use-case - data streaming
	- connection is stable, guarantees data consistency and order(there are nuances, when used with Promise API)
- Server Sent Events (SSE) - used for one way(server to client) communication in form of events
	- similar to WebSockets, but for one-directional use-cases, such as push-notifications etc
	- basically client creates `EventSource` with needed URL and server send formatted stream of responses
- Service Workers - used as a proxy layer for network
	- use-cases: offline-first app, caching
	- basically ServiceWorker is registered onto page and, after that, can control all it's requests(event in background)
- Location - used to determine user's location(if permission is granted)
	- use-cases: maps, location sharing, working with location specific data
	- it is also possible to do calculations and subscribe to location changes
- Notifications - used to send notification into system level(for example from browser to user's phone)
	- as many others requires permission granting
	- done by creating `Notification` object
		- it is possible to customize title, body, icon, actions etc
- Device Orientation - used to access data about orientation and other motion data(pitch, roll, yaw etc)
	- use-cases: motion controlled games
	- if permission is granted, it is possible to read to react(via events) to change of parameters
- Payments - used as standard flow for checkouts, collecting payment or shipping data etc
	- used by creating `PaymentRequest`, triggering it, when needed and receiving data from user
	- only with HTTPS
- Credentials - used as interface for getting/retrieving emails, passwords and other tokens from/to user
	- only with HTTPS
