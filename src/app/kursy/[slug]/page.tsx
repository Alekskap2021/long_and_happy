import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button";
import { Card, Note, Tag } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow } from "@/components/ui/section";
import {
  getAuthor,
  getProduct,
  getProducts,
  getTestimonials,
  getTheme,
} from "@/content/repository";
import { productKindLabels, themeLabels } from "@/content/taxonomy";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.redefinition,
    alternates: { canonical: `/kursy/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.tagline,
      url: `/kursy/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const authors = product.authorSlugs
    .map((authorSlug) => getAuthor(authorSlug))
    .filter((author): author is NonNullable<typeof author> => author !== null);
  const testimonials = getTestimonials(product.slug);

  const priceLabel = product.price.amount
    ? `${product.price.amount.toLocaleString("ru-RU")} ₽`
    : "Цена будет объявлена";

  return (
    <article>
      <TrackFunnelStep
        step="product_view"
        path={`/kursy/${product.slug}`}
        meta={{ product: product.slug, kind: product.kind }}
      />

      {/* Ситуация → переопределение */}
      <header className="border-b border-line bg-paper-deep py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <Icon name={product.kind} className="h-5 w-5" />
              <Eyebrow>{productKindLabels[product.kind]}</Eyebrow>
            </div>
            <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
              {product.title}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">{product.tagline}</p>

            <div className="mt-8 space-y-2.5">
              {product.situation.map((line) => (
                <p key={line} className="flex gap-3 text-ink-soft">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-8 max-w-xl font-display text-xl leading-snug">
              {product.redefinition}
            </p>
          </div>

          <Card className="h-fit scroll-mt-24 border-line-strong" id="cta">
            <p className="font-display text-2xl">{priceLabel}</p>
            {product.price.note && (
              <p className="mt-2 text-sm text-ink-muted">{product.price.note}</p>
            )}

            <div className="mt-6">
              {product.cta.kind === "checkout" && (
                <>
                  <ButtonLink href={`/oplata?product=${product.slug}`}>
                    {product.cta.label}
                  </ButtonLink>
                  <p className="mt-3 text-sm text-ink-muted">
                    Доступ выдаётся автоматически после оплаты. В прототипе —
                    страница-заглушка.
                  </p>
                </>
              )}

              {product.cta.kind === "waitlist" && (
                <LeadForm
                  intent="waitlist"
                  productSlug={product.slug}
                  submitLabel={product.cta.label}
                  successText="Записали. Напишем, когда откроем набор — без рассылок и напоминаний о скидках."
                />
              )}

              {product.cta.kind === "contact" && (
                <LeadForm
                  intent="consultation"
                  productSlug={product.slug}
                  submitLabel={product.cta.label}
                  successText="Получили ваше сообщение. Ответим и предложим время."
                  withNote
                />
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
              {product.themes.map((theme) => {
                const entry = getTheme(theme);
                return (
                  <Link
                    key={theme}
                    href={
                      entry?.status === "published"
                        ? `/temy/${theme}`
                        : `/besplatno?theme=${theme}`
                    }
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft hover:border-line-strong"
                  >
                    {themeLabels[theme]}
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </header>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Для кого</h2>
            <ul className="prose-editorial mt-4">
              {product.forWhom.map((item) => (
                <li key={item} className="list-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Кому не подойдёт</h2>
            <ul className="prose-editorial mt-4">
              {product.notForWhom.map((item) => (
                <li key={item} className="list-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Результат</Eyebrow>
            <h2 className="mt-3 font-display text-2xl">
              С чем вы выйдете
            </h2>
            <ul className="prose-editorial mt-4">
              {product.result.map((item) => (
                <li key={item} className="list-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Метод</Eyebrow>
            <h2 className="mt-3 font-display text-2xl">Как мы смотрим</h2>
            <ul className="prose-editorial mt-4">
              {product.method.map((item) => (
                <li key={item} className="list-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page">
          {product.illustration && (
            <Illustration
              name={product.illustration}
              className="mb-14 sm:mb-16"
            />
          )}

          <Eyebrow>Программа</Eyebrow>
          <h2 className="mt-3 font-display text-2xl">Что внутри</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.program.map((item, index) => (
              <li key={item.title}>
                <Card className="h-full">
                  <span className="font-display text-2xl text-line-strong">
                    0{index + 1}
                  </span>
                  <p className="mt-2 font-semibold">{item.title}</p>
                  <p className="mt-2 text-[0.95rem] text-ink-soft">{item.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper-deep py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Авторы</Eyebrow>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {authors.map((author) => (
                <Card key={author.slug}>
                  <p className="font-display text-lg">{author.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
                  <p className="mt-3 text-[0.95rem] text-ink-soft">
                    {author.voice}
                  </p>
                </Card>
              ))}
            </div>

            {testimonials.length > 0 && (
              <div className="mt-8 space-y-3">
                {testimonials.map((testimonial) => (
                  <blockquote
                    key={testimonial.slug}
                    className="rounded-card border-l-2 border-accent bg-paper-card p-5"
                  >
                    <p className="font-display text-lg leading-snug">
                      «{testimonial.quote}»
                    </p>
                    <footer className="mt-3 text-sm text-ink-muted">
                      {testimonial.author}, {testimonial.context}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-accent">
              <Icon name="boundary" className="h-5 w-5" />
              <Eyebrow>Границы</Eyebrow>
            </div>
            <h2 className="mt-3 font-display text-2xl">Чего этот формат не делает</h2>
            <div className="mt-5 space-y-3">
              {product.boundaries.map((item) => (
                <p key={item} className="text-ink-soft">
                  — {item}
                </p>
              ))}
            </div>
            <div className="mt-6">
              <Note icon="konsultaciya">
                <p className="font-medium">Если нужна другая глубина</p>
                <p className="mt-2">
                  Когда дело в устойчивом сценарии пары, сильной травматизации или
                  безопасности отношений, обучение не подходит.
                </p>
                <Link href="/konsultacii" className="mt-2 inline-block underline">
                  Перейти к консультациям
                </Link>
              </Note>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 text-paper sm:py-20">
        <div className="container-page flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Tag tone="accent">{priceLabel}</Tag>
            <h2 className="mt-4 text-2xl sm:text-3xl">{product.title}</h2>
            <p className="mt-3 max-w-xl text-paper-deep/80">{product.tagline}</p>
          </div>
          {product.cta.kind === "checkout" ? (
            <ButtonLink href={`/oplata?product=${product.slug}`} variant="inverse">
              {product.cta.label}
            </ButtonLink>
          ) : (
            <ButtonLink href="#cta" variant="inverse">
              {product.cta.label}
            </ButtonLink>
          )}
        </div>
      </section>
    </article>
  );
}
