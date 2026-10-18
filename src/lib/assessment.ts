import { QUESTIONS } from '../data/questions'
import { SHORT_PER_TYPE } from '../types/enneagram'
import type { Question } from '../types/enneagram'
import { interleaveQuestions, pickPerType } from './shuffle'
import type { Rng } from './shuffle'

/** Questions per section in the full, sectioned flow. 180 / 20 = 9 sections. */
export const SECTION_SIZE = 20

const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]))

/** Full assessment order: all 180, interleaved so no two adjacent share a type. */
export function buildFullOrder(rng?: Rng): Question[] {
  return interleaveQuestions(QUESTIONS, rng)
}

/** Short assessment order: 3 random per type (27), interleaved. */
export function buildShortOrder(rng?: Rng): Question[] {
  return interleaveQuestions(pickPerType(QUESTIONS, SHORT_PER_TYPE, rng), rng)
}

/**
 * Rebuild the frozen question list from stored ids for resuming a session.
 * Returns null if the list is empty or any id is unknown (e.g. the question
 * bank changed since the progress was saved) — the caller should discard the
 * stale progress rather than resume into a broken state.
 */
export function reconstructQuestions(ids: readonly string[]): Question[] | null {
  if (ids.length === 0) return null
  const out: Question[] = []
  for (const id of ids) {
    const question = QUESTION_BY_ID.get(id)
    if (!question) return null
    out.push(question)
  }
  return out
}
