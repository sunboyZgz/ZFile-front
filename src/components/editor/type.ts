import { StringLiteralUnion } from '/#/index'

export const codeModeType = [
	'javascript',
	'htmlmixed',
	'css',
	'php',
	'text/x-java',
	'markdown',
] as const

export type CodeModeType = StringLiteralUnion<typeof codeModeType[number]>
