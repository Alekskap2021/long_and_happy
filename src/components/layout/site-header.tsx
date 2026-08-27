"use client";

import { Dialog } from "@base-ui/react/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { ButtonLink } from "@/components/ui/button";

const navigation = [
  { href: "/besplatno", label: "Начать бесплатно" },
  { href: "/temy", label: "Темы" },
  { href: "/kursy", label: "Курсы и практикумы" },
  { href: "/konsultacii", label: "Консультации" },
  { href: "/o-nas", label: "О нас" },
];

const diagnosticHref = "/diagnostika/chto-vy-delaete-slovami";

function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="Долго и счастливо — на главную"
      className="group flex shrink-0 items-center gap-3"
    >
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-200 ease-calm group-hover:border-accent-edge"
      >
        <span className="flex gap-0.75">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 rounded-full bg-second" />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[1.02rem] font-medium tracking-[-0.02em]">
          Долго и счастливо
        </span>
        <span className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-ink-muted">
          о трудных разговорах
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <BrandMark />

        {/* Пять пунктов + бренд + действия помещаются в строку только с 1280px:
            ниже этой ширины навигация уходит в ящик. */}
        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-7 xl:flex"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-1 text-[0.94rem] transition-colors duration-200 ease-calm ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          {/* max-sm:hidden, а не hidden sm:inline-flex: базовый inline-flex
              кнопки перебивает безусловный hidden в сгенерированном CSS. */}
          <ButtonLink href={diagnosticHref} size="sm" className="max-sm:hidden">
            Пройти диагностику
          </ButtonLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:text-ink xl:hidden"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={1.75} />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-40 min-h-dvh bg-ink/25 backdrop-blur-[2px] transition-opacity duration-200 ease-calm data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(23rem,88vw)] flex-col gap-8 border-l border-line bg-paper px-6 pb-8 pt-6 transition-transform duration-260 ease-calm data-ending-style:translate-x-full data-starting-style:translate-x-full motion-reduce:transition-none">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Навигация
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Закрыть меню"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:text-ink"
                  >
                    <X className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </Dialog.Close>
                </div>

                <nav className="flex flex-col">
                  <Dialog.Close
                    render={<Link href={diagnosticHref} />}
                    className="border-b border-line py-4 font-display text-xl text-accent"
                  >
                    Пройти диагностику
                  </Dialog.Close>
                  {navigation.map((item) => (
                    <Dialog.Close
                      key={item.href}
                      render={<Link href={item.href} />}
                      className={`border-b border-line py-4 font-display text-xl transition-colors duration-200 ease-calm last:border-none ${
                        isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Dialog.Close>
                  ))}
                </nav>

                <div className="mt-auto">
                  <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Палитра
                  </p>
                  <ThemeSwitcher className="w-full justify-between" />
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
