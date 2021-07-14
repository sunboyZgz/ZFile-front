<template>
	<n-modal :show="showModal">
		<n-spin class="bg-transparent text-blue-400 shadow-none" size="large" />
	</n-modal>
	<!-- file editor -->
	<teleport to="#sun-cm">
		<div class="mask" v-show="editorInfo.isShow"></div>
		<Editor
			v-model:active="editorInfo.isShow"
			v-model:editor-value="editorInfo.editorValue"
			:file-title="editorInfo.fileTitle"
			:mode="editorInfo.mode"
			v-if="editorInfo.isShow"
		/>
	</teleport>
	<!-- table header right click -->
	<v-contextmenu ref="controlRef">
		<v-contextmenu-item
			class="text-center"
			@click="
				() => {
					mkdir('Directory')
				}
			"
			>新建文件夹</v-contextmenu-item
		>
		<v-contextmenu-divider />
		<v-contextmenu-item
			class="text-center"
			@click="
				() => {
					mkdir()
				}
			"
			>新建文件</v-contextmenu-item
		>
		<v-contextmenu-divider />
		<v-contextmenu-item class="text-center" @click="refresh">刷新</v-contextmenu-item>
	</v-contextmenu>
	<!-- table item right click-->
	<v-contextmenu ref="menuRef">
		<v-contextmenu-item class="text-center" @click="openDir">打开</v-contextmenu-item>
		<v-contextmenu-divider />
		<v-contextmenu-item class="text-center" @click="deleteDir">删除</v-contextmenu-item>
		<v-contextmenu-divider />
		<v-contextmenu-item class="text-center" @click="downLoad">下载</v-contextmenu-item>
		<v-contextmenu-divider />
		<v-contextmenu-item class="text-center">生成直链</v-contextmenu-item>
	</v-contextmenu>
	<div class="file-table" :class="$attrs.class">
		<div
			class="
				file-table-head
				text-warm-gray-400
				dark:text-light
				border-b-[0.5px] border-gray-200
				dark:border-gray-400
				text-md
				font-semibold
			"
			@contextmenu="
				e => {
					controlHide(e)
					mkInfoRef.isTop = true
				}
			"
			@click="hideClick"
		>
			<div class="head-name pl-12 hover:bg-blue-50 dark:hover:bg-blue-gray-600">
				{{ t('tablle.header.name') }}
			</div>
			<div class="head-time hidden lg:block indent-sm hover:bg-blue-50 dark:hover:bg-blue-gray-600">
				{{ t('tablle.header.time') }}
			</div>
			<div class="head-size indent-sm hover:bg-blue-50 dark:hover:bg-blue-gray-600">
				{{ t('tablle.header.size') }}
			</div>
		</div>
		<div class="file-table-items h-full overflow-scroll overflow-x-hidden sun-scroll">
			<FileTableItem
				v-if="mkInfoRef.active && mkInfoRef.isTop"
				:is-focus="true"
				:on-blur="blurToMkpath"
				:file-info="fileInfoRef"
				v-model="fileInfoRef.fileName"
			/>
			<FileTableItem
				v-for="(item, index) in fileList"
				:key="item.id"
				:file-info="item"
				:class="{
					'!bg-blue-50 !dark:bg-blue-gray-700': activeRef && curFileRef === index,
				}"
				@contextmenu="
					e => {
						fileRefHide(e, index)
					}
				"
				@click="
					e => {
						hideClick(e, index)
					}
				"
			/>
			<FileTableItem
				v-if="mkInfoRef.active && !mkInfoRef.isTop"
				:is-focus="true"
				:on-blur="blurToMkpath"
				:file-info="fileInfoRef"
				v-model="fileInfoRef.fileName"
			/>
			<div
				class="h-full bg-light-50 dark:bg-blue-gray-600 transition-colors"
				@contextmenu="
					e => {
						controlHide(e)
						mkInfoRef.isTop = false
					}
				"
				@click="hideClick"
			></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onUnmounted, onMounted, reactive, watchEffect } from 'vue'
import FileTableItem from './FileTableItem.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useTypeI18n } from '/@/i18n/'
import { useMessage } from 'naive-ui'
import type { fileDetail } from '/@/store/modules/fileSys'
import { makeEndofSlash, dropBaseUrl } from '/@/router/_utils'
import { downLoadFile, read } from '/@/network/main'
import { getFileMode } from './_utils'
import type { FileType } from './_utils'
import { Editor } from '/@/components/'
import { toBody } from '/@/components/utils'
import { isUsefulReq } from '/@/network/_utils'
import { CodeModeType } from '/@/components/editor/type'

toBody(document.createElement('div'), 'sun-cm')
const audioReg = /^.*\.(png|jpe?g|webp|gif)$/
interface EditerReactive {
	mode: `text/${CodeModeType}`
	editorValue: string
	fileTitle: string
	isShow: boolean
}
export default defineComponent({
	name: 'FileTable',
	components: {
		FileTableItem,
		Editor,
	},
	inheritAttrs: false,
	props: {
		fileList: {
			type: Array as PropType<Required<fileDetail>[]>,
			default: null,
		},
	},
	setup(props) {
		const menuRef = ref()
		const controlRef = ref() //table header control dom
		const store = useStore()
		const { t } = useTypeI18n()
		const router = useRouter()
		const curFileRef = ref(-9999)
		const activeRef = ref(false) //control active item row
		const fileInfoRef = reactive<Partial<fileDetail>>({})
		const mkInfoRef = reactive({ active: false, isTop: true }) //control mk a new file or dir
		const editorInfo = reactive<EditerReactive>({
			//combine all editor ref
			editorValue: '',
			mode: '',
			fileTitle: '',
			isShow: false,
		})
		const message = useMessage()
		const showModal = ref(false)
		const controlHide = (e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			if (controlRef.value) {
				controlRef.value.show({
					top: e.y,
					left: e.x,
				})
			}
			if (menuRef.value) {
				menuRef.value.hide()
			}
		}
		const fileRefHide = (e: MouseEvent, index: number) => {
			e.preventDefault()
			e.stopPropagation()
			if (menuRef.value) {
				menuRef.value.show({
					top: e.y,
					left: e.x,
				})
			}
			if (controlRef.value) {
				controlRef.value.hide()
			}
			curFileRef.value = index
			activeRef.value = true
		}
		const hideClick = (e: MouseEvent, index?: number) => {
			if (menuRef.value) {
				menuRef.value.hide()
			}
			if (controlRef.value) {
				controlRef.value.hide()
			}
			activeRef.value = false
			if (Number.isInteger(index) || index) {
				curFileRef.value = index!
				const curFile = props.fileList && props.fileList[index!]
				if (curFile.fileType === 'Directory') {
					router.push(makeEndofSlash(router.currentRoute.value.fullPath) + curFile.fileName)
				} else if (audioReg.test(curFile.fileName!)) {
					console.log('audio')
				} else {
					readFile()
					editorInfo.isShow = true
				}
			}
		}
		const readFile = async () => {
			const curFile = props.fileList && props.fileList[curFileRef.value]
			if (curFile.fileType === 'Directory') {
				message.warning('can not read the directory')
				return
			}
			const path = dropBaseUrl(router.currentRoute.value.path) + curFile.fileName
			editorInfo.fileTitle = curFile.fileName || ''
			showModal.value = true
			const { message: text } = await read(path)
			showModal.value = false
			editorInfo.editorValue = text as string
			editorInfo.mode = getFileMode(curFile.fileName)
		}
		const openDir = () => {
			const curFile = props.fileList && props.fileList[curFileRef.value]
			if (curFile.fileType === 'Directory') {
				router.push(makeEndofSlash(router.currentRoute.value.fullPath) + curFile.fileName)
			} else if (audioReg.test(curFile.fileName!)) {
				console.log('audio')
			} else {
				readFile()
				editorInfo.isShow = true
			}
		}
		const downLoad = async () => {
			console.log('====== download start ===============')
			const curFile = props.fileList && props.fileList[curFileRef.value]
			if (curFile.fileType === 'Directory') return
			const result = await downLoadFile(
				dropBaseUrl(router.currentRoute.value.path) + curFile.fileName
			)
			let aTag: null | HTMLAnchorElement = document.createElement('a')
			aTag.href = URL.createObjectURL(result)
			aTag.download = curFile?.fileName as string
			aTag.click()
			aTag = null
		}
		const mkdir = (type?: FileType) => {
			mkInfoRef.active = true
			fileInfoRef.fileName = type === 'Directory' ? '新建文件夹' : '新建文件'
			if (!type) {
				type = 'unknow'
			}
			fileInfoRef.fileType = type
		}

		const blurToMkpath = () => {
			mkInfoRef.active = false
			if (fileInfoRef.fileName === '') return
			if (fileInfoRef.fileType === 'Directory') {
				store.dispatch('fileSys/mkdirAction', {
					address: dropBaseUrl(router.currentRoute.value.path),
					fileName: fileInfoRef.fileName,
				})
			} else {
				store.dispatch('fileSys/mkfileAction', {
					address: dropBaseUrl(router.currentRoute.value.path),
					fileName: fileInfoRef.fileName,
				})
			}
		}

		const deleteDir = async () => {
			const curFile = props.fileList && props.fileList[curFileRef.value]
			const isOk = await store.dispatch('fileSys/removeAction', {
				removePath: dropBaseUrl(router.currentRoute.value.path),
				removeName: curFile.fileName,
			})
			if (isOk) {
				message.success(`delete '${curFile.fileName}' success!`)
			} else {
				message.error('network error')
			}
		}
		const refresh = async () => {
			showModal.value = true
			const [status, messageInfo] = await store
				.dispatch('fileSys/checkDirAction', dropBaseUrl(router.currentRoute.value.path))
				.catch(err => {
					console.error(err)
					message.error(messageInfo)
				})
				.finally(() => {
					showModal.value = false
				})
			if (isUsefulReq(status)) {
				message.success('refresh success')
			}
		}
		onMounted(() => {
			document.addEventListener('click', hideClick)
			document.addEventListener('contextmenu', hideClick)
		})
		onUnmounted(() => {
			document.removeEventListener('click', hideClick)
			document.removeEventListener('contextmenu', hideClick)
		})
		watchEffect(() => {
			if (mkInfoRef.active) {
				const filename = fileInfoRef.fileName
				let type = 'unknow'
				if (filename && fileInfoRef.fileType !== 'Directory') {
					if (/.*\..*/.test(filename)) {
						const nameArr = filename.split('.')
						type = nameArr[nameArr.length - 1]
					}
					fileInfoRef.fileType = type
				}
			}
		})
		return {
			menuRef,
			controlRef,
			controlHide,
			fileRefHide,
			hideClick,
			openDir,
			downLoad,
			t,
			activeRef,
			curFileRef,
			mkdir,
			deleteDir,
			fileInfoRef,
			mkInfoRef,
			blurToMkpath,
			showModal,
			refresh,
			editorInfo,
		}
	},
})
</script>

<style lang="scss">
@import '../../components/style/base';

.file-table-head {
	transition: background-color 0.3s ease-in-out;
	height: 3rem;
	display: flex;
	align-items: center;
	text-align: left;
	overflow: hidden;
	.head-name,
	.head-time,
	.head-size {
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
		height: 100%;
		line-height: 3rem;
	}

	.head-name {
		flex: 8;
	}
	.head-time {
		min-width: 7rem;
		flex: 3;
	}
	.head-size {
		min-width: 6rem;
		flex: 3;
	}
}
.file-table-items {
	height: calc(100vh - 7.5rem);
}
</style>
