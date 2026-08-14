import type { Metadata } from "next";

import { CardLink, Tag } from "@/components/ui/card";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow } from "@/components/ui/section";
import { getThemes } from "@/content/repository";
import { themeLabels } from "@/content/taxonomy";

export const metadata: Metadata = {
  title: "Темы",
  description:
    "Трудные разговоры, просьбы, пауза, после ссоры, границы, деньги, ревность, секс, дети, родственники: одна оптика в разных жизненных областях.",
  alternates: { canonical: "/temy" },
};

export default function ThemesPage() {
  const themes = getThemes();
  const published = themes.filter((theme) => theme.status === "published");
  const upcoming = themes.filter((theme) => theme.status !== "published");

  return (
    <div className="py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-3xl">
          <Eyebrow>Темы</Eyebrow>
          <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
            Тема меняется — способ смотреть остаётся одним
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Деньги, просьбы, границы или пауза — это не отдельные школы. Это разные
            жизненные области, в которых работает общий метод: замечать, что вы
            делаете словами и чего добиваетесь.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {published.map((theme) => (
            <CardLink
              key={theme.slug}
              href={`/temy/${theme.slug}`}
              className="flex h-full flex-col"
            >
              {theme.illustration && (
                <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-card border-b border-line bg-paper-deep">
                  <Illustration name={theme.illustration} variant="thumb" />
                </div>
              )}
              <div>
                <Tag tone="accent">{themeLabels[theme.slug]}</Tag>
              </div>
              <p className="mt-4 font-display text-xl leading-snug">
                «{theme.cardTitle}»
              </p>
              <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">
                {theme.title}
              </p>
              <span className="mt-5 text-[0.95rem] text-accent">
                Открыть разбор →
              </span>
            </CardLink>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl">Темы в работе</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Разделы заведены в таксономии: у них есть URL и материалы, а страница
            хаба включается тем же шаблоном, когда готов авторский разбор.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {upcoming.map((theme) => (
              <a
                key={theme.slug}
                href={`/besplatno?theme=${theme.slug}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-line-strong hover:bg-paper-deep"
              >
                {themeLabels[theme.slug]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
