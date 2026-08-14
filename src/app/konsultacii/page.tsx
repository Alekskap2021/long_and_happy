import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/ui/illustration";
import { ListLink } from "@/components/ui/list-link";
import { Note } from "@/components/ui/note";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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

const diagnosticHref = "/diagnostika/chto-vy-delaete-slovami";

/** Подпись колонки: одна и та же роль в списке форматов и в сравнении. */
const columnLabel =
  "text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-muted";

/** Сравнение набрано строками-определениями: на 360px нечему переполняться. */
const comparisonRow =
  "grid gap-5 px-5 py-7 sm:grid-cols-2 sm:gap-x-10 sm:px-6 lg:grid-cols-[0.7fr_1fr_1fr] lg:items-start";

export default function ConsultationsPage() {
  const consultations = getConsultations();

  return (
    <>
      <TrackFunnelStep step="consultation_view" path="/konsultacii" />

      <PageHeader
        eyebrow="Консультации"
        title="Отдельная глубина, а не премиум-версия курса"
        body="Иногда разговор не получается не потому, что человеку не хватает навыка. Тогда нужен не курс, а работа с тем, что за этим разговором стоит."
        aside={<Illustration name="dialog-loop" variant="block" />}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#napisat" size="lg">
            Написать нам
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </ButtonLink>
          <ButtonLink href={diagnosticHref} variant="secondary" size="lg">
            Пройти диагностику
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="deep">
        <Reveal>
          <ul className="-mx-5 sm:-mx-6">
            {consultations.map((consultation) => (
              <li
                key={consultation.slug}
                className="border-t border-line last:border-b"
              >
                <ListLink href={`/kursy/${consultation.slug}`} arrow={false}>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Tag tone="accent" icon="konsultaciya">
                      Консультация
                    </Tag>
                    <span className="font-display text-[1.05rem]">
                      {consultation.price.amount?.toLocaleString("ru-RU")} ₽
                    </span>
                  </p>

                  <p className="mt-4 font-display text-title">
                    {consultation.title}
                  </p>
                  <p className="voice mt-3 max-w-lg text-[1.25rem] leading-snug text-ink">
                    {consultation.tagline}
                  </p>

                  <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:gap-x-10">
                    <div className="space-y-2 text-[0.95rem] text-ink-soft">
                      {consultation.program.map((item) => (
                        <p key={item.title}>
                          <span className="font-medium text-ink">
                            {item.title}:
                          </span>{" "}
                          {item.body}
                        </p>
                      ))}
                    </div>

                    <div>
                      <p className={columnLabel}>С чем можно приходить</p>
                      <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-soft">
                        {consultation.forWhom.map((item) => (
                          <li key={item}>— {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-7 flex items-center gap-2 text-[0.95rem] text-accent">
                    Подробнее и запись
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.75}
                      className="h-4 w-4 transition-transform duration-200 ease-calm group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </p>
                </ListLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="band" title="Чем это отличается от наших курсов">
        <Reveal className="relative -mx-5 sm:-mx-6">
          <div className="hidden pb-4 lg:grid lg:grid-cols-[0.7fr_1fr_1fr] lg:gap-x-10 lg:px-6">
            <span aria-hidden />
            <p className={columnLabel}>Образовательный продукт</p>
            <p className={columnLabel}>Консультация</p>
          </div>

          <ul>
            {comparison.map((row) => (
              <li
                key={row.aspect}
                className={`border-t border-line last:border-b ${comparisonRow}`}
              >
                <p className="font-display text-[1.15rem] sm:col-span-2 lg:col-span-1">
                  {row.aspect}
                </p>

                <div>
                  <p className={`${columnLabel} lg:hidden`}>
                    Образовательный продукт
                  </p>
                  <p className="mt-2 text-ink-soft lg:mt-0">{row.education}</p>
                </div>

                <div>
                  <p className={`${columnLabel} lg:hidden`}>Консультация</p>
                  <p className="mt-2 text-ink-soft lg:mt-0">{row.therapy}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        id="napisat"
        eyebrow="Запись"
        title="Написать нам"
        body="Опишите в двух словах, что происходит. Мы ответим и предложим подходящий формат — иногда это будет не консультация, а рабочий лист или практикум."
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <Panel>
              <LeadForm
                intent="consultation"
                submitLabel="Отправить"
                successText="Получили. Ответим на указанный адрес и предложим время."
                withNote
              />
            </Panel>
          </Reveal>

          <Reveal delay={80} className="space-y-5">
            <Note tone="accent" icon="gayd" title="Если пока рано">
              <p className="mt-2">
                Когда задача — подготовить один конкретный разговор, начните с
                бесплатной диагностики и практикума. Это дешевле и часто
                достаточно.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={diagnosticHref} variant="secondary" size="sm">
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

            <Note title="Если есть угроза">
              <p className="mt-2">
                Мы не оказываем экстренную помощь. При угрозе жизни и здоровью
                обращайтесь в профильные службы и кризисные центры.
              </p>
            </Note>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
