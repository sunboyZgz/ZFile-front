import type { Ref, InjectionKey } from 'vue'
interface ContextOptions {
	smallScreen: Ref<boolean>
}
export const key: InjectionKey<ContextOptions> = Symbol('context')
