export type handleClick = (payload: MouseEvent, ...args: any[]) => void
export type normalFn = (...args: any[]) => void
export interface Fn<T = any, R = T> {
	(...arg: T[]): R
}

export type MergeShallow<T = Record<string, any>, V = Record<string, any>> = {
	[K in keyof V | keyof T]: K extends keyof V ? Exclude<V[K], undefined> : Exclude<T[K], undefined>
}

export type StringLiteralUnion<T extends U, U = string> = T | (U & {})
