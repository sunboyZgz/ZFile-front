<template>
	<n-config-provider :theme="isDark ? darkTheme : ''" :theme-overrides="themeOverrides">
		<n-message-provider>
			<AppContextProvider :small-screen="smallScreen">
				<router-view />
			</AppContextProvider>
		</n-message-provider>
	</n-config-provider>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import AppContextProvider from '/@/components/context/AppContextProvider.vue'
import { usePageTitle, useResize } from '/@/hooks/'
import { darkTheme, themeOverrides } from '/@/setupUI'
import { LG } from '/@/utils/env'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'App',
	components: {
		AppContextProvider,
	},
	setup() {
		usePageTitle()

		const smallScreen = ref(false)
		const size = useResize()
		const isDark = computed(() => useStore().getters['themeModule/getDark'])
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

		return { darkTheme, smallScreen, isDark, themeOverrides }
	},
})
</script>
