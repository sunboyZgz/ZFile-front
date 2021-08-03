<template>
	<!-- <teleport to="#progress-box" v-if="!smallScreen"> -->
	<n-drawer
		v-model:show="active"
		placement="bottom"
		height="100%"
		width="100%"
		to="#progress-box"
		:on-update:show="activeChange"
		class="rounded-md"
	>
		<n-drawer-content :title="t('progress_box.downpanel')" :closable="true">
			<ProgressItem />
		</n-drawer-content>
	</n-drawer>
	<!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { key } from '/@/components/context/'
import { toBody } from '/@/components/utils'
import { useTypeI18n } from '/@/i18n'
import ProgressItem from './ProgressItem.vue'
const id = 'progress-box'
const removeDom = () => {
	const dom = document.getElementById(id)
	dom && document.body.removeChild(dom)
}
export default defineComponent({
	name: 'ProgressBox',
	components: {
		ProgressItem,
	},
	props: {
		active: {
			type: Boolean,
			default: true,
		},
		activeChange: {
			type: Function,
			default: () => {},
		},
	},
	emits: ['activeChange'],
	setup() {
		const smallScreen = inject(key)?.smallScreen
		const { t } = useTypeI18n()
		return {
			smallScreen,
			t,
		}
	},
	watch: {
		active(newValue) {
			const dom = document.getElementById(id)
			if (dom) {
				if (newValue) {
					dom.style.display = 'block'
				} else {
					let timer: any = setTimeout(() => {
						dom.style.display = 'none'
						clearTimeout(timer)
						timer = null
					}, 300)
				}
			}
		},
	},
	unmounted() {
		removeDom()
	},
	beforeMount() {
		toBody(document.createElement('div'), id, { display: this.active ? 'block' : 'none' })
	},
})
</script>

<style lang="scss">
@import './index.scss';
</style>
