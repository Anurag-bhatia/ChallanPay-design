import { useLanguageStore } from '@/stores/languageStore'
import { en, hi } from '@/i18n'
import type { TranslationKeys } from '@/i18n'

const translations: Record<string, TranslationKeys> = { en, hi }

export function useTranslation() {
  const language = useLanguageStore((s) => s.language)
  const t = translations[language] ?? en
  return { t, language }
}
