import ProgressBox from './ProgressBox.vue'

type ProgressFormData = FormData | null
export class ProgressItem {
	private name: string
	private size: string
	public stat: boolean
	private formData: ProgressFormData
	constructor(name = '未命名', size = '0b', formData: ProgressFormData = null) {
		this.name = name
		this.size = size
		this.stat = false
		this.formData = formData
	}
	getName() {
		return this.name
	}
	getSize() {
		return this.size
	}
	getFormData() {
		return this.formData
	}
	// getStat() {
	// 	return this.stat
	// }
	// setStat(newStat: boolean) {
	// 	this.stat = newStat
	// 	return this
	// }
}

export default ProgressBox
