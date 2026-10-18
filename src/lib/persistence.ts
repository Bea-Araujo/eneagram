import type { Answers, AssessmentMode } from '../types/enneagram'
import type { AssessmentResult } from './scoring'

/**
 * Persistence layer. Everything that reads or writes stored state goes through
 * the `Persistence` interface, so the backing store (localStorage today) can be
 * swapped for IndexedDB or a server API later without touching components.
 */

/** A completed assessment, kept so the person can see their last result. */
export interface StoredResult {
  mode: AssessmentMode
  answers: Answers
  result: AssessmentResult
  /** ISO timestamp of completion. */
  completedAt: string
}

/**
 * An in-progress assessment, kept so the person can resume later.
 * Shaped now for the upcoming sectioned flow; not written yet.
 */
export interface StoredProgress {
  mode: AssessmentMode
  /** The frozen question order for this session (ids), so resume is stable. */
  questionIds: string[]
  /** Answers collected so far. */
  answers: Answers
  /** Index of the next unanswered question within `questionIds`. */
  currentIndex: number
  /** ISO timestamp the session started. */
  startedAt: string
}

export interface Persistence {
  saveResult(result: StoredResult): void
  loadResult(): StoredResult | null
  clearResult(): void

  saveProgress(progress: StoredProgress): void
  loadProgress(): StoredProgress | null
  clearProgress(): void
}

// Versioned keys so the shape can migrate later without colliding with old data.
const RESULT_KEY = 'eneagram.result.v1'
const PROGRESS_KEY = 'eneagram.progress.v1'

function readJSON<T>(key: string): T | null {
  if (typeof localStorage === 'undefined') return null
  const raw = localStorage.getItem(key)
  if (raw == null) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    // Corrupt entry — drop it rather than crashing the app.
    localStorage.removeItem(key)
    return null
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

function remove(key: string): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(key)
}

export const persistence: Persistence = {
  saveResult: (result) => writeJSON(RESULT_KEY, result),
  loadResult: () => readJSON<StoredResult>(RESULT_KEY),
  clearResult: () => remove(RESULT_KEY),

  saveProgress: (progress) => writeJSON(PROGRESS_KEY, progress),
  loadProgress: () => readJSON<StoredProgress>(PROGRESS_KEY),
  clearProgress: () => remove(PROGRESS_KEY),
}
