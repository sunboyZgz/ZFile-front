<template>
	<n-form
		id="lg-form"
		:model="formValue"
		:rules="rules"
		ref="formRef"
		:show-require-mark="false"
		show-feedback
		@submit.prevent
		@keyup.enter="clickLogin"
	>
		<n-form-item
			class="enter_xleft-1"
			path="user.account"
			:label="`${t('account.user')}：`"
			:label-style="labelStyle"
		>
			<n-input
				style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
				@keydown.enter.prevent
				:placeholder="t('lg_ph.user')"
				v-model:value="formValue.user.account"
			/>
		</n-form-item>
		<n-form-item
			class="enter_xleft-2 lg:mb-8 relative"
			path="user.cipher"
			:label="`${t('account.pw')}：`"
			:label-style="labelStyle"
		>
			<n-input
				style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
				:type="showPw ? 'password' : 'text'"
				@keydown.enter.prevent
				:placeholder="t('lg_ph.pw')"
				v-model:value="formValue.user.cipher"
			/>
			<div class="absolute right-[5%]">
				<Eye
					width="22"
					:is-off="showPw"
					@click="changePwStat"
					class="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
				/>
			</div>
		</n-form-item>
		<n-button
			class="w-full enter_xleft-3"
			attr-type="button"
			type="info"
			@click="clickLogin"
			:disabled="loading"
		>
			<span v-if="!loading">{{ t('lg_button') }}</span>
			<n-spin v-else class="text-white" size="small" />
		</n-button>
	</n-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useTypeI18n } from '/@/i18n'
import { useSmallSize } from '/@/hooks/index'
import { Eye } from '/@/components/icon/'
import { loginUser } from '/@/network/login'
import { isUsefulReq } from '/@/network/_utils'
import { debounce } from '/@/utils/common'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'LoginForm',
	components: {
		Eye,
	},
	setup() {
		const { t } = useTypeI18n()
		const isSmall = useSmallSize()
		const showPw = ref(true)
		const loading = ref(false)
		const labelStyle = computed(() => ({
			color: isSmall.value ? 'white' : '',
		}))
		const formRef = ref<HTMLFormElement | null>(null)
		const formValue = ref({
			user: {
				account: '',
				cipher: '',
			},
		})
		const message = useMessage()
		const router = useRouter()
		const rules = {
			user: {
				account: {
					required: true,
					message: '请输入姓名',
					trigger: 'blur',
				},
				cipher: {
					required: true,
					message: '请输入密码',
					trigger: 'blur',
				},
			},
		}
		const debounce_time = 5
		const clickLogin = debounce(
			(e: MouseEvent) => {
				e.preventDefault()
				formRef.value?.validate(async errors => {
					if (!errors) {
						loading.value = true
						const { status, message: info } = await loginUser(formValue.value.user).finally(() => {
							loading.value = false
						})
						if (isUsefulReq(status)) {
							router.push('/main')
						} else {
							message.error(info as string)
						}
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
		const changePwStat = () => {
			showPw.value = !showPw.value
		}
		return {
			t,
			isSmall,
			labelStyle,
			formRef,
			formValue,
			rules,
			showPw,
			changePwStat,
			clickLogin,
			loading,
		}
	},
})
</script>

<style></style>
