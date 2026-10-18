import { useContext } from 'react'
import { I18nContext } from './context'

/** Access the active locale, the `t()` translator, and the `localize()` helper. */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within a <LocaleProvider>')
  }
  return ctx
}
