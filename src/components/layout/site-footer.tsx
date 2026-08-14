import Link from "next/link";

const columns = [
  {
    title: "Разделы",
    links: [
      { href: "/temy", label: "Темы" },
      { href: "/besplatno", label: "Начать бесплатно" },
      { href: "/kursy", label: "Курсы и практикумы" },
      { href: "/konsultacii", label: "Консультации" },
      { href: "/o-nas", label: "О нас" },
    ],
  },
  {
    title: "Служебное",
    links: [
      { href: "/oplata", label: "Оплата и доступ" },
      { href: "/konfidencialnost", label: "Политика конфиденциальности" },
      { href: "/obrabotka-dannyh", label: "Обработка данных" },
      { href: "/kontakty", label: "Контакты" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-deep py-14">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-xl">Долго и счастливо</p>
          <p className="mt-3 max-w-sm text-[0.95rem] text-ink-soft">
            Авторский проект Вероники и Игоря о трудных разговорах: бесплатная
            библиотека, диагностика, практикумы, курсы и возможность перейти в
            терапию.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Образовательные продукты не являются психотерапией и не заменяют
            медицинскую помощь.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page mt-10 border-t border-line pt-6 text-sm text-ink-muted">
        Прототип сайта. Тексты, цены и продукты — рабочие заготовки для
        обсуждения.
      </div>
    </footer>
  );
}
