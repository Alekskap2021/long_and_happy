import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";
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
    <div className="py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-3xl">
          <Eyebrow>Курсы и практикумы</Eyebrow>
          <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
            Не каталог, а разные уровни задачи
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Малый продукт — не урезанная копия большого. Практикум решает один
            разговор, базовый курс учит воспроизводимому способу мышления,
            разговорник переносит этот способ в конкретную тему.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.slug} className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="accent" icon={product.kind}>
                  {productKindLabels[product.kind]}
                </Tag>
                <Tag>{availabilityLabels[product.availability]}</Tag>
              </div>
              <p className="mt-4 font-display text-xl leading-snug">
                {product.title}
              </p>
              <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">
                {product.tagline}
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                {product.price.amount
                  ? `${product.price.amount.toLocaleString("ru-RU")} ₽`
                  : "Цена будет объявлена"}
              </p>
              <div className="mt-5">
                <ButtonLink href={`/kursy/${product.slug}`} size="sm">
                  Подробнее
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl">Что выбрать</h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-line bg-paper-card">
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
        </div>
      </div>
    </div>
  );
}
