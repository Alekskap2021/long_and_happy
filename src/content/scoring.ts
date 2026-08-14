import type {
  DiagnosticAction,
  DiagnosticAnswers,
  DiagnosticIntent,
  DiagnosticResult,
} from "./schemas";
import { getTheme } from "./repository";
import type { ThemeSlug } from "./taxonomy";

/**
 * Методика подсчёта живёт на сервере: клиент отправляет ответы и
 * получает готовый результат. Логика ниже — рабочая заглушка
 * прототипа, её заменит авторская методика.
 */

const intentLabels: Record<DiagnosticIntent, string> = {
  close: "вернуть близость",
  understood: "быть понятым",
  agreement: "договориться",
  safety: "остановить напряжение",
  justice: "получить признание вины",
};

const actionLabels: Record<DiagnosticAction, string> = {
  ask: "прямо просить и называть свои ходы",
  explain: "объяснять и доказывать",
  press: "настаивать и давить",
  accuse: "предъявлять и обвинять",
  withdraw: "выходить из разговора",
  probe: "задавать вопросы, на которые есть один верный ответ",
};

/** Действия, которые действительно работают на цель. */
const servingActions: Record<DiagnosticIntent, DiagnosticAction[]> = {
  close: ["ask"],
  understood: ["ask", "explain"],
  agreement: ["ask", "explain"],
  safety: ["ask"],
  justice: ["accuse", "press", "probe"],
};

const themeByAction: Record<DiagnosticAction, ThemeSlug> = {
  withdraw: "pauza-i-molchanie",
  accuse: "prosby-i-pomoshch",
  probe: "trudnye-razgovory",
  press: "trudnye-razgovory",
  explain: "trudnye-razgovory",
  ask: "trudnye-razgovory",
};

function dominant<T extends string>(values: T[]): T {
  const counts = values.reduce<Map<T, number>>((acc, value) => {
    acc.set(value, (acc.get(value) ?? 0) + 1);
    return acc;
  }, new Map());

  let winner = values[0];
  let best = 0;
  for (const [value, count] of counts) {
    if (count > best) {
      winner = value;
      best = count;
    }
  }
  return winner;
}

function themeHref(slug: ThemeSlug): string {
  const theme = getTheme(slug);
  return theme && theme.status === "published"
    ? `/temy/${slug}`
    : `/besplatno?theme=${slug}`;
}

function themeTitle(slug: ThemeSlug): string {
  return getTheme(slug)?.cardTitle ?? "Тематический раздел";
}

export function scoreDiagnostic(input: DiagnosticAnswers): DiagnosticResult {
  const intents = input.answers.map((answer) => answer.intent);
  const actions = input.answers.map((answer) => answer.action);

  const dominantIntent = dominant(intents);
  const dominantAction = dominant(actions);
  const safetyRoute = input.answers.some((answer) => answer.safetyFlag === true);

  const divergenceCount = input.answers.filter(
    (answer) => !servingActions[answer.intent].includes(answer.action),
  ).length;

  const divergenceLevel: DiagnosticResult["divergenceLevel"] =
    divergenceCount === 0 ? "aligned" : divergenceCount === 1 ? "partial" : "wide";

  const reading: string[] = [];

  reading.push(
    `Чаще всего в трудном разговоре вы хотите ${intentLabels[dominantIntent]}. Словами вы при этом склонны ${actionLabels[dominantAction]}.`,
  );

  if (divergenceLevel === "wide") {
    reading.push(
      "В большинстве ситуаций способ работает против цели: действие, которое вы выбираете, вынуждает другого защищаться, и цель остаётся незакрытой. Именно поэтому такой разговор возвращается.",
    );
  } else if (divergenceLevel === "partial") {
    reading.push(
      "В одной из трёх ситуаций цель и способ разошлись. Обычно это и есть та сцена, которая повторяется чаще других.",
    );
  } else if (dominantIntent === "justice") {
    reading.push(
      "Расхождения почти нет: вы добиваетесь именно того, чего хотите. Вопрос в цене — признание вины редко возвращает близость, поэтому разговор заканчивается вашей правотой и общим отчуждением.",
    );
  } else {
    reading.push(
      "Цель и способ у вас в основном совпадают. Значит, работать стоит не с формулировками, а с тем, какой ответ другого вы готовы принять.",
    );
  }

  if (dominantAction === "withdraw") {
    reading.push(
      "Отдельно стоит посмотреть на выход из разговора: названная пауза сохраняет контакт, а молчание без объяснения читается другим как наказание.",
    );
  }

  const nextSteps: DiagnosticResult["nextSteps"] = [];

  if (safetyRoute) {
    nextSteps.push({
      kind: "consultation",
      title: "Начните не с курса",
      body: "В одном из ответов вы отметили страх реакции другого человека. Это не тема навыка разговора: здесь уместнее индивидуальная работа и разговор о безопасности.",
      href: "/konsultacii",
      label: "Перейти к консультациям",
    });
  }

  if (divergenceLevel === "wide") {
    nextSteps.push({
      kind: "course",
      title: "Освоить общий метод",
      body: "Расхождение повторяется в разных ситуациях — значит, дело не в теме. Базовый курс даёт воспроизводимый способ замечать своё действие до того, как оно случится.",
      href: "/kursy/bazovyy-kurs",
      label: "Базовый курс",
    });
    nextSteps.push({
      kind: "practicum",
      title: "Подготовить один разговор",
      body: "Если есть конкретный разговор, который вы откладываете, начните с практикума — он решает одну ситуацию, а не весь сценарий.",
      href: "/kursy/7-shagov-do-vazhnogo-razgovora",
      label: "7 шагов до важного разговора",
    });
  } else {
    nextSteps.push({
      kind: "practicum",
      title: "Подготовить один разговор",
      body: "Возьмите ближайший трудный разговор и пройдите его семь шагов: цель, действие, допустимые ответы, план на «нет».",
      href: "/kursy/7-shagov-do-vazhnogo-razgovora",
      label: "7 шагов до важного разговора",
    });
    nextSteps.push({
      kind: "course",
      title: "Освоить общий метод",
      body: "Если захочется переносить эту оптику на другие темы, базовый курс собирает её целиком.",
      href: "/kursy/bazovyy-kurs",
      label: "Базовый курс",
    });
  }

  const themeSlug = themeByAction[dominantAction];
  const themePublished = getTheme(themeSlug)?.status === "published";
  nextSteps.push({
    kind: "theme",
    title: "Разобраться в своей теме бесплатно",
    body: themePublished
      ? `Ваш частый ход в разговоре ближе всего к теме «${themeTitle(themeSlug)}». Там есть авторский разбор и упражнения, за которые не нужно платить.`
      : `Ваш частый ход в разговоре ближе всего к теме «${themeTitle(themeSlug)}». Авторский разбор этой темы готовится — пока посмотрите бесплатные материалы по ней.`,
    href: themeHref(themeSlug),
    label: themePublished ? "Открыть тему" : "Материалы по теме",
  });

  const headline =
    divergenceLevel === "wide"
      ? `Вы хотите ${intentLabels[dominantIntent]}, но добиваетесь этого способом, который закрывает разговор`
      : divergenceLevel === "partial"
        ? `Вы хотите ${intentLabels[dominantIntent]} — и в одной сцене способ вам мешает`
        : `Вы хотите ${intentLabels[dominantIntent]} и действуете согласованно с этой целью`;

  return {
    dominantIntent,
    dominantAction,
    intentLabel: intentLabels[dominantIntent],
    actionLabel: actionLabels[dominantAction],
    divergenceCount,
    divergenceLevel,
    headline,
    reading,
    safetyRoute,
    nextSteps,
  };
}
