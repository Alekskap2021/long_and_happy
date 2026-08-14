import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

type Tone = "paper" | "deep" | "band" | "wash";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  deep: "bg-paper-deep",
  band: "band-scope grain bg-band text-on-band",
  wash: "wash",
};

/**
 * Одна секция — одна задача: надзаголовок, заголовок и одна поддерживающая
 * фраза. Ритм задаётся вертикальными отступами, а не рамками.
 */
export function Section({
  children,
  eyebrow,
  title,
  body,
  aside,
  tone = "paper",
  id,
  className = "",
}: {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  body?: string;
  aside?: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  const hasHeader = Boolean(eyebrow || title || body);

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 ${tones[tone]} ${className}`}
    >
      <div className="container-page relative">
        {hasHeader && (
          <Reveal
            as="header"
            className={`mb-14 flex flex-col gap-6 ${
              aside ? "lg:flex-row lg:items-end lg:justify-between" : ""
            }`}
          >
            <div className="max-w-[42rem]">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && <h2 className="mt-4 text-title">{title}</h2>}
              {body && (
                <p className="mt-5 text-lead text-ink-soft">{body}</p>
              )}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span aria-hidden className="h-px w-6 bg-accent-edge" />
      {children}
    </p>
  );
}

/**
 * Шапка страницы: тот же язык, что у секций, но с h1 и мягкой плоскостью.
 */
export function PageHeader({
  eyebrow,
  title,
  body,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="wash grain relative overflow-hidden border-b border-line">
      <div className="container-page relative py-16 sm:py-24">
        <div
          className={`flex flex-col gap-10 ${
            aside ? "lg:flex-row lg:items-start lg:justify-between lg:gap-16" : ""
          }`}
        >
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-display">{title}</h1>
            {body && <p className="mt-6 text-lead text-ink-soft">{body}</p>}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
          {aside && (
            <Reveal delay={80} className="lg:w-[26rem] lg:shrink-0">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
