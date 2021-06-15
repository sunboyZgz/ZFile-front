import { reactive, Ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { unrefDom } from '/@/utils/common'

//eslint-disable-next-line
export function useResize(ref?: Ref<HTMLElement>) {
	const dom = unrefDom(ref)
	const screenSize = reactive([0, 0])
	const resizeObserver = new ResizeObserver(elms => {
		const target = elms && elms[0]
		screenSize[0] = target.contentRect.width
		screenSize[1] = target.contentRect.height
	})

	onMounted(() => {
		resizeObserver.observe(dom)
	})
	onBeforeUnmount(() => {
		resizeObserver.disconnect()
	})
	return screenSize
}
