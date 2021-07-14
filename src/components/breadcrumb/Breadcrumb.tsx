import { defineComponent, ref } from 'vue'
import './index.scss'
import { getPropSlots, cleanComments, checkItem, easySmooth } from '../utils'
import { PREFIXER } from '/@/utils/env'

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
		return () => {
			let vnode = getPropSlots(slots, props)

			vnode = cleanComments(vnode, '__SUN_BREADCRUMB_ITEM')
			vnode = easySmooth(vnode)
			if (!checkItem(vnode, '__SUN_BREADCRUMB_ITEM')) {
				console.error('breadcrumb can only wrap breaditem')
				showSlots.value = false
				return () => {}
			}
			const s = getPropSlots(slots, props, 'separator')[0]

			const renderSeparator = () => {
				return typeof s === 'string' ? <span class='dark:text-gray-400'>{s}</span> : s
			}
			return (
				<div class={[prefixer]}>
					{vnode.map((element, index) => {
						if (index < vnode.length - 1) {
							return (
								<>
									{element}
									{renderSeparator()}
								</>
							)
						} else {
							return <>{element}</>
						}
					})}
				</div>
			)
		}
	},
})
