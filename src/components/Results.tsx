import type { ReactNode } from 'react'
import { RadarChart } from '@mui/x-charts/RadarChart'
import { DESCRIPTIONS, EXPRESSION_LABELS } from '../data/descriptions'
import { TYPE_INFO } from '../data/types'
import { useI18n } from '../i18n/useI18n'
import type { AssessmentResult } from '../lib/scoring'
import { ENNEAGRAM_TYPES } from '../types/enneagram'
import type {
  AssessmentMode,
  EnneagramType,
  LocalizedText,
} from '../types/enneagram'

const INFO_BY_TYPE = new Map(TYPE_INFO.map((info) => [info.type, info]))
const DESC_BY_TYPE = new Map(DESCRIPTIONS.map((desc) => [desc.type, desc]))

/** Vault names are uppercase (e.g. "ROMÂNTICO") — show them title-cased. */
function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

interface ResultsProps {
  result: AssessmentResult
  mode: AssessmentMode
  onRestart: () => void
}

export function Results({ result, mode, onRestart }: ResultsProps) {
  const { t, localize } = useI18n()

  const typeName = (type: EnneagramType) => titleCase(localize(INFO_BY_TYPE.get(type)!.name))

  const bestInfo = INFO_BY_TYPE.get(result.bestFit)!
  const bestDesc = DESC_BY_TYPE.get(result.bestFit)!

  const expressionLabel = localize(
    EXPRESSION_LABELS[bestInfo.expression.pt] ?? bestInfo.expression,
  )

  // Radar data must be ordered to match the metrics (canonical type order).
  const metrics = ENNEAGRAM_TYPES.map((type) => typeName(type))
  const percentByType = new Map(result.scores.map((s) => [s.type, s.percent]))
  const radarData = ENNEAGRAM_TYPES.map((type) => percentByType.get(type) ?? 0)

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t('results.heading')}</h1>

      {mode === 'short' && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t('results.shortWarning')}
        </p>
      )}

      {/* Chart + predominant type, side by side (chart first) */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Radar chart card */}
        <section className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">{t('results.chartTitle')}</h3>
          <div className="flex-1">
            <RadarChart
              height={360}
              // Reserve horizontal room so vertex labels (e.g. "Perfeccionista",
              // "Contestador") render inside the SVG instead of being clipped.
              margin={{ top: 40, right: 96, bottom: 40, left: 96 }}
              radar={{ max: 100, metrics }}
              series={[{ label: t('results.chartLabel'), data: radarData, fillArea: true }]}
              sx={{ '& .MuiRadarChart-axisLabel': { fontSize: 12 } }}
            />
          </div>
        </section>

        {/* Predominant type card */}
        <section className="flex-1 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {t('results.bestFitLabel')}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {t('results.typeN', { n: bestInfo.type })} — {typeName(bestInfo.type)}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">{localize(bestDesc.summary)}</p>

          <div className="mt-5 grid gap-4 border-t border-brand-100 pt-4 text-sm sm:grid-cols-2">
            <MetaItem label={t('results.triad')} value={localize(bestInfo.triad)} />
            <MetaItem label={t('results.expression')} value={expressionLabel} />
          </div>

          <div className="mt-4 border-t border-brand-100 pt-4 text-sm text-slate-600">
            <p className="mb-1 font-semibold uppercase tracking-wide text-slate-500">
              {t('results.lines')}
            </p>
            <p>{t('results.stressLine', { n: bestInfo.stressType, name: typeName(bestInfo.stressType) })}</p>
            <p>{t('results.securityLine', { n: bestInfo.securityType, name: typeName(bestInfo.securityType) })}</p>
          </div>
        </section>
      </div>

      {/* Strengths · weaknesses · sin */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title={t('results.strengths')}>
          <BulletItems items={bestDesc.strengths} localize={localize} />
        </Card>
        <Card title={t('results.weaknesses')}>
          <BulletItems items={bestDesc.weaknesses} localize={localize} />
        </Card>
        <Card title={t('results.sin')}>
          <p className="text-base font-semibold text-slate-900">{localize(bestInfo.sin)}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {localize(bestDesc.sinDescription)}
          </p>
        </Card>
      </div>

      {/* Stress & security directions */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <DirectionCard
          eyebrow={t('results.stressTitle')}
          toward={t('results.towardType', {
            n: bestInfo.stressType,
            name: typeName(bestInfo.stressType),
          })}
          body={localize(bestDesc.stress)}
        />
        <DirectionCard
          eyebrow={t('results.securityTitle')}
          toward={t('results.towardType', {
            n: bestInfo.securityType,
            name: typeName(bestInfo.securityType),
          })}
          body={localize(bestDesc.security)}
        />
      </div>

      {/* Full ranking */}
      <section className="mt-10">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{t('results.ranking')}</h3>
        <ul className="space-y-2">
          {result.scores.map((score) => (
            <li key={score.type} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-sm text-slate-700">
                {score.type}. {typeName(score.type)}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <span
                  className="block h-full rounded-full bg-brand-500"
                  style={{ width: `${score.percent}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums text-slate-600">
                {score.percent}%
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline"
        >
          {t('results.restart')}
        </button>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-slate-700">{value}</p>
    </div>
  )
}

function DirectionCard({
  eyebrow,
  toward,
  body,
}: {
  eyebrow: string
  toward: string
  body: string
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
      <p className="mt-1 text-base font-bold text-slate-900">{toward}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{body}</p>
    </section>
  )
}

interface BulletItemsProps {
  items: LocalizedText[]
  localize: (text: LocalizedText) => string
}

function BulletItems({ items, localize }: BulletItemsProps) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
          <span>{localize(item)}</span>
        </li>
      ))}
    </ul>
  )
}
