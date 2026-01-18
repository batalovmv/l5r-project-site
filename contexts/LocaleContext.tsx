'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'ru' | 'en'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'ru'
  const stored = window.localStorage.getItem('l5r_locale')
  if (stored === 'ru' || stored === 'en') return stored
  const lang = window.navigator.language?.toLowerCase?.() ?? ''
  return lang.startsWith('ru') ? 'ru' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem('l5r_locale', locale)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((l) => (l === 'ru' ? 'en' : 'ru')),
    }),
    [locale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

