export function getAppInfo(): GlobEnvConfig {
	const AppName = `__APP__${import.meta.env.VITE_GLOB_APP_NAME}`.toUpperCase()
	const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_NAME } = window[AppName] as GlobEnvConfig

	if (!/^[a-zA-Z_]*$/.test(VITE_GLOB_APP_NAME)) {
		console.warn(
			`VITE_GLOB_APP_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
		)
	}
	return {
		VITE_GLOB_APP_TITLE,
		VITE_GLOB_APP_NAME,
	}
}

export function setupWindow(): void {
	const { VITE_GLOB_APP_NAME, VITE_GLOB_APP_TITLE } = import.meta.env
	Object.defineProperty(window, `__APP__${VITE_GLOB_APP_NAME}`.toUpperCase(), {
		value: {
			VITE_GLOB_APP_TITLE: VITE_GLOB_APP_TITLE,
			VITE_GLOB_APP_NAME: VITE_GLOB_APP_NAME,
		},
		configurable: false,
		writable: false,
	})
}

export const PREFIXER = 'sun'

export const LG = 1024
