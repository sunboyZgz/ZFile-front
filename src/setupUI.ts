import type { App } from 'vue'
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

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
	NDataTable,
	NNotificationProvider,
} from 'naive-ui'
//dark mode
import {
	createTheme,
	buttonDark,
	dropdownDark,
	formDark,
	inputDark,
	dataTableDark,
	notificationDark,
} from 'naive-ui'
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
			NDataTable,
			NNotificationProvider,
		],
	})
	app.use(naive)
	app.use(contextmenu)
}

export const darkTheme = createTheme([
	buttonDark,
	dropdownDark,
	formDark,
	inputDark,
	formItemDark,
	messageDark,
	dataTableDark,
	notificationDark,
])

//themeColor change
export const themeOverrides: GlobalThemeOverrides = {
	Input: {
		borderFocus: '1px solid rgb(107, 196, 255)',
	},
}
