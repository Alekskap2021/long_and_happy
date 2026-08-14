import type { Metadata } from "next";
import Link from "next/link";

import { BackdropArt } from "@/components/ui/illustration";
import { ListLink } from "@/components/ui/list-link";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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
    <div>
      <PageHeader
        eyebrow="Темы"
        title="Тема меняется — способ смотреть остаётся одним"
        body="Деньги, просьбы, границы или пауза — это не отдельные школы. Это разные жизненные области, в которых работает общий метод: замечать, что вы делаете словами и чего добиваетесь."
      />

      <Section>
        {/* Иллюстрация уходит за правый край строки: не превью в рамке,
            а тихая плоскость под текстом. */}
        <ul className="-mx-5 sm:-mx-6">
          {published.map((theme, index) => (
            <li
              key={theme.slug}
              className="relative overflow-hidden border-t border-line last:border-b"
            >
              {theme.illustration && (
                <BackdropArt
                  name={theme.illustration}
                  opacity={0.3}
                  className="right-6 top-0 hidden aspect-[12/7] h-full sm:block"
                />
              )}
              <Reveal delay={index * 60} className="relative">
                <ListLink href={`/temy/${theme.slug}`}>
                  <span className="block max-w-xl">
                    <Tag tone="accent">{themeLabels[theme.slug]}</Tag>
                    <span className="voice mt-4 block text-title text-ink">
                      «{theme.cardTitle}»
                    </span>
                    <span className="mt-3.5 block text-ink-soft">
                      {theme.title}
                    </span>
                  </span>
                </ListLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Темы в работе"
        body="Разделы заведены в таксономии: у них есть URL и материалы, а страница хаба включается тем же шаблоном, когда готов авторский разбор."
        tone="deep"
      >
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {upcoming.map((theme) => (
              <li key={theme.slug}>
                <Link
                  href={`/besplatno?theme=${theme.slug}`}
                  className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:bg-surface-hover hover:text-ink"
                >
                  {themeLabels[theme.slug]}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </div>
  );
}
