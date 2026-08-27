import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { HeroArt } from "@/components/ui/illustration";
import { Reveal } from "@/components/ui/reveal";
import { heroContent } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function HeroBlock({ block }: { block: HomeBlock }) {
  return (
    <section className="wash grain relative overflow-hidden border-b border-line">
      <HeroArt className="-bottom-[12%] -right-[48%] h-[38%] w-[125%] sm:-right-[20%] sm:bottom-auto sm:top-0 sm:h-full sm:w-[68%]" />

      <div className="container-page relative flex min-h-[min(88svh,52rem)] flex-col justify-center py-20 sm:py-24">
        <div className="max-w-[42rem]">
          <Reveal>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
              {block.eyebrow}
            </p>
            <p className="mt-9 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
              {heroContent.overline}
            </p>
            <h1 className="mt-3 font-display text-brand font-medium">
              {heroContent.heading}
            </h1>
            <p className="mt-5 max-w-[36rem] font-display text-title">{block.title}</p>
          </Reveal>

          <Reveal delay={90} className="mt-8 max-w-[38rem]">
            <div className="space-y-4 text-ink-soft">
              {heroContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 font-display text-[1.12rem] text-ink">
              {heroContent.question}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroContent.actions.map((action, index) => (
                <ButtonLink
                  key={action.href}
                  href={action.href}
                  variant={action.variant}
                  size="lg"
                >
                  {action.label}
                  {index === 0 && (
                    <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
