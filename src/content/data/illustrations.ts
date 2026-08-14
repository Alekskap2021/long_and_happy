/**
 * Иллюстрации проекта: абстрактные, без лиц и без надписей. Живут отдельно
 * от страниц — сущности ссылаются на них по ключу, как на ассет в CMS.
 */
export const illustrations = {
  "dialog-loop": {
    src: "/images/illustrations/dialog-loop.jpg",
    alt: "Две округлые фигуры друг напротив друга, между ними линия, замыкающаяся в петлю",
    caption: "Разговор возвращается в ту же точку, пока цель остаётся незакрытой",
  },
  "money-pair": {
    src: "/images/illustrations/money-pair.jpg",
    alt: "Две фигуры по краям и круг между ними, разделённый линией на две части",
    caption: "Спор идёт о сумме, а обсуждается то, как делится общая жизнь",
  },
  "seven-steps": {
    src: "/images/illustrations/seven-steps.jpg",
    alt: "Круги, выстроенные по дуге, последний закрашен",
    caption: "Пошаговая подготовка к одному конкретному разговору",
  },
  "method-core": {
    src: "/images/illustrations/method-core.jpg",
    alt: "Несколько дуг, проходящих через одну точку",
    caption: "Разные темы, один способ смотреть на разговор",
  },
  divergence: {
    src: "/images/illustrations/divergence.jpg",
    alt: "Три пары точек: в двух линия соединяет их, в третьей расходится",
    caption: "Иногда цель и способ идут в разные стороны",
  },
  library: {
    src: "/images/illustrations/library.jpg",
    alt: "Несколько наложенных листов с тонкими линиями записей",
    caption: "Разборы, рабочие листы и карточки, которыми можно пользоваться сразу",
  },
} as const;

export type IllustrationKey = keyof typeof illustrations;

export function getIllustration(key: IllustrationKey) {
  return illustrations[key];
}
