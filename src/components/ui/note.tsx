import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";

type Tone = "boundary" | "accent" | "second";

const tones: Record<Tone, { wrap: string; icon: string }> = {
  boundary: {
    wrap: "border-boundary/45 bg-boundary-soft",
    icon: "text-boundary",
  },
  accent: { wrap: "border-accent/40 bg-accent-quiet", icon: "text-accent" },
  second: { wrap: "border-second/40 bg-second-quiet", icon: "text-second" },
};

/**
 * Границы формата, этика, предупреждения. Заметно, но без «медицинской тревоги»:
 * мягкий фон и вертикальная линия вместо алой рамки.
 */
export function Note({
  children,
  title,
  tone = "boundary",
  icon = "boundary",
  className = "",
}: {
  children: ReactNode;
  title?: string;
  tone?: Tone;
  icon?: IconName | null;
  className?: string;
}) {
  const style = tones[tone];

  return (
    <aside
      className={`flex gap-4 rounded-card border-l-2 ${style.wrap} px-5 py-5 sm:px-6 ${className}`}
    >
      {icon && (
        <span className={`mt-0.5 shrink-0 ${style.icon}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0 text-[0.97rem] leading-relaxed text-ink-soft">
        {title && <p className="font-semibold text-ink">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
