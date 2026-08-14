import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Illustration } from "@/components/ui/illustration";
import { Note } from "@/components/ui/note";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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

/** Список-определение: пункты шаблона продукта без карточек и рамок. */
function Points({
  items,
  tone = "soft",
}: {
  items: readonly string[];
  tone?: "soft" | "accent";
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-ink-soft">
          <span
            aria-hidden
            className={`mt-3 h-px w-4 shrink-0 ${
              tone === "accent" ? "bg-accent" : "bg-line-strong"
            }`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
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
      <header className="wash grain relative overflow-hidden border-b border-line">
        <div className="container-page relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex items-center gap-2.5 text-accent">
              <Icon name={product.kind} className="h-5 w-5" />
              <Eyebrow>{productKindLabels[product.kind]}</Eyebrow>
            </span>
            <h1 className="mt-5 text-display">{product.title}</h1>
            <p className="mt-5 text-lead text-ink-soft">{product.tagline}</p>

            <Points items={product.situation} tone="accent" />

            <p className="voice mt-9 max-w-xl text-[1.35rem] leading-snug text-ink">
              {product.redefinition}
            </p>
          </Reveal>

          {/* Единственная панель на странице: здесь происходит действие. */}
          <Reveal delay={80}>
            <Panel id="cta" className="scroll-mt-24">
              <p className="font-display text-title">{priceLabel}</p>
              {product.price.note && (
                <p className="mt-2 text-sm text-ink-muted">
                  {product.price.note}
                </p>
              )}

              <div className="mt-7">
                {product.cta.kind === "checkout" && (
                  <>
                    <ButtonLink href={`/oplata?product=${product.slug}`}>
                      {product.cta.label}
                    </ButtonLink>
                    <p className="mt-4 text-sm text-ink-muted">
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

              <div className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-6">
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
                      className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:text-ink"
                    >
                      {themeLabels[theme]}
                    </Link>
                  );
                })}
              </div>
            </Panel>
          </Reveal>
        </div>
      </header>

      {/* Для кого / кому не подойдёт — рядом, одинаковым весом. */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-title">Для кого</h2>
            <Points items={product.forWhom} tone="accent" />
          </Reveal>
          <Reveal delay={70}>
            <h2 className="font-display text-title">Кому не подойдёт</h2>
            <Points items={product.notForWhom} />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Результат</Eyebrow>
            <h2 className="mt-4 font-display text-title">С чем вы выйдете</h2>
            <Points items={product.result} tone="accent" />
          </Reveal>
          <Reveal delay={70}>
            <Eyebrow>Метод</Eyebrow>
            <h2 className="mt-4 font-display text-title">Как мы смотрим</h2>
            <Points items={product.method} />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Программа" title="Что внутри">
        {product.illustration && (
          <Reveal className="mb-14">
            <Illustration name={product.illustration} />
          </Reveal>
        )}

        <Reveal>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {product.program.map((item, index) => (
              <li key={item.title}>
                <span className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-muted">
                  0{index + 1}
                </span>
                <p className="mt-2.5 font-display text-[1.15rem]">
                  {item.title}
                </p>
                <p className="mt-2.5 text-[0.95rem] text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section tone="deep">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Авторы</Eyebrow>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {authors.map((author) => (
                <div
                  key={author.slug}
                  className="border-l-2 border-accent-edge pl-5"
                >
                  <p className="font-display text-[1.1rem]">{author.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
                  <p className="voice mt-3.5 text-[1.05rem] leading-snug text-ink">
                    {author.voice}
                  </p>
                </div>
              ))}
            </div>

            {testimonials.length > 0 && (
              <div className="mt-12 space-y-8">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.slug}>
                    <p className="voice text-[1.2rem] leading-snug text-ink">
                      «{testimonial.quote}»
                    </p>
                    <footer className="mt-3 text-sm text-ink-muted">
                      {testimonial.author}, {testimonial.context}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
          </Reveal>

          {/* Границы формата — не в аккордеоне и не мелким шрифтом. */}
          <Reveal delay={70}>
            <span className="flex items-center gap-2.5 text-accent">
              <Icon name="boundary" className="h-5 w-5" />
              <Eyebrow>Границы</Eyebrow>
            </span>
            <h2 className="mt-4 font-display text-title">
              Чего этот формат не делает
            </h2>
            <Points items={product.boundaries} />

            <Note
              title="Если нужна другая глубина"
              icon="konsultaciya"
              className="mt-10"
            >
              <p className="mt-2">
                Когда дело в устойчивом сценарии пары, сильной травматизации или
                безопасности отношений, обучение не подходит.
              </p>
              <Link
                href="/konsultacii"
                className="mt-3 inline-block text-accent underline underline-offset-4"
              >
                Перейти к консультациям
              </Link>
            </Note>
          </Reveal>
        </div>
      </Section>

      <Section tone="band">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag tone="accent">{priceLabel}</Tag>
            <h2 className="mt-5 text-title">{product.title}</h2>
            <p className="mt-4 max-w-xl text-lead text-ink-soft">
              {product.tagline}
            </p>
          </div>
          <ButtonLink
            href={
              product.cta.kind === "checkout"
                ? `/oplata?product=${product.slug}`
                : "#cta"
            }
            variant="on-band"
            size="lg"
          >
            {product.cta.label}
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </ButtonLink>
        </div>
      </Section>
    </article>
  );
}
