// import type { AxiosRequestConfig } from 'axios'
import { normalAxios } from '.'

/**
 * @description get the email message
 */
export const getVeriCode = (email: string) => {
	return normalAxios.get({
		url: '/user/verification',
		params: {
			email,
		},
	})
}

export const registerUser = (formValue: any) => {
	return normalAxios.post({
		url: '/user/register',
		data: formValue,
	})
}
/**
 * @description initialization step
 */
export const initialUser = () => {
	return normalAxios.get({
		url: '/base/initialization',
	})
}
