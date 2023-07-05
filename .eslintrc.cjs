export default {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020, // Use the latest ecmascript standard
		sourceType: 'module', // Allows using import/export statements
	},
	env: {
		browser: true, // Enables browser globals like window and document
		amd: true, // Enables require() and define() as global variables as per the amd spec.
		node: true, // Enables Node.js global variables and Node.js scoping.
	},
	extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
	rules: {
		'@typescript-eslint/triple-slash-reference': 'warn',
	},
};
