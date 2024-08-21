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

## Web-Performance
#### Main metrics
- load time - time until page is fully loaded and interactable
- FCP(first contentful paint) - time it takes for first content to appear
- TTI(time to interact) - time it takes for page to be interactable
- FID(first input delay) - time it takes for page to response for first user input
- TBT(total blocking time) - time that main thread was blocked

#### RAIL model
RAIL(response, animation, idle, load) - focuses on UX aka performance perceived by user

- first response of page should take less then 100ms
- animation should perform in under 10ms
	- meaning, there shouldn't be noticeable lags, when activating animation
- non-crucial operations should be delayed to time, when page is idling
- general load time should be under 1s
	- *well....it is kinda hard with react :)* 

#### PRPL pattern
PRPL(push, render, pre-cache, lazy-load) - focuses on minimizing time for initial load
- similar to RAIL model, it focuses of perceived performance, but in network side

- push - prioritize crucial resources first
- render - start render as soon as possible, even if something non-important is still loading
- pre-cache - cache most of needed resources
- lazy-load - defer load of resources, that out of view

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

## Caching Headers
It is common for most host to have enabled by default caching with smth like `Cache-Control` header of `public`, `max-age=0`, `must-revalidate`, which means: "cache this, but mark as irrelevant(stale), so next request will first go to the server and check for new version"
- it is basic config, that is good, but can be more aggressive for some cases
- server can respond with 200(when no cache) and 304 Not Modified(when cache is relevant)
	- second is still a GET request, but it is a lot faster

more aggressive technics
- `public, max-age=31560000, immutable` - for things that can never change(font, image, smth linked over stable URL)
	- explanation
		- `public` - asset can be stored in any cache between the browser and origin server
		- `max-age=31560000` - cache will stale after a year
		- `immutable` - prevent additional check to CDN from browser
	- it is bad practice to mark HTML files like so, case of impossibility to fingerprint them
- fingerprinting - change part of URL, when file is changed
	- URL acts as key to cache, so changing URL will force browser to download file, if it's URL changed, even if previous version was marked as "never changing"
	- often provided via bundlers

don't forget to check Dev Tools on prod, too find weak places :)

## Pre-Fetching
Prefetching is a technic, that downloads next possible page/resource, that user might request
- so next page will load instantaneously or near that, increasing LCP, UX etc

it is important to do it wisely, case it increases bandwidth and device resources consumption

main technics
- prefetch content of visible link, detected by Intersection Observer API
- prefetch popular content via data collected from analytics
- use Network Information API + Device Memory API to ensure that user have stable network
- use `reqiestIdleCallback` API to execute prefetching on next free CPU cycle(or after condition, often deadline, is met)

code snipped with fallbacks, done in native JS(but can be implemented via libs or `rel=prefetch` tag)

```js
function prefetch(nodeLists) {
  // Exclude slow ECTs < 3g
  if (navigator.connection &&
    (navigator.connection.effectiveType === 'slow-2g'
      || navigator.connection.effectiveType === '2g')
  ) {
    return;
  }

  // Exclude low end device which is device with memory <= 2GB
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
    return;
  }

  const fetchLinkList = {};

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!fetchLinkList[entry.target.href]) {
          fetchLinkList[entry.target.href] = true;

          fetch(entry.target, {
            priority: 'low'
          });
        }

        observer.unobserve(entry = entry.target);
      }
    });
  });
}

const idleCallback = window.requestIdleCallback || function (cb) {
  let start = Date.now();

  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
}

idleCallback(function () {
  prefetch(nodeLists)
})
```

## Low Quality Image Placeholder
It is common that images weight more that HTML+CSS on your page and while they don't block rendering, it is affecting UX

Except of caching, pre-loading, skeletons and compression, there is other technique, replacing images with low quality placeholder, which is increasing UX, by giving the user smth to look at
- it is also possible to improve LCP score, but it can be tricky to align loading speed
	- basically Chrome finds larges element on page and tries to find larges before ~2.5s passes or user interacts with page
	- same size elements won't trigger change, with some nuances to prevent LCP Hacks:
		- upscaled version of image will be replaced with more quality one
			- simplifying image area is calculated via: `area = size * min(displaySize, naturalSize) / displaySize` 
				- `size` is what eventually user sees
				- `displaySize` is what rendered, but can be cropped or out of viewport
	- general rule of thumb keep UX > LCP Hacking

rules:
- don't simply downscale images
- image must be "dense", meaning that 1 pixel must contain .055 bits of data after all rendering and cuts
- it is ok to make image larger than minimum requirements for LCP, if it is beneficial to UX
- it is better to use images processing services like [Cloudinary](https://cloudinary.com/), which is platform that lets you store your images and receive different quality versions of it when needed

how to with bg-img
```html
<head>
	<link rel=preload as=image href=lo-res.jpg fetchpriority=high />
</head>

<body>
  <header style="background-image: url(hi-res.jpg),
                                   url(lo-res.jpg)">
  </header>
</body>
```
it is working, case CSS will display first account on what image is loaded and after that on order
- thats why we are preloading, we need for our image to be on screen "instantaneously" and not race with `hi-res` 
- as good rule, we can add `bg-color` to prevent no bg at all, if no image loaded yet
	- to increase UX we can use ultra low quality image to prevent `bg-color` from appearing at all(in most cases), but it won't help with LCP

how to with img:
- we can use semantic `img` with `src` set to `hi-res` image and set `bg-image` to `lo-res` 

## Dev Tools
Many browsers have dev tools, aka tools that help developing web apps

Main standard is Chrome Dev Tools, that have number of possibilities, some of them are:
- `Elements` - inspect HTML+CSS
- `Console` - work with JS
- `Network` - request/response view + network performance analyze
- `Performance` - performance :)
- `Application` - managing page resources, such as Storages, Cookies etc

## Lighthouse
Lighthouse - tool for auditing performance, accessibility and CEO of websites
- good starting point to investigate week places of page
- can give CEO boost, because involved in google search engine to determine website quality

key measurement:
- load time
- first paint
- time to interact
- accessibility
	- missing `alt` 
	- broken links
	- incorect image sizes

## Caching
Basically it is about storing some frequently accessed data in temp storage(cache), that can return this data faster than actual storage
- it is important not to break data integrity, by serving some obsolete information from cache, so cache invalidation is important
- everything can be cached: static files, query responses, API calls

Benefits:
- improved UX, by reducing latency and network usage
- improved backend, by lowering server load

#### Cache Types
- in-memory - storing data in RAM
	- useful for servers and databases, case we reducing number of costly I/O operations
	- it is important not to store data changes in RAM, because it is can be lost
- distributed - storing data in multiple nodes in network
	- useful for some highload servers
	- prevents data loss, but harder+costly to setup/operate
	- simple example: create a Redis layer of cache and look there first
		- more complicated version can have multiple Redis nodes, that falls back to nearest DB, that duplicates main DB
- client side - storing data in the client
	- useful to reduce number of requests from client(UX and server boost) for some static content
		- also can be used to cache API calls in-memory or via Storage API
	- it is important to be careful with caching policies, to prevent stale data

#### Caching Stratagies
- aside(client side caching) - caching inside app
	- be careful with stale cache
- write-through - write to cache and then to DB, keeping cache up-to-date
	- slower writes
- write-behind - similar to write-through, but with batching writes
	- a bit slower writes
	- possibility of inconsistent data
- read-through - read from cache, with fallback to DB
	- slower reads
	- beneficial for rarely changing data, slow DBs

#### Measuring cache effectiveness
Cache is always introducing some tradeoffs, so it is important to measure and choose right one

- measuring cache hit rate - calculating how often we avoiding DB operations and using cache
	- formula: `cacheCalls/allCalls` 
- analyze cache eviction rate - measure how much items are removed from cache due to it's size or expiration data
	- too high count can be evidence to improve parameters above
	- be careful with caching by time with too big values(or even by time at all, because it is more stale-affected and not as efficient as other strategies)
- monitor data consistency - check if cache serves inconsistent data, by comparing it with actual one
