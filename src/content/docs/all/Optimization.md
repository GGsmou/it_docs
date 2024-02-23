---
title: Optimization
---

## Optimization basics
- over-optimization on start - bad. It is better to left product flexible and cleaner on start and add optimization if needed
- you should optimize on start if
	- it is long session app
	- it is heavy computation(graphics or other computations) app
	- it is heavy app by itself
- to check if optimization needed
	- use weak device emulation chrome
	- safari browser(poorly optimized by itself)

## CSS optimization
Big amount of `var()` can cause problems, so you can change vanilla var to preprocessed var from SaaS(or smth else)

## LCP
Largest Contentful Paint - time diff between beginning of page load and finish of render for  biggest object in VeiwPort

good - < 2.5s
poor - > 4s

biggest element is always changing while loading, with end - first user interaction

LCP hack - way to override LCP metric
- old: add big empty img
- after chrome 112: take simple svg, make transparent, convert to base64 with min 3kb
