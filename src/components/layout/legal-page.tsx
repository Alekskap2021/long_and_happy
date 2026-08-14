import type { ReactNode } from "react";

import { Note } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";

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
    <div className="py-14 sm:py-20">
      <div className="container-prose">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-5 text-lg text-ink-soft">{intro}</p>

        <div className="prose-editorial mt-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
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
            </section>
          ))}
        </div>

        <div className="mt-10">
          <Note>
            {footer ??
              "Черновик для прототипа. Финальные формулировки готовятся с юристом."}
          </Note>
        </div>
      </div>
    </div>
  );
}
