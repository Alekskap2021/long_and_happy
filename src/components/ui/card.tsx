import Link from "next/link";
import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-card border border-line bg-paper-card p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-card border border-line bg-paper-card p-6 transition-colors hover:border-line-strong hover:bg-paper-deep/60 ${className}`}
    >
      {children}
    </Link>
  );
}

export function Tag({
  children,
  tone = "neutral",
  icon,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "forest";
  icon?: IconName;
}) {
  const tones = {
    neutral: "border-line text-ink-muted",
    accent: "border-accent/30 bg-accent-soft text-accent",
    forest: "border-forest/20 bg-forest-soft text-forest",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export function Note({
  children,
  tone = "forest",
  icon,
}: {
  children: ReactNode;
  tone?: "forest" | "accent";
  icon?: IconName;
}) {
  const tones = {
    forest: "border-forest/20 bg-forest-soft text-forest",
    accent: "border-accent/20 bg-accent-soft text-accent",
  } as const;

  return (
    <aside
      className={`flex gap-4 rounded-card border p-5 text-[0.95rem] ${tones[tone]}`}
    >
      {icon && <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0" />}
      <div className="min-w-0">{children}</div>
    </aside>
  );
}
