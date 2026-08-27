import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { startingPoints } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function LevelsBlock({ block }: { block: HomeBlock }) {
  return (
    <Section
      id="next-step"
      title={block.title}
      body={block.body}
      tone="deep"
    >
      <Reveal>
        <ul className="grid gap-5 lg:grid-cols-2">
          {startingPoints.map((point) => (
            <li key={point.title}>
              <Link
                href={point.href}
                className="group flex h-full min-h-[21rem] flex-col rounded-band border border-line bg-paper-card p-7 transition-colors duration-200 ease-calm hover:border-line-hover hover:bg-surface-hover motion-reduce:transition-none sm:p-9"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {point.desire}
                </p>
                <p className="mt-5 font-display text-title">{point.title}</p>
                <p className="mt-5 max-w-[34rem] text-ink-soft">{point.body}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-sm text-accent">
                  {point.label}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 ease-calm group-hover:translate-x-1 motion-reduce:transition-none"
                    strokeWidth={1.75}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
