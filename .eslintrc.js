module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-use-before-define': 'off',

		'@typescript-eslint/ban-types': ['off'],

		'vue/html-indent': ['off'],
		'vue/singleline-html-element-content-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/attributes-order': ['off'],
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],
	},
}
