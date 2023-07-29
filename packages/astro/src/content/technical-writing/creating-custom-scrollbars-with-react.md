---
title: Creating Custom Scrollbars with React
date: 2022-01-13
description: CSS gives little control over scrollbars. For a completely custom scrollbar design, you have to build your own out of DOM elements.
canonical: https://labs.thisdot.co/blog/creating-custom-scrollbars-with-react
use_canonical_url: true
tags:
  - Technical Writing
  - JavaScript
  - CSS
  - React
  - Scrollbars
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/creating-custom-scrollbars-with-react)._

Styling scrollbars is no simple task. [The CSS](https://css-tricks.com/almanac/properties/s/scrollbar/) available to style them is different across browsers, and not very featureful. If you want to make something extremely customized, you can't rely on the native scrollbars—you have to build your own out of DOM elements. This blog post shows you how to do just that using React and TypeScript. If you want to skip straight to the final functional demo, [go here](https://stackblitz.com/edit/react-ts-frji5h?file=components/scrollbar/index.tsx).

<iframe src="https://react-ts-frji5h.stackblitz.io" height="600px" width="100%" title="Live demo of custom scrollbars."></iframe>

## Structure of a Scrollbar

A scroll bar has two main components: a thumb (this piece you click and drag to scroll) and a track (the space within which the thumb moves). The size of the thumb gives usually gives a hint to how large the content you can currently see is in relation to the total size of the content. That is to say, the smaller the thumb, the more content there is outside of the current view. Thumb position on the track tells you how much off-screen content there is in each scroll direction. Scrollbars sometimes also have buttons on the ends that you can click to scroll a set amount in a certain direction, though these aren't seen as often as they used to be. We'll be recreating both of these user interface elements with `div` elements.

![Scrollbar](/img/2022-01-13-scrollbar.gif)

## Hide Native Scrollbars

Before we create our custom scrollbars, we'll need to hide the native browser scrollbars to prevent interference. This is easily accomplished with a bit of CSS. We're also including `overflow: auto`, because we want to make sure that out content is still scrollable even if we can't see the native scrollbars.

```css
.custom-scrollbars__content {
	overflow: auto;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.custom-scrollbars__content::-webkit-scrollbar {
	display: none;
}
```

## Custom Scrollbar Functionality

### Laying out Scrollbar Elements

The content we want to scroll and the scrollbar itself will go inside a wrapper `div`. That `div` will have two children: another `div` containing the content, and a `div` containing our scrollbar.

The scrollbar `div` will contain a `button` to scroll up, the elements of the thumb and track inside a wrapper `div`, and another `button` to scroll down. In the example below, they've been given classes (remember, we're using React, so we're using `className`) to help identify them.

```html
<div className="custom-scrollbars__container">
	<div className="custom-scrollbars__content">{children}</div>
	<div className="custom-scrollbars__scrollbar">
		<button className="custom-scrollbars__button">⇑</button>
		<div className="custom-scrollbars__track-and-thumb">
			<div className="custom-scrollbars__track"></div>
			<div className="custom-scrollbars__thumb"></div>
		</div>
		<button className="custom-scrollbars__button">⇓</button>
	</div>
</div>
```

The track and thumb elements are next to each other and will both be positioned absolutely with CSS. The `top` style of the thumb will be modified with JavaScript. It's better to have these two side-by-side and positioned absolutely, rather than have the thumb as a child of the track, because it prevents any ambiguity about whether you've clicked one or the other. If you click and drag the thumb, but drag so fast that your cursor is over the track when you realease it, it's possible, when nesting them, to accidentally trigger a click event on the track. That would could weird scrolling bugs. Keeping them as siblings prevents that.

```css
.custom-scrollbars__track-and-thumb {
	display: block;
	height: 100%; /* must have some height */
	position: relative;
	width: 16px; /* must have some width */
}

/* The track is meant to fill the space it's given, so top and bottom are set to 0. */
.custom-scrollbars__track {
	bottom: 0;
	cursor: pointer;
	position: absolute;
	top: 0;
	width: 16px; /* must have some width */
}

/* No top or bottom set for the thumb. That will be controlled by JavaScript. */
.custom-scrollbars__thumb {
	position: absolute;
	width: 16px; /* must have some width */
}
```

### Sizing the Thumb

Your content may change size from initial render, due to data fetch requests completing or for other reasons. The size of the thumb needs to be able to adjust to match whatever the current content's size is.

Because the content resizing won't necessarily result in the window resizing, we'll use a `ResizeObserver` to what for changes in just the content size.

We store references to the content element, the track, the thumb, and the resize observer with `useRef`. Our `handleResize()` function computes the ratio of visible content to total scrollable content (`clientHeight / scrollHeight`) of the content container, then multiplies it by the track's height to get a height for the thumb. We set a minimum of 20 pixels for the heigh in case the content is so long that the thumb would otherwise be too small to click. The thumb's height is finally stored in React state.

A `useEffect` sets an initial height, then creates a `ResizeObserver` to watch the size of the content, and trigger the `handleResize()` function again if it occurs.

```tsx
import React, { useState, useEffect, useRef } from 'react';

const Scrollbar = ({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const scrollTrackRef = useRef<HTMLDivElement>(null);
	const scrollThumbRef = useRef<HTMLDivElement>(null);
	const observer = useRef<ResizeObserver | null>(null);
	const [thumbHeight, setThumbHeight] = useState(20);

	function handleResize(ref: HTMLDivElement, trackSize: number) {
		const { clientHeight, scrollHeight } = ref;
		setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
	}

	// If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
	useEffect(() => {
		if (contentRef.current && scrollTrackRef.current) {
			const ref = contentRef.current;
			const { clientHeight: trackSize } = scrollTrackRef.current;
			observer.current = new ResizeObserver(() => {
				handleResize(ref, trackSize);
			});
			observer.current.observe(ref);
			return () => {
				observer.current?.unobserve(ref);
			};
		}
	}, []);

	return (
		<div className="custom-scrollbars__container">
			<div className="custom-scrollbars__content" ref={contentRef} {...props}>
				{children}
			</div>
			<div className="custom-scrollbars__scrollbar">
				<button className="custom-scrollbars__button">⇑</button>
				<div className="custom-scrollbars__track-and-thumb">
					<div className="custom-scrollbars__track"></div>
					<div
						className="custom-scrollbars__thumb"
						ref={scrollThumbRef}
						style={{
							height: `${thumbHeight}px`,
						}}
					></div>
				</div>
				<button className="custom-scrollbars__button">⇓</button>
			</div>
		</div>
	);
};

export default Scrollbar;
```

### Handle the Position of the Thumb

When we scroll, the thumb should move in proportion to our scrolling. We'll do this with a `useCallback` that is called on the `scroll` event. We take the proportion of how far the content has been scrolled (`scrollTop`) to the total scrollable area (`scrollHeight`), and multiply it by the track's height to get the new position of the top edge of the thumb. To make sure the thumb doesn't fly off the end of the track, we cap the top position to no more than the difference between the track's height and the thumb's height.

```diff
- import React, { useState, useEffect, useRef } from 'react';
+ import React, { useState, useEffect, useRef, useCallback } from 'react';
```

```tsx
const handleThumbPosition = useCallback(() => {
	if (
		!contentRef.current ||
		!scrollTrackRef.current ||
		!scrollThumbRef.current
	) {
		return;
	}
	const { scrollTop: contentTop, scrollHeight: contentHeight } =
		contentRef.current;
	const { clientHeight: trackHeight } = scrollTrackRef.current;
	let newTop = (+contentTop / +contentHeight) * trackHeight;
	newTop = Math.min(newTop, trackHeight - thumbHeight);
	const thumb = scrollThumbRef.current;
	thumb.style.top = `${newTop}px`;
}, []);
```

```diff
useEffect(() => {
	if (contentRef.current && scrollTrackRef.current) {
		const ref = contentRef.current;
		const {clientHeight: trackSize} = scrollTrackRef.current;
		observer.current = new ResizeObserver(() => {
			handleResize(ref, trackSize);
		});
		observer.current.observe(ref);
+	 ref.addEventListener('scroll', handleThumbPosition);
		return () => {
			observer.current.unobserve(ref);
+		 ref.removeEventListener('scroll', handleThumbPosition);
		};
	}
}, []);
```

### Handle Clicking the Buttons

Wiring the up and down scroll buttons is very straightforward. We simply create a function that accepts a direction, and scrolls the content by a fixed amount in that direction. Keep in mind that in browsers, the y axis is _positive_ going from top to bottom. That means scrolling down would mean a positive number of pixels, and up would be negative. Then we add this function to the `onClick` of our buttons.

```ts
function handleScrollButton(direction: 'up' | 'down') {
	const { current } = contentRef;
	if (current) {
		const scrollAmount = direction === 'down' ? 200 : -200;
		current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
	}
}
```

```diff
<button
	className="custom-scrollbars__button"
+ onClick={() => handleScrollButton('up')}
>
	⇑
</button>

...

<button
	className="custom-scrollbars__button"
+ onClick={() => handleScrollButton('down')}
>
	⇓
</button>
```

### Handle Clicking the Track

In most scrollbars, clicking on the scroll track will jump the thumb ahead in that direction. We'll once again `useCallback` to handle clicking on the track and updating the content's scroll position. The following snippet and comments walk through the steps of figuring out the new position for the content to scroll to.

```ts
const handleTrackClick = useCallback(
	e => {
		e.preventDefault();
		e.stopPropagation();
		const { current: trackCurrent } = scrollTrackRef;
		const { current: contentCurrent } = contentRef;
		if (trackCurrent && contentCurrent) {
			// First, figure out where we clicked
			const { clientY } = e;
			// Next, figure out the distance between the top of the track and the top of the viewport
			const target = e.target as HTMLDivElement;
			const rect = target.getBoundingClientRect();
			const trackTop = rect.top;
			// We want the middle of the thumb to jump to where we clicked, so we subtract half the thumb's height to offset the position
			const thumbOffset = -(thumbHeight / 2);
			// Find the ratio of the new position to the total content length using the thumb and track values...
			const clickRatio =
				(clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
			// ...so that you can compute where the content should scroll to.
			const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
			// And finally, scroll to the new position!
			contentCurrent.scrollTo({
				top: scrollAmount,
				behavior: 'smooth',
			});
		}
	},
	[thumbHeight],
);
```

```diff
<div
	className="custom-scrollbars__track"
	ref={scrollTrackRef}
+ onClick={handleTrackClick}
></div>
```

### Handle Dragging the Thumb

At last, the hardest part: clicking and dragging the thumb to scroll. To do this, we write three functions to handle `mousedown`, `mousemove`, and `mouseup` events. We'll track whether or not we're actively dragging, where the mouse was when we started dragging, and where the scroll position of the content was where we started dragging with React state.

The `handleThumbMouseup()` function is simplest: it simply sets `isDragging` to false so we know we're not dragging the thumb anymore.

`handleThumbMousedown` does a bit more. In addition to setting `isDragging` to true, it records the mouse's y position, and the content's `scrollTop` when you click down, and sets them to `scrollStartPosition` and `initialScrollTop` respectively. We will use these values to calculate the new `scrollTop` for the content.

The `handleThumbMousemove()` function is the trickiest. First, we figure out how far the mouse now is (`e.clientY`) from where it was when we started (`scrollStartPosition`). This tells us the absolute number of pixels the thumb should have moved up or down. But we've decoupled the size of the content's container from the size of the scrollbar track, so pixels of thumb scrolling doesn't equal the number of pixels the content should scroll. (E.g., if the total content length is 7 times longer than the height of the track, then dragging the thumb by one pixel should scroll the content by 7 pixels.) To scale the value, we multiply it by the ratio of the content's height to the thumb's height. Finally, set calculate the new `scrollTop` and set it to the content. The thumb's position will take care of itself thanks to `handleThumbPosition()` being called by the `scroll` event listener on the content.

```diff
	const contentRef = useRef<HTMLDivElement>(null);
	const scrollTrackRef = useRef<HTMLDivElement>(null);
	const scrollThumbRef = useRef<HTMLDivElement>(null);
	const observer = useRef<ResizeObserver | null>(null);
	const [thumbHeight, setThumbHeight] = useState(20);
+ const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
		null
	);
+ const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
+ const [isDragging, setIsDragging] = useState(false);
```

```ts
const handleThumbMousedown = useCallback(e => {
	e.preventDefault();
	e.stopPropagation();
	setScrollStartPosition(e.clientY);
	if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
	setIsDragging(true);
}, []);

const handleThumbMouseup = useCallback(
	e => {
		e.preventDefault();
		e.stopPropagation();
		if (isDragging) {
			setIsDragging(false);
		}
	},
	[isDragging],
);

const handleThumbMousemove = useCallback(
	e => {
		e.preventDefault();
		e.stopPropagation();
		if (isDragging) {
			const {
				scrollHeight: contentScrollHeight,
				offsetHeight: contentOffsetHeight,
			} = contentRef.current;

			// Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
			const deltaY =
				(e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
			const newScrollTop = Math.min(
				initialScrollTop + deltaY,
				contentScrollHeight - contentOffsetHeight,
			);

			contentRef.current.scrollTop = newScrollTop;
		}
	},
	[isDragging, scrollStartPosition, thumbHeight],
);

// Listen for mouse events to handle scrolling by dragging the thumb
useEffect(() => {
	document.addEventListener('mousemove', handleThumbMousemove);
	document.addEventListener('mouseup', handleThumbMouseup);
	document.addEventListener('mouseleave', handleThumbMouseup);
	return () => {
		document.removeEventListener('mousemove', handleThumbMousemove);
		document.removeEventListener('mouseup', handleThumbMouseup);
		document.removeEventListener('mouseleave', handleThumbMouseup);
	};
}, [handleThumbMousemove, handleThumbMouseup]);
```

```diff
<div className="custom-scrollbars__track-and-thumb">
	<div
		className="custom-scrollbars__track"
		ref={scrollTrackRef}
		onClick={handleTrackClick}
+	 style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
	></div>
	<div
		className="custom-scrollbars__thumb"
		ref={scrollThumbRef}
+	 onMouseDown={handleThumbMousedown}
		style={{
			height: `${thumbHeight}px`,
+		 cursor: isDragging ? 'grabbing' : 'grab',
		}}
	></div>
</div>
```

## Full Code and Demo

That's it! You've now got a completely custom scrollbar in React and TypeScript using DOM elements instead of native scrollbars. You can customize these scrollbars with any kind of CSS you like!

You can see the full code [here](https://stackblitz.com/edit/react-ts-frji5h?file=components/scrollbar/index.tsx) and play around with the [demo](https://react-ts-frji5h.stackblitz.io).
