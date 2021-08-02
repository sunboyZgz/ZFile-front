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
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-use-before-define': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-debugger': 'off',

		'@typescript-eslint/ban-types': ['off'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-empty-function': ['off'],
		'@typescript-eslint/no-non-null-assertion': ['off'],
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		'@typescript-eslint/no-extra-semi': ['off'],

		'vue/html-indent': ['off'],
		'vue/no-parsing-error': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/attributes-order': ['off'],
		'vue/no-setup-props-destructure': 'off',
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
		'vue/html-closing-bracket-newline': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/no-mutating-props': 'off',
	},
}
