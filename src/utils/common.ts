import { isRef, unref } from 'vue'
type CbOfEach<T = any> = (item: T, index: number, arr: T[]) => void

const forEach = <T>(arr: T[], callback: CbOfEach<T>): void => {
	arr.forEach(callback)
}

const isObject = (target: any): boolean => {
	return Object.prototype.toString.call(target) === '[object Object]'
}
//eslint-disable-next-line
const noop = () => {}

/**
 *
 * @param ref a vue3 ref dom
 * @description wrap unref to dom
 */
//eslint-disable-next-line
const unrefDom = (ref?: any) => {
	if (!ref) return document.documentElement
	return isRef(ref) ? unref(ref) : ref
}

const range = (len: number, start = 0) => {
	const reallen = len - start + 1

	if (reallen <= 0) {
		console.warn(`'start' should not to be greater then 'len'`)
		return
	}
	const rangeArr: number[] = new Array(reallen)
	let index = 0
	while (index < reallen) {
		rangeArr[index] = index++ + start
	}
	return rangeArr
}

export { forEach, isObject, noop, unrefDom, range }
