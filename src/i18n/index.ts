import { App } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import type { I18nOptions } from 'vue-i18n'
import type { I18TypeT } from '/#/i18n'
import zh from './locales/zh'
import en from './locales/en'

export let i18n: ReturnType<typeof createI18n>

export const messages = {
	zh,
	en,
}

export enum dropDropKeys {
	ZH = '1',
	EN = '2',
}

export const options = [
	{
		label: '中文',
		key: dropDropKeys.ZH,
	},
	{
		label: 'English',
		key: dropDropKeys.EN,
	},
]

export const useI18Select = locale => {
	return (key: string) => {
		if (key === dropDropKeys.ZH) {
			locale.value = 'zh'
		} else if (key === dropDropKeys.EN) {
			locale.value = 'en'
		}
	}
}

type Locales = typeof messages
type LocaleType = keyof Locales
type MessageType = Readonly<typeof messages['zh']>

const LOCALE: LocaleType = 'zh'
const FALLBACK: LocaleType = 'en'

export function createOptions(): I18nOptions {
	return {
		locale: LOCALE,
		fallbackLocale: FALLBACK,
		messages,
		silentTranslationWarn: true, // true - warning off
		missingWarn: false,
		silentFallbackWarn: true,
	}
}

export async function setupI18n(app: App): Promise<void> {
	const options = createOptions()
	i18n = createI18n(options)
	app.use(i18n)
}
//eslint-disable-next-line
export function useTypeI18n() {
	const i18Fn = useI18n()
	const myT: I18TypeT<MessageType> = i18Fn.t
	return {
		...i18Fn,
		t: myT,
	}
}
