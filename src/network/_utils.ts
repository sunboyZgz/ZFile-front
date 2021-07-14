import { normalFn } from '/#/index'
import { Shedule } from './main'

export interface NormalRes {
	details: string
	info: string
	message: string | Recordable | boolean
	path: string
	status: number
}

export const isUsefulReq = (status: string | number) => {
	status = Number(status)
	return status >= 200 && status < 300
}

export interface Progress {
	start?: normalFn
	pendding?: (schedule?: number) => any
	completed?: (message?: Shedule) => any
	errorFn?: normalFn
}
