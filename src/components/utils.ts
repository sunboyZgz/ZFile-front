import { isObject } from '/@/utils/common'
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
		} else if (vnodes[i].children && Array.isArray(vnodes[i].children)) {
			const ok = vnodes[i].children.every(item => {
				return item.type[type]
			})
			if (ok) {
				arr.push(vnodes[i])
			}
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
/**
 * @description easy smooth the vnode.children
 */
export const easySmooth = (vnode: any[]) => {
	const arr: any[] = []
	for (let i = 0; i < vnode.length; i++) {
		if (vnode[i].children) {
			arr.push(...vnode[i].children)
		} else {
			arr.push(vnode)
		}
	}
	return arr
}

/**
 * @description to support teleport built-in component
 */
export const toBody = (dom: HTMLElement, id: string) => {
	dom.id = id
	document.body.appendChild(dom)
}
