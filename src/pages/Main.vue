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
			<LeftMenu class="min-w-[4rem] h-screen overflow-hidden" :ref="fullRef ?? undefined" />
			<div
				class="w-full h-screen"
				ref="fullRef"
				:class="{ 'bg-blue-50 dark:bg-gray-800': isFullscreen }"
			>
				<nav class="h-[4.5rem] w-full flex items-center overflow-hidden">
					<div class="flex items-center flex-1 text-left ml-8">
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
							:code="item.code"
							:key="item.key"
						/>
						<Breadcrumb class="ml-4">
							<!-- <template #separator> <div>test</div> </template> -->
							<BreadItem class="dark:text-true-gray-200" />
							<BreadItem class="dark:text-true-gray-200" />
							<BreadItem class="dark:text-true-gray-200" />
						</Breadcrumb>
					</div>
					<div class="flex-1 text-right flex justify-end items-center pr-8">
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
						<ToggleMode class="mr-8" />
						<Translate />
					</div>
				</nav>
				<div class="file-main w-full pb-2 pl-6">
					<!-- <div
					ref="clickRef"
					class="file-body w-full h-full rounded-tl-3xl bg-white overflow-scroll overflow-x-hidden"
				> -->
					<v-contextmenu ref="contextmenu">
						<v-contextmenu-item>创建文件夹</v-contextmenu-item>
						<v-contextmenu-divider />
						<v-contextmenu-item>创建文件</v-contextmenu-item>
						<v-contextmenu-divider />
						<v-contextmenu-item>刷新</v-contextmenu-item>
					</v-contextmenu>

					<div
						class="
							file-body
							w-full
							h-full
							overflow-scroll overflow-x-hidden
							sun-scroll
							dark:bg-gray-700
							transition-colors
							rounded-tl-3xl
							bg-white
						"
						v-contextmenu:contextmenu
					>
						<FileTable />
					</div>
					<!-- <div class="relative z-3 table-container overflow-scroll overflow-x-hidden sun-scroll">
					<FileTable />
				</div>
				<div class="h-12"></div> -->
					<!-- </div> -->
				</div>
			</div>
		</n-notification-provider>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import LeftMenu from './main-cmp/LeftMenu.vue'
import FileTable from './main-cmp/FileTable.vue'
import { AliIcon, Translate, ToggleMode, Breadcrumb, BreadItem } from '/@/components/'
import { useFullscreen } from '@vueuse/core'
export interface NavItem {
	code?: string
	activeCode?: string
	key?: number
	active?: boolean | Ref<boolean>
	title?: string
	click?: (e: MouseEvent) => void
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
	},
	setup() {
		const fullRef = ref<HTMLDivElement | null>(null)!
		const { isFullscreen, exit } = useFullscreen(fullRef)

		const fileHistory: NavItem[] = [
			{
				code: 'left',
				key: 6,
			},
			{
				code: 'right',
				key: 7,
			},
		]

		return {
			fullRef,
			isFullscreen,
			fileHistory,
			BreadItem,
			exit,
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
.nav-btn {
	width: 2.5rem;
	border-radius: 9999px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5rem;
	&:hover {
		background-color: rgb(83, 77, 184);
		.icon {
			color: white;
		}
	}
}
// .table-container {
// 	max-height: calc(100% - 3rem);
// }
</style>
