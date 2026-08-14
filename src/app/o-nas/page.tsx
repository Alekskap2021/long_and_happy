import type { Metadata } from "next";

import { AuthorsPortrait } from "@/components/authors/authors-portrait";
import { ButtonLink } from "@/components/ui/button";
import { BackdropArt, Illustration } from "@/components/ui/illustration";
import { Note } from "@/components/ui/note";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
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
    <>
      <PageHeader
        eyebrow="О нас"
        title={intro.title}
        body={intro.paragraphs[0]}
        aside={
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <AuthorsPortrait priority />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/besplatno" size="lg">
            Бесплатная библиотека
          </ButtonLink>
          <ButtonLink href="/konsultacii" variant="secondary" size="lg">
            Консультации
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="deep">
        {/* Первый абзац уже прозвучал в шапке страницы — здесь продолжение. */}
        <Reveal className="prose-editorial max-w-[40rem]">
          {intro.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={80} className="mt-16">
          <Illustration name="divergence" />
        </Reveal>

        <Reveal delay={80} className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-14">
          {authors.map((author) => (
            <div key={author.slug} className="border-l-2 border-accent-edge pl-5">
              <p className="font-display text-[1.15rem]">{author.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{author.role}</p>
              <p className="voice mt-4 text-[1.15rem] leading-snug text-ink">
                {author.voice}
              </p>
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-[0.95rem] text-ink-soft">
                {author.credentials.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section title={intro.disbelief.title}>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal className="prose-editorial max-w-xl">
            <ul>
              {intro.disbelief.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <Note icon="ethics" title={intro.ethics.title}>
              <ul className="mt-3 space-y-2">
                {intro.ethics.items.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </Note>
          </Reveal>
        </div>
      </Section>

      <Section tone="band" title="Как устроен проект">
        <BackdropArt
          name="method-core"
          opacity={0.18}
          className="-right-[32%] -top-[48%] hidden h-[190%] w-[62%] lg:block"
        />

        <Reveal className="relative max-w-[40rem]">
          <div className="prose-editorial">
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

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/besplatno" variant="on-band" size="lg">
              Бесплатная библиотека
            </ButtonLink>
            <ButtonLink href="/konsultacii" variant="on-band-quiet" size="lg">
              Консультации
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
