import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

import { LibraryBrowser } from "@/components/library/library-browser";
import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/ui/illustration";
import { PageHeader, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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
    <div>
      <PageHeader
        eyebrow="Начать бесплатно"
        title="Здесь уже можно получить пользу, не покупая ничего"
        body="Это не блог при курсах. Диагностика, разборы и рабочие листы имеют самостоятельную ценность: ими можно пользоваться перед конкретным разговором уже сегодня."
        aside={
          <Illustration name="library" variant="block" showCaption={false} />
        }
      />

      {/* Диагностика — главная точка входа: единственная полоса на странице. */}
      <Section tone="band">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Tag tone="accent" icon="diagnostika">
              Главная точка входа
            </Tag>
            <h2 className="mt-5 text-title">{diagnostic.title}</h2>
            <p className="mt-5 text-lead text-ink-soft">{diagnostic.subtitle}</p>
          </div>
          <div className="shrink-0">
            <ButtonLink
              href={`/diagnostika/${diagnostic.slug}`}
              variant="on-band"
              size="lg"
            >
              Пройти за {diagnostic.durationMinutes} минуты
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        title="Библиотека материалов"
        body="Фильтры по теме, формату и уровню. Так же будет работать библиотека, когда материалов станет сто."
      >
        <Suspense
          fallback={<p className="text-ink-muted">Загружаем библиотеку…</p>}
        >
          <LibraryBrowser />
        </Suspense>
      </Section>
    </div>
  );
}
