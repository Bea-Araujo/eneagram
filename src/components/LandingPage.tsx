import { useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { useI18n } from '../i18n/useI18n'
import { ENNEAGRAM_TYPES, SHORT_PER_TYPE } from '../types/enneagram'
import type { AssessmentMode } from '../types/enneagram'

interface ResumeInfo {
  /** 1-based current section. */
  section: number
  totalSections: number
}

interface LandingPageProps {
  onStart: (mode: AssessmentMode) => void
  onContinue: () => void
  onViewResult: () => void
  resume: ResumeInfo | null
  hasResult: boolean
}

const FULL_COUNT = QUESTIONS.length
const SHORT_COUNT = ENNEAGRAM_TYPES.length * SHORT_PER_TYPE

/** Intro + hub: resume, view last result, or start a fresh full/short assessment. */
export function LandingPage({
  onStart,
  onContinue,
  onViewResult,
  resume,
  hasResult,
}: LandingPageProps) {
  const { t } = useI18n()
  // When progress exists, starting a fresh full run discards it — confirm first.
  const [confirmingFull, setConfirmingFull] = useState(false)

  function handleFullClick() {
    if (resume) {
      setConfirmingFull(true)
    } else {
      onStart('full')
    }
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-600">
        {t('landing.eyebrow')}
      </p>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        {t('landing.title')}
      </h1>

      <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
        <p>{t('landing.intro1')}</p>
        <p>{t('landing.intro2')}</p>
      </div>

      {/* Resume + last result */}
      {(resume || hasResult) && (
        <div className="mt-8 flex flex-col gap-3">
          {resume && (
            <button
              type="button"
              onClick={onContinue}
              className="rounded-xl border-2 border-brand-500 bg-brand-50 px-6 py-3.5 text-left transition-colors hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
            >
              <span className="block text-base font-semibold text-brand-700">
                {t('hub.resumeTitle')}
              </span>
              <span className="block text-sm text-brand-600">
                {t('hub.resumeDetail', { current: resume.section, total: resume.totalSections })}
              </span>
            </button>
          )}
          {hasResult && (
            <button
              type="button"
              onClick={onViewResult}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-left transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
            >
              <span className="block text-base font-semibold text-slate-800">
                {t('hub.lastResultTitle')}
              </span>
              <span className="block text-sm text-slate-500">{t('hub.lastResultDetail')}</span>
            </button>
          )}
        </div>
      )}

      {/* Start fresh */}
      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {resume || hasResult ? t('hub.startNew') : ' '}
      </p>

      {confirmingFull ? (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">{t('hub.overwriteConfirm')}</p>
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setConfirmingFull(false)
                onStart('full')
              }}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
            >
              {t('hub.overwriteYes')}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingFull(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {t('hub.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleFullClick}
            className="flex-1 rounded-xl bg-brand-600 px-6 py-3.5 text-left shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            <span className="block text-base font-semibold text-white">
              {t('landing.startFull')}
            </span>
            <span className="block text-sm text-brand-100">
              {t('landing.countFull', { n: FULL_COUNT })}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onStart('short')}
            className="flex-1 rounded-xl border-2 border-brand-200 bg-white px-6 py-3.5 text-left transition-colors hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            <span className="block text-base font-semibold text-brand-700">
              {t('landing.startShort')}
            </span>
            <span className="block text-sm text-slate-500">
              {t('landing.countShort', { n: SHORT_COUNT })}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
