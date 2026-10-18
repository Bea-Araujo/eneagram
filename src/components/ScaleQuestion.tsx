import { SCALE_VALUES } from '../data/scale'
import { useI18n } from '../i18n/useI18n'
import type { Question, ScaleValue } from '../types/enneagram'

interface ScaleQuestionProps {
  question: Question
  /** The currently selected value, if the person has answered before. */
  value: ScaleValue | undefined
  /** Called when a value is picked. The wizard uses this to store and auto-advance. */
  onSelect: (value: ScaleValue) => void
}

/** A single statement with the 1–5 agreement scale as a vertical list of labeled buttons. */
export function ScaleQuestion({ question, value, onSelect }: ScaleQuestionProps) {
  const { t, localize } = useI18n()

  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-7 text-xl font-semibold leading-snug text-slate-900">
        {localize(question.text)}
      </legend>

      <div className="flex flex-col gap-2.5">
        {SCALE_VALUES.map((scaleValue) => {
          const selected = value === scaleValue
          return (
            <button
              key={scaleValue}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(scaleValue)}
              className={[
                'w-full rounded-xl border-2 px-4 py-3 text-left text-base transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
                selected
                  ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50',
              ].join(' ')}
            >
              {t(`scale.${scaleValue}`)}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
