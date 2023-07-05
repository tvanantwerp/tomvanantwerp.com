module.exports = {
	extends: [
		'../../.eslintrc.js',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:mdx/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true, // Enable JSX since we're using React
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-closing-bracket-location': [1, 'line-aligned'],
	},
	settings: {
		'mdx/code-blocks': true,
	},
};
