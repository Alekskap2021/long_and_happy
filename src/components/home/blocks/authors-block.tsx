import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthorsPortrait } from "@/components/authors/authors-portrait";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { authorsContent } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function AuthorsBlock({ block }: { block: HomeBlock }) {
  return (
    <Section id="authors" eyebrow={block.eyebrow} title={block.title} tone="deep">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md lg:mx-0">
          <AuthorsPortrait size="compact" />
        </Reveal>

        <Reveal delay={80}>
          <div className="prose-editorial max-w-2xl">
            {authorsContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="border-l-2 border-accent pl-5 font-display text-[1.2rem]">
              {authorsContent.question}
            </p>
          </div>

          <Link
            href={authorsContent.href}
            className="mt-9 inline-flex items-center gap-2 text-accent transition-colors duration-200 ease-calm hover:text-accent-hover"
          >
            {authorsContent.linkLabel}
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
