// import type { Plugin } from 'vite'
import styleImport from 'vite-plugin-style-import'

export function configStyleImport(): VitePlugin {
	return styleImport({
		libs: [
			{
				libraryName: 'element-plus',
				esModule: true,
				ensureStyleFile: true,
				resolveStyle: name => {
					name = name.slice(3)
					return `element-plus/packages/theme-chalk/src/${name}.scss`
				},
				resolveComponent: name => {
					return `element-plus/lib/${name}`
				},
			},
		],
	})
}
