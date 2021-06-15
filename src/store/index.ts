import { createStore, useStore } from 'vuex'
import themeModule from './modules/themeMode'
export interface RootModuleType {
	_: unknown
}

const store = createStore({
	modules: {
		themeModule,
	},
})
//eslint-disable-next-line
export function useTypeStore() {
	const store = useStore()
	const commit = store.commit
	return {
		...store,
		commit,
	}
}
export default store
