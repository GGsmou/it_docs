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
