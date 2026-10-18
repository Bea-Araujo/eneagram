import { createContext } from 'react'
import type { Locale, LocalizedText } from '../types/enneagram'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Translate a UI chrome key, with optional `{placeholder}` interpolation. */
  t: (key: string, params?: Record<string, string | number>) => string
  /** Resolve localized content (questions, type info) for the active locale. */
  localize: (text: LocalizedText) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
