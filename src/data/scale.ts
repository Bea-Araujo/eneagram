import type { ScaleValue } from '../types/enneagram'

/**
 * The 1–5 agreement scale, ordered from strongest disagreement to strongest
 * agreement. Labels are localized — look them up with `t('scale.' + value)`.
 */
export const SCALE_VALUES: readonly ScaleValue[] = [1, 2, 3, 4, 5]
