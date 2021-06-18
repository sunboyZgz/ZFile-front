<template>
	<slot></slot>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { createContext } from '/@/hooks/useContext'
import { key } from './index'

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
