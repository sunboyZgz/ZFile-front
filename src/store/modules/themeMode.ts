import type { Module } from 'vuex'
import type { RootModuleType } from '../'
interface ThemeMode {
	isDark: boolean | null
}
const themeMode: Module<ThemeMode, RootModuleType> = {
	namespaced: true,
	state: () => {
		const mode = localStorage.getItem('APP_DARK_MODE')
		const isDark = mode && mode === 'true' ? true : false
		return {
			isDark,
		}
	},
	getters: {
		getDark(state) {
			return state.isDark
		},
	},
	mutations: {
		changeMode(state) {
			state.isDark = !state.isDark
		},
	},
}

export default themeMode
