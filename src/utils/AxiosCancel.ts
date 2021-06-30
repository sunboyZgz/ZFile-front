import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'

export default class AxiosCanceler {
	static pendingMap = new Map<string, Canceler>()

	/**
	 * @description add request to pendding lines
	 */
	public addPending(config: AxiosRequestConfig) {
		this.removePending(config)
		const url = this.getPendingUrl(config)
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!AxiosCanceler.pendingMap.has(url)) {
					AxiosCanceler.pendingMap.set(url, cancel)
				}
			})
	}

	public removePending(config: AxiosRequestConfig) {
		const url = this.getPendingUrl(config)
		if (AxiosCanceler.pendingMap.has(url)) {
			const cancel = AxiosCanceler.pendingMap.get(url)
			cancel && cancel(url)
			AxiosCanceler.pendingMap.delete(url)
		}
	}

	public getPendingUrl(config: AxiosRequestConfig) {
		return config.method + '&' + config.url
	}

	reset() {
		AxiosCanceler.pendingMap = new Map<string, Canceler>()
	}
}
