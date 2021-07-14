import type { Module } from 'vuex'
import type { RootModuleType } from '../'
import { checkDir, mkdir, mkfile, remove } from '/@/network/main'
import type { DirInfo, RemoveInfo } from '/@/network/main'
import { isUsefulReq } from '/@/network/_utils'
export interface fileDetail {
	fileName?: string
	fileType?: string
	dateTime?: string
	fileSize?: string
	id?: string
}
interface fileInfo {
	path: string
	info: fileDetail[]
}
interface files {
	current: Partial<fileInfo>
}

const fileSys: Module<files, RootModuleType> = {
	namespaced: true,
	state: () => {
		return {
			current: {},
		}
	},
	getters: {
		curDirGetter(state) {
			return state.current?.info
		},
	},
	mutations: {
		initialMutation(state, fileInfo: fileInfo) {
			state.current = fileInfo
		},
		newDirMutation(state) {
			state.current.info?.unshift({
				fileType: 'Directory',
				fileName: '新建文件夹',
			})
		},
	},
	actions: {
		async checkDirAction({ commit }, path: string) {
			const { status, message } = await checkDir(path)
			if (isUsefulReq(status)) {
				commit('initialMutation', {
					path,
					info: message,
				})
			}
			return [status, message]
		},
		async mkdirAction({ dispatch }, data: DirInfo) {
			const { status } = await mkdir(data)
			if (isUsefulReq(status)) {
				dispatch('checkDirAction', data.address)
			}
		},
		async mkfileAction({ dispatch }, data: DirInfo) {
			const { status } = await mkfile(data)
			if (isUsefulReq(status)) {
				dispatch('checkDirAction', data.address)
			}
		},
		async removeAction({ dispatch }, params: RemoveInfo) {
			const { status } = await remove(params)
			const isOk = isUsefulReq(status)
			if (isOk) {
				dispatch('checkDirAction', params.removePath)
			}
			return isOk
		},
	},
}

export default fileSys
