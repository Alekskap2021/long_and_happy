import Image from "next/image";

import { getIllustration, type IllustrationKey } from "@/content/data/illustrations";

/**
 * `band` — широкая полоса-передышка внутри длинного текста.
 * `block` — иллюстрация в колонке рядом с текстом, в естественных пропорциях.
 * `thumb` — превью в карточке: рамку и радиус задаёт сама карточка.
 */
export function Illustration({
  name,
  variant = "band",
  showCaption = true,
  priority = false,
  className = "",
}: {
  name: IllustrationKey;
  variant?: "band" | "block" | "thumb";
  showCaption?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const { src, alt, caption } = getIllustration(name);
  const band = variant === "band";

  if (variant === "thumb") {
    return (
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={933}
        sizes="(min-width: 640px) 34rem, 100vw"
        className={`aspect-[16/7] w-full object-cover ${className}`}
      />
    );
  }

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-card border border-line bg-paper-deep">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={933}
          priority={priority}
          sizes={band ? "(min-width: 1024px) 68rem, 100vw" : "(min-width: 1024px) 30rem, 100vw"}
          className={`w-full object-cover ${
            band ? "aspect-[16/9] sm:aspect-[16/7]" : "aspect-[3/2]"
          }`}
        />
      </div>

      {showCaption && caption && (
        <figcaption className="mt-3 flex gap-3 text-[0.9rem] text-ink-muted">
          <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-line-strong" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
