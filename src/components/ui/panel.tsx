import type { ReactNode } from "react";

/**
 * Поверхность появляется только там, где без неё ломается взаимодействие:
 * фильтры библиотеки, сценарий диагностики, форма. В контентных секциях
 * панелей нет — там работают отступы и типографика.
 */
export function Panel({
  children,
  id,
  tone = "card",
  padded = true,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "card" | "quiet";
  padded?: boolean;
  className?: string;
}) {
  const tones = {
    card: "border-line bg-paper-card",
    quiet: "border-line bg-paper-deep/60",
  } as const;

  return (
    <div
      id={id}
      className={`overflow-hidden rounded-card border ${tones[tone]} ${
        padded ? "p-6 sm:p-8" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
