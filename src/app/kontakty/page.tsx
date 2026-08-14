import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/lead-form";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Как с нами связаться и по каким вопросам.",
  alternates: { canonical: "/kontakty" },
};

export default function ContactsPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Контакты</Eyebrow>
          <h1 className="mt-4 text-3xl sm:text-4xl">Как с нами связаться</h1>
          <div className="prose-editorial mt-6">
            <p>
              По вопросам о продуктах, доступам и оплате, а также по поводу
              консультаций пишите на почту проекта — отвечаем в течение
              нескольких рабочих дней.
            </p>
            <h3>Почта</h3>
            <p>hello@dolgo-i-schastlivo.example</p>
            <h3>Чего мы не делаем в переписке</h3>
            <ul>
              <li>Не консультируем в сообщениях: для этого есть отдельный формат.</li>
              <li>Не даём срочную помощь — при угрозе обращайтесь в кризисные службы.</li>
            </ul>
          </div>
        </div>

        <Card className="h-fit">
          <h2 className="font-display text-2xl">Написать письмо</h2>
          <p className="mt-3 text-ink-soft">
            Оставьте адрес и коротко опишите вопрос. Форма в прототипе сохраняет
            обращение в памяти сервера — почтовый сервис подключается позже.
          </p>
          <div className="mt-6">
            <LeadForm
              intent="library"
              submitLabel="Отправить"
              successText="Спасибо, получили. Ответим на указанный адрес."
              withNote
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
