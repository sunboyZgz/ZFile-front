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
		const prefixer = `${PREFIXER}-switch`
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
@import './style/base';
$switch: #{$prefixer}-switch;
@mixin switch_inner($height) {
	width: $height * 0.8;
	height: $height * 0.8;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	transform: translate3d(15%, 0, 0);
	transition-duration: 0.5s;
	transition-timing-function: cubic-bezier(0.565, 0.065, 0.105, 0.84);

	&:hover {
		box-shadow: 0 0 2px 1px $bg_light--color;
	}
}
.#{$switch} {
	box-shadow: 0 0 1px 2px rgba(65, 65, 65, 0.3) inset;
	&:hover {
		cursor: pointer;
		// box-shadow: 0 0 0 1px $light_color--blue1, 0 0 1px 2px rgba(65, 65, 65, 0.3) inset;
	}

	&.#{$switch}-sm {
		width: 2.2rem;
		height: $base_height--sm;
	}
	&.#{$switch}-md {
		width: 2.5rem;
		height: $base_height--md;
	}
	&.#{$switch}-lg {
		width: 3.2rem;
		height: $base_height--lg;
	}
	.#{$switch}-inner-sm {
		@include switch_inner($base_height--sm);
		&.active {
			transform: translate3d(calc(2.2rem - 115%), 0, 0);
		}
	}
	.#{$switch}-inner-md {
		@include switch_inner($base_height--md);
		&.active {
			transform: translate3d(calc(2.5rem - 115%), 0, 0);
		}
	}
	.#{$switch}-inner-lg {
		@include switch_inner($base_height--lg);
		&.active {
			transform: translate3d(calc(3.2rem - 115%), 0, 0);
		}
	}
}
</style>
