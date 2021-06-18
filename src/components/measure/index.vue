<template>
	<div :class="[prefixer]">
		<div ref="barRef" :class="[`${prefixer}_bar`]"></div>
		<div :class="[`${prefixer}_blocks`]">
			<div v-for="item in levels" :key="item.level"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, unref, watch } from 'vue'
import type { MeasureItemProps } from './_utils'
import { getLevel } from './_utils'
import { PREFIXER } from '/@/utils/env'
const defaultMeasures: MeasureItemProps[] = [
	{
		level: 1,
		color: 'red',
	},
	{
		level: 2,
		color: 'orange',
	},
	{
		level: 3,
		color: 'yellow',
	},
	{
		level: 4,
		color: 'green',
	},
]

export default defineComponent({
	name: 'Measure',
	components: {},
	props: {
		measures: {
			type: Array as PropType<MeasureItemProps[] | number>,
			default: defaultMeasures,
		},
		level: {
			type: Number as PropType<number>,
			default: 0,
		},
	},
	setup(props) {
		const { measures } = props
		const prefixer = `${PREFIXER}_measure`
		const levels = getLevel(measures)
		const rate = 100 / levels.length
		let dom: HTMLDivElement | null = null
		const barRef: Ref<HTMLDivElement | null> = ref(null)
		onMounted(() => {
			dom = unref(barRef)
		})
		watch(
			() => props.level,
			() => {
				if (dom) {
					const { level } = props
					const len = levels.length
					const nowLevel: [number, string] =
						level >= len
							? [len, levels[len - 1].color]
							: [level, level <= 0 ? '' : levels[level - 1].color]
					console.log('level：', nowLevel)
					dom.style.width = `${nowLevel[0] * rate}%`
					dom.style.backgroundColor = nowLevel[1]
				}
			},
			{
				immediate: true,
			}
		)

		return {
			prefixer,
			levels,
			barRef,
		}
	},
})
</script>

<style lang="scss">
@import '../style/base';
$measure: #{$prefixer}_measure;
.#{$measure} {
	position: relative;
	display: flex;
	width: 100%;
	height: 0.5rem;
	border-radius: 0.2rem;
	overflow: hidden;
	background-color: $light_color--gray2;
	.#{$measure}_bar {
		position: absolute;
		width: 0%;
		height: 100%;
		display: flex;
		z-index: 1;
		transition: width 0.3s ease-in-out, backgroud-color 0.3s ease-in-out;
		background: transparent;
	}
	.#{$measure}_blocks {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 2;
		& > div {
			flex: 1;
			box-sizing: content-box;
		}

		div:not(.#{$measure} div:first-of-type) {
			border-left-width: 0.2rem;
			border-color: white;
		}
	}
}

// :not(.#{$measure} div:nth-child(1)),
// :not(.#{$measure} div:nth-last-child(1)) {
// 	background-color: yellow;
// }
</style>
