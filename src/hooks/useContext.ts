import type { InjectionKey } from 'vue'
import { provide, reactive, inject, readonly as defineReadonly, watchEffect, ref, unref } from 'vue'
import { key as contextKey } from '/@/components/context/'
export interface CreateContextOptions {
	readonly?: boolean
}

export function createContext<T>(
	key: InjectionKey<T> = Symbol(),
	context: T,
	options: CreateContextOptions
): void {
	if (!context) {
		return
	}
	const { readonly = true } = options
	const state = reactive(context as unknown as object)
	const provideState = readonly ? defineReadonly(state) : state
	provide(key, provideState)
}

export function useContext<T>(key: InjectionKey<T>): T
export function useContext<T>(key: InjectionKey<T>, defaultValue?: T): T | {} {
	return inject(key, defaultValue ?? {})
}

/**
 * @description a easy hook with context-provider to watch window size
 * @returns Ref
 */
export function useSmallSize() {
	const isSmall = ref(false)
	const screenSize = inject(contextKey)
	//do watcheffect to resolve some problem with side effect
	watchEffect(() => {
		isSmall.value = unref(false || screenSize!.smallScreen)
	})
	return isSmall
}
