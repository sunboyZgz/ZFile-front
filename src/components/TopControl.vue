<template>
	<!--  big screen nav -->
	<div class="hidden lg:flex absolute top-4 right-0 pr-4 w-70 justify-evenly">
		<SunSwitch size="lg" :onclick="toggleMode" :value="darkRef">
			<MoonIcon v-if="darkRef" />
			<SunIcon v-else />
		</SunSwitch>
		<a :href="github" target="_blank">
			<GithubIcon
				class="
					rounded-full
					border-2
					shadow-md
					border-gray-700
					dark:border-white
					cursor-pointer
					dark:bg-white
				"
				width="28"
			/>
		</a>
		<n-dropdown placement="bottom-start" trigger="click" :options="options" @select="handleSelect">
			<n-button class="text-gray-700" :keyboard="false">
				<TransIcon width="26" class="dark:text-red-50" />
			</n-button>
		</n-dropdown>
	</div>
	<!-- small screen nav -->
	<div class="block lg:hidden w-full">
		<div class="flow-root pt-2 px-3 mb-12">
			<div class="float-left">
				<SunSwitch size="lg" :onclick="toggleMode" :value="darkRef">
					<MoonIcon v-if="darkRef" />
					<SunIcon v-else />
				</SunSwitch>
			</div>
			<div class="float-right flex w-30 justify-evenly">
				<a :href="github" target="_blank">
					<GithubIcon
						class="
							rounded-full
							border-2
							shadow-md
							border-gray-700
							dark:border-white
							cursor-pointer
							dark:bg-white
						"
						width="28"
					/>
				</a>
				<n-dropdown
					placement="bottom-start"
					trigger="click"
					:options="options"
					@select="handleSelect"
				>
					<n-button class="text-gray-700" :keyboard="false">
						<TransIcon width="26" class="dark:text-red-50" />
					</n-button>
				</n-dropdown>
			</div>
		</div>
		<img class="w-[60%] mx-auto" src="../assets/zfile.png" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MoonIcon, SunIcon, GithubIcon, TransIcon } from '/@/components/icon/'
import { useTypeI18n, useI18Select, options } from '/@/i18n/'
import { useStore } from 'vuex'
const github = import.meta.env.VITE_GITHUB

export default defineComponent({
	name: 'TopControl',
	components: { MoonIcon, SunIcon, GithubIcon, TransIcon },
	setup() {
		const store = useStore()
		const { locale } = useTypeI18n()
		const handleSelect = useI18Select(locale)
		const darkRef = computed(() => store.getters['themeModule/getDark'])
		const toggleMode = (): void => {
			store.commit('themeModule/changeMode')
			localStorage.setItem('APP_DARK_MODE', darkRef.value)
		}
		return {
			github,
			darkRef,
			options,
			toggleMode,
			handleSelect,
		}
	},
})
</script>

<style></style>
