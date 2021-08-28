import type ProgressItem from '/@/pages/main-cmp/progress-box/'
import type { RootModuleType } from '../'
import { Module } from 'vuex'
import { newUploadDir } from '/@/network/main'
interface uploadInfo {
	list: typeof ProgressItem[]
}

interface uploadRequestInfo {
	folderRef: string
	files: FormData
	rootPath?: string
}

const upload: Module<uploadInfo, RootModuleType> = {
	namespaced: true,
	state: () => {
		return {
			list: [],
		}
	},
	getters: {},
	mutations: {},
	actions: {
		uploadNewFile({ commit }, payload: { requestInfo: uploadRequestInfo; fn?: Function }) {
			newUploadDir(payload.requestInfo)
		},
	},
}

export default upload
