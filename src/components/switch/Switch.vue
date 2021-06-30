<template>
	<div class="sun-switch-content">
		<div
			ref="switchRef"
			class="relative rounded-full shadow-sm flex items-center overflow-hidden"
			:class="[cname]"
			@click="onClick"
		>
			<!-- <div class="absolute"></div> -->
			<div
				class="absolute rounded-full left-0 bg-white shadow-md transition-all"
				:class="[inname, { active: newValue }]"
			>
				<slot></slot>
			</div>
			<!-- <div class="absolute"></div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, PropType, computed } from 'vue'
// import type { handleClick } from '/#/index'
import { PREFIXER } from '/@/utils/env'
export type handleClick = (value: boolean, payload: MouseEvent) => void
export default defineComponent({
	name: 'Switch',
	props: {
		bgColor: {
			type: String,
			default: 'rgb(232, 231, 231)',
		},
		onclick: {
			type: Function as PropType<handleClick>,
			default: null,
		},
		size: {
			type: String as PropType<'sm' | 'md' | 'lg'>,
			default: 'md',
		},
		value: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const switchRef: Ref<null | HTMLDivElement> = ref(null)
		const newValue = ref(props.value)
		onMounted(() => {
			switchRef.value!.style.backgroundColor = props.bgColor
		})
		const prefixer = `${PREFIXER}_switch`
		const cname = computed(() => {
			if (props.size === 'sm') {
				return `${prefixer} ${prefixer}-sm`
			} else if (props.size === 'lg') {
				return `${prefixer} ${prefixer}-lg`
			} else {
				return `${prefixer} ${prefixer}-md`
			}
		})
		const inname = computed(() => {
			if (props.size === 'sm') {
				return `${prefixer}-inner-sm`
			} else if (props.size === 'lg') {
				return `${prefixer}-inner-lg`
			} else {
				return `${prefixer}-inner-md`
			}
		})
		const onClick = (e: MouseEvent) => {
			newValue.value = !newValue.value
			if (props.onclick) {
				props.onclick(newValue.value, e)
			}
			return newValue.value
		}
		return {
			switchRef,
			onClick,
			Size: props.size,
			cname,
			inname,
			newValue,
		}
	},
})
</script>

<style lang="scss">
@import './index.scss';
</style>
