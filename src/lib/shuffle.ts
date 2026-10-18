import type { Question } from '../types/enneagram'

/** Random source in [0, 1). Swap for a seeded generator to make order reproducible. */
export type Rng = () => number

function shuffleInPlace<T>(arr: T[], rng: Rng): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Pick `perType` random questions from each type. Used by the short version of
 * the assessment. Pass a seeded `rng` to make the selection reproducible.
 */
export function pickPerType(
  questions: readonly Question[],
  perType: number,
  rng: Rng = Math.random,
): Question[] {
  const byType = new Map<number, Question[]>()
  for (const q of questions) {
    const bucket = byType.get(q.type) ?? []
    bucket.push(q)
    byType.set(q.type, bucket)
  }

  const result: Question[] = []
  for (const bucket of byType.values()) {
    shuffleInPlace(bucket, rng)
    result.push(...bucket.slice(0, perType))
  }
  return result
}

/**
 * Interleave questions so no two adjacent ones share a type, with a fresh
 * random order each call. Greedy "most-remaining, avoid-previous, random
 * tie-break" scheduling — guarantees no adjacent repeats while the per-type
 * counts stay balanced (they are: 20 each).
 *
 * Pass a seeded `rng` to make the order reproducible.
 */
export function interleaveQuestions(
  questions: readonly Question[],
  rng: Rng = Math.random,
): Question[] {
  const byType = new Map<number, Question[]>()
  for (const q of questions) {
    const bucket = byType.get(q.type) ?? []
    bucket.push(q)
    byType.set(q.type, bucket)
  }
  for (const bucket of byType.values()) shuffleInPlace(bucket, rng)

  const result: Question[] = []
  let last = -1

  while (result.length < questions.length) {
    const remaining = [...byType.entries()].filter(([, b]) => b.length > 0)
    if (remaining.length === 0) break

    const avoidingLast = remaining.filter(([type]) => type !== last)
    const pool = avoidingLast.length > 0 ? avoidingLast : remaining

    const maxRemaining = Math.max(...pool.map(([, b]) => b.length))
    const tied = pool.filter(([, b]) => b.length === maxRemaining)
    const [type, bucket] = tied[Math.floor(rng() * tied.length)]

    result.push(bucket.pop()!)
    last = type
  }

  return result
}
