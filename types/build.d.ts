import type { Plugin } from 'vite'

declare global {
	type VitePlugin = Plugin | Plugin[]
	interface GlobEnvConfig {
		VITE_GLOB_APP_TITLE: string
		VITE_GLOB_APP_NAME: string
	}
}
