import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Card, CardLink, Tag } from "@/components/ui/card";
import { Illustration } from "@/components/ui/illustration";
import {
  getAuthor,
  getMaterial,
  getMaterials,
  getProduct,
  getTheme,
} from "@/content/repository";
import { formatLabels, themeLabels } from "@/content/taxonomy";

export function generateStaticParams() {
  return getMaterials().map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) return {};

  return {
    title: material.title,
    description: material.excerpt,
    alternates: { canonical: `/besplatno/${material.slug}` },
    openGraph: {
      type: "article",
      title: material.title,
      description: material.excerpt,
      url: `/besplatno/${material.slug}`,
    },
  };
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterial(slug);

  if (!material || material.status !== "published") notFound();

  const author = getAuthor(material.authorSlug);
  const relatedProduct = material.relatedProduct
    ? getProduct(material.relatedProduct)
    : null;
  const related = getMaterials({ theme: material.themes[0] })
    .filter((item) => item.slug !== material.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: material.title,
    description: material.excerpt,
    author: author ? { "@type": "Person", name: author.name } : undefined,
    inLanguage: "ru-RU",
  };

  return (
    <article className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-prose">
        <nav className="text-sm text-ink-muted">
          <Link href="/besplatno" className="hover:text-accent">
            Начать бесплатно
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/besplatno?theme=${material.themes[0]}`}
            className="hover:text-accent"
          >
            {themeLabels[material.themes[0]]}
          </Link>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Tag tone="accent" icon={material.format}>
            {formatLabels[material.format]}
          </Tag>
          <span className="text-sm text-ink-muted">
            {material.readingMinutes} мин чтения
          </span>
          {author && (
            <span className="text-sm text-ink-muted">· {author.name}</span>
          )}
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl">{material.title}</h1>
        <p className="mt-5 text-lg text-ink-soft">{material.excerpt}</p>

        <div className="prose-editorial mt-10">
          {material.body.map((section, index) => (
            <Fragment key={section.heading ?? index}>
              <section>
                {section.heading && <h3>{section.heading}</h3>}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Иллюстрация после первой части — передышка в длинном чтении. */}
              {material.illustration && index === 0 && (
                <Illustration
                  name={material.illustration}
                  className="my-10 sm:my-12"
                />
              )}
            </Fragment>
          ))}
        </div>

        <Card className="mt-12 border-line-strong">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Что дальше
          </p>
          <p className="mt-3 font-display text-xl">{material.nextStep.label}</p>
          {material.nextStep.note && (
            <p className="mt-2 text-ink-soft">{material.nextStep.note}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={material.nextStep.href} size="sm">
              Перейти
            </ButtonLink>
            {relatedProduct && relatedProduct.slug !== material.nextStep.href && (
              <ButtonLink
                href={`/kursy/${relatedProduct.slug}`}
                variant="secondary"
                size="sm"
              >
                {relatedProduct.title}
              </ButtonLink>
            )}
          </div>
        </Card>

        <div className="mt-10 flex flex-wrap gap-2">
          {material.themes.map((theme) => {
            const themeEntry = getTheme(theme);
            const published = themeEntry?.status === "published";
            return (
              <Link
                key={theme}
                href={published ? `/temy/${theme}` : `/besplatno?theme=${theme}`}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft hover:border-line-strong"
              >
                {themeLabels[theme]}
              </Link>
            );
          })}
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl">Связанные материалы</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <CardLink key={item.slug} href={`/besplatno/${item.slug}`}>
                  <Tag icon={item.format}>{formatLabels[item.format]}</Tag>
                  <p className="mt-3 font-display text-lg leading-snug">
                    {item.title}
                  </p>
                </CardLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
