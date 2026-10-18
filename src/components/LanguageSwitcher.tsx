import { LOCALES, LOCALE_LABELS } from '../i18n/dictionary'
import { useI18n } from '../i18n/useI18n'

/** Small pill toggle for switching locale. Sits fixed in the top-right corner. */
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="fixed right-4 top-4 z-10 flex gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur">
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={[
              'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
              active
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 hover:text-slate-800',
            ].join(' ')}
          >
            {LOCALE_LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
