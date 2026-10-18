import type { Locale } from '../types/enneagram'

/** The source/default locale. Missing translations fall back to this. */
export const DEFAULT_LOCALE: Locale = 'pt'

export const LOCALES: readonly Locale[] = ['pt', 'en']

/** Human-readable name for each locale, shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
}

/**
 * UI chrome strings (buttons, labels, static copy) per locale.
 * Content (questions, type descriptions) is NOT here — it lives with the data
 * as localized text. Use `{placeholders}` for interpolation via `t(key, params)`.
 */
export const UI: Record<Locale, Record<string, string>> = {
  pt: {
    'landing.eyebrow': 'Avaliação de personalidade',
    'landing.title': 'Descubra seu tipo no Eneagrama',
    'landing.intro1':
      'O Eneagrama descreve nove tipos de personalidade, cada um com sua própria forma de ver o mundo e suas próprias motivações, qualidades e pontos cegos.',
    'landing.intro2':
      'Responda a uma série de afirmações numa escala de "discordo completamente" a "concordo completamente". Não há respostas certas ou erradas — vá pela sua primeira reação honesta. No final, você verá como pontuou nos nove tipos e qual combina mais com você.',
    'landing.start': 'Começar a avaliação',
    'landing.startFull': 'Questionário completo',
    'landing.countFull': '{n} perguntas',
    'landing.startShort': 'Versão curta',
    'landing.countShort': '{n} perguntas (3 por tipo)',

    'progress.counter': 'Pergunta {current} de {total}',

    'assessment.section': 'Seção {current} de {total}',
    'assessment.sectionDone': 'Seção {current} de {total} concluída',
    'assessment.sectionDoneBody':
      'Seu progresso foi salvo. Você pode continuar agora ou voltar depois.',
    'assessment.continue': 'Continuar',
    'assessment.saveExit': 'Salvar e sair',

    'hub.resumeTitle': 'Continuar de onde parei',
    'hub.resumeDetail': 'Seção {current} de {total}',
    'hub.lastResultTitle': 'Ver último resultado',
    'hub.lastResultDetail': 'Seu resultado salvo',
    'hub.startNew': 'Ou comece de novo',
    'hub.overwriteConfirm': 'Isso vai descartar seu progresso salvo. Recomeçar?',
    'hub.overwriteYes': 'Recomeçar',
    'hub.cancel': 'Cancelar',

    'scale.1': 'Discordo completamente',
    'scale.2': 'Discordo',
    'scale.3': 'Neutro',
    'scale.4': 'Concordo',
    'scale.5': 'Concordo completamente',

    'nav.back': '← Voltar',

    'results.heading': 'Seu resultado',
    'results.shortWarning':
      'Você fez a versão curta (3 perguntas por tipo). O resultado é uma estimativa — para algo mais preciso, refaça com o questionário completo.',
    'results.bestFitLabel': 'Seu tipo predominante',
    'results.typeN': 'Tipo {n}',
    'results.chartLabel': 'Seu perfil',
    'results.chartTitle': 'Como você pontuou em cada tipo',
    'results.strengths': 'Qualidades',
    'results.weaknesses': 'Pontos cegos',
    'results.sin': 'Pecado capital',
    'results.triad': 'Tríade',
    'results.expression': 'Como se expressa',
    'results.lines': 'Linhas',
    'results.stressLine': 'No estresse, caminha para o tipo {n} ({name})',
    'results.securityLine': 'Na segurança, caminha para o tipo {n} ({name})',
    'results.stressTitle': 'Sob estresse',
    'results.securityTitle': 'Em segurança',
    'results.towardType': 'Caminha para o Tipo {n} · {name}',
    'results.ranking': 'Pontuação por tipo',
    'results.restart': '← Recomeçar',
  },
  en: {
    'landing.eyebrow': 'Personality assessment',
    'landing.title': 'Discover your Enneagram type',
    'landing.intro1':
      'The Enneagram describes nine personality types, each with its own way of seeing the world and its own motivations, strengths, and blind spots.',
    'landing.intro2':
      'Answer a series of statements on a scale from "completely disagree" to "completely agree". There are no right or wrong answers — go with your honest first reaction. At the end you\'ll see how you scored across all nine types and which one fits you best.',
    'landing.start': 'Start the assessment',
    'landing.startFull': 'Full questionnaire',
    'landing.countFull': '{n} questions',
    'landing.startShort': 'Short version',
    'landing.countShort': '{n} questions (3 per type)',

    'progress.counter': 'Question {current} of {total}',

    'assessment.section': 'Section {current} of {total}',
    'assessment.sectionDone': 'Section {current} of {total} complete',
    'assessment.sectionDoneBody':
      'Your progress is saved. You can continue now or come back later.',
    'assessment.continue': 'Continue',
    'assessment.saveExit': 'Save and exit',

    'hub.resumeTitle': 'Continue where you left off',
    'hub.resumeDetail': 'Section {current} of {total}',
    'hub.lastResultTitle': 'See last result',
    'hub.lastResultDetail': 'Your saved result',
    'hub.startNew': 'Or start fresh',
    'hub.overwriteConfirm': 'This will discard your saved progress. Start over?',
    'hub.overwriteYes': 'Start over',
    'hub.cancel': 'Cancel',

    'scale.1': 'Completely disagree',
    'scale.2': 'Disagree',
    'scale.3': 'Neutral',
    'scale.4': 'Agree',
    'scale.5': 'Completely agree',

    'nav.back': '← Back',

    'results.heading': 'Your result',
    'results.shortWarning':
      'You took the short version (3 questions per type). This result is an estimate — for something more accurate, retake it with the full questionnaire.',
    'results.bestFitLabel': 'Your dominant type',
    'results.typeN': 'Type {n}',
    'results.chartLabel': 'Your profile',
    'results.chartTitle': 'How you scored across each type',
    'results.strengths': 'Strengths',
    'results.weaknesses': 'Blind spots',
    'results.sin': 'Core sin',
    'results.triad': 'Triad',
    'results.expression': 'How it expresses',
    'results.lines': 'Lines',
    'results.stressLine': 'Under stress, moves toward type {n} ({name})',
    'results.securityLine': 'In security, moves toward type {n} ({name})',
    'results.stressTitle': 'Under stress',
    'results.securityTitle': 'In security',
    'results.towardType': 'Moves toward Type {n} · {name}',
    'results.ranking': 'Score by type',
    'results.restart': '← Start over',
  },
}
