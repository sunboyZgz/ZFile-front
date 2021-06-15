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
function unrefDom(ref?: any) {
	if (!ref) return document.documentElement
	return isRef(ref) ? unref(ref) : ref
}
export { forEach, isObject, noop, unrefDom }
