import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import jsx from '@vitejs/plugin-vue-jsx'
export function createVitePlugins(
	viteEnv: ViteEnv,
	isBuild: boolean
): VitePlugin[] {
	const vitePlugins: VitePlugin[] = [vue(), WindiCSS(), jsx()]
	return vitePlugins
}
