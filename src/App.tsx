import { useState } from 'react'
import { Assessment } from './components/Assessment'
import { LandingPage } from './components/LandingPage'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { Results } from './components/Results'
import {
  SECTION_SIZE,
  buildFullOrder,
  buildShortOrder,
  reconstructQuestions,
} from './lib/assessment'
import { persistence } from './lib/persistence'
import { scoreAssessment } from './lib/scoring'
import type { AssessmentResult } from './lib/scoring'
import type { Answers, AssessmentMode, Question } from './types/enneagram'

type Stage = 'landing' | 'assessment' | 'results'

interface Plan {
  questions: Question[]
  sectionSize: number
  startIndex: number
  startAnswers: Answers
  startedAt: string
}

function App() {
  const [stage, setStage] = useState<Stage>('landing')
  const [mode, setMode] = useState<AssessmentMode>('full')
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)

  function startFull() {
    persistence.clearProgress()
    const questions = buildFullOrder()
    setMode('full')
    setResult(null)
    setPlan({
      questions,
      sectionSize: SECTION_SIZE,
      startIndex: 0,
      startAnswers: {},
      startedAt: new Date().toISOString(),
    })
    setStage('assessment')
  }

  function startShort() {
    const questions = buildShortOrder()
    setMode('short')
    setResult(null)
    setPlan({
      questions,
      sectionSize: questions.length, // single section
      startIndex: 0,
      startAnswers: {},
      startedAt: new Date().toISOString(),
    })
    setStage('assessment')
  }

  function handleStart(chosen: AssessmentMode) {
    if (chosen === 'full') startFull()
    else startShort()
  }

  function handleContinue() {
    const saved = persistence.loadProgress()
    if (!saved) return
    const questions = reconstructQuestions(saved.questionIds)
    if (!questions) {
      // Stored order no longer matches the question bank — discard it.
      persistence.clearProgress()
      return
    }
    setMode(saved.mode)
    setResult(null)
    setPlan({
      questions,
      sectionSize: SECTION_SIZE,
      startIndex: Math.min(saved.currentIndex, questions.length - 1),
      startAnswers: saved.answers,
      startedAt: saved.startedAt,
    })
    setStage('assessment')
  }

  function handleViewResult() {
    const saved = persistence.loadResult()
    if (!saved) return
    setMode(saved.mode)
    setResult(saved.result)
    setStage('results')
  }

  function handleProgress(answers: Answers, nextIndex: number) {
    // Only the full, sectioned flow persists progress for resuming.
    if (mode !== 'full' || !plan) return
    persistence.saveProgress({
      mode: 'full',
      questionIds: plan.questions.map((q) => q.id),
      answers,
      currentIndex: nextIndex,
      startedAt: plan.startedAt,
    })
  }

  function handleComplete(answers: Answers) {
    if (!plan) return
    // Score against the questions actually asked so `max` matches the mode:
    // full = 20/type (max 100), short = 3/type (max 15). Using the whole bank
    // here would cap short-mode percentages at ~15%.
    const scored = scoreAssessment(answers, plan.questions)
    persistence.saveResult({
      mode,
      answers,
      result: scored,
      completedAt: new Date().toISOString(),
    })
    persistence.clearProgress()
    setResult(scored)
    setStage('results')
  }

  // Read stored state fresh whenever the hub is shown.
  const savedProgress = stage === 'landing' ? persistence.loadProgress() : null
  const resumableQuestions =
    savedProgress && reconstructQuestions(savedProgress.questionIds)
  const resume =
    savedProgress && resumableQuestions && savedProgress.currentIndex < resumableQuestions.length
      ? {
          section: Math.floor(savedProgress.currentIndex / SECTION_SIZE) + 1,
          totalSections: Math.ceil(resumableQuestions.length / SECTION_SIZE),
        }
      : null
  const hasResult = stage === 'landing' ? persistence.loadResult() !== null : false

  return (
    <main className="min-h-full">
      <LanguageSwitcher />

      {stage === 'landing' && (
        <LandingPage
          onStart={handleStart}
          onContinue={handleContinue}
          onViewResult={handleViewResult}
          resume={resume}
          hasResult={hasResult}
        />
      )}

      {stage === 'assessment' && plan && (
        <Assessment
          key={plan.startedAt}
          questions={plan.questions}
          sectionSize={plan.sectionSize}
          startIndex={plan.startIndex}
          startAnswers={plan.startAnswers}
          onProgress={handleProgress}
          onComplete={handleComplete}
          onExit={() => setStage('landing')}
        />
      )}

      {stage === 'results' && result && (
        <Results result={result} mode={mode} onRestart={() => setStage('landing')} />
      )}
    </main>
  )
}

export default App
