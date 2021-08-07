<template>
	<div
		id="main"
		class="
			w-screen
			h-screen
			bg-blue-50
			dark:bg-gray-800
			flex
			overflow-hidden
			transition-colors
			duration-200
		"
	>
		<n-notification-provider>
			<!-- left side nav -->
			<LeftMenu class="hidden lg:block min-w-[5rem] h-screen overflow-hidden" :dom="fullRef" />
			<!-- full screen area -->
			<div
				class="w-full h-screen"
				:class="{ 'bg-blue-50 dark:bg-gray-800': isFullscreen }"
				ref="fullRef"
			>
				<n-modal :show="showModal">
					<n-spin class="bg-transparent text-blue-400 shadow-none" size="large" />
				</n-modal>
				<!-- file history for back and push  -->
				<nav class="h-[4.5rem] w-full flex items-center overflow-hidden">
					<div class="flex items-center flex-1 text-left ml-8">
						<template v-if="!smallScreen">
							<AliIcon
								v-for="item in fileHistory"
								class="
									icon
									cursor-pointer
									!text-xl
									!inline-block
									font-bold
									align-bottom
									text-warm-gray-500
									hover:text-warm-gray-900
									dark:text-true-gray-200 dark:text-true-gray-50
									transform-gpu
									transition-all
									hover:scale-110
								"
								@click="item.click"
								:code="item.code"
								:key="item.key"
							/>
						</template>
						<!-- was only used in mobile -->
						<template v-else>
							<Profile :user-info="userInfo" />
						</template>
						<!-- header back and go in-->
						<Breadcrumb class="ml-4">
							<!-- <template #separator> <div>test</div> </template> -->
							<BreadItem
								class="dark:text-true-gray-200"
								:key="999"
								v-if="pathRef && pathRef[0] !== '/'"
							>
								<router-link :to="baseUrl">root</router-link>
							</BreadItem>
							<template v-for="(item, index) in pathRef" :key="item">
								<BreadItem class="dark:text-true-gray-200">
									<router-link
										v-if="index < pathRef.length - 1"
										:to="baseUrl + pathRef.slice(0, index + 1).join('/')"
										>{{ item }}</router-link
									>
									<template v-else>{{ item === '/' ? 'root' : item }}</template>
								</BreadItem>
							</template>
						</Breadcrumb>
					</div>
					<!-- top-right control button -->
					<div class="flex-1 text-right flex justify-end items-center pr-2 lg:pr-8">
						<AliIcon
							v-if="isFullscreen"
							code="xiaoping"
							class="
								dark:text-white
								mr-8
								!text-2xl
								cursor-pointer
								transition-transform
								transform-gpu
								hover:scale-110
							"
							@click="exit"
						/>
						<ToggleMode class="pr-2 lg:mr-8" />
						<NavMenu class="hidden lg:block mr-8" />
						<Translate />
					</div>
				</nav>
				<div class="file-main w-full pb-2 pl-0 lg:pl-6">
					<div class="file-body w-full h-full rounded-0 lg:rounded-tl-3xl overflow-hidden">
						<FileTable
							class="transition-colors bg-white dark:bg-gray-700 overflow-hidden"
							:file-list="fileList"
						/>
					</div>
				</div>
			</div>
		</n-notification-provider>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch, unref, computed, inject } from 'vue'
import { AliIcon, Translate, ToggleMode, Breadcrumb, BreadItem, NavMenu } from '/@/components/'
import { useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { key } from '/@/components/context/'
import { dropBaseUrl } from '/@/router/_utils'
import { LeftMenu, FileTable, Profile } from './main-cmp/'
import { PropfileProps, show } from '/@/network/main'
import { isUsefulReq } from '../network/_utils'
import { useTypeI18n } from '/@/i18n/'
export interface NavItem {
	code?: string
	activeCode?: string
	key?: number
	active?: boolean | Ref<boolean>
	title?: string
}
export default defineComponent({
	name: 'Main',
	components: {
		AliIcon,
		Translate,
		BreadItem,
		Breadcrumb,
		ToggleMode,
		FileTable,
		LeftMenu,
		Profile,
		NavMenu,
	},
	setup() {
		const fullRef = ref<HTMLDivElement | null>(null)!
		const showModal = ref(false)
		const userInfo = ref<null | PropfileProps>(null)
		const router = useRouter()
		const store = useStore()
		const { t } = useTypeI18n()
		const { isFullscreen, exit } = useFullscreen(fullRef)
		const pathRef = ref<string[]>([])
		const fileList = computed(() => store.getters['fileSys/curDirGetter'])
		const message = useMessage()
		const smallScreen = computed(() => inject(key)?.smallScreen)
		show().then(res => {
			if (isUsefulReq(res.status)) {
				userInfo.value = res.message
			} else {
				message.error(t('profile.errorInfo'))
			}
		})
		watch(
			() => router.currentRoute.value.path,
			async () => {
				showModal.value = true
				const [_, messageInfo] = await store
					.dispatch('fileSys/checkDirAction', dropBaseUrl(router.currentRoute.value.path))
					.catch(err => {
						console.error(err)
						message.error(messageInfo)
					})
					.finally(() => {
						showModal.value = false
					})
				let rawpath = unref(router.currentRoute).params.path
				rawpath = rawpath === '' ? '/' : rawpath
				const paths = typeof rawpath === 'string' ? [rawpath] : rawpath
				pathRef.value = paths
			},
			{
				immediate: true,
			}
		)
		const push = () => {
			router.forward()
		}
		const back = () => {
			if (/^\/main(\/)?$/.test(router.currentRoute.value.path)) {
				return
			}
			router.back()
		}

		const fileHistory: (NavItem & { click: (e: MouseEvent) => void })[] = [
			{
				code: 'left',
				key: 6,
				click: back,
			},
			{
				code: 'right',
				key: 7,
				click: push,
			},
		]

		return {
			fullRef,
			isFullscreen,
			fileHistory,
			BreadItem,
			exit,
			pathRef,
			baseUrl: '/main/',
			fileList,
			showModal,
			smallScreen,
			userInfo,
		}
	},
})
</script>
<style lang="scss">
@import '../components/style/base';
.file-main {
	height: calc(100vh - 3rem);
}
.file-body {
	box-shadow: -1px -1px 3px 0px rgba($color: #2b2b2b, $alpha: 0.1);
}
</style>
