import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Language = 'en' | 'hi'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
}

const syncHtmlLang = (lang: Language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
  }
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => {
        syncHtmlLang(lang)
        set({ language: lang })
      },
    }),
    {
      name: 'challanpay-lang',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) syncHtmlLang(state.language)
      },
    }
  )
)
