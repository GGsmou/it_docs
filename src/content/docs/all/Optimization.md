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
