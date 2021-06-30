<template>
	<n-dropdown placement="bottom-start" trigger="click" :options="options" @select="handleSelect">
		<n-button class="text-gray-700" :keyboard="false">
			<TransIcon width="26" class="dark:text-red-50" />
		</n-button>
	</n-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTypeI18n, useI18Select, options } from '/@/i18n/'
import { TransIcon } from '/@/components/icon/'
export default defineComponent({
	name: 'Translate',
	components: {
		TransIcon,
	},
	setup() {
		const { locale } = useTypeI18n()
		const handleSelect = useI18Select(locale)
		return {
			handleSelect,
			options,
		}
	},
})
</script>

<style></style>
