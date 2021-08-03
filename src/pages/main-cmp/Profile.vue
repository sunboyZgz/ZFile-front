<template>
	<n-button class="p-2" @click="openDrawer"><MenuIcon width="24" /></n-button>
	<n-drawer v-model:show="active" style="width: 80%">
		<n-drawer-content :title="t('profile.contentTitle')" class="flex-col" closable>
			<div class="mb-4 mt-2 h-20 flex items-center">
				<div class="profile-info flex-1 max-w-[80%] flex flex-col justify-center text-sm">
					<p class="mb-4 text-overflow" :title="userInfo?.nickName">
						{{ t('profile.nickname') }}: <span>{{ userInfo?.nickName }}</span>
					</p>
					<p class="text-overflow" :title="userInfo?.email">
						{{ t('profile.email') }}:<span>{{ userInfo?.email }}</span>
					</p>
				</div>
				<span class="block w-14 h-14 overflow-hidden rounded-full">
					<img
						class="
							avatar-frame
							h-full
							object-contain
							rounded-full
							bg-gray-400
							dark:bg-dark-50
							border-3 border-warm-gray-400
							dark:border-blue-900
						"
						:src="userInfo?.photo"
					/>
				</span>
			</div>
			<nav class="flex flex-col">
				<NavMenu />
				<button
					class="can-active nav-items rounded-md mt-2 pl-2 py-2 shadow-md flex items-center"
					@click="signOut"
				>
					<AliIcon
						class="icon dark:text-true-gray-200 !text-xl"
						code="exit"
						:title="t('table.leftnav.sign-out')"
					/>
					<span class="ml-2">{{ t('navMenu.exit') }}</span>
				</button>
			</nav>
		</n-drawer-content>
	</n-drawer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { MenuIcon, AliIcon } from '/@/components/'
import type { PropfileProps } from '/@/network/main'
import { useTypeI18n } from '/@/i18n/index'
import { useSignout } from './_utils'
import NavMenu from './NavMenu.vue'
export default defineComponent({
	name: 'Profile',
	components: {
		MenuIcon,
		AliIcon,
		NavMenu,
	},
	props: {
		userInfo: {
			type: Object as PropType<PropfileProps | null>,
			default() {
				return null
			},
		},
	},
	setup() {
		const active = ref(false)
		const { t } = useTypeI18n()
		const openDrawer = () => {
			active.value = true
		}
		const signOut = useSignout()
		return {
			openDrawer,
			active,
			t,
			signOut,
		}
	},
})
</script>

<style lang="scss">
@import './index.scss';
</style>
