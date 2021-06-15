// https://vitejs.dev/config/
import type { UserConfig, AliasOptions, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'

import TSConfig from './tsconfig.json'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from '/build/vite/plugins/'

export function pathResolve(dir: string): string {
	return resolve(process.cwd(), '.', dir)
}
/**
 * @returns vite AliasOptions
 * @description combine prompts of tsconfig paths to make path alias
 */
function resolveAlias(paths: Record<string, string[]>): AliasOptions {
	const alias = Object.keys(paths).map(key => ({
		find: new RegExp(key.split('*').join('')),
		replacement: pathResolve(paths[key][0].split('*').join('')) + '/',
	}))
	return alias

	// const alias = {}
	// Object.keys(paths).map(key => {
	// 	const akey = key.slice(0, key.length - 1)
	// 	const dir = paths[key][0].slice(0, paths[key][0].length - 1)
	// 	alias[akey] = pathResolve(dir)
	// })
	// console.log(alias)
	// return alias
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
	const ROOT = process.cwd()
	const env = loadEnv(mode, ROOT)
	const VITE_ENV = wrapperEnv(env)
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OUT_DIR, VITE_DROP_CONSOLE } = VITE_ENV
	const isBuild = command === 'build'
	const {
		compilerOptions: { paths },
	} = TSConfig
	return {
		base: VITE_PUBLIC_PATH,
		root: ROOT,
		server: {
			port: VITE_PORT,
		},
		css: {
			preprocessorOptions: {
				scss: {
					// additionalData: `@import "/@/style/base";`,
				},
			},
		},
		build: {
			outDir: VITE_OUT_DIR,
			target: 'es2015',
			terserOptions: {
				compress: {
					drop_console: VITE_DROP_CONSOLE,
					keep_infinity: true,
				},
			},
		},
		define: {},
		resolve: {
			alias: resolveAlias(paths),
		},
		plugins: createVitePlugins(VITE_ENV, isBuild),
	}
}
