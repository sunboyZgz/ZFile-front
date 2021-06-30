<template>
	<i class="iconfont" :class="`icon-${code}`"></i>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref } from 'vue'
export default defineComponent({
	name: 'AliIcon',
	props: {
		code: {
			type: String,
			default: '',
		},
		active: {
			type: Boolean as PropType<boolean | Ref<boolean>>,
			default: false,
		},
		activeCode: {
			type: String,
			default: '',
		},
	},
})
</script>

<style>
@import '../../assets/font/iconfont.css';
</style>
