import { PropType } from 'vue'

export enum MenuMode {
	VERTICAL = 'vertical',
	HORIZONTAL = 'horizontal',
}

export const menuOptions = {
	mode: {
		type: String as PropType<MenuMode>,
		default: MenuMode.HORIZONTAL,
	},
}
