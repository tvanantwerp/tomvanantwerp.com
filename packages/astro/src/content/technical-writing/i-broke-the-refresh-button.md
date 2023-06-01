---
title: 'I Broke the Refresh Button: Dealing with a Rogue Service Worker'
date: 2019-03-19
description: What happens when you used to have a service worker but don't anymore.
tags:
  - Technical Writing
  - Service Workers
---

I was quite happy to launch a new version of a website last week. I was less happy when, come Monday, people were still seeing the old version. The standard "have you tried refreshing" had no effect: no matter home many times people refreshed, the old content would keep coming back. This was some aggressive caching!

The culprit was an old `service-worker.js` file! The old site had been built with `create-react-app`, which included service worker registration by default and which I hadn't paid much attention to. The new site was built with [Gatsby](https://www.gatsbyjs.org/), which doesn't include one by default.

Service workers can help you to cache your site/PWA so that it still functions while offline. Typically, a service worker will check for a new version of itself whenever you visit the associated site after a 24 hour period. But when the old service worker checked for an update, it got a 404 response and defaulted to staying alive and serving cached content no matter what.

To get clients to stop relying on the old service worker, I had to add a new "updated" `service-worker.js` to the site's root (where it expected to find it).

The new service worker, in its entirety:

```javascript
self.addEventListener('install', () => {
	self.skipWaiting();
});
```

All this does is tell the browser: "Hey, I'm the new service worker, chuck out that old service worker, and, uh, that's it, we're done here."

Since this particular site never really needed a service worker in the first place, I'm happy with this no-op service worker as a quick and dirty solution. After clients grab this to replace the last service worker, a simple refresh will once again allow their browser to actually hit the Internet to grab things, and not just rely on a very stale cache.

Thanks to Jeff Posnick via [StackOverflow](https://stackoverflow.com/a/38980776/9554333) for this simple solution! I've got a lot to learn about how service workers function, and a newfound respect for what happens if you're using them _without_ really understanding them.
