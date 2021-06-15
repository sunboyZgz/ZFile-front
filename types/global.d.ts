declare global {
	interface ViteEnv extends GlobEnvConfig {
		VITE_PORT: number
		VITE_PUBLIC_PATH: string
		VITE_LEGACY: boolean
		VITE_DROP_CONSOLE: boolean
		VITE_OUT_DIR: string
		VITE_HTML_SMALL: boolean
		VITE_GITHUB: string
	}
	interface ImportMetaEnv extends ViteEnv {
		__: unknown
	}
	type Recordable<T = any> = Record<string, T>
}

export {}
