---
title: Generating Social Images With Node.js and Hosting With Cloudinary
date: 2024-07-08
description: Automatically generate social cover images for your blog posts using Node.js and the Skia Canvas library. Upload to Cloudinary with the Cloudinary API.
canonical: https://cloudinary.com/blog/generating-social-images-node-js-hosting
use_canonical_url: true
tags:
  - Technical Writing
  - JavaScript
---

When you share a link on social media, the platform often displays a preview of the content. Creating these images manually can be time-consuming, especially if you have a lot of content to share and want a consistent style for each page. Wouldn’t it be better if we could automate this?

In this tutorial, we’ll show you how to automatically generate social cover images for your blog posts using Node.js and the Skia Canvas library. Then, once the images are generated, we’ll upload them to Cloudinary with the Cloudinary API.

Using [Cloudinary](https://cloudinary.com/), we can host our images and serve them quickly to our users. We can also use Cloudinary to optimize our images for the web, ensuring they load quickly and look great on any device. Cloudinary does the hard work of resizing, compressing, and delivering images to users for us!

This tutorial will cover:

- Creating images for your web content using Skia Canvas and Node.js.
- Saving those images locally for testing purposes.
- Uploading these images to Cloudinary for hosting and delivery.
- Avoiding unnecessary image uploads at build time if nothing has changed.

## Generating Social Cover Images With Canvas

Before uploading our social images to Cloudinary, we need to generate them! There are several ways to use web technology to generate images. Perhaps the most obvious is to use the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). We can load images, draw shapes, write text, and create a new image file with canvas.

However, canvas has two downsides: First, it’s a browser API, and we’re generating it on the back-end with Node.js. Second, it doesn’t have a native way to wrap text within a bounding box. To use canvas in Node and because it’s time-consuming and challenging to implement text wrapping ourselves, we’ll use the [Skia Canvas](https://github.com/samizdatco/skia-canvas) library. This library is based on Google’s Skia graphics engine and re-implements and extends the canvas API for Node.js. It includes functionality for text wrapping, saving us the trouble of doing it ourselves.

Let’s start by creating a new Node.js project and installing the `skia-canvas` package.

```sh
mkdir social-image-generator
cd social-image-generator
npm init -y
npm install skia-canvas
```

Next we’ll be creating a function that we’ll use to generate our social image from a post name using `skia-canvas`. First, we’ll import `Canvas` and create an instance.

```ts
import { Canvas } from 'skia-canvas';

// We're using skia-canvas to create an image instead of native canvas.
// This is to make it easier to wrap text, which native canvas doesn't
// support out-of-the-box.

export async function createSocialImage(name: string): Promise<Canvas> {
	// Most social media platforms have an image ratio of 1.91:1.
	// Facebook recommends 1200x630, X/Twitter 800x418, LinkedIn 1200x627.
	// Facebook's recommendation will work well for all platforms, so we'll use that.
	// These dimensions were chosen in May 2024. They may change in the future.
	const canvas = new Canvas(1200, 630);
	const { width, height } = canvas;
	const ctx = canvas.getContext('2d');
}
```

We’ll use the `ctx` to draw within the canvas. First, we’ll load an image for the background:

```ts
import { Canvas, loadImage } from 'skia-canvas';

export async function createSocialImage(name: string): Promise<Canvas> {
	// ...
	const image = await loadImage('./assets/background.png');
	ctx.drawImage(image, 0, 0, width, height);
	// ...
}
```

Next, we’ll get ready to draw the text. While `skia-canvas` helps with wrapping text, we still have the possibility that text could overflow the bottom of the image. To handle this, we will write some code to scale the text size to fit within the image. If it’s impossible to fit the text without it becoming too small, we’ll throw an error.

We start by setting the initial position of our text, `textX` and `textY`, and the maximum width of the text, `maxWidth`. We then load the font we want to use. In this case, we’re using the [Inter](https://fonts.google.com/specimen/Inter) font, font-weight 600, which is free from Google Fonts.

We set the font size to 96 and check if the text fit within the image. To do this, we’ll use `ctx.measureText()` to get the lines of text that would be drawn and add together their heights. If the total height of all lines of text is greater than our canvas `height` minus the vertical starting point of `textY`, we reduce the font size by 4 and check again. We continue this process until the text fits or the font size is less than 24. If the text size goes below 24 and it still doesn’t fit, the text will be too small to look good, and we’ll give up by throwing an error.

Why not just set a character limit? Because you’re probably going to use your own fonts and designs! Different fonts will take up different amounts of space at the same font size, so you’ll need to play with it for yourself. A character limit won’t take this into account, but measuring the space used by the drawn text will. When making your designs, you’ll have to try different font sizes and see what works best.

```ts
import { Canvas, loadImage, FontLibrary } from 'skia-canvas';

export async function createSocialImage(name: string): Promise<Canvas> {
	// ...
	const textX = 50;
	const textY = 100;
	const maxWidth = width - textX * 2;

	// Load the Inter font, weight 600, available on Google Fonts.
	FontLibrary.use(['./assets/Inter-SemiBold.ttf']);
	ctx.textWrap = true;
	let fontSize = 96;
	let textFits = false;
	while (!textFits && fontSize >= 24) {
		ctx.font = `${fontSize}px Inter`;
		const metrics = ctx.measureText(name, maxWidth - textX);
		let totalTextHeight = metrics.lines.reduce(
			(acc, line) => acc + line.height,
			0,
		);
		if (totalTextHeight > height - textY) {
			fontSize -= 4;
		} else {
			textFits = true;
		}
	}

	if (!textFits && fontSize < 24) {
		throw new Error('Text is too long to fit on the image.');
	}
	// ...
}
```

Finally, now that we have the correct font size, we can draw our post name to the canvas. We’ll add a mostly transparent white stroke to the black text for extra readability. Once we’re done drawing the text, we return the canvas from our function.

```ts
export async function createSocialImage(name: string): Promise<Canvas> {
	// ...

	ctx.fillStyle = 'rgba(16, 15, 15, 0.9)';
	ctx.lineWidth = 6;
	ctx.strokeStyle = 'rgba(247, 238, 217, 0.2)';
	ctx.strokeText(name, textX, textY, maxWidth);
	ctx.fillText(name, textX, textY, maxWidth);

	return canvas;
}
```

## Saving Images Locally (Optional)

You’ll probably want to see how your generated images look before uploading to Cloudinary, so we’ll save them to our local disk first.

For naming our images, we’ll use the `slugify` library and create a helper function with our chosen options. This helper, `slugifyName`, will convert our post name to a URL-friendly string. We’ll then create a function, `saveImageToFile`, that will save our canvas to a file in the `images` directory of our repository. The `saveImageToFile` function will take the post name, the canvas, and the export format as arguments.

First, we’ll install the `slugify` package.

```sh
npm install slugify
```

Next, we’ll write the our functions.

```ts
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ExportFormat } from 'skia-canvas';
import slugify from 'slugify';

// We're putting this into a helper function so we can easily reuse the options later.
function slugifyName(name: string) {
	return slugify(name, { lower: true, strict: true, remove: /[?&#\\%<>\+]]/g });
}

export async function saveImageToFile(
	name: string,
	canvas: Canvas,
	format: ExportFormat,
) {
	// Create the images directory if it doesn't exist.
	if (!existsSync('./images')) {
		mkdirSync('./images');
	}
	// Then we'll save our canvas image to the format of our choosing.
	// Pixel density is set to 2 to make the image look good on high-density displays.
	await canvas.saveAs(join('./images', `${slugifyName(name)}.${format}`), {
		format,
		density: 2,
	});
}
```

We now have everything we need to generate and save our social images.

```ts
async function createAndSaveLocally(name: string) {
	const canvas = await createSocialImage(name);
	await saveImageToFile(name, canvas, 'png');
}

createAndSaveLocally(
	'Whatever example post name you want to save to an image!',
);
```

If we run this script, it will generate our test image at `images/whatever-example-post-name-you-want-to-save-to-an-image.png`.
