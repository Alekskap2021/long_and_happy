import type { Metadata } from "next";
import { Suspense } from "react";

import { LibraryBrowser } from "@/components/library/library-browser";
import { ButtonLink } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow } from "@/components/ui/section";
import { getDiagnostics } from "@/content/repository";

export const metadata: Metadata = {
  title: "Начать бесплатно",
  description:
    "Диагностики, статьи, видео, гайды, рабочие листы и карточки: полезный опыт до того, как что-то покупать.",
  alternates: { canonical: "/besplatno" },
};

export default function FreePage() {
  const [diagnostic] = getDiagnostics();

  return (
    <div className="py-14 sm:py-20">
      <div className="container-page">
        <Eyebrow>Начать бесплатно</Eyebrow>

        <div className="mt-5 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <h1 className="text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
              Здесь уже можно получить пользу, не покупая ничего
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Это не блог при курсах. Диагностика, разборы и рабочие листы имеют
              самостоятельную ценность: ими можно пользоваться перед конкретным
              разговором уже сегодня.
            </p>
          </div>

          <Illustration
            name="library"
            variant="block"
            showCaption={false}
            priority
            className="lg:mt-1.5"
          />
        </div>

        <Card className="mt-12 border-line-strong lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            <Tag tone="accent" icon="diagnostika">
              Главная точка входа
            </Tag>
            <h2 className="mt-3 font-display text-2xl leading-snug">
              {diagnostic.title}
            </h2>
            <p className="mt-3 text-ink-soft">{diagnostic.subtitle}</p>
          </div>
          <div className="mt-6 shrink-0 lg:mt-0">
            <ButtonLink href={`/diagnostika/${diagnostic.slug}`}>
              Пройти за {diagnostic.durationMinutes} минуты
            </ButtonLink>
          </div>
        </Card>

        <div className="mt-14">
          <h2 className="font-display text-2xl">Библиотека материалов</h2>
          <p className="mt-2 text-ink-soft">
            Фильтры по теме, формату и уровню. Так же будет работать библиотека,
            когда материалов станет сто.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={<p className="text-ink-muted">Загружаем библиотеку…</p>}
            >
              <LibraryBrowser />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
