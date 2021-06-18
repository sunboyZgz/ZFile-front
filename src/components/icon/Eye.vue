<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 24 24"
		v-if="!isOff"
		:class="`${prefixer}_eye`"
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="2" />
			<path
				d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7"
			/>
		</g>
	</svg>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 24 24"
		:class="`${prefixer}_eye`"
		v-else
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M3 3l18 18" />
			<path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
			<path
				d="M9.363 5.365A9.466 9.466 0 0 1 12 5c4 0 7.333 2.333 10 7c-.778 1.361-1.612 2.524-2.503 3.488m-2.14 1.861C15.726 18.449 13.942 19 12 19c-4 0-7.333-2.333-10-7c1.369-2.395 2.913-4.175 4.632-5.341"
			/>
		</g>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PREFIXER } from '/@/utils/env'
export default defineComponent({
	name: 'Eye',
	props: {
		isOff: {
			type: Boolean,
			default: true,
		},
	},
	setup() {
		return {
			prefixer: PREFIXER,
		}
	},
})
</script>

<style lang="scss">
@import '../style/base';
.#{$prefixer}_eye {
	cursor: pointer;
}
</style>
