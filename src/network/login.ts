import { normalAxios } from '.'
export const loginUser = data => {
	return normalAxios.post({
		url: '/user/login',
		data,
	})
}

export const signOut = () => {
	return normalAxios.get({
		url: '/user/signOut',
	})
}
