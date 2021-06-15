<template>
	<div
		class="
			w-screen
			h-screen
			overflow-hidden
			relative
			dark:bg-blue-gray-800
			transition-colors
			duration-500
			flex
		"
		:class="{ 'login--color': isSmall }"
	>
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

		<div
			class="
				hidden
				lg:block
				bg_login--clipPath
				w-[60%]
				h-full
				bg_login bg--fadeIn
				transition-colors
				duration-500
				relative
			"
			sun:bg="dark:blue-gray-900"
		>
			<h1
				class="
					inline
					relative
					top-16
					-left-12
					text-8xl
					clip-text
					bg-gradient-to-br
					from-white
					to-gray-500
				"
			>
				ZFile
				<span class="text-white text-xl">{{ t('title') }}</span>
			</h1>
			<img
				class="absolute w-100 top-3/5 left-1/3 transform-gpu -translate-x-1/2 -translate-y-1/2"
				src="../assets/login-woman.png"
			/>
			<PrintSvg
				width="34"
				class="absolute top-[49%] left-[43%] transform-gpu -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
		<div class="lg:flex-1 flex-none"></div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, unref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useTypeI18n } from '/@/i18n/'
import SunSwitch from '/@/components/Switch.vue'
import { MoonIcon, SunIcon, GithubIcon, TransIcon, PrintSvg } from '/@/components/icon/'
import { useThemeMode } from '/@/hooks/useThemeMode'
import { key } from '/@/components/context/AppContextProvider.vue'

const github = import.meta.env.VITE_GITHUB
const options = [
	{
		label: '中文',
		key: '1',
	},
	{
		label: 'English',
		key: '2',
	},
]

type dropDropKeys = '1' | '2'
export default defineComponent({
	name: 'Home',
	components: {
		MoonIcon,
		SunIcon,
		SunSwitch,
		GithubIcon,
		TransIcon,
		PrintSvg,
	},
	setup() {
		const { t, locale } = useTypeI18n()
		const store = useStore()
		const darkRef = computed(() => store.getters['themeModule/getDark'])
		const isSmall = ref(false)

		const handleSelect = (key: dropDropKeys) => {
			if (key === '1') {
				locale.value = 'zh'
			} else if (key === '2') {
				locale.value = 'en'
			}
		}
		useThemeMode(darkRef)
		const toggleMode = (): void => {
			store.commit('themeModule/changeMode')
			localStorage.setItem('APP_DARK_MODE', darkRef.value)
		}
		const screenSize = inject(key)
		watchEffect(() => {
			isSmall.value = unref(false || screenSize!.smallScreen)
		})
		return {
			t,
			toggleMode,
			darkRef,
			isSmall,
			github,
			options,
			handleSelect,
		}
	},
})
</script>

<style lang="scss">
@use '../components/style/base';
.login--color {
	background-color: base.$light_color--blue1;
}
.bg_login {
	background-color: base.$bg_light--color;
}
.dark {
	.bg_login {
		background-color: base.$bg_dark--deep;
	}
}

.bg_login--clipPath {
	clip-path: polygon(100% 0%, 66.6% 100%, 0 100%, 0 0);
}

.bg--fadeIn {
	animation: fadeIn 1s;
	animation-timing-function: cubic-bezier(0.405, 0.27, 0.265, 1);
}
</style>
