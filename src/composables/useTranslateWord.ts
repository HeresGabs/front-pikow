import { useI18n } from 'vue-i18n'

export function useTranslateWord() {
  const { t, te, locale } = useI18n()

  return (value: string | undefined | null): string => {
    if (!value) return ''
    if (locale.value === 'fr') return value
    const key = `words.${value.trim().toLowerCase()}`
    return te(key, locale.value) ? t(key) : value
  }
}
