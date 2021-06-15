import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import jsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
// import { configStyleImport } from './style-import'
import { configHtmlTemplate } from './html-template'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean): VitePlugin[] {
	const { VITE_LEGACY, VITE_HTML_SMALL } = viteEnv
	const vitePlugins: VitePlugin[] = [
		vue(),
		WindiCSS(),
		jsx(),
		// configStyleImport(),
	]

	VITE_LEGACY && isBuild && vitePlugins.push(legacy())
	vitePlugins.push(configHtmlTemplate(viteEnv, VITE_HTML_SMALL))
	return vitePlugins
}
