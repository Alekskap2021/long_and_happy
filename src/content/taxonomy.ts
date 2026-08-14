import { z } from "zod";

export const themeSlugSchema = z.enum([
  "trudnye-razgovory",
  "prosby-i-pomoshch",
  "pauza-i-molchanie",
  "posle-ssory",
  "granicy",
  "dengi",
  "revnost",
  "seks-i-zhelanie",
  "deti",
  "roditeli-i-rodstvenniki",
]);

export const materialFormatSchema = z.enum([
  "diagnostika",
  "statya",
  "video",
  "gayd",
  "rabochiy-list",
  "kartochka",
]);

export const materialLevelSchema = z.enum(["free", "paid"]);

export const publicationStatusSchema = z.enum(["published", "draft"]);

export const productKindSchema = z.enum([
  "praktikum",
  "kurs",
  "razgovornik",
  "klub",
  "konsultaciya",
]);

export const productAvailabilitySchema = z.enum([
  "available",
  "waitlist",
  "soon",
]);

export type ThemeSlug = z.infer<typeof themeSlugSchema>;
export type MaterialFormat = z.infer<typeof materialFormatSchema>;
export type MaterialLevel = z.infer<typeof materialLevelSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type ProductKind = z.infer<typeof productKindSchema>;
export type ProductAvailability = z.infer<typeof productAvailabilitySchema>;

export const themeLabels: Record<ThemeSlug, string> = {
  "trudnye-razgovory": "Трудные разговоры",
  "prosby-i-pomoshch": "Просьбы и помощь",
  "pauza-i-molchanie": "Пауза и молчание",
  "posle-ssory": "После ссоры",
  granicy: "Границы",
  dengi: "Деньги",
  revnost: "Ревность",
  "seks-i-zhelanie": "Секс и желание",
  deti: "Дети",
  "roditeli-i-rodstvenniki": "Родители и родственники",
};

export const formatLabels: Record<MaterialFormat, string> = {
  diagnostika: "Диагностика",
  statya: "Статья",
  video: "Видео",
  gayd: "Гайд",
  "rabochiy-list": "Рабочий лист",
  kartochka: "Карточка",
};

export const levelLabels: Record<MaterialLevel, string> = {
  free: "Бесплатно",
  paid: "Платно",
};

export const productKindLabels: Record<ProductKind, string> = {
  praktikum: "Практикум",
  kurs: "Курс",
  razgovornik: "Разговорник",
  klub: "Клуб практики",
  konsultaciya: "Консультация",
};
