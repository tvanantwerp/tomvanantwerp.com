---
title: How to Resize iframes with Message Events
date: 2021-07-21
description: Sometimes you want to embed an app into another web page using an iframe, but the height of the iframe must respond dynamically to the content. Here's how to do that with message events.
tags: 
    - Technical Writing
    - iframe
    - Browser Events
    - HTML
    - JavaScript
layout: layouts/writing.liquid
---

For the past several years, whenever I needed to embed a React into another site, I would use the [Pym.js](http://blog.apps.npr.org/pym.js/) library written by NPR. With Pym, I was able to embed React apps in iframes with widths and heights that dynamically adjusted to the iframe's content. For example, if an app had conditional UI that was hidden unless you picked a certain option, I didn't need to worry that adding in the new UI would cause overflowing content in the iframe—it's height would simply adjust to match.

But Pym is getting a bit old; I don't think it's been updated since 2018. And when I recently created my first interactive using Svelte instead of React, I absolutely could not get Pym to play nice with it. No matter how I tried to configure it, the iframe was always the default 150px height. The time had come to ditch Pym and write the code to do this myself using the `window.postMessage()` method.

With `postMessage`, the embedded iframe site is able to send messages to the parent window. Scripts in the parent `window` can then listen for the `message` event and take action based on the `data` sent. In this case, I'm sending a message with the `clientHeight` of the interactive and the parent window is using that information to adjust the height of the iframe. [More detailed information can be found on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

Here are examples of a parent HTML page and the iframe-embedded child using the `message` event to set the iframe's height. In the child page, I use `setInterval` to regularly update the parent about the height so that I don't have to think too hard about what, precisely, might cause height changes in the app. If you know exactly what would or wouldn't trigger a change, you could send the event manually instead of updating at regular intervals.

```html
<!-- parent.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- The #target is where you want to create the iframe -->
    <div id="target"></div>
    <script>
      let container = document.querySelector("#target");
      const iframe = document.createElement("iframe");
      iframe.src = "https://location.of.iframe/index.html";
      iframe.width = "100%";
      iframe.style = "border: 0";

      // contentHeight sets an arbitrary default
      // then keeps track of the last size update
      // to avoid setting height again if nothing changes
      let contentHeight = 500;
      iframe.height = contentHeight;

      window.addEventListener('load', () => {
        container.appendChild(iframe);
      });

      window.addEventListener(
        'message',
        function (e) {
          // message that was passed from iframe page
          let message = e.data;

          // before I update the height,
          // I check to see if it's defined
          // and if it's changed, and if
          // it's not the iframe default
          // of 150px
          if (
            message.height &&
            message.height !== contentHeight &&
            message.height !== 150
          ) {
            iframe.height = message.height + 'px';
            contentHeight = message.height;
          }
        },
        false
      );
    </script>
  </body>
</html>
```

```html
<!-- child.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="resizing-app">Your app that could change size goes here.</div>
    <script>
      function resize() {
        setInterval(() => {
          // I noticed that sometimes undefined
          // was sent as the height to the parent,
          // so check for it before trying
          if (document.querySelector('.resizing-app').clientHeight) {
            window.parent.postMessage(
              { height: document.querySelector('.app').clientHeight },
              '*'
            );
          }
        }, 100); // updates ten times per second
      }

      window.addEventListener("load", resize);
    </script>
  </body>
</html>
```

This simple example only concerns itself with dynamically adjusting iframe height. But you can of course use this technique to send all sorts of messages to the parent window.