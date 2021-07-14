const endSlashReg = /^.*\/$/
const startSlashReg = /^\/.*$/
export const MAIN_BASE = 'main'
/**
 * @description judge the end of path and add a '/' or not
 */
export const makeEndofSlash = (path: string) => {
	if (!endSlashReg.test(path)) {
		path = path + '/'
	}
	return path
}

/**
 * @description judge the start of path and add a '/' or not
 */
export const makeStartOfSlash = (path: string) => {
	if (!startSlashReg.test(path)) {
		path = '/' + path
	}
	return path
}

/**
 * @returns drop the baseUrl
 */
export const dropBaseUrl = (path: string, baseUrl = MAIN_BASE) => {
	const reg = new RegExp(`^\\/${baseUrl}\\/?`)
	return makeEndofSlash(makeStartOfSlash(path.replace(reg, '')))
}
