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
	NModal,
	NSpin,
	NDrawer,
	NDrawerContent,
	NCheckbox,
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
	progressDark,
	modalDark,
	spinDark,
	drawerDark,
	checkboxDark,
} from 'naive-ui'
import 'vfonts/FiraCode.css'
import type { GlobalThemeOverrides } from 'naive-ui'
import formItemDark from 'naive-ui/lib/form/styles/dark'

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
			NModal,
			NSpin,
			NDrawer,
			NDrawerContent,
			NCheckbox,
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
	progressDark,
	modalDark,
	spinDark,
	drawerDark,
	checkboxDark,
])

//themeColor change
export const themeOverrides: GlobalThemeOverrides = {
	Input: {
		borderFocus: '1px solid rgb(107, 196, 255)',
	},
	Spin: {},
}
