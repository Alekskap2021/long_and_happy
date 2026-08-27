import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  diagnosticHref,
  finalCtaContent,
} from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function FinalCtaBlock({ block }: { block: HomeBlock }) {
  return (
    <Section id="final-cta" tone="band">
      <Reveal className="mx-auto max-w-[48rem] text-center">
        <h2 className="text-display">{block.title}</h2>
        <p className="mx-auto mt-6 max-w-[38rem] text-lead text-ink-soft">
          {finalCtaContent.body}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <ButtonLink href={diagnosticHref} variant="on-band" size="lg">
            {finalCtaContent.primaryLabel}
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </ButtonLink>
          <ButtonLink href="/besplatno" variant="on-band-quiet">
            {finalCtaContent.secondaryLabel}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
