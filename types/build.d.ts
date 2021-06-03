import type { Plugin } from 'vite'

declare global {
	type VitePlugin = Plugin | Plugin[]
}
