import { BackdropArt } from "@/components/ui/illustration";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { methodContent, methodSteps } from "@/content/data/home";
import type { HomeBlock } from "@/content/schemas";

export function MethodBlock({ block }: { block: HomeBlock }) {
  return (
    <Section id="method">
      <BackdropArt
        name="method-core"
        opacity={0.12}
        className="-right-[32%] -top-[22%] hidden h-[90%] w-[64%] lg:block"
      />

      <Reveal className="relative max-w-[46rem]">
        <h2 className="text-title">{block.title}</h2>
        <div className="mt-7 space-y-4 text-lead text-ink-soft">
          {methodContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-7 font-display text-[1.12rem]">{methodContent.stepsIntro}</p>
      </Reveal>

      <Reveal className="relative mt-14">
        <ol className="relative grid gap-0 border-l border-line pl-8 lg:grid-cols-5 lg:gap-7 lg:border-l-0 lg:pl-0">
          <span
            aria-hidden
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-line lg:block"
          />
          {methodSteps.map((step, index) => (
            <li key={step.title} className="relative pb-12 last:pb-0 lg:pb-0">
              <span className="absolute -left-[3.55rem] top-0 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-accent lg:relative lg:left-auto">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <p className="flex items-baseline gap-2.5 lg:mt-5">
                <span className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-muted">
                  0{index + 1}
                </span>
                <span className="font-display text-[1.15rem]">{step.title}</span>
              </p>
              <p className="mt-3 text-[0.95rem] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12 max-w-[48rem] border-t border-line pt-8">
        <p className="text-lead text-ink-soft">{methodContent.closing}</p>
      </Reveal>
    </Section>
  );
}
