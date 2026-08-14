import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export default function NotFound() {
  return (
    <div className="py-24">
      <div className="container-prose">
        <Eyebrow>Страница не найдена</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl">
          Здесь пока ничего нет — но, возможно, будет
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          Часть тем и материалов ещё готовится. Начните с бесплатной диагностики
          или посмотрите библиотеку.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/diagnostika/chto-vy-delaete-slovami">
            Пройти диагностику
          </ButtonLink>
          <ButtonLink href="/besplatno" variant="secondary">
            Бесплатные материалы
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
