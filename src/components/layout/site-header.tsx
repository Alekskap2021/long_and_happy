"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/besplatno", label: "Начать бесплатно" },
  { href: "/temy", label: "Темы" },
  { href: "/kursy", label: "Курсы и практикумы" },
  { href: "/konsultacii", label: "Консультации" },
  { href: "/o-nas", label: "О нас" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-lg tracking-tight">
            Долго и счастливо
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
            о трудных разговорах
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.95rem] transition-colors ${
                  active ? "text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/diagnostika/chto-vy-delaete-slovami"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent sm:inline-flex"
          >
            Пройти диагностику
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-line-strong px-3 py-2 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper px-5 pb-5 pt-2 lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/70 py-3 text-ink-soft last:border-none"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/diagnostika/chto-vy-delaete-slovami"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper"
          >
            Пройти диагностику
          </Link>
        </nav>
      )}
    </header>
  );
}
