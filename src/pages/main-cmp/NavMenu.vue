<template>
	<n-dropdown placement="bottom-start" trigger="click" :options="options" @select="handleSelect">
		<n-button class="text-gray-700" :class="$attrs.class" :keyboard="false">跳转</n-button>
	</n-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTypeI18n } from '/@/i18n'
enum dropDropKeys {
	SYSTEM = '1',
}

export default defineComponent({
	name: 'NavMenu',
	setup() {
		const router = useRouter()
		const { t } = useTypeI18n()
		const options = computed(() => {
			const systemLabel = t('navMenu.system')
			return [
				{
					label: systemLabel,
					key: dropDropKeys.SYSTEM,
				},
			]
		})
		const handleSelect = key => {
			if (key === dropDropKeys.SYSTEM) {
				router.push('/system')
			}
		}

		return {
			options,
			handleSelect,
		}
	},
})
</script>
