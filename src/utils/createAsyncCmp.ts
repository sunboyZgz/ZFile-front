import { defineAsyncComponent } from 'vue'
import type { Fn } from '/#/index'
interface Options {
	// size?: 'default' | 'small' | 'large'
	// loading?: boolean
	delay?: number
	timeout?: number
	retry?: boolean
}

export const createAsyncComponent = (loader: Fn, options: Options = {}) => {
	const { timeout = 30000 } = options
	return defineAsyncComponent({
		loader,
		timeout,
	})
}
