module.exports = {
	extends: [
		'../../.eslintrc.js',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true, // Enable JSX since we're using React
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['node_modules', 'dist'],
	overrides: [
		{
			files: ['*.mdx'],
			extends: ['plugin:mdx/recommended'],
			settings: {
				'mdx/code-blocks': true,
			},
		},
	],
};
