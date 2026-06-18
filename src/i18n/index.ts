import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import en from './locales/en'
import es from './locales/es'
import wordsEn from './words/en'
import wordsEs from './words/es'

export const SUPPORTED_LOCALES = ['fr', 'en', 'es'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
}

function initialLocale(): Locale {
  const saved = localStorage.getItem('locale')
  if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) return saved as Locale
  return 'fr'
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale(),
  fallbackLocale: 'fr',
  messages: {
    fr,
    en: { ...en, words: wordsEn },
    es: { ...es, words: wordsEs },
  },
})

document.documentElement.setAttribute('lang', i18n.global.locale.value)

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

export default i18n
