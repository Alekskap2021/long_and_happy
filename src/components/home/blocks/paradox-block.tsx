import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { paradoxContent } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function ParadoxBlock({ block }: { block: HomeBlock }) {
  return (
    <section id="paradox" className="bg-paper py-20 sm:py-28">
      <div className="container-page grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:gap-16">
        <Reveal className="xl:h-full">
          {/* Кадры остаются в ряд на любой ширине: на телефоне ряд ниже
              по высоте, поэтому все три сцены видны без свайпа. Две колонки
              включаются только с xl: на 1024–1279px кадры в половине ширины
              вырождаются в узкие полоски. Там, где колонки есть, высоту ряда
              задаёт текст, поэтому соотношение кадра считает сетка. */}
          <ul className="grid grid-cols-3 gap-2.5 sm:gap-4 xl:h-full">
            {paradoxContent.photos.map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-3/4 overflow-hidden rounded-card sm:aspect-2/3 sm:rounded-band xl:aspect-auto xl:h-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 16vw, 31vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="max-w-[34rem]">
          <h2 className="text-title">{block.title}</h2>
          <div className="mt-8 space-y-5 text-ink-soft">
            {paradoxContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-9 border-l-2 border-accent pl-6 font-display text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug text-ink">
            {paradoxContent.question}
          </p>
          <p className="mt-6 text-ink-soft">{paradoxContent.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
