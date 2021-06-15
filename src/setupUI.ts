import type { App } from 'vue'

// import { ElButton, ElSelect, ElInput, ElOption } from 'element-plus'
import { create, NButton, NConfigProvider, NDropdown } from 'naive-ui'
import { createTheme, buttonDark, dropdownDark } from 'naive-ui'
import 'vfonts/FiraCode.css'

// import { forEach } from './utils/common'

export function setupUI(app: App): void {
	const naive = create({
		components: [NButton, NConfigProvider, NDropdown],
	})
	app.use(naive)
}

export const darkTheme = createTheme([buttonDark, dropdownDark])
