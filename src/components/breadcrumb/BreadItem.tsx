import { defineComponent, onMounted, inject } from 'vue'
import { PREFIXER } from '/@/utils/env'
export default defineComponent({
	name: 'BreadItem',
	__SUN_BREADCRUMB_ITEM: true,
	setup() {
		const prefixer = `${PREFIXER}-breadcrumb-item`
		return () => {
			return <div class={[prefixer]}>bread_item</div>
		}
	},
})
