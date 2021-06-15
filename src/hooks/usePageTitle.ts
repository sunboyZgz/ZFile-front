import { unref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { REDIRECT_NAME } from '/@/router/constants'
import { getAppInfo } from '/@/utils/env'

export function usePageTitle(): void {
	const { VITE_GLOB_APP_NAME: title } = getAppInfo()
	const { currentRoute } = useRouter()
	const { t } = useI18n()
	const pageTitle = useTitle()
	watch(
		() => currentRoute.value.path,
		() => {
			const route = unref(currentRoute)
			if (route.name === REDIRECT_NAME) return
			const tTitle = t(route?.meta?.title as string)
			pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
		},
		{ immediate: true }
	)
}
