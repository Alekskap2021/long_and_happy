import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Card, Note } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/section";
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
    <div className="py-14 sm:py-20">
      <div className="container-prose">
        <Eyebrow>Оплата и доступ</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl">
          {product ? product.title : "Оплата"}
        </h1>

        {product && (
          <Card className="mt-8 border-line-strong">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-ink-soft">{product.tagline}</p>
              <p className="font-display text-2xl">
                {product.price.amount
                  ? `${product.price.amount.toLocaleString("ru-RU")} ₽`
                  : "Цена будет объявлена"}
              </p>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <ButtonLink href="#" aria-disabled className="pointer-events-none opacity-60">
                Перейти к оплате
              </ButtonLink>
              <p className="mt-3 text-sm text-ink-muted">
                Кнопка неактивна: в прототипе платёжный провайдер не подключён.
              </p>
            </div>
          </Card>
        )}

        <div className="prose-editorial mt-10">
          <h3>Как это будет работать</h3>
          <p>
            Оплата проходит через платёжный сервис, доступ к материалам выдаётся
            автоматически после подтверждения платежа — без ручной обработки
            заявок.
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

        <div className="mt-8">
          <Note>
            Это страница прототипа. Реальные условия оплаты, возврата и оферта
            появятся к запуску.
          </Note>
        </div>

        <div className="mt-8">
          <ButtonLink href="/kursy" variant="secondary">
            Вернуться к продуктам
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
