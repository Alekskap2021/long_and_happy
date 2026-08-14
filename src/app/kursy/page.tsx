import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ListLink } from "@/components/ui/list-link";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { getCatalogProducts, getProductLevels } from "@/content/repository";
import { productKindLabels } from "@/content/taxonomy";

export const metadata: Metadata = {
  title: "Курсы и практикумы",
  description:
    "Практикум для одного разговора, базовый курс с ядром метода и тематические разговорники: разные уровни задачи, а не равноправный каталог.",
  alternates: { canonical: "/kursy" },
};

const availabilityLabels = {
  available: "Идёт набор",
  waitlist: "Лист ожидания",
  soon: "Готовится",
} as const;

export default function ProductsPage() {
  const products = getCatalogProducts();
  const levels = getProductLevels();

  return (
    <div>
      <PageHeader
        eyebrow="Курсы и практикумы"
        title="Не каталог, а разные уровни задачи"
        body="Малый продукт — не урезанная копия большого. Практикум решает один разговор, базовый курс учит воспроизводимому способу мышления, разговорник переносит этот способ в конкретную тему."
      />

      <Section>
        <Reveal>
          <ul className="-mx-5 sm:-mx-6">
            {products.map((product) => (
              <li
                key={product.slug}
                className="border-t border-line last:border-b"
              >
                <ListLink href={`/kursy/${product.slug}`}>
                  <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
                    <div>
                      <span className="flex flex-wrap items-center gap-2">
                        <Tag tone="accent" icon={product.kind}>
                          {productKindLabels[product.kind]}
                        </Tag>
                        <Tag tone="outline">
                          {availabilityLabels[product.availability]}
                        </Tag>
                      </span>
                      <p className="mt-4 font-display text-title">
                        {product.title}
                      </p>
                      <p className="mt-3 max-w-2xl text-ink-soft">
                        {product.tagline}
                      </p>
                    </div>

                    <p className="mt-5 font-display text-[1.15rem] text-ink-soft lg:mt-1 lg:text-right">
                      {product.price.amount
                        ? `${product.price.amount.toLocaleString("ru-RU")} ₽`
                        : "Цена будет объявлена"}
                    </p>
                  </div>
                </ListLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Не прайс-лист: состояние человека → что ему нужно → наш ответ. */}
      <Section
        eyebrow="Что выбрать"
        title="Состояние важнее формата"
        tone="deep"
      >
        <Reveal>
          <ul className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {levels.map((level) => (
              <li key={level.state} className="border-t border-line pt-6">
                <p className="font-display text-[1.2rem] leading-snug">
                  {level.state}
                </p>
                <p className="mt-3 text-[0.97rem] text-ink-soft">{level.need}</p>
                <p className="mt-5">
                  {level.href ? (
                    <Link
                      href={level.href}
                      className="group inline-flex items-center gap-2 text-accent transition-colors duration-200 ease-calm hover:text-accent-hover"
                    >
                      {level.answer}
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.75}
                        className="h-4 w-4 transition-transform duration-200 ease-calm group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </Link>
                  ) : (
                    <span className="text-ink-muted">{level.answer}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </div>
  );
}
