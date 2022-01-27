---
title: Using Lottie Animations for UI Components in React
date: 2021-11-17
description: Lottie can bring the power of Adobe After Effects's animations to the web. Learn how to integrate these animations into your user interface in a React app.
canonical: https://labs.thisdot.co/blog/using-lottie-animations-for-ui-components-in-react
tags: 
    - Technical Writing
    - Animation
    - JavaScript
    - After Effects
    - Lottie
layout: layouts/writing.liquid
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/using-lottie-animations-for-ui-components-in-react)._

[Lottie](http://airbnb.io/lottie/#/README) is a library created by Airbnb that allows developers to display animations created in [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) on the web and in mobile apps. This allows developers to use more more dynamic and detailed animations for their apps than would normally be possible with, for example, CSS animations.

Button icons are one great example of where a lottie file can improve the animated user experience. Here I'll be integrating an animation for toggling a hamburger menu into a React app.

In order to use lottie files in my app, I'll first need to install the `lottie-web` package.

```
npm install lottie-web
```

Next, I'll need an animation file. Lottie files are exported from After Effects with the BodyMovin plugin, and are saved as JSON files. If you don't have your own After Effects animations, there are many free lottie files [available online](https://lottiefiles.com). I'm going to use [this hamburger menu toggle animation by Christopher Deane](https://lottiefiles.com/63941-hamburger-icon-24px).

The lottie-web library works by creating an object that loads the animation. That object takes a container element where the animation will be created, then exposes methods like `play` and `setDirection` for running the animation. To make this work in React, we'll have to use the `useRef` hook.

First, let's create a basic button component.

```jsx
import React from 'react';

const MenuToggleButton = ({open, setOpen}) => {
  return (
    <button onClick={() => setOpen(!open)} />
  );
};

export default MenuToggleButton;
```

This button expects to receive the open status of the menu it controls as a boolean, and the state setting function to change that status on click. Next, we'll add our animation.

```jsx
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from './animationData.json';

const MenuToggleButton = ({ open, setOpen }) => {
  const animationContainer = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      });

      return () => anim.current?.destroy();
    }
  }, []);

  return (
    <button
      onClick={() => setOpen(!open)}
      ref={animationContainer}
    />
  );
};

MenuToggleButton.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default MenuToggleButton;
```

We're importing the lottie-web lightweight animation player, since the full package can be large, and we don't need all of it. The lottie file we're using is rather small, so I've chosen to import the JSON file directly rather than fetch it. How you implement that may depend on the size of your animation.

We've also created two refs: one for the containing button element, and one for the animation object itself. We then use `useEffect` to create the animation object if the containing element has been created. Our animation object has a few important settings: it is set to not loop and not autoplay. Because we want this animation to respond to user interaction, it wouldn't make a lot of sense to allow it to automatically start playing an endless open-and-close animation loop.

Lastly, we need to make the animation respond to clicking the button. We want the animation to play from one end to the other without looping, and then play back the animation in reverse when the button state is toggled back. We will set this inside the button's `onClick`.

```js
<button
  onClick={() => {
    setOpen(!open);
    anim.current?.setDirection(open ? -1 : 1);
    anim.current?.play();
  }}
  ref={animationContainer}
/>
```

## Live Demo

Our button is now fully functional, and our animation is ready to play when a user clicks it. To see it in action, [check out this live example](https://stackblitz.com/edit/react-kodgxw?file=src/components/icon/index.js).

<iframe src="https://stackblitz.com/edit/react-kodgxw?embed=1&file=src/components/icon/index.js" width="100%" height="600px"></iframe>

