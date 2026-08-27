import { ArrowLeftRight, ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { BackdropArt } from "@/components/ui/illustration";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Section } from "@/components/ui/section";
import { diagnosticContent, diagnosticHref } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function DiagnosticBlock({ block }: { block: HomeBlock }) {
  return (
    <Section id="diagnostic" tone="band">
      <BackdropArt
        name="divergence"
        opacity={0.2}
        className="-right-[14%] -top-[25%] hidden h-[80%] w-[48%] lg:block"
      />

      <div className="relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 className="mt-4 text-display">{block.title}</h2>
          <p className="mt-7 max-w-2xl text-lead text-ink-soft">
            {diagnosticContent.intro}
          </p>
          <p className="mt-5 max-w-2xl text-ink-soft">
            {diagnosticContent.explanation}
          </p>
          <ul className="mt-4 space-y-2 text-ink">
            {diagnosticContent.questions.map((question) => (
              <li key={question}>— {question}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-sm text-ink-muted">{diagnosticContent.resultIntro}</p>
          <div className="mt-5 rounded-band border border-band-line bg-band-quiet p-6 sm:p-8">
            <div className="grid items-center gap-5 text-center sm:grid-cols-[1fr_auto_1fr]">
              <p className="font-display text-[1.15rem] uppercase tracking-[0.08em]">
                {diagnosticContent.resultLabels[0]}
              </p>
              <ArrowLeftRight
                aria-hidden
                className="mx-auto h-6 w-6 rotate-90 text-accent sm:rotate-0"
                strokeWidth={1.5}
              />
              <p className="font-display text-[1.15rem] uppercase tracking-[0.08em]">
                {diagnosticContent.resultLabels[1]}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm font-medium text-ink">
            {diagnosticContent.meta}
          </p>
          <div className="mt-6">
            <ButtonLink href={diagnosticHref} variant="on-band" size="lg">
              Пройти диагностику
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>
          <p className="mt-5 max-w-xl text-sm text-ink-muted">
            {diagnosticContent.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
