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
			flex flex-col
			lg:flex-row
		"
		:class="{ 'login--color': isSmall }"
	>
		<!--  big screen nav -->
		<PCTopNav v-if="!isSmall">
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
		</PCTopNav>
		<!-- small screen nav -->
		<div class="block lg:hidden w-full">
			<div class="flow-root pt-2 px-3 mb-12">
				<div class="float-left">
					<ToggleMode />
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
					<Translate />
				</div>
			</div>
			<img class="w-[60%] mx-auto" src="../assets/zfile.png" />
		</div>

		<!-- decorate -->
		<div
			class="
				hidden
				lg:block
				absolute
				bg--fadeIn
				transition-colors
				w-[62%]
				h-full
				shadow_login--clipPath
				bg-gray-200
				dark:bg-gray-700
			"
		></div>
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
				dark:blue-gray-900
			"
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
			<div
				class="
					absolute
					w-[400px]
					h-[300px]
					top-3/5
					left-1/3
					transform-gpu
					-translate-x-1/2 -translate-y-1/2
				"
			>
				<img class="absolute w-[400px]" src="../assets/login-woman.png" />
				<PrintSvg width="34" class="absolute right-[95px] top-[55px]" />
			</div>
		</div>
		<div class="flex lg:flex-1 justify-center lg:justify-start mt-12 lg:mt-0">
			<div class="w-[80%] lg:w-[70%] flex flex-col text-left justify-center">
				<h2 class="enter_xleft-0 text-4xl dark:text-white hidden lg:block text-left mb-8">
					{{ t('login') }}
				</h2>
				<Form />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTypeI18n, useI18Select, options } from '/@/i18n/'
import Form from './login-cmp/Form.vue'
import { GithubIcon, PrintSvg, PCTopNav, Translate, ToggleMode } from '/@/components/'
import { useSmallSize } from '/@/hooks/index'
const github = import.meta.env.VITE_GITHUB

export default defineComponent({
	name: 'Home',
	components: {
		GithubIcon,
		PrintSvg,
		Form,
		PCTopNav,
		Translate,
		ToggleMode,
	},
	setup() {
		const { t, locale } = useTypeI18n()
		const handleSelect = useI18Select(locale)
		const isSmall = useSmallSize()
		return {
			t,
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
.shadow_login--clipPath {
	clip-path: polygon(98.2% 0%, 66% 100%, 0 100%, 0 0);
}
.bg--fadeIn {
	animation: fadeIn 1s;
	animation-timing-function: cubic-bezier(0.405, 0.27, 0.265, 1);
}
</style>
