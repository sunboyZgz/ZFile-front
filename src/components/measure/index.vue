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
@import './index.scss';
</style>
