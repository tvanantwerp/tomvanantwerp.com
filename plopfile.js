const _ = require('lodash');

module.exports = function (plop) {
	plop.setHelper('leadingZero', num => _.padStart(num.toString(), 3, '0'));
	plop.setHelper('kebabCase', _.kebabCase);
	plop.setGenerator('leetcode', {
		description: 'Scaffold a leetcode article.',
		prompts: [
			{
				type: 'input',
				name: 'number',
				message: 'What number?',
			},
			{
				type: 'input',
				name: 'name',
				message: 'What is the name?',
			},
			{
				type: 'input',
				name: 'link',
				message: 'What is the URL of the problem?',
			},
		],
		actions: [
			{
				type: 'add',
				path: `packages/astro/src/content/ds-and-a/leetcode-{{leadingZero number}}-{{kebabCase name}}.md`,
				templateFile: 'plop-templates/leetcode.hbs',
			},
		],
	});
};
