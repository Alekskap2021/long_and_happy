import {
  Bookmark,
  BookOpen,
  Compass,
  Ear,
  Eye,
  FileText,
  Footprints,
  Layers,
  LifeBuoy,
  ListChecks,
  MessagesSquare,
  Route,
  Scale,
  Speech,
  Split,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";

/**
 * Единственный слой иконок: lucide + смысловые имена проекта.
 * Ключи совпадают со значениями таксономии (формат материала, вид продукта),
 * поэтому в разметке можно писать icon={material.format} без таблиц соответствий.
 */
export type IconName =
  | "diagnostika"
  | "statya"
  | "video"
  | "gayd"
  | "rabochiy-list"
  | "kartochka"
  | "praktikum"
  | "kurs"
  | "razgovornik"
  | "klub"
  | "konsultaciya"
  | "notice"
  | "understand"
  | "check"
  | "choose"
  | "speak"
  | "boundary"
  | "ethics";

const icons: Record<IconName, LucideIcon> = {
  // Форматы материалов
  diagnostika: Compass,
  statya: FileText,
  video: Video,
  gayd: Route,
  "rabochiy-list": ListChecks,
  kartochka: Bookmark,

  // Виды продуктов
  praktikum: Footprints,
  kurs: Layers,
  razgovornik: BookOpen,
  klub: MessagesSquare,
  konsultaciya: LifeBuoy,

  // Шаги метода
  notice: Eye,
  understand: Target,
  check: Ear,
  choose: Split,
  speak: Speech,

  // Смысловые
  boundary: Scale,
  ethics: Scale,
};

export function Icon({
  name,
  className = "h-4 w-4",
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph aria-hidden className={className} strokeWidth={strokeWidth} />;
}
