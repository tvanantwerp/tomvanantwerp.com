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
