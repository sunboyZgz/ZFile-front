import { watch, h, Ref, ref } from 'vue'
import { useNotification, NProgress, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { StringLiteralUnion } from '/#/index'
import { dropBaseUrl } from '/@/router/_utils'
import { CodeModeType } from '/@/components/editor/type'
import { signOut } from '/@/network/main'
import { isUsefulReq } from '/@/network/_utils'
export interface NoticeProps {
	duration?: number
	autoClose?: boolean
}

export const fileType = [
	'bash_logout',
	'bash_profile',
	'bashrc',
	'java',
	'apk',
	'xls',
	'excel',
	'txt',
	'unknow',
	'shell',
	'debianos',
	'avi',
	'doc',
	'jpg',
	'mp3',
	'mp4',
	'png',
	'psd',
	'rar',
	'zip',
	'md',
	'css',
	'html',
	'rpm',
	'jar',
	'less',
	'Directory',
	'exe',
	'ppt',
	'word',
	'cs',
	'app',
	'cpp',
	'rb',
	'py',
	'r',
	'oc',
	'rs',
	'go',
	'sql',
	'scala',
	'swift',
	'js',
] as const
export type FileType = StringLiteralUnion<typeof fileType[number]>
export function useFileProgress() {
	const notification = useNotification()
	// const message = useMessage()
	const start = (percentage = 0, folderRef: Ref<any>, title?: string) => {
		folderRef.value = notification.info({
			title,
			content: () =>
				h(NProgress, {
					type: 'line',
					percentage: percentage,
					'indicator-placement': 'inside',
					processing: true,
				}),
			onClose: () => {
				folderRef.value = null
			},
		})
	}
	const change = (percentage = 0, options: NoticeProps = {}, folderRef: Ref<any>) => {
		const { autoClose = false, duration = 3000 } = options
		if (folderRef.value) {
			folderRef.value.content = () =>
				h(NProgress, {
					type: 'line',
					percentage: percentage,
					'indicator-placement': 'inside',
					processing: percentage === 100 ? false : true,
				})
			folderRef.value.meta = autoClose ? `close after ${duration / 1000}s` : undefined
		}
	}
	return [start, change] as [typeof start, typeof change]
}

/**
 * @description can use to replace dropBaseUrl(router.currentRoute.value.path)
 */
export function useDropBasePath() {
	const { currentRoute } = useRouter()
	const result = ref(currentRoute.value.path)
	watch(
		() => currentRoute.value,
		() => {
			result.value = dropBaseUrl(currentRoute.value.path)
		},
		{
			immediate: true,
		}
	)
	return result
}

/**
 * @description signout feature
 */
export const useSignout = () => {
	const router = useRouter()
	const message = useMessage()
	return async () => {
		const { status, message: text } = await signOut()
		if (isUsefulReq(status)) {
			router.push('/login')
		} else {
			message.error(text as string)
			router.push('/login')
		}
	}
}

export const map = new Map<FileType, CodeModeType>()
map.set('js', 'javascript')
map.set('php', 'php')
map.set('html', 'htmlmixed')
map.set('css', 'css')
map.set('java', 'text/x-java')
map.set('md', 'markdown')
/**
 * @description use the ext of filename sush as .ts to decide the mode of file, now don't consider the .d.ts
 */
export const getFileMode = (filename: string) => {
	const lastIndex = filename.lastIndexOf('.')
	const str = lastIndex > -1 ? filename.slice(lastIndex + 1) : ''
	return map.has(str) ? (map.get(str) as string) : ''
}
