import type { App } from 'vue'

// import { ElButton, ElSelect, ElInput, ElOption } from 'element-plus'
import {
	create,
	messageDark,
	NButton,
	NConfigProvider,
	NDropdown,
	NForm,
	NFormItem,
	NFormItemRow,
	NInput,
	NMessageProvider,
} from 'naive-ui'
//dark mode
import { createTheme, buttonDark, dropdownDark, formDark, inputDark } from 'naive-ui'
import 'vfonts/FiraCode.css'
import type { GlobalThemeOverrides } from 'naive-ui'
import formItemDark from 'naive-ui/lib/form/styles/dark'

// import { forEach } from './utils/common'

export function setupUI(app: App): void {
	const naive = create({
		components: [
			NButton,
			NConfigProvider,
			NDropdown,
			NForm,
			NFormItem,
			NInput,
			NMessageProvider,
			NFormItemRow,
		],
	})
	app.use(naive)
}

export const darkTheme = createTheme([
	buttonDark,
	dropdownDark,
	formDark,
	inputDark,
	formItemDark,
	messageDark,
])

//themeColor change
export const themeOverrides: GlobalThemeOverrides = {
	Input: {
		borderFocus: '1px solid rgb(107, 196, 255)',
	},
}
