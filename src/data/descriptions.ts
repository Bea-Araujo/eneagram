import type { EnneagramTypeDescription, LocalizedText } from '../types/enneagram'

/**
 * AUTHORED CONTENT — REVIEW BEFORE SHIPPING.
 *
 * These descriptions were drafted from standard Enneagram material (not from the
 * Obsidian vault) to fill out the results screen. Edit the voice, length, and
 * emphasis freely, and add `en` translations when ready. This file is hand-owned;
 * the question/type generator never touches it.
 */
export const DESCRIPTIONS: readonly EnneagramTypeDescription[] = [
  {
    type: 1,
    summary: {
      pt: 'O Perfeccionista é guiado por um forte senso interno de certo e errado e pela vontade de melhorar a si mesmo e o mundo à sua volta. Valoriza integridade, ordem e fazer as coisas da maneira correta.',
    },
    strengths: [
      { pt: 'Íntegro e confiável: faz o que promete.' },
      { pt: 'Organizado, disciplinado e atento aos detalhes.' },
      { pt: 'Justo e com forte senso ético.' },
      { pt: 'Comprometido com a melhoria contínua.' },
    ],
    weaknesses: [
      { pt: 'Crítico consigo e com os outros.' },
      { pt: 'Rígido e resistente a mudanças.' },
      { pt: 'Acumula ressentimento e tem dificuldade de perdoar.' },
      { pt: 'Autocobrança que dificulta relaxar.' },
    ],
    sinDescription: {
      pt: 'A ira do Um raramente explode; vira um ressentimento silencioso e crônico — uma irritação constante com o que está "errado" em si, nos outros e no mundo, reprimida em nome do autocontrole.',
    },
    stress: {
      pt: 'Sob estresse, o Um pega o lado sombrio do Tipo 4: perde a compostura racional e afunda em melancolia, autocrítica e sensação de ser incompreendido. Fica mal-humorado e emotivo. Atenção quando o perfeccionismo virar desânimo e a sensação de que nada vale a pena.',
    },
    security: {
      pt: 'Em segurança, o Um incorpora o melhor do Tipo 7: relaxa o rigor e se permite espontaneidade, prazer e leveza. Aceita que as coisas não precisam ser perfeitas para serem boas e se abre para a alegria e a experimentação.',
    },
  },
  {
    type: 2,
    summary: {
      pt: 'O Auxiliador se realiza cuidando dos outros e construindo relações próximas. É caloroso e generoso, e costuma perceber o que as pessoas precisam antes mesmo de pedirem.',
    },
    strengths: [
      { pt: 'Empático e atento às necessidades alheias.' },
      { pt: 'Caloroso, acolhedor e generoso.' },
      { pt: 'Bom ouvinte, cria conexões genuínas.' },
      { pt: 'Dedicado às pessoas de quem gosta.' },
    ],
    weaknesses: [
      { pt: 'Dificuldade de dizer "não" e de impor limites.' },
      { pt: 'Negligencia as próprias necessidades.' },
      { pt: 'Busca reconhecimento e pode se sentir pouco valorizado.' },
      { pt: 'Pode se tornar possessivo ou controlador ao ajudar.' },
    ],
    sinDescription: {
      pt: 'A soberba do Dois está em acreditar, no fundo, que é indispensável — que os outros precisam dele e que ele sabe do que precisam melhor que eles mesmos. É o orgulho disfarçado de generosidade.',
    },
    stress: {
      pt: 'Sob estresse, o Dois vai para o lado sombrio do Tipo 8: a doçura dá lugar à raiva e ao controle. Cobra reconhecimento de forma agressiva e torna-se dominador e ressentido com quem "não retribui". Atenção quando o cuidado virar exigência e manipulação.',
    },
    security: {
      pt: 'Em segurança, o Dois acessa o melhor do Tipo 4: volta a atenção para dentro, reconhece as próprias necessidades e emoções e passa a cuidar de si com a mesma dedicação que oferece aos outros.',
    },
  },
  {
    type: 3,
    summary: {
      pt: 'O Realizador é orientado a metas, eficiente e movido pela vontade de ter sucesso e ser reconhecido. Adapta-se bem e sabe como causar boa impressão.',
    },
    strengths: [
      { pt: 'Motivado, produtivo e focado em resultados.' },
      { pt: 'Adaptável e seguro em ambientes competitivos.' },
      { pt: 'Inspira e mobiliza pessoas.' },
      { pt: 'Prático e eficiente em realizar tarefas.' },
    ],
    weaknesses: [
      { pt: 'Tendência ao excesso de trabalho (workaholic).' },
      { pt: 'Preocupação exagerada com a imagem e o status.' },
      { pt: 'Dificuldade de acessar e expressar emoções.' },
      { pt: 'Competitividade que pode atropelar os outros.' },
    ],
    sinDescription: {
      pt: 'O engano do Três é, antes de tudo, o autoengano: confunde-se com a própria imagem de sucesso. Para vencer e impressionar, molda o que mostra — e acaba perdendo contato com quem realmente é por baixo das conquistas.',
    },
    stress: {
      pt: 'Sob estresse, o Três vai para o lado sombrio do Tipo 9: depois de muito correr, trava. Entra em apatia, procrastinação e desligamento, incapaz de produzir. Atenção quando a energia incansável desabar em paralisia e evitação.',
    },
    security: {
      pt: 'Em segurança, o Três incorpora o melhor do Tipo 6: deixa de competir sozinho e passa a cooperar, comprometendo-se com o grupo e com algo maior que o próprio sucesso. Torna-se leal e mais autêntico.',
    },
  },
  {
    type: 4,
    summary: {
      pt: 'O Romântico busca autenticidade, profundidade emocional e uma identidade única. Sente as coisas intensamente e valoriza o que o torna diferente.',
    },
    strengths: [
      { pt: 'Criativo e com sensibilidade estética apurada.' },
      { pt: 'Autêntico e fiel a si mesmo.' },
      { pt: 'Empático com a dor e o sofrimento alheios.' },
      { pt: 'Profundidade emocional e autoconhecimento.' },
    ],
    weaknesses: [
      { pt: 'Tendência à melancolia e à introspecção excessiva.' },
      { pt: 'Compara-se aos outros e sente inveja do que lhes falta.' },
      { pt: 'Instabilidade emocional e dramaticidade.' },
      { pt: 'Sensação persistente de não pertencer.' },
    ],
    sinDescription: {
      pt: 'A inveja do Quatro é a sensação constante de que lhe falta algo — que os outros têm uma plenitude, um pertencimento ou uma felicidade que a ele foi negada. Vive comparando o próprio interior ao exterior dos outros.',
    },
    stress: {
      pt: 'Sob estresse, o Quatro vai para o lado sombrio do Tipo 2: torna-se dependente e carente, agarra-se às pessoas e tenta conquistar amor se superdoando. Atenção quando a busca por identidade virar necessidade ansiosa de aprovação alheia.',
    },
    security: {
      pt: 'Em segurança, o Quatro acessa o melhor do Tipo 1: canaliza a intensidade emocional em disciplina e ação concreta. Para de esperar a inspiração perfeita e passa a realizar, com método e objetividade.',
    },
  },
  {
    type: 5,
    summary: {
      pt: 'O Investigador busca entender o mundo por meio do conhecimento e da observação. Valoriza autonomia, privacidade e economiza sua energia e seus recursos.',
    },
    strengths: [
      { pt: 'Analítico, perspicaz e curioso.' },
      { pt: 'Independente e autossuficiente.' },
      { pt: 'Calmo e objetivo em situações de crise.' },
      { pt: 'Especialista nos assuntos que lhe interessam.' },
    ],
    weaknesses: [
      { pt: 'Distante e tende ao isolamento.' },
      { pt: 'Avareza de tempo, energia e afeto.' },
      { pt: 'Dificuldade de se abrir e de lidar com emoções.' },
      { pt: 'Excesso de análise que atrasa a ação.' },
    ],
    sinDescription: {
      pt: 'A avareza do Cinco não é por dinheiro, mas por si mesmo: economiza tempo, energia, presença e afeto, como se tivesse pouquíssimo a oferecer. Recua do mundo para não se esgotar.',
    },
    stress: {
      pt: 'Sob estresse, o Cinco vai para o lado sombrio do Tipo 7: a mente desacelerada dispara em dispersão, impulsividade e fuga para distrações. Atenção quando a concentração habitual virar inquietação e incapacidade de parar de pensar.',
    },
    security: {
      pt: 'Em segurança, o Cinco incorpora o melhor do Tipo 8: sai da cabeça e entra no corpo e na ação. Torna-se assertivo, confiante e presente, colocando seu conhecimento a serviço do mundo em vez de apenas acumulá-lo.',
    },
  },
  {
    type: 6,
    summary: {
      pt: 'O Leal é guiado pela busca de segurança e confiança. Comprometido e responsável, antecipa problemas e se prepara para o que pode dar errado.',
    },
    strengths: [
      { pt: 'Leal e comprometido com pessoas e causas.' },
      { pt: 'Responsável e confiável.' },
      { pt: 'Bom em prever riscos e se preparar.' },
      { pt: 'Colaborativo e protetor do grupo.' },
    ],
    weaknesses: [
      { pt: 'Ansiedade e preocupação constantes.' },
      { pt: 'Desconfiança e dúvida em relação aos outros.' },
      { pt: 'Indecisão diante de escolhas importantes.' },
      { pt: 'Pensamento catastrófico.' },
    ],
    sinDescription: {
      pt: 'O medo do Seis é a desconfiança básica de que o mundo não é seguro. A mente vive antecipando ameaças e buscando certezas e garantias — mas, como nenhuma basta, a dúvida nunca descansa.',
    },
    stress: {
      pt: 'Sob estresse, o Seis vai para o lado sombrio do Tipo 3: tenta compensar a insegurança com desempenho e imagem, torna-se competitivo e workaholic, ignorando o próprio cansaço. Atenção quando a ansiedade virar correria por aprovação.',
    },
    security: {
      pt: 'Em segurança, o Seis acessa o melhor do Tipo 9: a mente agitada se aquieta, confia mais e relaxa. Para de brigar com cenários imaginários e encontra uma calma estável, aceitando que nem tudo precisa ser controlado.',
    },
  },
  {
    type: 7,
    summary: {
      pt: 'O Entusiasta é otimista e cheio de energia, sempre em busca de novas experiências e possibilidades. Gosta de manter as opções abertas e evitar a dor e o tédio.',
    },
    strengths: [
      { pt: 'Otimista e contagiante.' },
      { pt: 'Versátil, curioso e cheio de ideias.' },
      { pt: 'Espontâneo e energético.' },
      { pt: 'Resiliente: encontra o lado bom das situações.' },
    ],
    weaknesses: [
      { pt: 'Dispersão e dificuldade de concluir o que começa.' },
      { pt: 'Dificuldade com compromissos e rotina.' },
      { pt: 'Evita emoções difíceis e desconforto.' },
      { pt: 'Impulsividade e excessos.' },
    ],
    sinDescription: {
      pt: 'A gula do Sete é a fome insaciável por experiências, estímulos e possibilidades — sempre mais, sempre o próximo. É a tentativa de preencher um vazio interno evitando qualquer dor, tédio ou limitação.',
    },
    stress: {
      pt: 'Sob estresse, o Sete vai para o lado sombrio do Tipo 1: o otimista despreocupado vira crítico, perfeccionista e irritadiço, cobrando os outros e a si mesmo. Atenção quando a leveza virar rigidez e julgamento.',
    },
    security: {
      pt: 'Em segurança, o Sete incorpora o melhor do Tipo 5: desacelera, aprofunda e foca. Em vez de saltar de ideia em ideia, mergulha em uma, encontrando satisfação na profundidade e no silêncio.',
    },
  },
  {
    type: 8,
    summary: {
      pt: 'O Contestador é forte, direto e protetor. Busca manter o controle da própria vida, defende os mais fracos e não teme o confronto.',
    },
    strengths: [
      { pt: 'Assertivo e decidido.' },
      { pt: 'Protetor dos que considera seus.' },
      { pt: 'Corajoso e firme sob pressão.' },
      { pt: 'Liderança natural e senso de justiça.' },
    ],
    weaknesses: [
      { pt: 'Autoritário e dominador.' },
      { pt: 'Impaciente e explosivo.' },
      { pt: 'Dificuldade de mostrar vulnerabilidade.' },
      { pt: 'Confronto excessivo, mesmo quando desnecessário.' },
    ],
    sinDescription: {
      pt: 'A luxúria do Oito é a sede de intensidade: tudo em excesso, no volume máximo. É a vontade de sentir a vida com força total e de exercer poder sobre o próprio mundo, evitando a todo custo parecer fraco.',
    },
    stress: {
      pt: 'Sob estresse, o Oito vai para o lado sombrio do Tipo 5: recua, se isola e se fecha, desconfiado e distante. A força externa vira retração estratégica. Atenção quando a presença dominante sumir de repente num muro de silêncio.',
    },
    security: {
      pt: 'Em segurança, o Oito acessa o melhor do Tipo 2: baixa a guarda e deixa o coração aparecer. Usa a força para proteger e cuidar, torna-se generoso e aberto, permitindo-se a vulnerabilidade que costuma esconder.',
    },
  },
  {
    type: 9,
    summary: {
      pt: 'O Pacificador valoriza a harmonia, a paz interior e a boa convivência. É acolhedor e estável, e tende a evitar conflitos e a se adaptar aos outros.',
    },
    strengths: [
      { pt: 'Calmo, tranquilo e estável.' },
      { pt: 'Acolhedor e fácil de conviver.' },
      { pt: 'Bom mediador: enxerga todos os lados.' },
      { pt: 'Paciente e receptivo.' },
    ],
    weaknesses: [
      { pt: 'Inércia e procrastinação.' },
      { pt: 'Evita conflitos a qualquer custo.' },
      { pt: 'Teimosia passiva diante de pressão.' },
      { pt: 'Esquece as próprias prioridades e se apaga.' },
    ],
    sinDescription: {
      pt: 'A preguiça do Nove não é física, mas de si mesmo: a inércia em se priorizar, em se posicionar, em acordar para a própria vida. Para manter a paz, adormece as próprias vontades e opiniões.',
    },
    stress: {
      pt: 'Sob estresse, o Nove vai para o lado sombrio do Tipo 6: a calma dá lugar à ansiedade, à desconfiança e ao pensamento catastrófico. Fica agitado e inseguro. Atenção quando a tranquilidade habitual virar preocupação e indecisão nervosa.',
    },
    security: {
      pt: 'Em segurança, o Nove incorpora o melhor do Tipo 3: desperta a energia e o foco, passa a agir em causa própria e a perseguir objetivos. Sai da passividade e assume o protagonismo da própria vida.',
    },
  },
]

/**
 * Friendly, localized labels for the vault's raw "expression" values
 * (how a type channels its core emotion). Keyed by the raw Portuguese value.
 */
export const EXPRESSION_LABELS: Record<string, LocalizedText> = {
  Internaliza: {
    pt: 'Para dentro — internaliza a emoção',
    en: 'Inward — internalizes the emotion',
  },
  Externalizar: {
    pt: 'Para fora — externaliza a emoção',
    en: 'Outward — externalizes the emotion',
  },
  Esquecimento: {
    pt: 'Deixa de lado — anestesia a emoção',
    en: 'Pushes aside — numbs the emotion',
  },
}
