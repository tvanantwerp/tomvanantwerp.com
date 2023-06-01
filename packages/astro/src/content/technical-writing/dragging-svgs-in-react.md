---
title: Dragging SVGs with React
date: 2019-04-11
description: How to reposition SVGs and their children via click-and-drag in React.
tags:
  - Technical Writing
  - React
  - SVG
---

I've recently started a new version of a mapping tool at work that lets people create [choropleths](https://en.wikipedia.org/wiki/Choropleth_map) from CSV files. The tool combines React and some D3 libraries to create SVG maps of the United States, including data labels.

![US choropleth showing tobacco tax rates.](/img/2019-04-11-map.png)

These labels are, by default, placed at the [centroid](https://en.wikipedia.org/wiki/Centroid) of the state's `path` shape, with a few offsets manually specified for some of the weirder state boundaries. But even with manual offsets, these generated labels can still be positioned poorly. I wanted the ability to click and drag these labels into a better position.

![Badly placed labels.](/img/2019-04-11-closeup.png)

SVGs are not always accommodating. They do not implement the [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), so no `ondrag` events for us. And while I do use D3 libraries in this project, it's mainly just `d3-geo`for parsing topojson and creating the US state `path`s rather than creating SVG elements or managing data. React handles the programming state and component creation/modification. That means `d3-drag`, which seems tightly coupled to D3's paradigm for creating/modifying SVG elements in the DOM, would probably be a pain to shoehorn into this.

So, let's implement drag and drop manually!

First, here's the basic Label component. It's just two `text` elements inside a `g` element that will be added to the SVG. The component also has the style `user-select: none` to prevent selecting the text rather than dragging it.

```jsx
const Label = ({ center, adjustment, name, value }) => {
	// Use the centroid coordinates and manual adjustments
	// from props to set X and Y of label in the SVG
	const labelX = center[0] + adjustment[0];
	const labelY = center[1] + adjustment[1];

	return (
		<g
			style={{ userSelect: 'none' }}
			transform={`translate(${labelX}, ${labelY})`}>
			<text>{name}</text>
			<text>{value}</text>
		</g>
	);
};
```

While SVG may not implement the drag and drop API, we can still use mouse events! We'll use the `mousedown` event to know that we're trying to drag, the `mousemove` event to decide how far we've dragged and update position accordingly, and the `mouseup` event to know that we're done dragging.

```jsx
const Label = ({ center, adjustment }) => {
	const [dragging, setDragging] = useState(false);

	const labelX = center[0] + adjustment[0];
	const labelY = center[1] + adjustment[1];

	return (
		<g
			style={{ userSelect: 'none' }}
			transform={`translate(${labelX}, ${labelY})`}
			onMouseDown={e => {
				// We have clicked the label, starting the drag.
				setDragging(true);
			}}
			onMouseMove={e => {
				// As long as we haven't let go of the mouse button,
				// we are still dragging.
				if (dragging) {
					// Drag behavior will go here.
				}
			}}
			onMouseUp={() => {
				// We let go of the mouse, ending our drag.
				setDragging(false);
			}}>
			...
		</g>
	);
};
```

Our Label component now knows whether or not it is being dragged. To actually reposition the component, we need to track the coordinates we started at and how far we've dragged away from them.

```jsx
const Label = ({ center, adjustment }) => {
	const [dragging, setDragging] = useState(false);
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [origin, setOrigin] = useState({ x: 0, y: 0 });

	// Add our new coordinates to the X and Y position values.
	const labelX = center[0] + adjustment[0] + coordinates.x;
	const labelY = center[1] + adjustment[1] + coordinates.y;

	return (
		<g
			style={{ userSelect: 'none' }}
			transform={`translate(${labelX}, ${labelY})`}
			onMouseDown={e => {
				// Record our starting point.
				setOrigin({ x: e.clientX, y: e.clientY });
				setDragging(true);
			}}
			onMouseMove={e => {
				if (dragging) {
					// Set state for the change in coordinates.
					setCoordinates({
						x: e.clientX - origin.x,
						y: e.clientY - origin.y,
					});
				}
			}}
			onMouseUp={() => {
				setDragging(false);
			}}>
			...
		</g>
	);
};
```

And that's it! We've now got a drag-able label inside our SVG, and all without needing any libraries to do it.

![Drag those labels!](/img/2019-04-11-example.gif)
