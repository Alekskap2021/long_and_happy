import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";

type Tone = "neutral" | "accent" | "second" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-hover text-ink-soft",
  accent: "bg-accent-quiet text-accent",
  second: "bg-second-quiet text-second",
  outline: "border border-line text-ink-muted",
};

/** Метка типа контента: формат материала, вид продукта, состояние. */
export function Tag({
  children,
  tone = "neutral",
  icon,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: IconName;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-[0.01em] ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
