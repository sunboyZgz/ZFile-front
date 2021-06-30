import axios, { AxiosResponse } from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import type { NormalRes } from '/@/network/_utils'

type reqFn = (req: AxiosRequestConfig) => AxiosRequestConfig
type resFn = (req: AxiosResponse) => AxiosResponse
type errFn = (err: AxiosError) => AxiosError | Promise<AxiosError>

export default class Axios {
	private axiosInstance: AxiosInstance
	private options: AxiosRequestConfig
	constructor(options: AxiosRequestConfig) {
		this.options = options
		this.axiosInstance = axios.create(options)
	}

	public getAxios(): AxiosInstance {
		return this.axiosInstance
	}

	public setHeader(headers: any) {
		if (!this.axiosInstance) return
		Object.assign(this.axiosInstance.defaults.headers, headers)
	}

	public setReqInterceptor(req: reqFn, err: errFn) {
		this.axiosInstance.interceptors.request.use(req, err)
	}
	public setResInterceptor(res: resFn, err: errFn) {
		this.axiosInstance.interceptors.response.use(res, err)
	}
	public get<R = NormalRes>(config: AxiosRequestConfig): Promise<R> {
		return this.request({ ...config, method: 'GET' })
	}
	public post<R = NormalRes>(config: AxiosRequestConfig): Promise<R> {
		return this.request({ ...config, method: 'POST' })
	}
	public put<R = NormalRes>(config: AxiosRequestConfig): Promise<R> {
		return this.request({ ...config, method: 'PUT' })
	}
	public delete<R = NormalRes>(config: AxiosRequestConfig): Promise<R> {
		return this.request({ ...config, method: 'DELETE' })
	}
	private request<T = any>(config: AxiosRequestConfig): Promise<T> {
		console.log('config', config)
		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request(config)
				.then((res: AxiosResponse) => {
					resolve(res as unknown as Promise<T>)
				})
				.catch((e: Error) => {
					reject(e)
				})
		})
	}
}
