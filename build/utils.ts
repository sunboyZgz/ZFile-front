export const wrapperEnv = (env: Recordable): ViteEnv => {
	const return_env: any = {}
	Object.keys(env).forEach(key => {
		if (key === 'VITE_PORT') {
			return_env[key] = parseInt(env[key])
			if (isNaN(env[key]))
				throw new Error(
					`key of env variables '${key}' is unavailable for port`
				)
		}
		return_env[key] = env[key]
		env[key] === 'true' && (return_env[key] = true)
		env[key] === 'false' && (return_env[key] = false)
	})
	return return_env
}
