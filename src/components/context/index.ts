import { InjectionKey, Ref } from 'vue'

export interface AppProviderContextProps {
	prefixCls: Ref<string>
	isMobile: Ref<boolean>
}

export const key: InjectionKey<AppProviderContextProps> = Symbol()
