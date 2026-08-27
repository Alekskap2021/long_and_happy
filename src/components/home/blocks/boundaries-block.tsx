import { Note } from "@/components/ui/note";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getAuthorsIntro } from "@/content/repository";
import type { HomeBlock } from "@/content/schemas";

export function BoundariesBlock({ block }: { block: HomeBlock }) {
  const intro = getAuthorsIntro();

  return (
    <Section eyebrow={block.eyebrow} title={block.title} body={block.body}>
      <Reveal>
        <Note title={intro.disbelief.title} className="max-w-3xl">
          <ul className="mt-3 space-y-2">
            {intro.disbelief.items.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Note>
      </Reveal>
    </Section>
  );
}
