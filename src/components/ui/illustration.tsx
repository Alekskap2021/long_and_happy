import type { ReactNode } from "react";

import {
  getIllustration,
  type IllustrationKey,
} from "@/content/data/illustrations";

/**
 * Иллюстрации нарисованы вектором на токенах палитры: при смене темы
 * графика меняется вместе с интерфейсом, а не остаётся чужим пятном.
 * Абстракция, без лиц и надписей.
 */

const canvas = { viewBox: "0 0 1200 700" } as const;

function Art({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox={canvas.viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full"
    >
      {children}
    </svg>
  );
}

/** Разговор, который возвращается в ту же точку. */
function DialogLoop() {
  return (
    <Art>
      <circle
        cx="250"
        cy="330"
        r="292"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.16"
      />
      <ellipse cx="250" cy="330" rx="215" ry="240" fill="var(--accent)" opacity="0.5" />
      <ellipse cx="960" cy="370" rx="200" ry="230" fill="var(--second)" opacity="0.44" />
      <path
        d="M470 360 C 545 300 585 300 615 330 C 650 366 615 415 585 395 C 552 373 585 320 660 330 C 715 338 720 372 755 372"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Art>
  );
}

/** Общий ресурс, который делится на две неравные части. */
function MoneyPair() {
  return (
    <Art>
      <circle
        cx="600"
        cy="350"
        r="242"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.16"
      />
      <ellipse cx="215" cy="350" rx="140" ry="188" fill="var(--accent)" opacity="0.5" />
      <ellipse cx="985" cy="350" rx="140" ry="188" fill="var(--second)" opacity="0.44" />
      {[
        [355, 452],
        [845, 748],
      ].map(([from, to]) => (
        <line
          key={from}
          x1={from}
          y1="350"
          x2={to}
          y2="350"
          stroke="var(--ink)"
          strokeWidth="3"
          opacity="0.32"
        />
      ))}
      <circle cx="600" cy="350" r="148" fill="var(--paper-card)" />
      <path d="M600 202 A 148 148 0 0 1 600 498 Z" fill="var(--accent)" opacity="0.6" />
      <line
        x1="600"
        y1="196"
        x2="600"
        y2="504"
        stroke="var(--paper)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Art>
  );
}

/** Пошаговая подготовка: шесть кругов и один закрытый шаг. */
function SevenSteps() {
  const points = [
    [120, 512],
    [281, 468],
    [442, 428],
    [603, 392],
    [764, 360],
    [925, 332],
    [1086, 308],
  ] as const;

  return (
    <Art>
      <path
        d="M0 560 C 320 548 520 400 1200 300 L1200 372 C 520 470 320 620 0 632 Z"
        fill="var(--second)"
        opacity="0.18"
      />
      {points.map(([x, y], index) => {
        const last = index === points.length - 1;
        return (
          <circle
            key={x}
            cx={x}
            cy={y}
            r="44"
            fill={last ? "var(--accent)" : "none"}
            stroke={last ? "none" : "var(--ink)"}
            strokeWidth="3.5"
            opacity={last ? 0.9 : 0.45}
          />
        );
      })}
    </Art>
  );
}

/** Ядро метода: разные слои проходят через одну точку. */
function MethodCore() {
  const radii = [95, 165, 245, 335, 435];

  return (
    <Art>
      <path
        d="M1200 700 L1200 340 C 985 395 890 545 852 700 Z"
        fill="var(--accent)"
        opacity="0.16"
      />
      {radii.map((r) => (
        <circle
          key={r}
          cx={300 + r}
          cy="400"
          r={r}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
          opacity="0.4"
        />
      ))}
      <circle cx="300" cy="400" r="19" fill="var(--accent)" />
    </Art>
  );
}

/** Цель и способ: две связки держатся, третья расходится. */
function Divergence() {
  return (
    <Art>
      <circle cx="930" cy="372" r="190" fill="var(--accent)" opacity="0.13" />
      {[
        [230, 430],
        [520, 720],
      ].map(([from, to]) => (
        <g key={from}>
          <line
            x1={from}
            y1="372"
            x2={to}
            y2="372"
            stroke="var(--ink)"
            strokeWidth="4"
            opacity="0.5"
          />
          <circle cx={from} cy="372" r="17" fill="var(--ink)" opacity="0.7" />
          <circle cx={to} cy="372" r="17" fill="var(--ink)" opacity="0.7" />
        </g>
      ))}
      <line
        x1="822"
        y1="372"
        x2="1032"
        y2="288"
        stroke="var(--ink)"
        strokeWidth="4"
        opacity="0.5"
      />
      <line
        x1="822"
        y1="372"
        x2="1032"
        y2="458"
        stroke="var(--accent)"
        strokeWidth="4"
        opacity="0.75"
      />
      <circle cx="822" cy="372" r="17" fill="var(--ink)" opacity="0.7" />
      <circle cx="1032" cy="288" r="17" fill="var(--ink)" opacity="0.7" />
      <circle cx="1032" cy="458" r="20" fill="var(--accent)" />
    </Art>
  );
}

/** Библиотека: наложенные листы с намёком на строки. */
function Library() {
  const sheets = [
    { x: 150, y: 130, rotate: -7, fill: "var(--second)", opacity: 0.28, lines: true },
    { x: 420, y: 90, rotate: 5, fill: "var(--accent)", opacity: 0.72, lines: false },
    { x: 610, y: 155, rotate: -3, fill: "var(--paper-card)", opacity: 1, lines: true },
    { x: 860, y: 115, rotate: 8, fill: "var(--paper-deep)", opacity: 1, lines: true },
  ] as const;

  return (
    <Art>
      {sheets.map((sheet) => (
        <g
          key={sheet.x}
          transform={`rotate(${sheet.rotate} ${sheet.x + 100} ${sheet.y + 190})`}
        >
          <rect
            x={sheet.x}
            y={sheet.y}
            width="230"
            height="390"
            rx="12"
            fill={sheet.fill}
            opacity={sheet.opacity}
            stroke="var(--line-strong)"
            strokeWidth="2"
          />
          {sheet.lines &&
            [0, 1, 2, 3].map((line) => (
              <line
                key={line}
                x1={sheet.x + 34}
                y1={sheet.y + 96 + line * 34}
                x2={sheet.x + (line === 3 ? 130 : 196)}
                y2={sheet.y + 96 + line * 34}
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.28"
              />
            ))}
        </g>
      ))}
    </Art>
  );
}

/**
 * Якорь первого экрана: одна сцена и два слышания. Два полупрозрачных круга
 * пересекаются — область пересечения проявляется сама, без blend-режимов,
 * поэтому композиция одинаково читается в светлых и тёмных палитрах.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <svg
        viewBox="0 0 1000 820"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {[360, 430, 505].map((r) => (
          <circle
            key={r}
            cx="520"
            cy="415"
            r={r}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            opacity="0.14"
          />
        ))}
        <circle cx="385" cy="400" r="268" fill="var(--accent)" opacity="0.42" />
        <circle cx="655" cy="432" r="296" fill="var(--second)" opacity="0.38" />
        <path
          d="M-40 690 C 120 690 150 600 205 600 C 262 600 268 672 222 682 C 176 692 168 618 250 596 C 330 575 372 604 430 585"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

const art: Record<IllustrationKey, () => ReactNode> = {
  "dialog-loop": DialogLoop,
  "money-pair": MoneyPair,
  "seven-steps": SevenSteps,
  "method-core": MethodCore,
  divergence: Divergence,
  library: Library,
};

/* Пропорции кадров считаны от холста рисунка 1200×700: `block` совпадает с ним
   один в один, поэтому композиция в колонке видна целиком, а широкая полоса и
   превью работают как осознанная обрезка. */
const variants = {
  band: "aspect-[16/9] sm:aspect-[16/6]",
  block: "aspect-[12/7]",
  thumb: "aspect-[16/5]",
} as const;

/**
 * `band` — широкая полоса-передышка внутри длинного текста.
 * `block` — иллюстрация в колонке рядом с текстом.
 * `thumb` — превью в списке.
 */
export function Illustration({
  name,
  variant = "band",
  showCaption = true,
  className = "",
}: {
  name: IllustrationKey;
  variant?: "band" | "block" | "thumb";
  showCaption?: boolean;
  className?: string;
}) {
  const { alt, caption } = getIllustration(name);
  const Piece = art[name];

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className={`grain wash-quiet overflow-hidden rounded-card ${variants[variant]}`}
      >
        <Piece />
      </div>

      {showCaption && caption && (
        <figcaption className="mt-3.5 flex gap-3 text-[0.88rem] leading-relaxed text-ink-muted">
          <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent-edge" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Фоновая плоскость для крупных кадров: та же графика без подписи и рамки.
 * Позиционирование задаёт вызывающая сторона — плоскость должна выходить
 * за край экрана, а не сидеть в аккуратной рамке.
 */
export function BackdropArt({
  name,
  className = "",
  opacity = 0.5,
}: {
  name: IllustrationKey;
  className?: string;
  opacity?: number;
}) {
  const Piece = art[name];

  return (
    <div
      aria-hidden
      style={{ opacity }}
      className={`pointer-events-none absolute ${className}`}
    >
      <Piece />
    </div>
  );
}
