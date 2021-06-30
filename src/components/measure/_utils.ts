import { isObject, range } from '/@/utils/common'
export interface MeasureItemProps {
	level: number
	color: string
}

const isMenuItem = (item: any): item is MeasureItemProps => {
	if (!item.level || !item.color) {
		console.error("measure_item's level should be a object like {level: 1, color: red}")
		return false
	} else return true
}

/**
 * @description to check whether levels is OK
 */
const isLevelable = function (level: any) {
	if (Array.isArray(level) || !isObject(level)) {
		console.error("measure_item's level should be a object")
		return false
	}
	return isMenuItem(level)
}
/**
 * @description to get a Levels
 */
export const getLevel = function (levels: MeasureItemProps[] | number) {
	if (!levels) {
		console.error(`levels can't be empty`)
		return []
	}
	if (Array.isArray(levels)) {
		//here we can add some validate to force level ordered
		const isOK = levels.every(item => {
			return isLevelable(item)
		})
		if (isOK) return levels
		else return []
	} else {
		if (!Number.isInteger(levels)) {
			console.error('levels must be an Array or a number type')
			return []
		}
	}
	levels = makeLevels(levels)
	return levels
}
/**
 * @description use number to produce a levels
 */
export const makeLevels = function (levels: number): MeasureItemProps[] {
	const levelArr = range(levels, 1)!
	const len = levelArr.length
	const s1 = Math.floor(len / 3),
		s2 = -Math.floor(len / 3)
	const stag1 = levelArr.slice(0, s1)
	const stag2 = levelArr.slice(s1, s2)
	const stag3 = levelArr.slice(s2, len)
	const result = [...stagLevel1(stag1), ...stagLevel2(stag2), ...stagLevel3(stag3)]

	function rgbTemplate(r, g, b) {
		return `rgb(${r}, ${g}, ${b})`
	}
	function stagLevel1(stag: number[]): MeasureItemProps[] {
		return stag.map((item, index) => {
			return {
				level: item,
				color: rgbTemplate(255, (150 / stag.length) * index, 0),
			}
		})
	}
	function stagLevel2(stag: number[]): MeasureItemProps[] {
		return stag.map((item, index) => {
			return {
				level: item,
				color: rgbTemplate(255, 150 + (105 / stag.length) * index, 0),
			}
		})
	}
	function stagLevel3(stag: number[]): MeasureItemProps[] {
		const len = stag.length
		return stag.map((item, index) => {
			return {
				level: item,
				color: rgbTemplate((255 / len) * (len - index - 1), 255, 0),
			}
		})
	}
	return result
}
