import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { ButtonLink } from "@/components/ui/button";

const columns = [
  {
    title: "Разделы",
    links: [
      { href: "/besplatno", label: "Начать бесплатно" },
      { href: "/temy", label: "Темы" },
      { href: "/kursy", label: "Курсы и практикумы" },
      { href: "/konsultacii", label: "Консультации" },
      { href: "/o-nas", label: "О нас" },
    ],
  },
  {
    title: "Служебное",
    links: [
      { href: "/oplata", label: "Оплата и доступ" },
      { href: "/konfidencialnost", label: "Конфиденциальность" },
      { href: "/obrabotka-dannyh", label: "Обработка данных" },
      { href: "/kontakty", label: "Контакты" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-deep">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr]">
          <div className="max-w-md">
            <p className="font-display text-title">Долго и счастливо</p>
            <p className="mt-5 text-[0.97rem] text-ink-soft">
              Авторский проект Вероники и Игоря о трудных разговорах: бесплатная
              библиотека, диагностика, практикумы и курсы — и честный переход в
              терапию там, где обучение не помогает.
            </p>

            <div className="mt-7">
              <ButtonLink
                href="/diagnostika/chto-vy-delaete-slovami"
                variant="secondary"
                size="sm"
              >
                Пройти диагностику
              </ButtonLink>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.97rem] text-ink-soft transition-colors duration-200 ease-calm hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-1.5 text-sm text-ink-muted">
            <p>
              Образовательные продукты не являются психотерапией и не заменяют
              медицинскую помощь.
            </p>
            <p>
              Прототип сайта: тексты, цены и продукты — рабочие заготовки для
              обсуждения.
            </p>
          </div>

          <ThemeSwitcher className="shrink-0" />
        </div>
      </div>
    </footer>
  );
}
