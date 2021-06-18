<template>
	<div
		id="register"
		class="min-w-screen min-h-screen overflow-hidden dark:bg-blue-gray-900 relative"
	>
		<img class="absolute w-screen h-screen z-1" src="../assets/loading-bg.png" />
		<a
			class="
				absolute
				z-1
				top-0
				left-0
				lg:left-1/6
				lg:top-1/6
				transform-gpu
				lg:-translate-x-1/2 lg:-translate-y-1/2
				fadeInto
			"
			:href="github"
			target="_blank"
		>
			<img class="w-28 lg:w-80" src="../assets/logo.png" />
		</a>
		<div
			class="
				fadeInto
				absolute
				z-99
				top-1/2
				left-1/2
				transform
				-translate-x-1/2 -translate-y-1/2
				px-4
				sm:px-12
				pt-12
				pb-8
				rounded-md
				sm:border-3
				dark:bg-transparent
				dark:border-gray-700
				sm:shadow-xl
				w-[90%]
				sm:w-140
				sm:text-left
			"
			:class="{ register_bg: !smallScreen }"
		>
			<n-form id="lg-form" ref="formRef" :show-require-mark="false" show-feedback @submit.prevent>
				<n-form-item path="user.name">
					<n-input
						style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
						placeholder="email"
						@keydown.enter.prevent
					/>
					<button
						class="
							h-full
							w-30
							sm:w-40
							hover:shadow-inner hover:shadow-md
							border border-gray-300
							bg-gray-100
							dark:bg-gray-400
							rounded-sm
						"
					>
						emit
					</button>
				</n-form-item>
				<n-form-item path="user.name">
					<n-input
						style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
						placeholder="nickname"
						@keydown.enter.prevent
					/>
				</n-form-item>
				<n-form-item path="user.name">
					<n-input
						style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
						placeholder="please input password"
						@keydown.enter.prevent
					/>
				</n-form-item>
				<Measure :level="1" :measures="4" />
				<n-form-item class="sm:mb-4" path="user.pw">
					<n-input
						style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
						type="password"
						placeholder="re-check input password"
						@keydown.enter.prevent
					/>
				</n-form-item>

				<n-button class="w-full" attr-type="button" type="info">confirm</n-button>
			</n-form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Measure from '/@/components/measure/index.vue'
import { key } from '/@/components/context/'
const github = import.meta.env.VITE_GITHUB
export default defineComponent({
	name: 'Install',
	components: {
		Measure,
	},
	setup() {
		const smallScreen = inject(key)?.smallScreen
		return {
			github,
			smallScreen,
		}
	},
})
</script>

<style lang="scss">
@import '../components/style/base';
#register .register_bg {
	background-color: $light_color--gray1;
}
</style>
