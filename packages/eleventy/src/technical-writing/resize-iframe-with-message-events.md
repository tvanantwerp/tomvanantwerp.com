---
title: Using Message Events to Resize an IFrame
date: 2021-08-26
description: Sometimes you want to embed an app into another web page using an iframe, but the height of the iframe must respond dynamically to the content. Here's how to do that with message events.
tags: 
    - Technical Writing
    - iframe
    - Browser Events
    - HTML
    - JavaScript
layout: layouts/writing.liquid
---

_This article was rewritten for the [This Dot blog](https://labs.thisdot.co/blog/using-message-events-to-resize-an-iframe), and the updates are being incorporated here._

Over the years, I've often had to embed interactive data visualizations into other websites. The simplest way to manage this has been to use iframes. The downside to using iframes is that their height doesn't automatically adjust to the size of the child content. But this problem can be solved by using `window.postMessage()` to tell the parent what the child's height is, allowing it to adjust the iframe's height attribute with JavaScript.

The [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API allows you to send data from one window to another across domains. With `postMessage`, the embedded iframe site is able to send data to the parent window. Scripts in the parent `window` can then listen for the `message` event, and take action based on the `data` sent.

[In this example](https://codesandbox.io/s/iframe-postmessage-example-3iyqy?file=/index.html "CodeSandbox code sample"), I'm sending a message from a child window in an iframe to a parent window with the `clientHeight` of the child's content. The parent window is using that information to adjust the height of the iframe. Every time you `ADD` or `REMOVE` a box in the child window, it sends a new message to the parent with the updated height. [Click here to see it in action.](https://codesandbox.io/s/iframe-postmessage-example-3iyqy?file=/index.html "CodeSandbox code sample")

![Dynamically Resizing IFrame](//images.contentful.com/zojzzdop0fzx/5Zx6eVfyOy01Ix14bmkmQJ/718365acf39a9061b0c2049fcf1c3e37/Aug-13-2021_11-12-32.gif)

First, a script in the child window checks the height of itself, and then sends that height information to the parent window.

```js
const app = document.querySelector('.resizing-app');
const height = app.clientHeight;
window.parent.postMessage(
  { height },
  'https://child-window-origin.com'
);
```

The script in the parent window creates the iframe, adds it to the document, and then listens to the `message` event. If it receives a message from the expected source, it will read the message data and update the iframe height.

```js
let container = document.querySelector('#target');
const iframe = document.createElement('iframe');

window.addEventListener('load', () => {
  container.appendChild(iframe);
});

window.addEventListener(
  'message',
  function(e) {
    if (!event.origin.match('child-window-origin.com')) {
      return;
    }

    let message = e.data;

    if (message.height) {
      iframe.height = message.height + 'px';
    }
  },
  false
);
```

If you've got an app to embed where the height might change independently of any specific action, you can also use `setInterval` to poll for height changes, and send them on a regular basis. [Here is an example](https://codesandbox.io/s/iframe-postmessage-example-3iyqy?file=/index.html) of the same app, but the boxes are created and destroyed at random, and polling is used to check the height at regular intervals.

If you'd like to learn more about the `postMessage` API, [more detailed information can be found on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

## Live Demo

<iframe src="https://codesandbox.io/embed/iframe-postmessage-example-3iyqy?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="iframe-postmessage-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
