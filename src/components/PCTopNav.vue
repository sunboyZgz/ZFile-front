<template>
	<div class="flex absolute top-4 right-0 pr-4 w-70 justify-evenly z-50">
		<slot name="append"></slot>
		<ToggleMode />
		<slot></slot>
		<Translate />
		<slot name="suffix"></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Translate, ToggleMode } from '/@/components/'

export default defineComponent({
	name: 'PCTopNav',
	components: { Translate, ToggleMode },
})
</script>

<style></style>
