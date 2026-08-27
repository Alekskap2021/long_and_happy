import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { situations } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

const tones = [
  "bg-paper-card",
  "bg-accent-quiet",
  "bg-second-quiet",
  "bg-paper-card",
  "bg-accent-quiet",
] as const;

export function SituationsBlock({ block }: { block: HomeBlock }) {
  return (
    <Section
      id="situations"
      eyebrow={block.eyebrow}
      title={block.title}
      tone="deep"
    >
      <Reveal>
        <ul className="grid gap-5 lg:grid-cols-2">
          {situations.map((situation, index) => (
            <li key={situation.title} className={index === 4 ? "lg:col-span-2" : ""}>
              <Link
                href={situation.href}
                className={`group flex h-full min-h-[19rem] flex-col rounded-band border border-line p-7 transition-colors duration-200 ease-calm hover:border-line-hover motion-reduce:transition-none sm:p-9 ${
                  tones[index]
                }`}
              >
                <p className="max-w-[34rem] font-display text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug">
                  {situation.title}
                </p>
                <p className="mt-5 max-w-[42rem] text-ink-soft">{situation.body}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-sm text-accent">
                  Посмотреть внимательнее
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
