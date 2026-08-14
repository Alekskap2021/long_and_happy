import { ButtonLink } from "@/components/ui/button";
import { BackdropArt } from "@/components/ui/illustration";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";

export default function NotFound() {
  return (
    <div className="wash grain relative overflow-hidden">
      <BackdropArt
        name="library"
        opacity={0.14}
        className="-right-[30%] top-[6%] hidden h-[80%] w-[52%] lg:block"
      />

      <div className="container-page relative flex min-h-[min(72svh,38rem)] flex-col justify-center py-24 sm:py-28">
        <Reveal className="max-w-[40rem]">
          <Eyebrow>Страница не найдена</Eyebrow>
          <h1 className="mt-5 text-display">
            Здесь пока ничего нет — но, возможно, будет
          </h1>
          <p className="mt-6 text-lead text-ink-soft">
            Часть тем и материалов ещё готовится. Начните с бесплатной
            диагностики или посмотрите библиотеку.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/diagnostika/chto-vy-delaete-slovami" size="lg">
              Пройти диагностику
            </ButtonLink>
            <ButtonLink href="/besplatno" variant="secondary" size="lg">
              Бесплатные материалы
            </ButtonLink>
            <ButtonLink href="/" variant="ghost">
              На главную
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
