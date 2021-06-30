import Axios from '/@/utils/Axios'
import AxiosCanceler from '/@/utils/AxiosCancel'
import type { AxiosRequestConfig } from 'axios'

const baseurl = import.meta.env.VITE_BASE_URL

const globalDefault: AxiosRequestConfig = {
	baseURL: baseurl,
	timeout: 10 * 1000,
}

export const nocancleAxios = new Axios({
	...globalDefault,
})
nocancleAxios.setReqInterceptor(
	config => {
		console.log('reqconfig', config)
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

nocancleAxios.setResInterceptor(
	res => {
		console.log('res', res)
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
		console.log('reqconfig', config)

		return config
	},
	err => {
		return Promise.reject(err)
	}
)
normalAxios.setResInterceptor(
	res => {
		console.log('res', res)
		canceler.removePending(res)
		return res.data
	},
	err => {
		console.warn('err', err)

		return Promise.reject(err)
	}
)
