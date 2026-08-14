import type { SVGProps } from "react";

/**
 * Линейные иконки проекта: один штрих 1.5, скруглённые концы, без заливок.
 * Задача — размечать типы контента, а не украшать текст.
 */
export type IconName =
  | "diagnostika"
  | "statya"
  | "video"
  | "gayd"
  | "rabochiy-list"
  | "kartochka"
  | "notice"
  | "understand"
  | "check"
  | "choose"
  | "speak"
  | "praktikum"
  | "kurs"
  | "razgovornik"
  | "klub"
  | "konsultaciya"
  | "boundary";

const paths: Record<IconName, React.ReactNode> = {
  diagnostika: (
    <>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M12 5.5V3M12 21v-2.5M5.5 12H3M21 12h-2.5" />
    </>
  ),
  statya: (
    <>
      <path d="M6.5 3.5h8L18 7v13.5H6.5z" />
      <path d="M9 9h4M9 12.5h6M9 16h6" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M10.8 9.8l4.2 2.2-4.2 2.2z" />
    </>
  ),
  gayd: (
    <>
      <path d="M4.5 18.5c3.5 0 3-6 7.5-6s3.5-7 7.5-7" />
      <circle cx="4.5" cy="18.5" r="1.6" />
      <circle cx="19.5" cy="5.5" r="1.6" />
    </>
  ),
  "rabochiy-list": (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <path d="M8.5 9l1.4 1.4L12.4 8" />
      <path d="M14 10h2.5M8.5 14.5h8M8.5 17.5h5" />
    </>
  ),
  kartochka: (
    <>
      <path d="M7 3.5h10v17l-5-3.8-5 3.8z" />
      <path d="M9.5 8.5h5" />
    </>
  ),
  notice: (
    <>
      <path d="M2.8 12S6.2 6.8 12 6.8 21.2 12 21.2 12 17.8 17.2 12 17.2 2.8 12 2.8 12z" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  understand: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  check: (
    <>
      <path d="M2.8 5.5h11.4a2 2 0 012 2v4.2a2 2 0 01-2 2H8l-5.2 3.4z" />
      <circle cx="18.6" cy="17.4" r="2.6" />
    </>
  ),
  choose: (
    <>
      <path d="M3 12h6" />
      <path d="M9 12l5.5-5.5M9 12l5.5 5.5" />
      <circle cx="16.8" cy="4.6" r="2" />
      <circle cx="16.8" cy="19.4" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  speak: (
    <>
      <path d="M4.5 4.5h15a2 2 0 012 2v8a2 2 0 01-2 2h-7.5L6 21v-4.5H4.5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
      <path d="M8 9h8M8 12.5h5" />
    </>
  ),
  praktikum: (
    <>
      <path d="M3.5 19.5h4.5V15h4.5v-4.5H17V6h3.5" />
      <circle cx="20.5" cy="5.5" r="1.4" />
    </>
  ),
  kurs: (
    <>
      <path d="M12 3.5l8.5 4.2-8.5 4.2-8.5-4.2z" />
      <path d="M3.5 12l8.5 4.2 8.5-4.2M3.5 16.3l8.5 4.2 8.5-4.2" />
    </>
  ),
  razgovornik: (
    <>
      <path d="M4.5 5.5A2.5 2.5 0 017 3h12v15.5H7A2.5 2.5 0 004.5 21z" />
      <path d="M9 7.5h6M9 11h4" />
    </>
  ),
  klub: (
    <>
      <circle cx="8.5" cy="9" r="3.2" />
      <circle cx="15.5" cy="15" r="3.2" />
      <path d="M11.4 10.6l1.7 2.8" />
    </>
  ),
  konsultaciya: (
    <>
      <path d="M3 6.5h10.5a1.8 1.8 0 011.8 1.8v3.4a1.8 1.8 0 01-1.8 1.8H7l-4 3z" />
      <path d="M18 10h1.2A1.8 1.8 0 0121 11.8v3.4a1.8 1.8 0 01-1.8 1.8H18v3l-3.5-3" />
    </>
  ),
  boundary: (
    <>
      <path d="M12 3v18" />
      <path d="M7.5 7.5L4 11l3.5 3.5M16.5 7.5L20 11l-3.5 3.5" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
  ...rest
}: { name: IconName; className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "className" | "children"
>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
