---
title: CSS
---


## Modern CSS stuff
#### CSS container queries
- similar to media queries, but you can set break-point according to size of some container

## Approaches in writing CSS
#### Semantic CSS
make abstract-describative class names in order to separate concerns and not mix html and css
(write html -> add style-names -> add styles to hooks(style-names))

problems: css is dependent on html structure + selectors may be needed

#### BEM(block element modifier)
break html to blocks with elements inside(element or block can have modifier)
add proper css classes

problems
- what you can do if you have two similar components
		1. duplicate css(breaks DRY rule)
		2. move css to base component and @extends/mixin to both similar components(preprocessors only)
		3. use base class for both elements(mixing concerns)

\---

we can see two options to deal with html-css relationships

###### Separation of concerns
(css depends on html)

name classes based on html and then style this hooks
css is not reusable

###### Mixing concerns
(html depends on css)

name classes in more general way
css not cares about things it applied
html is need to know about css and mix it in order to achieve it's goals

\---

#### Content-agnostic CSS components
based on mixing concerns approach, so we make general class names like .btn, .btn--primary and then use them all over html
in this way we can create .form, create .card and use them sepparatly or form inside card

to space-out things we can use base layout components(list etc) + classes to children(list__item etc)

#### Content-agnostic CSS components + Utility classes
to deal with modifiers(list--left + list--right for example) we add utility classes like in Tailwind to align smth etc

also utility classes can help with spacing out(spacer utils like mr-r-sm)

#### Utility first
write mostly utility classes + some big abstract classes like .card

good for big codebases where you can make big utils styleshits and reuse theme inside codebase
(for example: .text-dark-soft)

\---
in general, tailwind(atomic-css) is good for work without design system(or with non consistent one)
but if we have strict design system BEM or module.css is better approach(both gave styles encapsulation)

css modules - technologie that helps encapsulate styles for only one module/component, by transforming class names to random values
- create `button.tsx` + `button.module.css` files, add styles for classes, import `styles from button.module.css`, style object will have properties for each class

## CSS Utility classes naming conventions
#### Font-size
1. h1...h6
2. xxl, xl, m, s, xs
3. text-12, text-24 etc
#### Colour
1. slate-50, blue-950 etc
2. dangerous, success, prime
3. main, secondary, mainLight

## Optimization
As any other asset, CSS can slow down page load and lower UX
- crucial part that CSS blocks page render

main ways of optimizing it is to work on:
- load speed
	- reduce file size
		- minification - often included as a part of some build step
			- note: always include minified CSS, when working with external dependencies
		- removing unnecessary code
			- don't duplicate inherited properties
			- use build tools that can do auto-removals like:
				- unused definitions
				- short-handing hex codes
				- compressing definitions
					- `h1 {...} h2 {...}` -> `h1, h2 {...}` 
		- file compression
			- often done via server or analog like CDN
	- manipulate how and when CSS loads
		- HTTP preload - forces browser to do earlier requests and don't block render
			- done via `rel="preload"` or HTTP header
			- usage: load styles, that user will see later
			- preload is happening, when HTML starts parsing
				- by default CSS starts loading after HTML parsed
		- HTTP push - content is pushed by server to browser, so content will be delivered even earlier
			- caveats: HTTP 2 is required, browser caching can be broken
			- preload will do push, if possible, by default
		- embedding CSS - used to deliver most important styles as fast as possible
			- done by adding CSS into `<style>` tag
			- caveats: increases HTML file size, disables caching of CSS files
		- lazy loading hack - defers load of CSS, by making it non-blocking in native way:
			- explanation: make browser load content, but with wrong media, which forces it to think that it is not CSS, so no need to block, but, when loaded, apply styles
```html
<link  
	rel=”stylesheet”  
	href=”/path/to/my.css”  
	media=”print”  
	onload=”this.media=’all’; this.onload=null;”  
>
```
- parsing speed

all in all, there are many tools to analyze and optimize your code, some of them:
- "Coverage" section in DevTools, that shows how many CSS in sent to user and not used
