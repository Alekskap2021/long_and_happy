import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { featuredMaterialSlugs } from "@/content/data/home";
import { getMaterialsBySlugs } from "@/content/repository";
import type { HomeBlock } from "@/content/schemas";

export function LibraryBlock({ block }: { block: HomeBlock }) {
  const materials = getMaterialsBySlugs([...featuredMaterialSlugs]);

  return (
    <Section
      id="library"
      eyebrow={block.eyebrow}
      title={block.title}
      body={block.body}
      aside={
        <ButtonLink href="/besplatno" variant="secondary">
          Все бесплатные материалы
        </ButtonLink>
      }
    >
      <Reveal>
        <ul className="grid gap-5 lg:grid-cols-3">
          {materials.map((material, index) => (
            <li key={material.slug}>
              <Link
                href={`/besplatno/${material.slug}`}
                className="group flex h-full min-h-[22rem] flex-col rounded-band border border-line bg-paper-card p-7 transition-colors duration-200 ease-calm hover:border-line-hover hover:bg-surface-hover motion-reduce:transition-none"
              >
                <div className="flex items-center justify-between gap-4 text-xs text-ink-muted">
                  <span>0{index + 1}</span>
                  <span>{material.readingMinutes} мин чтения</span>
                </div>
                <p className="mt-10 font-display text-[1.45rem] leading-snug">
                  {material.title}
                </p>
                <p className="mt-5 text-[0.95rem] text-ink-soft">
                  {material.excerpt}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-sm text-accent">
                  Читать
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
