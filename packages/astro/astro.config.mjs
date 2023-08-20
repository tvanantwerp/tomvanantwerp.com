import { defineConfig } from 'astro/config';

import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import turbolinks from '@astrojs/turbolinks';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://tomvanantwerp.com',
	integrations: [
		image({ serviceEntryPoint: '@astrojs/image/sharp' }),
		mdx(),
		react(),
		sitemap(),
		turbolinks(),
	],
	markdown: {
		remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'wrap' }],
			[
				rehypeExternalLinks,
				{ target: '_blank', rel: ['noopener', 'noreferrer'] },
			],
			rehypeKatex,
		],
		syntaxHighlight: 'prism',
	},
});
