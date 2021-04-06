const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes = [400, 800, 1200]) {
	src = `src/${src}`;

	if (alt === undefined) {
		// You bet we throw an error on missing alt (alt="" works okay)
		throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
	}

	let metadata = await Image(src, {
		widths: sizes,
		formats: ['avif', 'webp', 'jpeg'],
		outputDir: '_site/img',
		filenameFormat: (id, src, width, format) => {
			const filename = src.split('/').slice(-1)[0].split('.')[0];
			if (width) {
				return `${filename}-${id}-${width}.${format}`;
			}
			return `${filename}-${id}.${format}`;
		},
	});

	let lowsrc = metadata.jpeg[0];

	const theSizes = sizes.reverse().map((size, i) => {
		return i === sizes.length - 1
			? `${size}px`
			: `(min-width: ${size}px) ${size}px`;
	});

	return `<picture>
      ${Object.values(metadata)
				.map(imageFormat => {
					return `  <source type="${
						imageFormat[0].sourceType
					}" srcset="${imageFormat
						.map(entry => entry.srcset)
						.join(', ')}" sizes="${theSizes}">`;
				})
				.join('\n')}
        <img
					class="image-section"
          src="${lowsrc.url}"
          alt="${alt}"
          loading="lazy"
          decoding="async">
      </picture>`;
}

async function figureShortcode(src, alt, caption, sizes = [400, 800, 1200]) {
	src = `src/${src}`;

	if (alt === undefined) {
		// You bet we throw an error on missing alt (alt="" works okay)
		throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
	}

	let metadata = await Image(src, {
		widths: sizes,
		formats: ['avif', 'webp', 'jpeg'],
		outputDir: '_site/img',
		filenameFormat: (id, src, width, format) => {
			const filename = src.split('/').slice(-1)[0].split('.')[0];
			if (width) {
				return `${filename}-${id}-${width}.${format}`;
			}
			return `${filename}-${id}.${format}`;
		},
	});

	let lowsrc = metadata.jpeg[0];

	const theSizes = sizes.reverse().map((size, i) => {
		return i === sizes.length - 1
			? `${size}px`
			: `(min-width: ${size}px) ${size}px`;
	});

	return `<figure class="image-section">
    <picture>
      ${Object.values(metadata)
				.map(imageFormat => {
					return `  <source type="${
						imageFormat[0].sourceType
					}" srcset="${imageFormat
						.map(entry => entry.srcset)
						.join(', ')}" sizes="${theSizes}">`;
				})
				.join('\n')}
        <img
          src="${lowsrc.url}"
          alt="${alt}"
          loading="lazy"
          decoding="async">
      </picture>
      <figcaption>${caption}</figcaption>
      </figure>`;
}

exports.imageShortcode = imageShortcode;
exports.figureShortcode = figureShortcode;
