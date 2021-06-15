import { watchEffect, Ref } from 'vue'

export function useThemeMode(isDark: Ref<boolean>): void {
	watchEffect(() => {
		const html = document.getElementsByTagName('html')[0]
		if (isDark.value === true) {
			if (html.classList.contains('dark')) return
			else html.classList.add('dark')
		} else {
			if (!html.classList.contains('dark')) return
			else {
				html.classList.remove('dark')
			}
		}
	})
}
