import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/note";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { getProduct } from "@/content/repository";

export const metadata: Metadata = {
  title: "Оплата и доступ",
  description:
    "Как проходит оплата и как выдаётся доступ к продукту. В прототипе платёжный провайдер не подключён.",
  alternates: { canonical: "/oplata" },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;
  const product = productSlug ? getProduct(productSlug) : null;

  return (
    <article>
      <PageHeader
        eyebrow="Оплата и доступ"
        title={product ? product.title : "Оплата"}
        body={product?.tagline}
        aside={
          product && (
            <Panel>
              <p className="font-display text-[2rem] leading-none">
                {product.price.amount
                  ? `${product.price.amount.toLocaleString("ru-RU")} ₽`
                  : "Цена будет объявлена"}
              </p>
              <div className="mt-7 border-t border-line pt-6">
                <ButtonLink
                  href="#"
                  aria-disabled
                  className="pointer-events-none opacity-60"
                >
                  Перейти к оплате
                </ButtonLink>
                <p className="mt-3.5 text-sm text-ink-muted">
                  Кнопка неактивна: в прототипе платёжный провайдер не подключён.
                </p>
              </div>
            </Panel>
          )
        }
      />

      <Section>
        <Reveal className="max-w-[40rem]">
          <h2 className="text-title">Как это будет работать</h2>
          <div className="prose-editorial mt-5">
            <p>
              Оплата проходит через платёжный сервис, доступ к материалам
              выдаётся автоматически после подтверждения платежа — без ручной
              обработки заявок.
            </p>
            <ul>
              <li>Чек и ссылка на материалы приходят на указанную почту.</li>
              <li>
                Доступ к купленному продукту остаётся у вас без ограничения по
                времени.
              </li>
              <li>
                Возврат возможен в течение 14 дней, если вы не начали проходить
                материалы.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-14 max-w-[40rem]">
          <Note>
            Это страница прототипа. Реальные условия оплаты, возврата и оферта
            появятся к запуску.
          </Note>
        </Reveal>

        <Reveal className="mt-10">
          <ButtonLink href="/kursy" variant="secondary">
            Вернуться к продуктам
          </ButtonLink>
        </Reveal>
      </Section>
    </article>
  );
}
