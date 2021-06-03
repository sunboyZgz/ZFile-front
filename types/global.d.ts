declare global {
	interface ViteEnv {
		VITE_PORT: number
		VITE_PUBLIC_PATH: string
	}
	interface ImportMetaEnv extends ViteEnv {
		__: unknown
	}
	type Recordable<T = any> = Record<string, T>
}

export {}
