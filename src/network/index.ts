import Axios from '/@/utils/Axios'
import AxiosCanceler from '/@/utils/AxiosCancel'
import type { AxiosRequestConfig } from 'axios'

const baseurl = import.meta.env.VITE_BASE_URL

const globalDefault: AxiosRequestConfig = {
	baseURL: import.meta.env.PROD ? baseurl : '/api',
	timeout: 0,
}

export const nocancleAxios = new Axios({
	...globalDefault,
})

nocancleAxios.setResInterceptor(
	res => {
		return res.data
	},
	err => {
		console.warn('err', err)
		return Promise.reject(err)
	}
)

export const normalAxios = new Axios({
	...globalDefault,
})

const canceler = new AxiosCanceler()
normalAxios.setReqInterceptor(
	config => {
		canceler.addPending(config)
		return config
	},
	err => {
		return Promise.reject(err)
	}
)
normalAxios.setResInterceptor(
	res => {
		canceler.removePending(res)
		return res.data
	},
	err => {
		console.warn('err', err)
		return Promise.reject(err)
	}
)
