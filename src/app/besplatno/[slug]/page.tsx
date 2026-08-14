import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/ui/illustration";
import { ListLink } from "@/components/ui/list-link";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
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
    <article className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page max-w-[46rem]">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <Link
            href="/besplatno"
            className="transition-colors duration-200 ease-calm hover:text-accent"
          >
            Начать бесплатно
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/besplatno?theme=${material.themes[0]}`}
            className="transition-colors duration-200 ease-calm hover:text-accent"
          >
            {themeLabels[material.themes[0]]}
          </Link>
        </nav>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2.5">
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

          <h1 className="mt-5 text-display">{material.title}</h1>
          <p className="mt-6 text-lead text-ink-soft">{material.excerpt}</p>
        </Reveal>

        <div className="prose-editorial mt-12">
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

        {/* «Что дальше» всегда после контента, в потоке, без аккордеонов. */}
        <div className="mt-14 border-t border-line pt-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Что дальше
          </p>
          <p className="mt-4 font-display text-title">
            {material.nextStep.label}
          </p>
          {material.nextStep.note && (
            <p className="mt-3 max-w-xl text-ink-soft">{material.nextStep.note}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={material.nextStep.href}>Перейти</ButtonLink>
            {relatedProduct && relatedProduct.slug !== material.nextStep.href && (
              <ButtonLink
                href={`/kursy/${relatedProduct.slug}`}
                variant="secondary"
              >
                {relatedProduct.title}
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {material.themes.map((theme) => {
            const themeEntry = getTheme(theme);
            const published = themeEntry?.status === "published";
            return (
              <Link
                key={theme}
                href={published ? `/temy/${theme}` : `/besplatno?theme=${theme}`}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:text-ink"
              >
                {themeLabels[theme]}
              </Link>
            );
          })}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-title">Связанные материалы</h2>
            <ul className="-mx-5 mt-4 grid sm:-mx-6 sm:grid-cols-2 sm:gap-x-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <ListLink href={`/besplatno/${item.slug}`}>
                    <Tag icon={item.format}>{formatLabels[item.format]}</Tag>
                    <p className="mt-3.5 font-display text-[1.15rem] leading-snug">
                      {item.title}
                    </p>
                  </ListLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
