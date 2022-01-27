---
title: Understanding CSS Gradients
date: 2021-11-10
description: The code for CSS gradients can be confusing. Building up your understanding of gradients one step at a time can give you confidence writing them yourself, without relying on gradient generator tools.
tags: 
    - Technical Writing
    - CSS
layout: layouts/writing.liquid
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/understanding-css-gradients)._

Color gradients can help improve the design aesthetic of a site. But it's not always so easy to write the CSS to make them work the way you want. There are plenty of tools online for visually building gradients and getting back the CSS to implement them. But those tools won't help as much with debugging or tweaking things at the margin. It's worth having a basic idea of how gradients work so you can manually adjust them yourself.

## The most basic linear gradient

A linear gradient smoothly transitions between colors in a single direction. So if you had a box, and you wanted to start with black and transition to white, you could do it like this:

```css
background: linear-gradient(black, white);
```

<div style="width: 100%; height: 200px; background: linear-gradient(black, white)"></div>

Here, you've created a CSS class and set the background of any element with that class to have a linear gradient. This gradient will start with the first color, `black`, and smoothly interpolate to `white`.

### Linear gradient direction

Right now, the top edge of the element will be black and the bottom edge will be white. If we wanted to make the left edge black and the right edge white, we could add a direction specifying that.

```diff
-   background: linear-gradient(black, white);
+   background: linear-gradient(to right, black, white);
```

<div style="width: 100%; height: 200px; background: linear-gradient(to right, black, white)"></div>

Now, we're telling the gradient to go from left _to right_. You can use directions like `to top`, `to top right`, `to right`, `to bottom right`, etc. When not specified, the default direction is `to bottom`.

[You can also specify direction more granularly with other units](https://developer.mozilla.org/en-US/docs/Web/CSS/angle). You can use degrees (`deg`), gradians (`grad`), radians (`rad`), or turns (`turn`). Our `to right` example could be rewritten as `90deg`, `100grad`, `1.5708rad`, or `0.25turn`.

### Linear gradient colors

This gradient is...really boring. It is not at all something we'd want to use. Let's pick some better colors!

```diff
-   background: linear-gradient(to right, black, white);
+   background: linear-gradient(to right, red, green, blue);
```

<div style="width: 100%; height: 200px; background: linear-gradient(to right, red, green, blue)"></div>

Ok, this gradient is pretty bad too. But at least it has color!

These colors are called color stops. If you want another color in the gradient, just add another color stop. By default, the color stops are distributed evenly across the gradient. But color stops can also accept a position that specify where along the gradient that color should be.

```diff
-   background: linear-gradient(to right, red, green, blue);
+   background: linear-gradient(to right, red, green 40%, blue);
```

<div style="width: 100%; height: 200px; background: linear-gradient(to right, red, green 40%, blue)"></div>

By specifying `40%` after `green`, we've set green to appear 40% along the way through the gradient rather than at the default midpoint. I've used percentages here, but you can also use specific units like pixels.

Color stops with positions can also be used to create striped patterns like so:

```diff
-   background: linear-gradient(to right, red, green 40%, blue);
+   background: linear-gradient(to right, red 20%, green 20% 40%, blue 40%);
```

<div style="width: 100%; height: 200px; background: linear-gradient(to right, red 20%, green 20%, green 40%, blue 40%)"></div>

Here, our first color `red` is solid from the start until 20% along the gradient. Then, `green` immediately takes over at 20%, and goes until 40%. Finally, `blue` takes over at 40%, and continues to the end of the gradient. The first color stop is assumed to begin at 0%, and the last is assumed to end at 100%.

### Combining gradients

Using colors with transparency, and background blend modes, you can overlay different gradients to achieve a variety of color effects.

```css
background:
  linear-gradient(to right, rgba(200, 40, 10, 1), rgba(230, 40, 10, 0)),
  linear-gradient(to left, hsl(220, 80%, 45%, 1), hsl(220, 80%, 45%, 0)),
  linear-gradient(0.5turn, rgba(20, 230, 30, 1), rgba(20, 230, 20, 0));
background-blend-mode: difference;
```

<div style="width: 100%; height: 200px; background-blend-mode: difference; background: linear-gradient(to right, rgba(200, 40, 10, 1), rgba(230, 40, 10, 0)), linear-gradient(-45deg, hsl(220, 80%, 45%, 1), hsl(220, 80%, 45%, 0)), linear-gradient(0.5turn, rgba(20, 230, 30, 1), rgba(20, 230, 20, 0))"></div>

### Repeating gradients

Let's say you want to create a repeating striped line pattern. Creating all of the necessary color stops would be impractical. But that's where `repeating-linear-gradient` comes in! Define the necesary color stops once, and watch it tile across the element.

```css
background: repeating-linear-gradient(
  135deg,
  hsl(180, 60%, 70%) 0 10px, /* a 10px-wide blue stripe */
  hsl(0, 0%, 95%) 10px 20px /* a 10px-wide white stripe */
)
```

<div style="width: 100%; height: 200px; background: repeating-linear-gradient(135deg, hsl(180, 60%, 70%) 0 10px, hsl(0, 0%, 95%) 10px 20px)"></div>

## Radial gradients

The humble linear gradient transitions colors along a single direction, like an ocean wave moving toward the shore. But the radial gradient is like a ripple in a pond, moving outward in all directions from a single starting point.

```css
background: radial-gradient(black, white);
```

<div style="width: 100%; height: 200px; background: radial-gradient(black, white)"></div>

Notice the default behavior of this basic `radial-gradient`. The point from which the transition begins defaults to the center of the element. The shape it makes is not circular, but elliptical; it is expanding and contracting to match the shape of the element. Color stops work the same way that they do with linear gradients.

Radial gradients take an optional shape, size, and position before their color stops.

### Circle or ellipse

Radial gradients default to an elliptical shape to stretch and fit the element they are part of. But you can also specify they be circular instead, regardless of element dimensions.

```css
.one {
  background: radial-gradient(ellipse, black, white);
}

.two {
  background: radial-gradient(circle, black, white);
}
```

<div style="display: grid; grid-template: auto / repeat(2, 1fr)">
  <div style="width: 100%; height: 200px; background: radial-gradient(ellipse, black, white)"></div>
  <div style="width: 100%; height: 200px; background: radial-gradient(circle,black, white)"></div>
</div>

### Radial gradient position

The default center position is limiting for making really interesting gradients. Thankfully, it's very easy to specify a different position with the `at` keyword.

```css
/* The default is farthest corner. The shape will intersect at the element's corners which are furthest from the starting point.  */
.one {
  background: radial-gradient(circle at top left, black, white);
}

/* With farthest-side, the shape will intersect with the most distant straight edge of the element. */
.two {
  background: radial-gradient(circle at 100%, black, white);
}

/* Same as farthest-corner, except now it's the closest one. */
.three {
  background: radial-gradient(circle at bottom, black, white);
}

/* Same as the farthest-side, except now it's the closest one. */
.four {
  background: radial-gradient(circle at 30% 70%, black, white);
}
```

<div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 16px;">
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(circle at top left,black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(circle at 100%, black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(circle at bottom, black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(circle at 30% 70%, black, white)"></div>
</div>

### Radial gradient size

There are four ways to size a radial gradient in relation to its element. When a radial gradient is drawn, it creates either a circle or ellipse that intersects the edges of the element in a certain way. The gradient is interpolated from the starting point to that invisible shape intersecting the element edge. The radial gradient's size determines where that shape intersects the edges of the element.

```css
/* The default is farthest corner. The shape will intersect at the element's corners which are furthest from the starting point.  */
.one {
  background: radial-gradient(ellipse farthest-corner at 30%, black, white);
}

/* With farthest-side, the shape will intersect with the most distant straight edge of the element. */
.two {
  background: radial-gradient(ellipse farthest-side at 30%, black, white);
}

/* Same as farthest-corner, except now it's the closest one. */
.three {
  background: radial-gradient(ellipse closest-corner at 30%, black, white);
}

/* Same as the farthest-side, except now it's the closest one. */
.four {
  background: radial-gradient(ellipse closest-side at 30%, black, white);
}
```

<div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 16px;">
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(ellipse farthest-corner at 30%,black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(ellipse farthest-side at 30%, black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(ellipse closest-corner at 30%, black, white)"></div>
  <div style="flex: 1 1 300px; width: 100%; height: 200px; background: radial-gradient(ellipse closest-side at 30%, black, white)"></div>
</div>

### Combining radial gradients

Like we did with linear gradients, we can get creative with radial gradients to create unique and colorful backgrounds! By now, you should understand enough about how gradients work in CSS that you can read the code below, and understand how it's constructing the gradient background you see here.

```css
background:
  repeating-radial-gradient(circle, hsl(190, 80%, 70%, 0.2) 0px 35px, transparent 35px 70px),
  radial-gradient(at top right, hsl(150, 70%, 50%, 1), hsl(200, 80%, 40%, 0)),
  radial-gradient(circle at 0% 50%, hsl(300, 75%, 40%), hsl(200, 90%, 30%, 0)),
  radial-gradient(circle at bottom center, hsl(30, 70%, 70%, 1), hsl(30, 70%, 70%, 0));
```

<div style="width: 100%; height: 400px; background: repeating-radial-gradient(circle, hsl(190, 80%, 70%, 0.2) 0px 35px, transparent 35px 70px), radial-gradient(at top right, hsl(150, 70%, 50%, 1), hsl(200, 80%, 40%, 0)), radial-gradient(circle at 0% 50%, hsl(300, 75%, 40%), hsl(200, 90%, 30%, 0)), radial-gradient(circle at bottom center, hsl(30, 70%, 70%, 1), hsl(30, 70%, 70%, 0))"></div>

## Conic gradients

There's one last instance of gradient in CSS to cover: the conic gradient. If the linear gradient moves like an ocean wave, and the radial gradient moves like ripples in a move, the conic gradient moves like the hands on a clock. This one is a bit weird compared to linear and radial, and you may not find much use for it. But it's worth letting you know that it exists.

```css
  background: conic-gradient(black, white);
```

<div style="width: 100%; height: 200px; background: conic-gradient(black, white)"></div>

Where previously color stops used percentages or units to designate position in the gradient, in the conic gradient, you would use angles. All the units you used in linear gradients to designate direction can instead be used in conic gradients for color position.

```css
  border-radius: 50%;
  background: conic-gradient(red 0 120deg, green 120deg 240deg, blue 240deg 0deg);
```

<div style="margin: 0 auto; width: 250px; height: 250px; border-radius: 50%; background: conic-gradient(red 0 120deg, green 120deg 240deg, blue 240deg 0deg)"></div>

Conic gradients don't have a repeating version like the others, but you can use other background properties to repeat them. Using such properties can have interesting results. As unlikely as it sounds, you can create a checkerboard pattern with a repeating conic gradient!

```css
  background: conic-gradient(red 0 120deg, green 120deg 240deg, blue 240deg 0deg);
```

<div style="margin: 0 auto; width: 320px; height: 320px; background: conic-gradient(white 0.25turn, black 0.25turn 0.5turn, white 0.5turn 0.75turn, black 0.75turn 1turn); background-position: top left; background-size: 80px 80px"></div>

### Accessibility

While conic gradients can allow you to create interesting things like pie charts and checkerboards, keep in mind that screen readers do not interpret anything from these styles. If you populated a report with pie charts made from conic gradients, a screen reader would not be able to explain the charts to its user. You probably shouldn't try to use these gradients for anything other than aesthetics.

## Conclusion

Hopefully this introduction to CSS gradients will help you feel more comfortable working with the code for them directly, and not feeling beholden to an online generator tool. By all means, feel free to use tools to create complex gradients more quickly than writing them by hand! But now you can have confidence that, when the time comes to make tweaks to them in the code, you'll be able to do so yourself.