import { isObject } from '/@/utils/common'
import { VNodeTypes } from 'vue'
export const getPropSlots = (slots, props, prop = 'default') => {
	return slots[prop]?.() ?? props[prop]
}
/**
 * @param vnodes pass a vnode list
 * @returns
 */
export const cleanComments = (vnodes: any[], type: string) => {
	const arr: any[] = []
	for (let i = 0; i < vnodes.length; i++) {
		if (vnodes[i].type[type]) {
			arr.push(vnodes[i])
		}
	}
	return arr
}
/**
 * @param type your DIY element sign
 * @returns
 */
export const checkItem = (vnodes: any[], type: string) => {
	return vnodes.every(element => {
		return element.__v_isVNode && element.type[type]
	})
}
/**
 * @param separator a vnode separator
 * @returns
 */
export const concatItem = <T>(vnodes: T[], separator: any) => {
	const arr: T[] = []
	let head
	if (!Array.isArray(vnodes)) {
		if (!isObject(vnodes)) {
			console.error('breadItem vnode error')
			return []
		}
		vnodes = [vnodes]
	}
	vnodes = vnodes.slice()
	head = vnodes.shift()
	arr.push(head)
	while (vnodes.length) {
		arr.push(separator)
		head = vnodes.shift()
		arr.push(head)
	}
	return arr
}
