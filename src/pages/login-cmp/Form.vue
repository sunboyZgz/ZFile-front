<template>
	<n-form
		id="lg-form"
		:model="formValue"
		:rules="rules"
		ref="formRef"
		:show-require-mark="false"
		show-feedback
		@submit.prevent
	>
		<n-form-item
			class="enter_xleft-1"
			path="user.name"
			:label="`${t('account.user')}：`"
			:label-style="labelStyle"
		>
			<n-input
				style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
				autofocus
				@keydown.enter.prevent
				:placeholder="t('lg_ph.user')"
				v-model:value="formValue.user.name"
			/>
		</n-form-item>
		<n-form-item
			class="enter_xleft-2 lg:mb-8 relative"
			path="user.pw"
			:label="`${t('account.pw')}：`"
			:label-style="labelStyle"
		>
			<n-input
				style="--box-shadow-focus: 0 0 0 2px rgba(107, 196, 255, 0.2)"
				:type="showPw ? 'password' : 'text'"
				@keydown.enter.prevent
				:placeholder="t('lg_ph.pw')"
				v-model:value="formValue.user.pw"
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
		<n-button class="w-full enter_xleft-3" attr-type="button" type="info" @click="validate">
			{{ t('lg_button') }}
		</n-button>
	</n-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
// import { useMessage } from 'naive-ui'
import { useTypeI18n } from '/@/i18n'
import { useSmallSize } from '/@/hooks/index'
import { Eye } from '/@/components/icon/'
// interface FormValue {
// 	user: string
// 	pw: string
// }

export default defineComponent({
	name: 'LoginForm',
	components: {
		Eye,
	},
	setup() {
		const { t } = useTypeI18n()
		const isSmall = useSmallSize()
		const showPw = ref(true)
		const labelStyle = computed(() => ({
			color: isSmall.value ? 'white' : '',
		}))
		const formRef = ref(null)
		const formValue = ref({
			user: {
				name: '',
				pw: '',
			},
		})
		const rules = {
			user: {
				name: {
					required: true,
					message: '请输入姓名',
					trigger: 'blur',
				},
				pw: {
					required: true,
					message: '请输入年龄',
					trigger: 'blur',
				},
			},
		}

		const validate = () => {
			;(formRef.value as any).validate(errors => {})
		}
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
			validate,
			showPw,
			changePwStat,
		}
	},
})
</script>

<style></style>
