<template>
	<!-- 名字 + 进度 + size / size -->
	<div class="border-none pb-2 shadow-sm">
		<div class="flow-root">
			<h5 class="float-left">{{ progress.getName() }}</h5>
			<div class="float-right">
				<i>[]</i>
				<span class="ml-3">{{ progress.stat }}</span>
			</div>
		</div>
		<div
			class="
				flex
				w-full
				h-6
				items-center
				justify-between
				children:flex-grow-0 children:flex-shrink-0
			"
		>
			<n-progress class="!w-4/5 shadow-md" type="line" :percentage="100" :show-indicator="false" />
			<div>
				<span class="mr-1">{{ computed_start }}</span>
				/
				<span class="ml-1">{{ progress.getSize() }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { ProgressItem } from './'
export default defineComponent({
	name: 'ProgressItem',
	props: {
		progress: {
			type: Object as PropType<ProgressItem>,
			default: () => {
				return new ProgressItem()
			},
		},
	},
	setup(props) {
		const start = ref(0)
		const percent = ref(0)
		const formData = props.progress.getFormData()
		// formData.on
		const computed_start = computed(() => {
			//make a size computed + b / B / KB / MB
			return start.value + 'b'
		})
		return {
			computed_start,
			percent,
		}
	},
})
</script>
