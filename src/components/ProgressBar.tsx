import { useI18n } from '../i18n/useI18n'

interface ProgressBarProps {
  current: number
  total: number
  /** Optional caption shown above the bar (e.g. "Section 2 of 9"). */
  sectionLabel?: string
}

/** Thin progress bar with a "Question X of Y" caption. `current` is 1-based. */
export function ProgressBar({ current, total, sectionLabel }: ProgressBarProps) {
  const { t } = useI18n()
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="mb-8">
      {sectionLabel && (
        <p className="mb-2 text-sm font-semibold text-brand-600">{sectionLabel}</p>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {t('progress.counter', { current, total })}
      </p>
    </div>
  )
}
