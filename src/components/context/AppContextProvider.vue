<template>
	<slot></slot>
</template>

<script lang="ts">
import { defineComponent, InjectionKey, Ref, toRefs } from 'vue'
import { createContext } from '/@/hooks/useContext'
interface ContextOptions {
	smallScreen: Ref<boolean>
}
export const key: InjectionKey<ContextOptions> = Symbol('context')
export default defineComponent({
	name: 'AppContextProvider',
	inheritAttrs: false,
	props: {
		smallScreen: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const { smallScreen } = toRefs(props)
		createContext(key, { smallScreen }, {})
	},
})
</script>

<style></style>
