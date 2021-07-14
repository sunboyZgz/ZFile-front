import { defineComponent } from 'vue'
import { PREFIXER } from '/@/utils/env'
import { getPropSlots } from '/@/components/utils'
export default defineComponent({
	name: 'BreadItem',
	__SUN_BREADCRUMB_ITEM: true,
	setup(props: any, { slots }) {
		const prefixer = `${PREFIXER}-breadcrumb-item`
		// console.log('props', slots)
		return () => {
			const vnode = getPropSlots(slots, props)
			return <div class={[prefixer]}>{vnode}</div>
		}
	},
})
