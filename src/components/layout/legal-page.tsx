import type { ReactNode } from "react";

import { Note } from "@/components/ui/note";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";

/**
 * Общий шаблон юридических страниц: тот же язык, что у остальных разделов,
 * без отдельной «служебной» вёрстки. Длинный текст живёт в узкой колонке.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  footer?: ReactNode;
}) {
  return (
    <article>
      <PageHeader eyebrow={eyebrow} title={title} body={intro} />

      <Section>
        <Reveal className="max-w-[40rem] space-y-14">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[1.45rem] leading-snug">{section.heading}</h2>
              <div className="prose-editorial mt-4">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </Reveal>

        <Reveal className="mt-16 max-w-[40rem]">
          <Note>
            {footer ??
              "Черновик для прототипа. Финальные формулировки готовятся с юристом."}
          </Note>
        </Reveal>
      </Section>
    </article>
  );
}
