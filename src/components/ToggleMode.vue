<template>
	<SunSwitch size="lg" :onclick="toggleMode" :value="darkRef">
		<MoonIcon v-if="darkRef" />
		<SunIcon v-else />
	</SunSwitch>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { SunSwitch, MoonIcon, SunIcon } from '/@/components/'
import { useThemeMode } from '/@/hooks/'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'ToggleMode',
	components: {
		SunSwitch,
		MoonIcon,
		SunIcon,
	},
	setup() {
		const store = useStore()
		const darkRef = computed(() => store.getters['themeModule/getDark'])
		useThemeMode(darkRef)
		const toggleMode = (): void => {
			store.commit('themeModule/changeMode')
			localStorage.setItem('APP_DARK_MODE', darkRef.value)
		}
		return {
			darkRef,
			toggleMode,
		}
	},
})
</script>
