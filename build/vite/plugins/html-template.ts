import html from 'vite-plugin-html'
export function configHtmlTemplate(
	{ VITE_GLOB_APP_NAME }: ViteEnv,
	isSmaller: Boolean
): VitePlugin {
	return html({
		inject: {
			injectData: {
				title: VITE_GLOB_APP_NAME,
			},
		},
		minify: isSmaller && {
			minifyURLs: true,
			removeAttributeQuotes: false,
		},
	})
}
