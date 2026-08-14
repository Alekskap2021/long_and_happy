import type { Metadata } from "next";

import { Note } from "@/components/ui/note";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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
    <article>
      <PageHeader
        eyebrow="Служебная страница"
        title="Аналитика маршрутов"
        body="Источник → тема → запуск диагностики → завершение → продукт → заявка. События собираются в памяти процесса, пока вы ходите по прототипу."
      />

      <Section>
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {counts.map((item) => (
              <li key={item.step} className="border-t border-line pt-4">
                <p className="font-display text-[2.4rem] leading-none">
                  {item.count}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{item.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <Reveal className="min-w-0">
            <h2 className="text-title">Последние события</h2>
            {events.length === 0 ? (
              <p className="mt-5 text-ink-muted">
                Пока пусто. Пройдите по сайту: главная, тема, диагностика,
                продукт.
              </p>
            ) : (
              <Panel className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line">
                        <th className="pb-3 pr-4 font-medium text-ink-muted">
                          Событие
                        </th>
                        <th className="pb-3 pr-4 font-medium text-ink-muted">
                          Путь
                        </th>
                        <th className="pb-3 pr-4 font-medium text-ink-muted">
                          Детали
                        </th>
                        <th className="pb-3 text-right font-medium text-ink-muted">
                          Время
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 25).map((event) => (
                        <tr key={event.id} className="border-b border-line last:border-0">
                          <td className="whitespace-nowrap py-3 pr-4 align-top">
                            <Tag tone="accent">
                              {stepLabels[event.step] ?? event.step}
                            </Tag>
                          </td>
                          <td className="py-3 pr-4 align-top text-ink-soft">
                            {event.path}
                          </td>
                          <td className="py-3 pr-4 align-top text-ink-muted">
                            {event.meta &&
                              Object.entries(event.meta).map(([key, value]) => (
                                <span key={key} className="mr-3 inline-block">
                                  {key}: {value}
                                </span>
                              ))}
                          </td>
                          <td className="py-3 text-right align-top tabular-nums text-ink-muted">
                            {new Date(event.createdAt).toLocaleTimeString(
                              "ru-RU",
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-title">Заявки</h2>
            {leads.length === 0 ? (
              <p className="mt-5 text-ink-muted">
                Заявок нет. Попробуйте лист ожидания на странице практикума.
              </p>
            ) : (
              <ul className="mt-6">
                {leads.map((lead) => (
                  <li
                    key={lead.id}
                    className="border-t border-line py-5 last:border-b"
                  >
                    <p className="font-medium">{lead.email}</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {lead.intent}
                      {lead.productSlug ? ` · ${lead.productSlug}` : ""}
                    </p>
                    {lead.note && (
                      <p className="mt-2.5 text-[0.95rem] text-ink-soft">
                        {lead.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <Note className="mt-8">
              Данные живут в памяти процесса: после перезапуска сервера список
              пустой. Это осознанная заглушка вместо базы.
            </Note>
          </Reveal>
        </div>
      </Section>
    </article>
  );
}
