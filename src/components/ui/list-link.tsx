import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Строка списка вместо карточки: без рамки и тени, разделяют отступ и фон
 * при наведении. Стрелка отвечает за «это ссылка», а не бордер.
 */
export function ListLink({
  href,
  children,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-card py-6 pl-5 transition-colors duration-200 ease-calm hover:bg-surface-hover motion-reduce:transition-none sm:pl-6 ${
        arrow ? "pr-12 sm:pr-14" : "pr-5 sm:pr-6"
      } ${className}`}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.75}
          className="absolute right-5 top-6 h-4 w-4 text-ink-muted transition-[color,transform] duration-200 ease-calm group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none sm:right-6"
        />
      )}
    </Link>
  );
}
