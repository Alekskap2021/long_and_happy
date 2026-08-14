import type { Metadata } from "next";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button";
import { Card, Note, Tag } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";
import { getConsultations } from "@/content/repository";

export const metadata: Metadata = {
  title: "Консультации",
  description:
    "Индивидуальная и семейная работа: чем терапия отличается от образовательных продуктов и с чем можно приходить.",
  alternates: { canonical: "/konsultacii" },
};

const comparison = [
  {
    aspect: "Что происходит",
    education: "Осваиваете способ смотреть на разговор и применяете его сами.",
    therapy: "Работаем с вашей историей и тем, что за разговором стоит.",
  },
  {
    aspect: "Кому подходит",
    education: "Есть силы наблюдать за собой и пробовать новое в разговоре.",
    therapy: "Сценарий держится сам и не меняется от новых формулировок.",
  },
  {
    aspect: "Формат",
    education: "Материалы, задания, собственный темп.",
    therapy: "Встречи со специалистом, индивидуально или парой.",
  },
  {
    aspect: "Границы",
    education: "Не работает с травмой и не обеспечивает безопасность.",
    therapy: "Не гарантирует сохранения отношений и не выносит вердиктов.",
  },
];

export default function ConsultationsPage() {
  const consultations = getConsultations();

  return (
    <div className="py-14 sm:py-20">
      <TrackFunnelStep step="consultation_view" path="/konsultacii" />

      <div className="container-page">
        <div className="max-w-3xl">
          <Eyebrow>Консультации</Eyebrow>
          <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
            Отдельная глубина, а не премиум-версия курса
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Иногда разговор не получается не потому, что человеку не хватает
            навыка. Тогда нужен не курс, а работа с тем, что за этим разговором
            стоит.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {consultations.map((consultation) => (
            <Card key={consultation.slug} className="flex h-full flex-col">
              <div>
                <Tag tone="forest" icon="konsultaciya">
                  Консультация
                </Tag>
              </div>
              <p className="mt-4 font-display text-2xl">{consultation.title}</p>
              <p className="mt-3 text-ink-soft">{consultation.tagline}</p>

              <div className="mt-6 space-y-2 text-[0.95rem] text-ink-soft">
                {consultation.program.map((item) => (
                  <p key={item.title}>
                    <span className="font-medium text-ink">{item.title}:</span>{" "}
                    {item.body}
                  </p>
                ))}
              </div>

              <p className="mt-5 font-display text-xl">
                {consultation.price.amount?.toLocaleString("ru-RU")} ₽
              </p>

              <div className="mt-5 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  С чем можно приходить
                </p>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-soft">
                  {consultation.forWhom.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <ButtonLink href={`/kursy/${consultation.slug}`} size="sm">
                  Подробнее и запись
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl">
            Чем это отличается от наших курсов
          </h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-line bg-paper-card">
            <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
              <thead className="bg-paper-deep/70 text-xs uppercase tracking-[0.12em] text-ink-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold"> </th>
                  <th className="px-5 py-3 font-semibold">
                    Образовательный продукт
                  </th>
                  <th className="px-5 py-3 font-semibold">Консультация</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.aspect} className="border-t border-line align-top">
                    <td className="px-5 py-4 font-medium">{row.aspect}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.education}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.therapy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <h2 className="font-display text-2xl">Написать нам</h2>
            <p className="mt-3 text-ink-soft">
              Опишите в двух словах, что происходит. Мы ответим и предложим
              подходящий формат — иногда это будет не консультация, а рабочий лист
              или практикум.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="consultation"
                submitLabel="Отправить"
                successText="Получили. Ответим на указанный адрес и предложим время."
                withNote
              />
            </div>
          </Card>

          <div className="space-y-4">
            <Note icon="gayd">
              <p className="font-medium">Если пока рано</p>
              <p className="mt-2">
                Когда задача — подготовить один конкретный разговор, начните с
                бесплатной диагностики и практикума. Это дешевле и часто
                достаточно.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <ButtonLink
                  href="/diagnostika/chto-vy-delaete-slovami"
                  variant="secondary"
                  size="sm"
                >
                  Диагностика
                </ButtonLink>
                <ButtonLink
                  href="/kursy/7-shagov-do-vazhnogo-razgovora"
                  variant="secondary"
                  size="sm"
                >
                  Практикум
                </ButtonLink>
              </div>
            </Note>

            <Note tone="accent" icon="boundary">
              <p className="font-medium">Если есть угроза</p>
              <p className="mt-2">
                Мы не оказываем экстренную помощь. При угрозе жизни и здоровью
                обращайтесь в профильные службы и кризисные центры.
              </p>
            </Note>
          </div>
        </div>
      </div>
    </div>
  );
}
