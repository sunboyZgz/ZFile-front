// import { onpro} from 'axios'
import { nocancleAxios, normalAxios } from '.'
import { NormalRes, Progress, isUsefulReq } from '/@/network/_utils'
import { MergeShallow } from '/#/index'
import type { Ref } from 'vue'
import type { fileDetail } from '/@/store/modules/fileSys'
import { makeStartOfSlash } from '/@/router/_utils'
/*----------- left side control ------------- */
export const uploadDir = (
	folderRef: Ref<any>,
	files: FormData,
	rootPath?: string,
	change?: any
) => {
	return nocancleAxios.post({
		url: 'file/upload',
		params: {
			rootPath,
		},
		data: files,
		headers: {
			'Content-Type': 'multipart/form-data;charset=UTF-8',
		},
		onUploadProgress(progress: ProgressEvent) {
			console.log(progress)
			change(Math.floor((progress.loaded * 100) / progress.total), {}, folderRef)
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
let uploadCounts = 0
// let mapCounter = new Map<string, number>()
export const showUpload = async (progress: Progress, duration = 700) => {
	const { start, completed, pendding, errorFn } = progress
	if (uploadStart) {
		start && start()
		uploadStart = true
	}
	let timer
	timer = setTimeout(async () => {
		clearTimeout(timer)
		timer = null
		try {
			const { message, status } = await nocancleAxios.get<ShowUpload>({
				url: 'file/showUpload',
			})
			if (isUsefulReq(status)) {
				if (message.schedule == 100) {
					completed && completed()
					uploadStart = false
				} else {
					pendding && pendding(message.schedule)
					progressTimer = setTimeout(() => {
						clearTimeout(progressTimer)
						progressTimer = null
						showUpload(progress, duration)
					}, duration)
				}
			} else {
				if (uploadCounts < 3) {
					showUpload(progress, duration)
					uploadCounts++
				} else {
					throw new Error('polling fail')
				}
			}
		} catch (e) {
			errorFn ? errorFn(e) : console.error(e)
			uploadCounts = 0
		}
	}, 1500)
}

/**
 * @description safe signout
 */
export const signOut = () => {
	return normalAxios.get({
		url: 'user/signOut',
	})
}

/*----------- main table requests ------------- */
/**
 * @description checkout all files in the indicated path
 */

type CheckDir = MergeShallow<NormalRes, { message: fileDetail }>
export const checkDir = (path: string) => {
	path = makeStartOfSlash(path)
	return normalAxios.get<CheckDir>({
		url: 'base/see',
		params: {
			path,
		},
	})
}
/**
 * @description download file
 */
export const downLoadFile = (downPath: string) => {
	downPath = makeStartOfSlash(downPath)
	return normalAxios.get({
		url: 'file/download',
		params: {
			downPath,
		},
		responseType: 'blob',
	})
}

/**
 * @description only make a diretory
 */
export interface DirInfo {
	address?: string
	fileName?: string
}
export const mkdir = (data: DirInfo) => {
	return normalAxios.post({
		url: 'file/mkdir',
		data,
	})
}
/**
 * @description only make a file
 */
export const mkfile = (data: DirInfo) => {
	return normalAxios.post({
		url: 'file/touch',
		data,
	})
}

export interface RemoveInfo {
	removeName: string
	removePath: string
}
export const remove = (params: RemoveInfo) => {
	return normalAxios.delete({
		url: 'file/remove',
		params,
	})
}

export const read = (filePath: string) => {
	return normalAxios.get({
		url: 'file/read',
		params: {
			filePath,
		},
	})
}
