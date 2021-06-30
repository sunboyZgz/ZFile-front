<template>
	<div>
		<a :href="github" class="block relative left-2">
			<img src="../../assets/logo.png" class="w-20" />
		</a>
		<Menu :mode="MenuMode.VERTICAL" class="ml-6 mt-8">
			<MenuItem v-for="item in navItems" :key="item.key" :title="item.title" :onclick="item.click">
				<div class="nav-btn">
					<AliIcon class="icon dark:text-true-gray-200 !text-xl" :code="item.code" />
				</div>
			</MenuItem>
			<MenuItem>
				<div class="nav-btn relative overflow-hidden">
					<input
						class="absolute z-1 block h-full bg-transparent text-transparent cursor-pointer"
						type="file"
						multiple
						title="folder-add"
						webkitdirectory
						ref="folderAddRef"
						@change="uploadFolder"
					/>
					<AliIcon class="relative icon dark:text-true-gray-200 !text-xl" code="folder-add" /></div
			></MenuItem>
		</Menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, onMounted, onUnmounted } from 'vue'
import { Menu, MenuItem, AliIcon } from '/@/components/'
import { MenuMode } from '/@/components/easy-menu/_utils'
import { useFullscreen } from '@vueuse/core'
import { uploadDir, showUpload } from '/@/network/main'
import { useNotification } from 'naive-ui'

const github = import.meta.env.VITE_GITHUB
export interface NavItem {
	code?: string
	activeCode?: string
	key?: number
	active?: boolean | Ref<boolean>
	title?: string
	click?: (e: MouseEvent) => void
}

export default defineComponent({
	name: 'LeftMenu',
	components: {
		Menu,
		MenuItem,
		AliIcon,
	},
	props: {
		ref: {
			type: Object as PropType<HTMLDivElement>,
			default: null,
		},
	},
	setup(props) {
		const { isFullscreen, enter } = useFullscreen(props.ref)
		const folderAddRef = ref<HTMLDivElement | null>(null)
		const notification = useNotification()
		const navItems: NavItem[] = [
			{
				code: 'quanping',
				activeCode: 'xiaoping',
				active: isFullscreen,
				key: 1,
				title: 'fullscreen',
				click: () => {
					enter()
				},
			},
			{
				code: 'file-add',
				key: 3,
				title: 'file add',
			},
			{
				code: 'xiazai',
				key: 4,
				title: 'download',
			},
			{
				code: 'lianjie',
				key: 5,
				title: 'link',
			},
		]
		const start = () => {
			notification.info({
				content: 'progress',
				meta: '想不出来',
			})
		}
		const uploadFolder = async e => {
			let formData = new FormData()
			console.log(e)
			const files = e.target?.files
			// console.log(files)
			for (let i = 0; i < files.length; i++) {
				formData.append('files', files[i], files[i].webkitRelativePath)
			}
			start()
			// uploadDir(formData)
			// await showUpload({
			// 	start,
			// })
			e.target.files = {}
			// console.log('formData', formData)
		}
		onMounted(() => {
			folderAddRef.value?.addEventListener('change', uploadFolder)
		})
		onUnmounted(() => {
			folderAddRef.value?.removeEventListener('change', uploadFolder)
		})
		return {
			MenuMode,
			navItems,
			github,
			folderAddRef,
			uploadFolder,
		}
	},
})
</script>

<style></style>
