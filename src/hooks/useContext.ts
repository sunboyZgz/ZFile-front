import type { InjectionKey } from 'vue'
import { provide, reactive, inject, readonly as defineReadonly } from 'vue'

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
