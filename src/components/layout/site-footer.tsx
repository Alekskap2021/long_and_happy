import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const columns = [
  {
    title: "Начать бесплатно",
    links: [
      {
        href: "/diagnostika/chto-vy-delaete-slovami",
        label: "Диагностика",
      },
      { href: "/besplatno?format=statya", label: "Статьи" },
      { href: "/besplatno?format=gayd", label: "Гайды" },
    ],
  },
  {
    title: "Темы",
    links: [
      { href: "/temy/trudnye-razgovory", label: "Трудные разговоры" },
      { href: "/besplatno?theme=prosby-i-pomoshch", label: "Просьбы" },
      { href: "/besplatno?theme=pauza-i-molchanie", label: "Пауза и молчание" },
      { href: "/besplatno?theme=posle-ssory", label: "После ссоры" },
    ],
  },
  {
    title: "Учиться",
    links: [
      {
        href: "/kursy/7-shagov-do-vazhnogo-razgovora",
        label: "7 дней до разговора",
      },
      { href: "/kursy/bazovyy-kurs", label: "Базовый курс" },
      { href: "/kursy", label: "Курсы и практикумы" },
    ],
  },
  {
    title: "Работа с нами",
    links: [
      { href: "/konsultacii", label: "Консультации" },
      {
        href: "/kursy/semeynaya-konsultaciya",
        label: "Семейная консультация",
      },
      {
        href: "/kursy/individualnaya-konsultaciya",
        label: "Индивидуальная консультация",
      },
    ],
  },
  {
    title: "О проекте",
    links: [
      { href: "/o-nas", label: "О нас" },
      { href: "/kontakty", label: "Контакты" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-deep">
      <div className="container-page py-16">
        <div className="grid gap-12 xl:grid-cols-[1.25fr_3fr]">
          <div className="max-w-sm">
            <p className="font-display text-title">Долго и счастливо</p>
            <p className="mt-5 text-[0.97rem] text-ink-soft">
              Авторский проект Вероники и Игоря о трудных разговорах и о том,
              что мы делаем словами друг с другом.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[0.92rem] text-ink-soft transition-colors duration-200 ease-calm hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-1.5 text-sm text-ink-muted">
            <p>
              Образовательные продукты не являются психотерапией и не заменяют
              медицинскую помощь.
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/konfidencialnost" className="hover:text-accent">
                Политика конфиденциальности
              </Link>
              <Link href="/obrabotka-dannyh" className="hover:text-accent">
                Обработка персональных данных
              </Link>
              <Link href="/oplata" className="hover:text-accent">
                Оплата и доступ
              </Link>
            </p>
          </div>

          <ThemeSwitcher className="shrink-0" />
        </div>
      </div>
    </footer>
  );
}
