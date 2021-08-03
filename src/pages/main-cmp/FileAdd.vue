<template>
	<div>
		<input
			class="absolute z-1 block w-full h-full cursor-pointer overflow-hidden indent-3xl"
			type="file"
			:multiple="true"
			:title="t('table.leftnav.file-add')"
			ref="fileAddRef"
			@change="uploadFiles"
		/>
		<AliIcon
			class="relative icon dark:text-true-gray-200 !text-xl cursor-pointer"
			code="file-add"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { AliIcon } from '/@/components/'
import { isUsefulReq } from '/@/network/_utils'
import { uploadDir } from '/@/network/main'
import { useFileProgress, useDropBasePath } from './_utils'
import { useTypeI18n } from '/@/i18n/'
export default defineComponent({
	name: 'FileAdd',
	components: {
		AliIcon,
	},
	setup() {
		const fileAddRef = ref<HTMLDivElement | null>(null)
		const message = useMessage()
		let id = 0
		const filesMap = new Map()
		const resultPath = useDropBasePath()
		const store = useStore()
		const [start, change] = useFileProgress()
		const { t } = useTypeI18n()
		const uploadFiles = e => {
			id++
			const fileRef = ref()
			filesMap.set(id, fileRef)
			let formData: FormData | null = new FormData()
			const files = e.target?.files
			let count = 0
			for (let i = 0; i < files.length; i++) {
				if (files[i].size !== 0) {
					formData.append('files', files[i])
				} else {
					count++
				}
			}
			if (count) {
				message.warning(`${count} file(s)' size equal '0'`)
			}
			start(0, fileRef, `file progress ${id}`)
			let timers
			uploadDir(fileRef, formData, resultPath.value, change)
				.then(({ status }) => {
					if (isUsefulReq(status)) {
						store.dispatch('fileSys/checkDirAction', resultPath.value)
						change(100, { autoClose: true }, fileRef)
						timers = setTimeout(() => {
							clearTimeout(timers)
							timers = null
							if (fileRef.value) {
								fileRef.value?.destroy()
								filesMap.delete(id)
							}
						}, 3000)
					} else {
						message.error('未知异常')
						if (fileRef.value) {
							fileRef.value?.destroy()
							filesMap.delete(id)
						}
					}
				})
				.catch(() => {
					message.error('请求异常')
					if (fileRef.value) {
						fileRef.value?.destroy()
						filesMap.delete(id)
					}
				})
				.finally(() => {
					e.target.value = ''
					formData = null
				})
		}
		return {
			fileAddRef,
			uploadFiles,
			t,
		}
	},
})
</script>

<style></style>
