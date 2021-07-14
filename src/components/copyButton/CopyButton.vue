<template>
	<transition name="fade">
		<button v-show="show" class="sun-copy" @click="copyClick">
			{{ copied ? 'copyed' : 'copy' }}
		</button>
	</transition>
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
		show: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const contentRef = toRef(props, 'content')
		const { copied, copy } = useClipboard({
			source: contentRef.value,
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
