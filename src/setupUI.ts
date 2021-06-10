import type { App } from 'vue'

import { ElButton } from 'element-plus'
import { forEach } from './utils/common'

export function setupElm(app: App) {
	const CmpArr = [ElButton]
	forEach(CmpArr, item => {
		app.use(item)
	})
}
