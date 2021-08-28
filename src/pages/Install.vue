<template>
	<div
		id="register"
		class="min-w-screen min-h-screen overflow-hidden dark:bg-blue-gray-900 relative"
	>
		<!-- large size screen -->
		<PCTopNav v-if="!smallScreen">
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
		<div class="flow-root lg:hidden flow-root pt-2 px-3 mb-12">
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
				lg:px-12
				lg:pt-12
				pb-8
				rounded-md
				lg:border-3
				dark:bg-transparent
				dark:border-gray-700
				lg:shadow-xl
				w-[90%]
				lg:w-140
				lg:text-left
			"
			:class="{ register_bg: !smallScreen }"
		>
			<n-form
				id="lg-form"
				ref="formRef"
				:model="formValue"
				:rules="rules"
				:show-require-mark="false"
				show-feedback
				@submit.prevent
			>
				<div class="block lg:flex w-full">
					<n-form-item path="nickName" class="flex-grow">
						<n-input
							:style="{
								'--box-shadow-focus': !isDark
									? '0 0 0 2px rgba(107, 196, 255, 0.7)'
									: '0 0 0 1px rgba(255, 255, 255, 0.7)',
								'--border-focus': !isDark
									? '0 0 0 1px rgb(107, 196, 255)'
									: '0 0 0 1px rgb(255, 255, 255)',
							}"
							:placeholder="t('installform.nickname')"
							v-model:value="formValue.nickName"
							@keydown.enter.prevent
						/>
					</n-form-item>
					<n-form-item class="lg:flex-grow-[3] lg:ml-4 -mt-4 lg:mt-0" path="email">
						<n-input
							:style="{
								'--box-shadow-focus': !isDark
									? '0 0 0 2px rgba(107, 196, 255, 0.7)'
									: '0 0 0 1px rgba(255, 255, 255, 0.7)',
								'--border-focus': !isDark
									? '0 0 0 1px rgb(107, 196, 255)'
									: '0 0 0 1px rgb(255, 255, 255)',
							}"
							:placeholder="t('installform.email')"
							@keydown.enter.prevent
							v-model:value="formValue.email"
						/>
					</n-form-item>
				</div>
				<n-form-item path="code" class="-mt-4 lg:mt-0">
					<n-input
						:style="{
							'--box-shadow-focus': !isDark
								? '0 0 0 2px rgba(107, 196, 255, 0.7)'
								: '0 0 0 1px rgba(255, 255, 255, 0.7)',
							'--border-focus': !isDark
								? '0 0 0 1px rgb(107, 196, 255)'
								: '0 0 0 1px rgb(255, 255, 255)',
						}"
						:placeholder="t('installform.vericode')"
						@keydown.enter.prevent
						v-model:value="formValue.code"
					/>
					<button
						class="
							h-full
							w-30
							lg:w-40
							ml-4
							border border-gray-300
							bg-gray-100
							dark:bg-gray-500
							rounded-sm
							text-gray-500
							dark:text-gray-300
							hover:text-black
							hover:border-gray-400
							dark:hover:text-white
							dark:hover:border-white
						"
						@click="debounce_code"
					>
						{{ t('installform.getcode') }}
					</button>
				</n-form-item>
				<n-form-item path="onePassword" class="-mt-4 lg:mt-0">
					<n-input
						:style="{
							'--box-shadow-focus': !isDark
								? '0 0 0 2px rgba(107, 196, 255, 0.7)'
								: '0 0 0 1px rgba(255, 255, 255, 0.7)',
							'--border-focus': !isDark
								? '0 0 0 1px rgb(107, 196, 255)'
								: '0 0 0 1px rgb(255, 255, 255)',
						}"
						:placeholder="t('installform.pleasepw')"
						v-model:value="formValue.onePassword"
						@keydown.enter.prevent
						@input="throttle_pw"
						type="password"
					/>
				</n-form-item>
				<Measure :level="levelRef" :measures="4" />
				<n-form-item class="lg:mb-4" path="twoPassword">
					<n-input
						:style="{
							'--box-shadow-focus': !isDark
								? '0 0 0 2px rgba(107, 196, 255, 0.7)'
								: '0 0 0 1px rgba(255, 255, 255, 0.7)',
							'--border-focus': !isDark
								? '0 0 0 1px rgb(107, 196, 255)'
								: '0 0 0 1px rgb(255, 255, 255)',
						}"
						type="password"
						:placeholder="t('installform.repw')"
						v-model:value="formValue.twoPassword"
						@keydown.enter.prevent
					/>
				</n-form-item>

				<n-button class="w-full" attr-type="button" type="info" @click="handleValidateButton">{{
					t('installform.comfirm')
				}}</n-button>
			</n-form>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import Measure from '/@/components/measure/index.vue'
import { throttle, debounce } from '/@/utils/common'
import { getVeriCode, registerUser } from '/@/network/install'
import { isUsefulReq } from '/@/network/_utils'
import { GithubIcon, PCTopNav, Translate, ToggleMode } from '/@/components/'
import { useTypeI18n } from '/@/i18n'
import { useSmallSize } from '/@/hooks/index'
const github = import.meta.env.VITE_GITHUB
const emailReg = /^[0-9a-zA-Z]+[\w._-|]+@[0-9a-zA-Z]+\.[a-z]{2,}$/

const pass_level1 = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z0-9]).*$/
const pass_level2 = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
const pass_level3 = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-zA-Z])(?=.*[.!@#$%]).*$/
const pass_level4 = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[.!@#$%]).*$/

export default defineComponent({
	name: 'Install',
	components: {
		Measure,
		PCTopNav,
		GithubIcon,
		Translate,
		ToggleMode,
	},
	setup() {
		const smallScreen = useSmallSize()
		const store = useStore()
		const router = useRouter()
		const isDark = computed(() => store.getters['themeModule/getDark'])
		const levelRef = ref(0)
		const formRef = ref<HTMLFormElement | null>(null)
		const formValue = reactive({
			email: '',
			nickName: '',
			code: '',
			onePassword: '',
			twoPassword: '',
		})
		const message = useMessage()
		const { t } = useTypeI18n()
		const rules = {
			email: [
				{
					validator(_, value) {
						if (!value) return new Error('please input email')
						if (!emailReg.test(value)) return new Error('please correct the email')
					},
					trigger: ['blur', 'input'],
				},
				{
					trigger: 'blur',
				},
			],
			nickName: {
				required: true,
				trigger: 'blur',
			},
			code: {
				required: true,
				trigger: 'blur',
			},
			onePassword: {
				validator(_, value) {
					if (!value) return new Error('please input password')
					if (value.length < 8) return new Error('please input more than 8 words in box')
				},
				trigger: 'blur',
			},
			twoPassword: {
				validator(_, value) {
					if (!value) return new Error('please input password again!')
					if (formValue.onePassword && !(value == formValue.onePassword))
						return new Error('The two inputs are inconsistent')
				},
				trigger: 'blur',
			},
		}
		const throttle_pw = throttle(e => {
			if (!e) levelRef.value = 0
			let value = 0
			if (pass_level4.test(e)) {
				value = 4
			} else if (pass_level3.test(e)) {
				value = 3
			} else if (pass_level2.test(e)) {
				value = 2
			} else if (pass_level1.test(e)) {
				value = 1
			}
			levelRef.value = value
		}, 200)

		const debounce_time = 5
		const debounce_code = debounce(
			async () => {
				getVeriCode(formValue.email)
				// console.log('result', e)
			},
			debounce_time * 1000,
			debounce(() => {
				message.warning(
					`get verification code control more frequently, ${debounce_time}s every time.`
				)
			}, 1000)
		)

		const handleValidateButton = debounce(
			(e: MouseEvent) => {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					if (!errors) {
						const { status } = await registerUser(formValue)
						if (isUsefulReq(status)) {
							router.push('/main')
						}
					} else {
						message.error('please complete info at first')
					}
				})
			},
			debounce_time * 1000,
			debounce(() => {
				message.warning(
					`get verification code control more frequently, ${debounce_time}s every time.`
				)
			}, 1000)
		)

		return {
			github,
			smallScreen,
			isDark,
			formValue,
			rules,
			levelRef,
			throttle_pw,
			debounce_code,
			formRef,
			handleValidateButton,
			t,
		}
	},
})
</script>

<style lang="scss">
@import '../components/style/base';
#register .register_bg {
	background-color: $light_color--gray3;
}
</style>
