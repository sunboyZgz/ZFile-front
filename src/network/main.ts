import { nocancleAxios } from '.'
import { NormalRes, Progress } from '/@/network/_utils'
import { MergeShallow } from '/#/index'

export const uploadDir = (files: FormData, rootPath?: string) => {
	return nocancleAxios.post({
		url: 'file/upload',
		params: {
			rootPath,
		},
		data: files,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

/**
 * @description make a polling to confirm the progress of upload file
 */

export interface Shedule {
	schedule: number
	item: number
}
type ShowUpload = MergeShallow<NormalRes, { message: Shedule }>
let progressTimer
let uploadStart = false
export const showUpload = async (progress: Progress, duration = 500) => {
	const { start, completed, pendding, errorFn } = progress
	if (uploadStart) {
		start && start()
		uploadStart = true
	}

	try {
		const { message } = await nocancleAxios.get<ShowUpload>({
			url: 'file/showUpload',
		})
		if (message.schedule === 100) {
			completed && completed()
			uploadStart = false
		} else {
			pendding && pendding(message)
			progressTimer = setTimeout(() => {
				clearTimeout(progressTimer)
				progressTimer = null
				showUpload(progress, duration)
			}, duration)
		}
	} catch (e) {
		errorFn ? errorFn(e) : console.error(e)
	}
}
