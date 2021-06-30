<template>
	<div :class="[prefixer]">
		<ul :class="[`${prefixer}-${mode}`]">
			<slot></slot>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { menuOptions } from './_utils'
import { PREFIXER } from '/@/utils/env'
export default defineComponent({
	name: 'Menu',
	props: menuOptions,
	setup() {
		return {
			prefixer: `${PREFIXER}_menu`,
		}
	},
})
</script>

<style lang="scss">
@import './index.scss';
</style>
