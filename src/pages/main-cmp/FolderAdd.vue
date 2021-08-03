<template>
	<div>
		<input
			class="
				absolute
				z-1
				block
				w-full
				h-full
				outline-transparent
				border-transparent
				cursor-pointer
				overflow-hidden
				indent-3xl
			"
			type="file"
			:multiple="true"
			:title="t('table.leftnav.folder-add')"
			webkitdirectory
			ref="folderAddRef"
			@change="uploadFolder"
		/>
		<AliIcon
			class="relative icon dark:text-true-gray-200 !text-xl cursor-pointer"
			code="folder-add"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import { AliIcon } from '/@/components/'
import { isUsefulReq } from '/@/network/_utils'
import { uploadDir } from '/@/network/main'
import { useFileProgress, useDropBasePath } from './_utils'
import { useTypeI18n } from '/@/i18n/'
export default defineComponent({
	name: 'FolderAdd',
	components: {
		AliIcon,
	},
	setup() {
		const folderAddRef = ref<HTMLDivElement | null>(null)
		const message = useMessage()
		const store = useStore()
		const [start, change] = useFileProgress()
		const resultPath = useDropBasePath()
		const { t } = useTypeI18n()
		let id = 0
		const filesMap = new Map()
		/**
		 * @description upload files in whole folder
		 */
		const uploadFolder = e => {
			id++
			const folderRef = ref()
			filesMap.set(id, folderRef)
			let formData: FormData | null = new FormData()
			const files = e.target?.files
			let count = 0
			for (let i = 0; i < files.length; i++) {
				if (files[i].size !== 0) {
					formData.append('files', files[i], files[i].webkitRelativePath.split('/').join('!'))
				} else {
					count++
				}
			}
			if (count) {
				message.warning(`${count} file(s)' size equal '0'`)
			}
			start(0, folderRef, `folders progress ${id}`)
			let timers
			uploadDir(folderRef, formData, resultPath.value, change)
				.then(({ status }) => {
					if (isUsefulReq(status)) {
						store.dispatch('fileSys/checkDirAction', resultPath.value)
						change(100, { autoClose: true }, folderRef)
						timers = setTimeout(() => {
							clearTimeout(timers)
							timers = null
							if (folderRef.value) {
								folderRef.value?.destroy()
								filesMap.delete(id)
							}
						}, 3000)
					}
				})
				.catch(() => {
					if (folderRef.value) {
						folderRef.value?.destroy()
						filesMap.delete(id)
					}
				})
				.finally(() => {
					e.target.value = ''
					formData = null
				})
		}

		return {
			folderAddRef,
			uploadFolder,
			t,
		}
	},
})
</script>

<style></style>
