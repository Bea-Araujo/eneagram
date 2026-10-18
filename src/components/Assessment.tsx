import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useI18n } from '../i18n/useI18n'
import type { Answers, Question, ScaleValue } from '../types/enneagram'
import { ProgressBar } from './ProgressBar'
import { ScaleQuestion } from './ScaleQuestion'

interface AssessmentProps {
  /** The frozen question order for this session. */
  questions: Question[]
  /** Questions per section. Pass `questions.length` for a single-section run. */
  sectionSize: number
  /** Index of the question to resume at (0-based). */
  startIndex: number
  /** Pre-filled answers when resuming. */
  startAnswers: Answers
  /** Called after every answer, with the full answer set and the next index. */
  onProgress: (answers: Answers, nextIndex: number) => void
  /** Called with all answers once the final question is answered. */
  onComplete: (answers: Answers) => void
  /** Called when backing out of the first question, or on "save & exit". */
  onExit: () => void
}

type View = 'question' | 'interstitial'

/**
 * One-question-at-a-time assessment. Picking a value stores it, reports progress,
 * and auto-advances. When a section boundary is crossed (and there's more than
 * one section), a checkpoint screen appears so the person can pause — their
 * progress is already saved via `onProgress`.
 */
export function Assessment({
  questions,
  sectionSize,
  startIndex,
  startAnswers,
  onProgress,
  onComplete,
  onExit,
}: AssessmentProps) {
  const { t } = useI18n()
  const { control, getValues } = useForm<Answers>({ defaultValues: startAnswers })
  const [index, setIndex] = useState(startIndex)
  const [view, setView] = useState<View>('question')

  const total = questions.length
  const totalSections = Math.ceil(total / sectionSize)
  const multiSection = totalSections > 1

  function handleSelect(value: ScaleValue, onChange: (value: ScaleValue) => void) {
    onChange(value)
    const answers = { ...getValues(), [questions[index].id]: value }
    const nextIndex = index + 1

    onProgress(answers, nextIndex)

    if (nextIndex >= total) {
      onComplete(answers)
      return
    }

    setIndex(nextIndex)
    // Crossed into a new section → pause at a checkpoint.
    if (multiSection && nextIndex % sectionSize === 0) {
      setView('interstitial')
    }
  }

  function handleBack() {
    if (view === 'interstitial') {
      setView('question')
      setIndex((i) => i - 1)
      return
    }
    if (index === 0) {
      onExit()
    } else {
      setIndex((i) => i - 1)
    }
  }

  if (view === 'interstitial') {
    const completedSection = index / sectionSize // index is a section boundary here
    return (
      <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {t('assessment.sectionDone', { current: completedSection, total: totalSections })}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {Math.round((index / total) * 100)}%
        </h2>
        <p className="mt-3 text-slate-600">{t('assessment.sectionDoneBody')}</p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setView('question')}
            className="w-full max-w-xs rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            {t('assessment.continue')}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline"
          >
            {t('assessment.saveExit')}
          </button>
        </div>
      </div>
    )
  }

  const sectionIndex = Math.floor(index / sectionSize)
  const sectionStart = sectionIndex * sectionSize
  const withinCurrent = index - sectionStart + 1
  const withinTotal = Math.min(sectionSize, total - sectionStart)
  const question = questions[index]

  return (
    <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-6 py-10">
      <ProgressBar
        current={withinCurrent}
        total={withinTotal}
        sectionLabel={
          multiSection
            ? t('assessment.section', { current: sectionIndex + 1, total: totalSections })
            : undefined
        }
      />

      <div className="flex-1">
        <Controller
          key={question.id}
          name={question.id}
          control={control}
          render={({ field }) => (
            <ScaleQuestion
              question={question}
              value={field.value as ScaleValue | undefined}
              onSelect={(value) => handleSelect(value, field.onChange)}
            />
          )}
        />
      </div>

      <div className="mt-10">
        <button
          type="button"
          onClick={handleBack}
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline"
        >
          {t('nav.back')}
        </button>
      </div>
    </div>
  )
}
