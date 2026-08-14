import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthorsPortrait } from "@/components/authors/authors-portrait";
import { methodSteps, startingPoints } from "@/content/data/home";
import {
  getAuthors,
  getAuthorsIntro,
  getMaterials,
  getThemes,
} from "@/content/repository";
import type { HomeBlock } from "@/content/schemas";
import { formatLabels, themeLabels } from "@/content/taxonomy";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BackdropArt, HeroArt } from "@/components/ui/illustration";
import { ListLink } from "@/components/ui/list-link";
import { Note } from "@/components/ui/note";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

const diagnosticHref = "/diagnostika/chto-vy-delaete-slovami";

function themeHref(slug: string, published: boolean) {
  return published ? `/temy/${slug}` : `/besplatno?theme=${slug}`;
}

/**
 * Первый экран: бренд, один заголовок, одна поддерживающая фраза, одна группа
 * действий и одна доминирующая плоскость. Ничего больше.
 */
function HeroBlock({ block }: { block: HomeBlock }) {
  return (
    <section className="wash grain relative overflow-hidden border-b border-line">
      {/* На узком экране плоскость уходит под нижний край, чтобы не спорить
          с кнопками; с sm занимает правую половину кадра. */}
      <HeroArt className="-bottom-[20%] -right-[42%] h-[42%] w-[118%] sm:-right-[14%] sm:bottom-auto sm:top-0 sm:h-full sm:w-[62%]" />

      <div className="container-page relative flex min-h-[min(86svh,44rem)] flex-col justify-center py-20 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Вероника и Игорь · психологи
          </p>
          <h1 className="mt-7 font-display text-brand font-medium">
            Долго
            <br />
            и счастливо
          </h1>
        </Reveal>

        <Reveal delay={90} className="mt-12 max-w-[34rem]">
          <p className="font-display text-title">{block.title}</p>
          {block.body && (
            <p className="mt-5 text-lead text-ink-soft">{block.body}</p>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={diagnosticHref} size="lg">
              Пройти диагностику
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
            <ButtonLink href="/besplatno" variant="secondary" size="lg">
              Начать бесплатно
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Узнавание сцены: реплики набраны «голосом», а не упакованы в витрину. */
function SituationsBlock({ block }: { block: HomeBlock }) {
  const themes = getThemes().slice(0, 6);

  return (
    <Section
      id="situations"
      eyebrow={block.eyebrow}
      title={block.title}
      body={block.body}
      tone="deep"
    >
      <Reveal>
        <ul className="-mx-5 grid sm:-mx-6 sm:grid-cols-2 sm:gap-x-6">
          {themes.map((theme) => {
            const published = theme.status === "published";
            return (
              <li key={theme.slug}>
                <ListLink href={themeHref(theme.slug, published)}>
                  <p className="voice max-w-[26rem] text-[1.4rem] leading-snug text-ink">
                    «{theme.cardTitle}»
                  </p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Tag tone="outline">{themeLabels[theme.slug]}</Tag>
                    <span className="text-sm text-ink-muted">
                      {published ? "бесплатный разбор" : "материалы темы"}
                    </span>
                  </p>
                </ListLink>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <p className="mt-10 max-w-2xl text-sm text-ink-muted">
        Сцена ведёт не в оплату, а в тематическое пространство: сначала
        понимание и бесплатный опыт, следующий шаг — потом.
      </p>
    </Section>
  );
}

/** Микроопыт. Единственная инвертированная полоса на главной. */
function DiagnosticBlock({ block }: { block: HomeBlock }) {
  const steps = [
    "Три узнаваемые сцены из обычной жизни пары.",
    "В каждой — что вам важно и что вы делаете словами.",
    "Результат с разбором и подходящим следующим шагом.",
  ];

  return (
    <Section tone="band">
      <BackdropArt
        name="divergence"
        opacity={0.24}
        className="-right-[14%] -top-[38%] hidden h-[95%] w-[46%] lg:block"
      />

      <div className="relative grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <Reveal>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 className="mt-4 text-display">{block.title}</h2>
          <p className="mt-6 max-w-xl text-lead text-ink-soft">
            Мини-диагностика «Что вы делаете словами, когда разговор становится
            трудным?»: три ситуации, шесть вопросов, 3–5 минут.
          </p>
          <p className="mt-4 max-w-xl text-ink-muted">
            Это не тип личности и не оценка ваших отношений. Результат
            показывает, чего вы хотите от трудного разговора, что при этом
            делаете словами и где цель расходится со способом.
          </p>

          <div className="mt-9">
            <ButtonLink href={diagnosticHref} variant="on-band" size="lg">
              Пройти диагностику
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-display text-lg text-accent">
                  0{index + 1}
                </span>
                <span className="text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/** Метод: пять шагов одной линией. */
function MethodBlock({ block }: { block: HomeBlock }) {
  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <BackdropArt
        name="method-core"
        opacity={0.16}
        className="-right-[34%] -top-[45%] hidden h-[195%] w-[68%] lg:block"
      />

      <Reveal>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          <span
            aria-hidden
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-line lg:block"
          />
          {methodSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-accent">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <p className="mt-5 flex items-baseline gap-2.5">
                <span className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-muted">
                  0{index + 1}
                </span>
                <span className="font-display text-[1.15rem]">{step.title}</span>
              </p>
              <p className="mt-2.5 text-[0.95rem] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

/** Следующий шаг: состояния человека, а не прайс-лист. */
function LevelsBlock({ block }: { block: HomeBlock }) {
  return (
    <Section
      eyebrow={block.eyebrow}
      title={block.title}
      body={block.body}
      tone="deep"
    >
      <Reveal>
        <ul className="-mx-5 sm:-mx-6">
          {startingPoints.map((point, index) => (
            <li
              key={point.title}
              className="border-t border-line last:border-b"
            >
              <Link
                href={point.href}
                className="group grid gap-4 rounded-card px-5 py-8 transition-colors duration-200 ease-calm hover:bg-surface-hover motion-reduce:transition-none sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
              >
                <span className="font-display text-[0.8rem] tracking-[0.14em] text-ink-muted">
                  0{index + 1}
                </span>
                <span>
                  <span className="block font-display text-title">
                    {point.title}
                  </span>
                  <span className="mt-2.5 block max-w-xl text-ink-soft">
                    {point.body}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-[0.95rem] text-accent">
                  {point.label}
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="h-4 w-4 transition-transform duration-200 ease-calm group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

/** Библиотека: короткий срез того, что можно взять прямо сейчас. */
function LibraryBlock({ block }: { block: HomeBlock }) {
  const materials = getMaterials({ limit: 4 });

  return (
    <Section
      eyebrow={block.eyebrow}
      title={block.title}
      body={block.body}
      aside={
        <ButtonLink href="/besplatno" variant="secondary">
          Вся библиотека
        </ButtonLink>
      }
    >
      <Reveal>
        <ul className="-mx-5 grid sm:-mx-6 sm:grid-cols-2 sm:gap-x-6">
          {materials.map((material) => (
            <li key={material.slug}>
              <ListLink href={`/besplatno/${material.slug}`}>
                <span className="flex flex-wrap items-center gap-2.5">
                  <Tag tone="accent" icon={material.format}>
                    {formatLabels[material.format]}
                  </Tag>
                  <span className="text-xs text-ink-muted">
                    {material.readingMinutes} мин
                  </span>
                </span>
                <p className="mt-4 max-w-[24rem] font-display text-[1.3rem] leading-snug">
                  {material.title}
                </p>
                <p className="mt-3 max-w-[30rem] text-[0.95rem] text-ink-soft">
                  {material.excerpt}
                </p>
              </ListLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

/** Авторы: два слышания, а не резюме. */
function AuthorsBlock({ block }: { block: HomeBlock }) {
  const authors = getAuthors();
  const intro = getAuthorsIntro();

  return (
    <Section eyebrow={block.eyebrow} title={block.title}>
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
          <AuthorsPortrait size="compact" />
        </Reveal>

        <Reveal delay={80}>
          <div className="prose-editorial max-w-2xl">
            <h3 className="font-display">{intro.title}</h3>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {authors.map((author) => (
              <div key={author.slug} className="border-l-2 border-accent-edge pl-5">
                <p className="font-display text-[1.1rem]">{author.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
                <p className="voice mt-4 text-[1.1rem] leading-snug text-ink">
                  {author.voice}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/o-nas"
            className="mt-10 inline-flex items-center gap-2 text-accent transition-colors duration-200 ease-calm hover:text-accent-hover"
          >
            Подробнее о нас и наших границах
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

function BoundariesBlock({ block }: { block: HomeBlock }) {
  const intro = getAuthorsIntro();

  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <Reveal>
        <Note title={intro.disbelief.title} className="max-w-3xl">
          <ul className="mt-3 space-y-2">
            {intro.disbelief.items.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Note>
      </Reveal>
    </Section>
  );
}

const registry = {
  hero: HeroBlock,
  situations: SituationsBlock,
  diagnostic: DiagnosticBlock,
  method: MethodBlock,
  levels: LevelsBlock,
  library: LibraryBlock,
  authors: AuthorsBlock,
  boundaries: BoundariesBlock,
} as const;

export function HomeBlockRenderer({ block }: { block: HomeBlock }) {
  const Component = registry[block.type];
  return <Component block={block} />;
}
