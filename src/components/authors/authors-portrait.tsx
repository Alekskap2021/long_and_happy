import Image from "next/image";

/**
 * Портрет авторов в издательской рамке. Подпись говорит о методе,
 * а не о фотографии: два голоса слышат одну сцену по-разному.
 */
export function AuthorsPortrait({
  size = "large",
  priority = false,
}: {
  size?: "large" | "compact";
  priority?: boolean;
}) {
  const large = size === "large";

  return (
    <figure className="relative">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-card bg-accent-soft"
      />

      <div className="relative rounded-card border border-line bg-paper-card p-3 shadow-[0_1px_0_rgba(25,21,18,0.04)]">
        <div className="overflow-hidden rounded-[0.5rem]">
          <Image
            src="/images/veronika-i-igor.png"
            alt="Вероника и Игорь, авторы проекта «Долго и счастливо»"
            width={767}
            height={1024}
            priority={priority}
            sizes={large ? "(min-width: 1024px) 32rem, 100vw" : "(min-width: 1024px) 20rem, 100vw"}
            className="h-auto w-full"
          />
        </div>

        {large ? (
          <figcaption className="px-1 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-lg leading-tight">
                Вероника и Игорь
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                психологи
              </span>
            </div>
            <p className="mt-3 border-t border-line pt-3 text-[0.95rem] text-ink-soft">
              Один из нас слышит в разговоре цель, другой — действие. С этого
              расхождения и начался проект.
            </p>
          </figcaption>
        ) : (
          <figcaption className="px-1 pt-3 text-[0.9rem] text-ink-soft">
            Один слышит в разговоре цель, другой — действие.
          </figcaption>
        )}
      </div>
    </figure>
  );
}
