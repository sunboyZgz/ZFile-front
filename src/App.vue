<template>
	<n-config-provider :theme="darkTheme">
		<AppContextProvider :small-screen="smallScreen">
			<router-view />
		</AppContextProvider>
	</n-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AppContextProvider from '/@/components/context/AppContextProvider.vue'
import { usePageTitle, useResize } from '/@/hooks/'
import { darkTheme } from '/@/setupUI'
import { LG } from '/@/utils/env'
export default defineComponent({
	name: 'App',
	components: {
		AppContextProvider,
	},
	setup() {
		usePageTitle()
		const smallScreen = ref(false)
		const size = useResize()
		watch(
			() => size[0],
			currentSize => {
				if (currentSize < LG) {
					smallScreen.value = true
				} else {
					smallScreen.value = false
				}
			}
		)
		return { darkTheme, smallScreen }
	},
})
</script>

<style>
/* body {
	@apply dark:bg-blue-gray-900;
} */
</style>
