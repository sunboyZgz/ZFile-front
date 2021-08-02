<template>
	<!-- <teleport to="#progress-box" v-if="!smallScreen"> -->
	<n-drawer
		v-model:show="active"
		placement="bottom"
		height="100%"
		width="100%"
		to="#progress-box"
		:on-update:show="activeChange"
	>
		<n-drawer-content :title="t('progress_box.downpanel')" :closable="true">
			即将开始重新设计下载的进度显示
		</n-drawer-content>
	</n-drawer>
	<!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, onUnmounted, inject } from 'vue'
import { key } from '/@/components/context/'
import { toBody } from '/@/components/utils'
import { useTypeI18n } from '/@/i18n'
const id = 'progress-box'
toBody(document.createElement('div'), id)
export default defineComponent({
	name: 'ProgressBox',
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
		onUnmounted(() => {
			document.body.removeChild(document.getElementById(id)!)
		})
		return {
			smallScreen,
			t,
		}
	},
})
</script>

<style lang="scss">
@import './index.scss';
</style>
