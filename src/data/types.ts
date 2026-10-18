import type { EnneagramTypeInfo } from '../types/enneagram'

/**
 * Metadata for each Enneagram type, sourced from the assessment vault.
 * `name`/`sin`/`triad`/`expression` are localized; English to be filled later.
 * Used by the results screen (readout, stress/security "lines").
 */
export const TYPE_INFO: readonly EnneagramTypeInfo[] = [
  {
    type: 1,
    name: { pt: "PERFECCIONISTA" },
    sin: { pt: "Ira (ressentimento)" },
    triad: { pt: "Visceral (ou da raiva)" },
    expression: { pt: "Internaliza" },
    stressType: 4,
    securityType: 7,
  },
  {
    type: 2,
    name: { pt: "AUXILIADOR" },
    sin: { pt: "Soberba" },
    triad: { pt: "Coração (ou sentimentos)" },
    expression: { pt: "Externalizar" },
    stressType: 8,
    securityType: 4,
  },
  {
    type: 3,
    name: { pt: "REALIZADOR" },
    sin: { pt: "Engano" },
    triad: { pt: "Coração (ou sentimentos)" },
    expression: { pt: "Esquecimento" },
    stressType: 9,
    securityType: 6,
  },
  {
    type: 4,
    name: { pt: "ROMÂNTICO" },
    sin: { pt: "Inveja" },
    triad: { pt: "Coração (ou sentimentos)" },
    expression: { pt: "Internaliza" },
    stressType: 2,
    securityType: 1,
  },
  {
    type: 5,
    name: { pt: "INVESTIGADOR" },
    sin: { pt: "Avareza" },
    triad: { pt: "Cabeça (ou medo)" },
    expression: { pt: "Externalizar" },
    stressType: 7,
    securityType: 8,
  },
  {
    type: 6,
    name: { pt: "LEAL" },
    sin: { pt: "Medo" },
    triad: { pt: "Cabeça (ou medo)" },
    expression: { pt: "Esquecimento" },
    stressType: 3,
    securityType: 9,
  },
  {
    type: 7,
    name: { pt: "ENTUSIASTA" },
    sin: { pt: "Glutonaria" },
    triad: { pt: "Cabeça (ou medo)" },
    expression: { pt: "Internaliza" },
    stressType: 1,
    securityType: 5,
  },
  {
    type: 8,
    name: { pt: "CONTESTADOR" },
    sin: { pt: "Luxúria (intensidade)" },
    triad: { pt: "Visceral (ou da raiva)" },
    expression: { pt: "Externalizar" },
    stressType: 5,
    securityType: 2,
  },
  {
    type: 9,
    name: { pt: "PACIFICADOR" },
    sin: { pt: "Preguiça (inércia)" },
    triad: { pt: "Visceral (ou da raiva)" },
    expression: { pt: "Esquecimento" },
    stressType: 6,
    securityType: 3,
  },
]
