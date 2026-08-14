import type { Metadata } from "next";

import { AuthorsPortrait } from "@/components/authors/authors-portrait";
import { ButtonLink } from "@/components/ui/button";
import { Card, Note } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";
import { getAuthors, getAuthorsIntro } from "@/content/repository";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Почему авторов двое, как устроен наш подход, профессиональный опыт и этические принципы проекта.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  const authors = getAuthors();
  const intro = getAuthorsIntro();

  return (
    <div className="py-14 sm:py-20">
      <div className="container-page">
        <Eyebrow>О нас</Eyebrow>

        {/* На телефоне портрет идёт сразу после вступления, на десктопе стоит справа. */}
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
              {intro.title}
            </h1>
            <div className="prose-editorial mt-6">
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Отступ доводит верхний край снимка до линии прописных букв
              заголовка: паспарту рамки короче, чем выносная линия шрифта. */}
          <div className="mx-auto w-full max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-1.5 lg:max-w-none">
            <div className="lg:sticky lg:top-24">
              <AuthorsPortrait priority />
            </div>
          </div>

          <div className="space-y-4 lg:col-start-1 lg:row-start-2">
            {authors.map((author) => (
              <Card key={author.slug}>
                <p className="font-display text-2xl">{author.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
                <p className="mt-4 text-ink-soft">{author.voice}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[0.95rem] text-ink-soft">
                  {author.credentials.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="font-display text-2xl">{intro.disbelief.title}</h2>
            <ul className="mt-5 space-y-2.5 text-ink-soft">
              {intro.disbelief.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </Card>

          <Note icon="boundary">
            <h2 className="font-display text-2xl">{intro.ethics.title}</h2>
            <ul className="mt-5 space-y-2.5">
              {intro.ethics.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </Note>
        </div>

        <div className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl">Как устроен проект</h2>
          <div className="prose-editorial mt-4">
            <p>
              Мы не строим онлайн-школу с потоками и запусками. Мы собираем среду,
              в которую человек может прийти в любой день: узнать свою ситуацию,
              получить бесплатный опыт и выбрать подходящую глубину — от рабочего
              листа до терапии.
            </p>
            <p>
              Поэтому бесплатная часть у нас не приманка перед курсом. Ей можно
              пользоваться и никогда ничего не покупать.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/besplatno" variant="secondary">
              Бесплатная библиотека
            </ButtonLink>
            <ButtonLink href="/konsultacii" variant="secondary">
              Консультации
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
