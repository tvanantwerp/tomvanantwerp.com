import config from '../../prettier.config.mjs';

export default {
	...config,
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro"
			}
		}
	]
}
