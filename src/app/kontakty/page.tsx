import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/lead-form";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Как с нами связаться и по каким вопросам.",
  alternates: { canonical: "/kontakty" },
};

export default function ContactsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Контакты"
        title="Как с нами связаться"
        body="По вопросам о продуктах, доступам и оплате, а также по поводу консультаций пишите на почту проекта — отвечаем в течение нескольких рабочих дней."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Reveal>
            <div className="prose-editorial max-w-[36rem]">
              <h3>Почта</h3>
              <p>hello@dolgo-i-schastlivo.example</p>
              <h3>Чего мы не делаем в переписке</h3>
              <ul>
                <li>
                  Не консультируем в сообщениях: для этого есть отдельный формат.
                </li>
                <li>
                  Не даём срочную помощь — при угрозе обращайтесь в кризисные
                  службы.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Panel className="h-fit">
              <h2 className="text-[1.4rem] leading-snug">Написать письмо</h2>
              <p className="mt-3 text-ink-soft">
                Оставьте адрес и коротко опишите вопрос. Форма в прототипе
                сохраняет обращение в памяти сервера — почтовый сервис
                подключается позже.
              </p>
              <div className="mt-7">
                <LeadForm
                  intent="library"
                  submitLabel="Отправить"
                  successText="Спасибо, получили. Ответим на указанный адрес."
                  withNote
                />
              </div>
            </Panel>
          </Reveal>
        </div>
      </Section>
    </article>
  );
}
