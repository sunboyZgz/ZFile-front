import {
	defineComponent,
	onMounted,
	nextTick,
	InjectionKey,
	PropType,
	ref,
	h,
	createVNode,
} from 'vue'
import './index.scss'
import { getPropSlots, cleanComments, checkItem, concatItem } from '../utils'
import { isObject } from '/@/utils/common'
import { PREFIXER } from '/@/utils/env'
import { createContext } from '/@/hooks/useContext'

const breadProps = {
	separator: {
		type: String,
		default: '/',
	},
}

export default defineComponent({
	name: 'Breadcrumb',
	props: breadProps,
	slots: ['separator'],
	setup(props, { slots }) {
		const prefixer = `${PREFIXER}-breadcrumb`
		const showSlots = ref(true)
		// createContext(key, { items: [] }, { readonly: false })
		let vnode = getPropSlots(slots, props)
		vnode = cleanComments(vnode, '__SUN_BREADCRUMB_ITEM')
		// console.log('vnode', vnode)
		if (!checkItem(vnode, '__SUN_BREADCRUMB_ITEM')) {
			console.error('breadcrumb can only wrap breaditem')
			showSlots.value = false
			return () => {}
		}
		let s = getPropSlots(slots, props, 'separator')[0]
		typeof s === 'string' &&
			(s = createVNode(
				'span',
				{
					class: `${prefixer}-separator dark:text-white`,
				},
				s
			))
		// console.log('s:', s)
		const items = concatItem(vnode, s)
		// console.log('items:', items)

		return () => {
			return <div class={[prefixer]}>{items}</div>
		}
	},
})
