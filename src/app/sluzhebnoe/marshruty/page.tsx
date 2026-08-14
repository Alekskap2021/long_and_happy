import type { Metadata } from "next";

import { Card, Note, Tag } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";
import { listEvents, listLeads } from "@/server/store";

export const metadata: Metadata = {
  title: "Аналитика маршрутов",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const stepLabels: Record<string, string> = {
  source_landing: "Заход на главную",
  theme_view: "Просмотр темы",
  diagnostic_start: "Запуск диагностики",
  diagnostic_complete: "Завершение диагностики",
  product_view: "Просмотр продукта",
  purchase_intent: "Намерение купить / заявка",
  consultation_view: "Просмотр консультаций",
};

const funnel = [
  "source_landing",
  "theme_view",
  "diagnostic_start",
  "diagnostic_complete",
  "product_view",
  "purchase_intent",
];

/**
 * Служебная страница прототипа: показывает, что воронка из раздела 12
 * действительно собирается. В продакшене её место занимает внешняя аналитика.
 */
export default function FunnelPage() {
  const events = listEvents();
  const leads = listLeads();

  const counts = funnel.map((step) => ({
    step,
    label: stepLabels[step],
    count: events.filter((event) => event.step === step).length,
  }));

  return (
    <div className="py-14 sm:py-20">
      <div className="container-page">
        <Eyebrow>Служебная страница</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl">Аналитика маршрутов</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Источник → тема → запуск диагностики → завершение → продукт → заявка.
          События собираются в памяти процесса, пока вы ходите по прототипу.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {counts.map((item) => (
            <Card key={item.step}>
              <p className="font-display text-3xl">{item.count}</p>
              <p className="mt-2 text-sm text-ink-soft">{item.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl">Последние события</h2>
            {events.length === 0 ? (
              <p className="mt-4 text-ink-muted">
                Пока пусто. Пройдите по сайту: главная, тема, диагностика, продукт.
              </p>
            ) : (
              <div className="mt-5 space-y-2">
                {events.slice(0, 25).map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-paper-card px-4 py-3 text-sm"
                  >
                    <Tag tone="accent">{stepLabels[event.step] ?? event.step}</Tag>
                    <span className="text-ink-soft">{event.path}</span>
                    {event.meta &&
                      Object.entries(event.meta).map(([key, value]) => (
                        <span key={key} className="text-ink-muted">
                          {key}: {value}
                        </span>
                      ))}
                    <span className="ml-auto text-ink-muted">
                      {new Date(event.createdAt).toLocaleTimeString("ru-RU")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl">Заявки</h2>
            {leads.length === 0 ? (
              <p className="mt-4 text-ink-muted">
                Заявок нет. Попробуйте лист ожидания на странице практикума.
              </p>
            ) : (
              <div className="mt-5 space-y-2">
                {leads.map((lead) => (
                  <Card key={lead.id}>
                    <p className="font-medium">{lead.email}</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {lead.intent}
                      {lead.productSlug ? ` · ${lead.productSlug}` : ""}
                    </p>
                    {lead.note && (
                      <p className="mt-2 text-[0.95rem] text-ink-soft">
                        {lead.note}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Note>
                Данные живут в памяти процесса: после перезапуска сервера список
                пустой. Это осознанная заглушка вместо базы.
              </Note>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
