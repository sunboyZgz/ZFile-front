<template>
	<li :class="[prefixer]">
		<!-- <slot name="icon"></slot> -->
		<div v-if="!!icon" class="item-icon">
			<slot name="icon"></slot>
		</div>
		<slot>{{ content }}</slot>
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PREFIXER } from '/@/utils/env'
export default defineComponent({
	name: 'MenuItem',
	props: {
		key: {
			type: Number,
			default: undefined,
		},
		content: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const icon = slots.icon

		return {
			icon,
			prefixer: `${PREFIXER}_menuItem`,
		}
	},
})
</script>

<style lang="scss"></style>
