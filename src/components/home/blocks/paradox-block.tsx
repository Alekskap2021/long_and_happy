import { Reveal } from "@/components/ui/reveal";
import { paradoxContent } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function ParadoxBlock({ block }: { block: HomeBlock }) {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-prose">
        <Reveal>
          <h2 className="text-title">{block.title}</h2>
          <div className="mt-8 space-y-5 text-lead text-ink-soft">
            {paradoxContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-accent pl-6 font-display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-ink">
            {paradoxContent.question}
          </p>
          <p className="mt-6 text-ink-soft">{paradoxContent.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
