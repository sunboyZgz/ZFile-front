import { createStore } from 'vuex'

interface StoreState {
	count: 0
}

const store = createStore<StoreState>({
	state() {
		return {
			count: 0,
		}
	},
	mutations: {
		addCount(state) {
			state.count++
		},
	},
})

export default store
