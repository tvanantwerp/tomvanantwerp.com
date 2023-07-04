import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import turbolinks from '@astrojs/turbolinks';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		turbolinks(),
		sitemap(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
	],
	markdown: {
		syntaxHighlight: 'prism',
	},
});
