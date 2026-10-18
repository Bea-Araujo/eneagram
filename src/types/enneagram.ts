/** The nine Enneagram types, referenced by number. */
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/** The nine types in canonical order, for iterating/charting. */
export const ENNEAGRAM_TYPES: readonly EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/** A single 1–5 scale value. */
export type ScaleValue = 1 | 2 | 3 | 4 | 5

/** Which version of the assessment the person is taking. */
export type AssessmentMode = 'full' | 'short'

/** How many questions per type the short version uses. */
export const SHORT_PER_TYPE = 3

/** Supported locales. `pt` is the source/default; others are added over time. */
export type Locale = 'pt' | 'en'

/**
 * A piece of user-facing content in each locale. `pt` is required (the source
 * language); other locales are optional until translated, with `pt` as fallback.
 */
export type LocalizedText = { pt: string } & Partial<Record<Locale, string>>

/** A form question. `type` tags which Enneagram type the statement scores toward. */
export interface Question {
  /** Stable unique id, used as the react-hook-form field name. */
  id: string
  /** Which of the nine types a high agreement score points to. */
  type: EnneagramType
  /** The statement the person rates, per locale. */
  text: LocalizedText
}

/** Metadata about an Enneagram type, used by the results readout. */
export interface EnneagramTypeInfo {
  type: EnneagramType
  name: LocalizedText
  /** Associated "sin"/passion. */
  sin: LocalizedText
  /** Center/triad (gut, heart, head). */
  triad: LocalizedText
  /** How the type expresses its core emotion. */
  expression: LocalizedText
  /** Type moved toward under stress ("line of disintegration"). */
  stressType: EnneagramType
  /** Type moved toward in security ("line of integration"). */
  securityType: EnneagramType
}

/**
 * Authored prose for a type's results readout. Kept separate from the
 * vault-generated `EnneagramTypeInfo` so regenerating that data never clobbers it.
 */
export interface EnneagramTypeDescription {
  type: EnneagramType
  /** A short explanation of what drives this type. */
  summary: LocalizedText
  /** Strong suits, as bullet points. */
  strengths: LocalizedText[]
  /** Weak spots / blind spots, as bullet points. */
  weaknesses: LocalizedText[]
  /** What this type's capital sin / passion means for it in practice. */
  sinDescription: LocalizedText
  /** What moving toward the stress type looks like, and what to watch for. */
  stress: LocalizedText
  /** What moving toward the security type looks like (growth). */
  security: LocalizedText
}

/** Collected answers: question id -> chosen scale value. */
export type Answers = Record<string, ScaleValue>
