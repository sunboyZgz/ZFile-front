import type { UserConfig, AliasOptions } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import TSConfig from './tsconfig.json'

// https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [vue()],
// })

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir)
}

export default (): UserConfig => {
	const {
		compilerOptions: { paths },
	} = TSConfig

	function resolveAlias(paths: Record<string, string[]>): AliasOptions {
		// let resolvePaths: Record<string, string>
		const alias = Object.keys(paths).map(key => ({
			find: new RegExp(key.split('*').join('')),
			replacement: pathResolve(paths[key][0].split('*').join('')) + '/',
		}))
		console.log(alias)
		return alias
	}
	return {
		resolve: {
			alias: resolveAlias(paths),
		},
		plugins: [vue()],
	}
}
