<template>
	<button class="sun-copy" @click="copyClick">
		{{ copied ? 'copyed' : 'copy' }}
	</button>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { useClipboard } from '@vueuse/core'
export default defineComponent({
	name: 'SunCopy',
	props: {
		content: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const contentRef = toRef(props, 'content')
		const { copied, copy } = useClipboard({
			source: contentRef,
			copiedDuring: 3000,
		})

		const copyClick = () => {
			copy()
		}
		return {
			copyClick,
			copied,
		}
	},
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
