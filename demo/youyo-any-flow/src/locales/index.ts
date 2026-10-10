import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const LOCALE_KEY = 'youyo-flow-locale'

function getSavedLocale(): string {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
      return saved
    }
  } catch {}
  return 'zh-CN'
}

export const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export function setLocale(locale: string) {
  ;(i18n.global.locale as any).value = locale
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch {}
}

export function getLocale(): string {
  return (i18n.global.locale as any).value
}
