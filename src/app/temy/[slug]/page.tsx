import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardLink, Note, Tag } from "@/components/ui/card";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow } from "@/components/ui/section";
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

      {/* 1. Живая сцена */}
      <header className="border-b border-line bg-paper-deep py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>{themeLabels[theme.slug]}</Eyebrow>
            <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
              {theme.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Сначала — разбор без оплаты. Дальше — упражнение и подходящий
              следующий шаг, если он действительно продолжает ваш вопрос.
            </p>
          </div>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Знакомая сцена
            </p>
            <div className="mt-4 space-y-2 font-display text-lg leading-snug">
              {theme.scene.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Card>
        </div>
      </header>

      {/* 2. Бесплатный разбор */}
      <section className="py-14 sm:py-20">
        <div className="container-prose">
          <Eyebrow>Бесплатный разбор</Eyebrow>
          <div className="prose-editorial mt-6">
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

        {/* Передышка внутри длинного разбора: иллюстрация во всю ширину текста. */}
        {theme.illustration && (
          <div className="container-page my-12 sm:my-16">
            <Illustration name={theme.illustration} />
          </div>
        )}

        <div className="container-prose">
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
            <div className="mt-12">
              <h3 className="font-display text-2xl">Как это звучит вслух</h3>
              <div className="mt-5 space-y-3">
                {theme.examples.map((example) => (
                  <Card key={example.title}>
                    <p className="font-medium">{example.title}</p>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">
                      {example.body}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Микроопыт */}
      {diagnostic && (
        <section className="bg-ink py-14 text-paper sm:py-20">
          <div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow tone="ink">Микроопыт</Eyebrow>
              <h2 className="mt-3 text-2xl sm:text-3xl">{diagnostic.title}</h2>
              <p className="mt-4 max-w-2xl text-paper-deep/80">
                {diagnostic.situations.length} ситуации,{" "}
                {diagnostic.situations.length * 2} вопросов,{" "}
                {diagnostic.durationMinutes} минуты. Помогает перевести идею
                разбора на себя.
              </p>
            </div>
            <ButtonLink
              href={`/diagnostika/${diagnostic.slug}`}
              variant="inverse"
            >
              Пройти диагностику
            </ButtonLink>
          </div>
        </section>
      )}

      {/* Связанные материалы */}
      {materials.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="container-page">
            <h2 className="font-display text-2xl">Связанные материалы</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {materials.map((material) => (
                <CardLink
                  key={material.slug}
                  href={`/besplatno/${material.slug}`}
                  className="flex h-full flex-col"
                >
                  <div>
                    <Tag icon={material.format}>
                      {formatLabels[material.format]}
                    </Tag>
                  </div>
                  <p className="mt-3 flex-1 font-display text-lg leading-snug">
                    {material.title}
                  </p>
                  <span className="mt-4 text-sm text-ink-muted">
                    {material.readingMinutes} мин
                  </span>
                </CardLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Следующий шаг */}
      <section className="bg-paper-deep py-14 sm:py-20">
        <div className="container-page">
          <Eyebrow>Следующий шаг</Eyebrow>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl">
            Если после разбора появился вопрос
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {products.map((product) => (
              <Card key={product.slug} className="flex h-full flex-col">
                <div className="flex items-center gap-2">
                  <Tag tone="accent" icon={product.kind}>
                    {productKindLabels[product.kind]}
                  </Tag>
                  {product.availability !== "available" && (
                    <Tag>
                      {product.availability === "waitlist"
                        ? "Лист ожидания"
                        : "Готовится"}
                    </Tag>
                  )}
                </div>
                <p className="mt-4 font-display text-xl">{product.title}</p>
                <p className="mt-2.5 flex-1 text-[0.95rem] text-ink-soft">
                  {product.tagline}
                </p>
                <div className="mt-5">
                  <ButtonLink
                    href={`/kursy/${product.slug}`}
                    variant="secondary"
                    size="sm"
                  >
                    Подробнее
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>

          {theme.therapyNote && (
            <div className="mt-8">
              <Note icon="konsultaciya">
                <p className="font-medium">Когда обучение не подходит</p>
                <p className="mt-2">{theme.therapyNote}</p>
                <Link href="/konsultacii" className="mt-2 inline-block underline">
                  Раздел «Консультации»
                </Link>
              </Note>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
