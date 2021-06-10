import zh from '/@/i18n/locales/zh'
/**
 * @description 这是一个我想实现的效果但是vue-i18n的messages的类型我实在没有更好的方式匹配上
export type I18Path<T> = {
	readonly [K in keyof T]: T[K] extends string
		? K
		: T[K] extends any[]
		? `${K & string}.${ArrayToUnion<T[K]> & string}`
		: T[K] extends object
		? `${K & string}.${I18Path<T[K]>}`
		: never
}[keyof T & string]
*/
export type I18Path<T> = {
	readonly [K in keyof T]: T[K] extends string
		? K
		: T[K] extends any[]
		? `${K & string}.index`
		: T[K] extends object
		? `${K & string}.${I18Path<T[K]>}`
		: never
}[keyof T & string]

export type ArrayToUnion<T extends readonly any[]> = Exclude<
	keyof T,
	keyof any[]
>

/**
 * @description 折中考虑后实现一个较为模糊的数组提示
 */
export type I18TypeT<T> = (path: I18Path<T> | (string & {})) => string

export type parseArr<T extends any[]> = T extends [
	infer A,
	...infer B
]
	? Exclude<keyof T, keyof any[]>
	: never

export type I18Message = typeof zh
