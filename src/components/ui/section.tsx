import type { ReactNode } from "react";

export function Section({
  children,
  eyebrow,
  title,
  body,
  tone = "paper",
  id,
}: {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  body?: string;
  tone?: "paper" | "deep" | "ink";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    deep: "bg-paper-deep text-ink",
    ink: "bg-ink text-paper",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-20`}>
      <div className="container-page">
        {(eyebrow || title || body) && (
          <header className="mb-10 max-w-3xl">
            {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-3 text-3xl sm:text-[2.5rem] sm:leading-[1.1]">
                {title}
              </h2>
            )}
            {body && (
              <p
                className={`mt-4 text-lg ${
                  tone === "ink" ? "text-paper-deep/80" : "text-ink-soft"
                }`}
              >
                {body}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: "paper" | "deep" | "ink";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "ink" ? "text-accent-soft" : "text-accent"
      }`}
    >
      {children}
    </p>
  );
}
