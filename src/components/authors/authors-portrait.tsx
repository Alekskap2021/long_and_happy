import Image from "next/image";

/**
 * Портрет авторов: чистое изображение и мягкая плоскость за ним вместо рамки
 * с тенью. Подпись говорит о методе, а не о фотографии.
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
    <figure>
      <div className="relative">
        <div
          aria-hidden
          className="absolute -bottom-5 -right-5 left-14 top-16 rounded-band bg-accent-quiet"
        />

        <div className="relative overflow-hidden rounded-band">
          <Image
            src="/images/veronika-i-igor.png"
            alt="Вероника и Игорь, авторы проекта «Долго и счастливо»"
            width={767}
            height={1024}
            priority={priority}
            sizes={
              large
                ? "(min-width: 1024px) 30rem, 100vw"
                : "(min-width: 1024px) 22rem, 100vw"
            }
            className="h-auto w-full"
          />
        </div>
      </div>

      <figcaption className="mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-[1.05rem]">Вероника и Игорь</span>
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-muted">
            психологи
          </span>
        </div>
        <p className="mt-3 text-[0.95rem] text-ink-soft">
          {large
            ? "Один из нас слышит в разговоре цель, другой — действие. С этого расхождения и начался проект."
            : "Один слышит в разговоре цель, другой — действие."}
        </p>
      </figcaption>
    </figure>
  );
}
