import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/ui/illustration";
import { ListLink } from "@/components/ui/list-link";
import { Note } from "@/components/ui/note";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import {
  getDiagnostic,
  getMaterialsBySlugs,
  getProductsBySlugs,
  getPublishedThemes,
  getTheme,
} from "@/content/repository";
import { formatLabels, productKindLabels, themeLabels } from "@/content/taxonomy";

export function generateStaticParams() {
  return getPublishedThemes().map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};

  return {
    title: theme.title,
    description: theme.analysis[0]?.paragraphs[0] ?? theme.cardTitle,
    alternates: { canonical: `/temy/${theme.slug}` },
    openGraph: {
      title: theme.title,
      description: theme.cardTitle,
      url: `/temy/${theme.slug}`,
    },
  };
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getTheme(slug);

  if (!theme || theme.status !== "published") notFound();

  const materials = getMaterialsBySlugs(theme.materialSlugs);
  const products = getProductsBySlugs(theme.productSlugs);
  const diagnostic = theme.diagnosticSlug
    ? getDiagnostic(theme.diagnosticSlug)
    : null;

  return (
    <article>
      <TrackFunnelStep
        step="theme_view"
        path={`/temy/${theme.slug}`}
        meta={{ theme: theme.slug }}
      />

      {/* 1. Сцена как эмоциональный якорь: реплики, а не диалог в рамке. */}
      <header className="wash grain relative overflow-hidden border-b border-line">
        <div className="container-page relative py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{themeLabels[theme.slug]}</Eyebrow>
              <h1 className="mt-5 text-display">{theme.title}</h1>
              <p className="mt-6 max-w-xl text-lead text-ink-soft">
                Сначала — разбор без оплаты. Дальше — упражнение и подходящий
                следующий шаг, если он действительно продолжает ваш вопрос.
              </p>
            </Reveal>

            <Reveal delay={90} className="lg:pt-14">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Знакомая сцена
              </p>
              <div className="mt-6 space-y-5">
                {theme.scene.lines.map((line, index) => (
                  <p
                    key={line}
                    className={`voice text-[1.4rem] leading-snug sm:text-[1.6rem] ${
                      index % 2 === 0
                        ? "text-ink"
                        : "text-ink-soft sm:translate-x-8"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* 2. Бесплатный разбор */}
      <section className="py-20 sm:py-28">
        <div className="container-page max-w-[44rem]">
          <Reveal>
            <Eyebrow>Бесплатный разбор</Eyebrow>
          </Reveal>
          <div className="prose-editorial mt-8">
            {theme.analysis.slice(0, 2).map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>

        {/* Передышка внутри длинного разбора. */}
        {theme.illustration && (
          <div className="container-page my-14 sm:my-20">
            <Reveal>
              <Illustration name={theme.illustration} />
            </Reveal>
          </div>
        )}

        <div className="container-page max-w-[44rem]">
          <div className="prose-editorial">
            {theme.analysis.slice(2).map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          {theme.examples.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-title">Как это звучит вслух</h3>
              <dl className="mt-8 space-y-8">
                {theme.examples.map((example) => (
                  <div
                    key={example.title}
                    className="border-l-2 border-accent-edge pl-5"
                  >
                    <dt className="voice text-[1.15rem] leading-snug text-ink">
                      {example.title}
                    </dt>
                    <dd className="mt-2.5 text-ink-soft">{example.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Границы формата остаются в потоке разбора, а не уходят в подвал. */}
          {theme.therapyNote && (
            <Note
              title="Когда обучение не подходит"
              icon="konsultaciya"
              className="mt-16"
            >
              <p className="mt-2">{theme.therapyNote}</p>
              <Link
                href="/konsultacii"
                className="mt-3 inline-block text-accent underline underline-offset-4"
              >
                Раздел «Консультации»
              </Link>
            </Note>
          )}
        </div>
      </section>

      {/* 3. Микроопыт */}
      {diagnostic && (
        <Section tone="band">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>Микроопыт</Eyebrow>
              <h2 className="mt-4 text-title">{diagnostic.title}</h2>
              <p className="mt-5 max-w-2xl text-lead text-ink-soft">
                {diagnostic.situations.length} ситуации,{" "}
                {diagnostic.situations.length * 2} вопросов,{" "}
                {diagnostic.durationMinutes} минуты. Помогает перевести идею
                разбора на себя.
              </p>
            </div>
            <ButtonLink
              href={`/diagnostika/${diagnostic.slug}`}
              variant="on-band"
              size="lg"
            >
              Пройти диагностику
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Связанные материалы */}
      {materials.length > 0 && (
        <Section title="Связанные материалы">
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
                    <p className="mt-4 font-display text-[1.2rem] leading-snug">
                      {material.title}
                    </p>
                  </ListLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {/* 4. Следующий шаг */}
      <Section
        eyebrow="Следующий шаг"
        title="Если после разбора появился вопрос"
        tone="deep"
      >
        <Reveal>
          <ul className="-mx-5 sm:-mx-6">
            {products.map((product) => (
              <li key={product.slug} className="border-t border-line last:border-b">
                <ListLink href={`/kursy/${product.slug}`}>
                  <span className="flex flex-wrap items-center gap-2">
                    <Tag tone="accent" icon={product.kind}>
                      {productKindLabels[product.kind]}
                    </Tag>
                    {product.availability !== "available" && (
                      <Tag tone="outline">
                        {product.availability === "waitlist"
                          ? "Лист ожидания"
                          : "Готовится"}
                      </Tag>
                    )}
                  </span>
                  <p className="mt-4 font-display text-title">{product.title}</p>
                  <p className="mt-2.5 max-w-xl text-ink-soft">
                    {product.tagline}
                  </p>
                </ListLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </article>
  );
}
