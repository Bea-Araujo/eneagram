import { ENNEAGRAM_TYPES } from '../types/enneagram'
import type { Answers, EnneagramType, Question } from '../types/enneagram'

export interface TypeScore {
  type: EnneagramType
  /** Sum of the 1–5 answers for this type's questions. */
  raw: number
  /** Maximum possible raw score (question count × 5). */
  max: number
  /** raw / max as a 0–100 percentage, rounded. */
  percent: number
}

export interface AssessmentResult {
  /** All nine scores, sorted by percent descending (ties broken by lower type number). */
  scores: TypeScore[]
  /** The highest-scoring type. */
  bestFit: EnneagramType
}

/**
 * Score an assessment by summing each type's answers. Every type has the same
 * number of questions, so the raw sums are directly comparable; `percent` is
 * provided for the radar chart and for readability.
 *
 * Pure and deterministic: unanswered questions count as 0 and still contribute
 * to `max`, and ties for best fit resolve to the lower type number.
 */
export function scoreAssessment(
  answers: Answers,
  questions: readonly Question[],
): AssessmentResult {
  const raw = new Map<EnneagramType, number>()
  const counts = new Map<EnneagramType, number>()

  for (const q of questions) {
    counts.set(q.type, (counts.get(q.type) ?? 0) + 1)
    const answer = answers[q.id]
    if (answer != null) {
      raw.set(q.type, (raw.get(q.type) ?? 0) + answer)
    }
  }

  const scores: TypeScore[] = ENNEAGRAM_TYPES.map((type) => {
    const count = counts.get(type) ?? 0
    const rawScore = raw.get(type) ?? 0
    const max = count * 5
    const percent = max > 0 ? Math.round((rawScore / max) * 100) : 0
    return { type, raw: rawScore, max, percent }
  })

  scores.sort((a, b) => b.percent - a.percent || a.type - b.type)

  return { scores, bestFit: scores[0].type }
}
