<template>
	<h1 align="center">计数：{{ state.count }}</h1>
	<button @click="addCounter">提交</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'Counter',
	setup() {
		const store = useStore()
		const addCounter = () => {
			store.commit('addCount')
		}
		const state = store.state
		return {
			addCounter,
			state,
		}
	},
})
</script>
