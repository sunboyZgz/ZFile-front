import { normalAxios } from '.'

export const isLogin = () => {
	return normalAxios.get({
		url: 'base/is',
	})
}
