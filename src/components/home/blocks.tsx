import Link from "next/link";

import { AuthorsPortrait } from "@/components/authors/authors-portrait";
import { methodSteps, startingPoints } from "@/content/data/home";
import {
  getAuthors,
  getAuthorsIntro,
  getMaterials,
  getProductLevels,
  getThemes,
} from "@/content/repository";
import type { HomeBlock } from "@/content/schemas";
import { formatLabels, themeLabels } from "@/content/taxonomy";
import { Card, CardLink, Note, Tag } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow, Section } from "@/components/ui/section";

function themeHref(slug: string, published: boolean) {
  return published ? `/temy/${slug}` : `/besplatno?theme=${slug}`;
}

function HeroBlock({ block }: { block: HomeBlock }) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <Eyebrow>Вероника и Игорь · психологи</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-display">{block.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{block.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#situations">
              Разобраться в своём разговоре
            </ButtonLink>
            <ButtonLink href="/kursy" variant="secondary">
              Посмотреть курсы и материалы
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Мы не обещаем изменить другого человека и не заменяем терапию там, где
            нужна глубокая работа.
          </p>
        </div>

        <figure className="rounded-card border border-line bg-paper-card p-7">
          <figcaption className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Одна и та же сцена, два слышания
          </figcaption>
          <blockquote className="mt-5 space-y-3 font-display text-xl leading-snug">
            <p>— Мы это уже сто раз обсуждали.</p>
            <p className="text-ink-muted">— Значит, ты меня так и не услышал.</p>
          </blockquote>
          <dl className="mt-6 space-y-4 border-t border-line pt-5 text-[0.95rem]">
            <div>
              <dt className="font-semibold">Цель</dt>
              <dd className="text-ink-soft">
                Хочу, чтобы стало ближе и меня заметили.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Действие словами</dt>
              <dd className="text-ink-soft">
                Обвинение, на которое возможно только оправдание.
              </dd>
            </div>
          </dl>
        </figure>
      </div>
    </section>
  );
}

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => {
          const published = theme.status === "published";
          return (
            <CardLink
              key={theme.slug}
              href={themeHref(theme.slug, published)}
              className="flex h-full flex-col justify-between"
            >
              <p className="font-display text-xl leading-snug">
                «{theme.cardTitle}»
              </p>
              <div className="mt-6 flex items-center justify-between">
                <Tag>{themeLabels[theme.slug]}</Tag>
                <span className="text-sm text-accent">
                  {published ? "Открыть разбор" : "Материалы темы"}
                </span>
              </div>
            </CardLink>
          );
        })}
      </div>
      <p className="mt-6 max-w-2xl text-sm text-ink-muted">
        Карточка ведёт не в оплату, а в тематическое пространство: сначала
        понимание и бесплатный опыт, следующий шаг — потом.
      </p>
    </Section>
  );
}

function DiagnosticBlock({ block }: { block: HomeBlock }) {
  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <Eyebrow tone="ink">{block.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-[2.5rem] sm:leading-[1.1]">
            {block.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-paper-deep/85">
            Мини-диагностика «Что вы делаете словами, когда разговор становится
            трудным?»: три ситуации, шесть вопросов, 3–5 минут.
          </p>
          <p className="mt-4 max-w-xl text-paper-deep/70">
            Это не тип личности и не оценка ваших отношений. Результат показывает,
            чего вы хотите от трудного разговора, что при этом делаете словами и
            где цель расходится со способом.
          </p>
          <div className="mt-8">
            <ButtonLink
              href="/diagnostika/chto-vy-delaete-slovami"
              variant="inverse"
            >
              Пройти диагностику
            </ButtonLink>
          </div>
        </div>

        <ol className="space-y-4 rounded-card border border-paper/15 bg-paper/5 p-7">
          {[
            "Три узнаваемые сцены из обычной жизни пары.",
            "В каждой — что вам важно и что вы делаете словами.",
            "Результат с разбором и подходящим следующим шагом.",
          ].map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="font-display text-2xl text-accent-soft">
                {index + 1}
              </span>
              <span className="text-paper-deep/85">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function MethodBlock({ block }: { block: HomeBlock }) {
  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {methodSteps.map((step, index) => (
          <li key={step.title}>
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <Icon name={step.icon} className="h-7 w-7 text-accent" />
                <span className="font-display text-2xl text-line-strong">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 font-semibold">{step.title}</p>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{step.body}</p>
            </Card>
          </li>
        ))}
      </ol>

      <Illustration name="method-core" className="mt-10" />
    </Section>
  );
}

function LevelsBlock({ block }: { block: HomeBlock }) {
  const levels = getProductLevels().slice(0, 3);

  return (
    <Section
      eyebrow={block.eyebrow}
      title={block.title}
      body={block.body}
      tone="deep"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {startingPoints.map((point, index) => (
          <Card key={point.title} className="flex h-full flex-col">
            <Eyebrow>{`Уровень ${index + 1}`}</Eyebrow>
            <p className="mt-3 font-display text-xl">{point.title}</p>
            <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">
              {point.body}
            </p>
            <Link
              href={point.href}
              className="mt-5 text-[0.95rem] text-accent hover:text-accent-hover"
            >
              {point.label} →
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-paper-card">
        <table className="w-full min-w-[38rem] text-left text-[0.95rem]">
          <thead className="bg-paper-deep/70 text-xs uppercase tracking-[0.12em] text-ink-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Состояние человека</th>
              <th className="px-5 py-3 font-semibold">Что ему нужно</th>
              <th className="px-5 py-3 font-semibold">Продуктовый ответ</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              <tr key={level.state} className="border-t border-line align-top">
                <td className="px-5 py-4 font-medium">{level.state}</td>
                <td className="px-5 py-4 text-ink-soft">{level.need}</td>
                <td className="px-5 py-4">
                  {level.href ? (
                    <Link href={level.href} className="text-accent">
                      {level.answer}
                    </Link>
                  ) : (
                    <span className="text-ink-muted">{level.answer}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function LibraryBlock({ block }: { block: HomeBlock }) {
  const materials = getMaterials({ limit: 4 });

  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <div className="grid gap-4 sm:grid-cols-2">
        {materials.map((material) => (
          <CardLink
            key={material.slug}
            href={`/besplatno/${material.slug}`}
            className="flex h-full flex-col"
          >
            <div className="flex items-center gap-2">
              <Tag tone="accent" icon={material.format}>
                {formatLabels[material.format]}
              </Tag>
              <span className="text-xs text-ink-muted">
                {material.readingMinutes} мин
              </span>
            </div>
            <p className="mt-4 font-display text-xl leading-snug">
              {material.title}
            </p>
            <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">
              {material.excerpt}
            </p>
          </CardLink>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/besplatno" variant="secondary">
          Вся бесплатная библиотека
        </ButtonLink>
      </div>
    </Section>
  );
}

function AuthorsBlock({ block }: { block: HomeBlock }) {
  const authors = getAuthors();
  const intro = getAuthorsIntro();

  return (
    <Section eyebrow={block.eyebrow} title={block.title} tone="deep">
      <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <AuthorsPortrait size="compact" />
        </div>

        <div>
          <div className="prose-editorial max-w-2xl">
            <h3 className="font-display text-2xl">{intro.title}</h3>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {authors.map((author) => (
              <Card key={author.slug} className="h-full">
                <p className="font-display text-xl">{author.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
                <p className="mt-4 text-[0.95rem] text-ink-soft">
                  {author.voice}
                </p>
              </Card>
            ))}
          </div>

          <Link
            href="/o-nas"
            className="mt-6 inline-block text-accent hover:text-accent-hover"
          >
            Подробнее о нас и наших границах →
          </Link>
        </div>
      </div>
    </Section>
  );
}

function BoundariesBlock({ block }: { block: HomeBlock }) {
  const intro = getAuthorsIntro();

  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <Note>
        <ul className="space-y-2">
          {intro.disbelief.items.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      </Note>
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
