import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Locale, LocalizedText } from '../types/enneagram'
import { DEFAULT_LOCALE, LOCALES, UI } from './dictionary'
import { I18nContext } from './context'

const STORAGE_KEY = 'eneagram.locale'

function readStoredLocale(): Locale {
  if (typeof localStorage === 'undefined') return DEFAULT_LOCALE
  const stored = localStorage.getItem(STORAGE_KEY)
  return LOCALES.includes(stored as Locale) ? (stored as Locale) : DEFAULT_LOCALE
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  )
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const template = UI[locale][key] ?? UI[DEFAULT_LOCALE][key] ?? key
      return interpolate(template, params)
    },
    [locale],
  )

  const localize = useCallback(
    (text: LocalizedText) => text[locale] ?? text.pt,
    [locale],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, localize }),
    [locale, setLocale, t, localize],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
