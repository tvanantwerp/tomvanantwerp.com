import { defineConfig } from 'astro/config';

import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import turbolinks from '@astrojs/turbolinks';

// https://astro.build/config
export default defineConfig({
	integrations: [
		image({ serviceEntryPoint: '@astrojs/image/sharp' }),
		mdx(),
		react(),
		sitemap(),
		turbolinks(),
	],
	markdown: {
		syntaxHighlight: 'prism',
	},
});
