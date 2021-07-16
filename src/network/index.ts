import Axios from '/@/utils/Axios'
import AxiosCanceler from '/@/utils/AxiosCancel'
import type { AxiosRequestConfig } from 'axios'
import { isLogin } from './base'
import { isUsefulReq } from './_utils'
import router from '/@/router/'

const baseurl = import.meta.env.VITE_BASE_URL

const globalDefault: AxiosRequestConfig = {
	baseURL: import.meta.env.PROD ? baseurl : '/api',
	timeout: 0,
	withCredentials: true,
}

let LOGINTIMER: any = null
const DURATION = import.meta.env.VITE_TIMEOUT
//in the future, i think need a tools to judge the current location
LOGINTIMER = setInterval(() => {
	isLogin().then(res => {
		if (isUsefulReq(res.status)) {
			if (!res.message) {
				router.push('/login')
			}
		} else {
			clearTimeout(LOGINTIMER)
			LOGINTIMER = null
		}
	})
}, DURATION * 1000)

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
