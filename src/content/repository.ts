import { z } from "zod";

import { authors as rawAuthors, authorsIntro } from "./data/authors";
import { diagnostics as rawDiagnostics } from "./data/diagnostics";
import { homeBlocks as rawHomeBlocks } from "./data/home";
import { materials as rawMaterials } from "./data/materials";
import { productLevels, products as rawProducts } from "./data/products";
import { testimonials as rawTestimonials } from "./data/testimonials";
import {
  authorSchema,
  diagnosticSchema,
  homeBlockSchema,
  materialSchema,
  productSchema,
  testimonialSchema,
  themeSchema,
  type Material,
  type Product,
  type Theme,
} from "./schemas";
import { themes as rawThemes } from "./data/themes";
import type { MaterialFormat, MaterialLevel, ThemeSlug } from "./taxonomy";

/**
 * Единая точка доступа к контенту. Сейчас источник — типизированные
 * фикстуры; при переходе на CMS меняется только реализация функций,
 * а не вызывающий код.
 */
function parse<T>(schema: z.ZodType<T>, value: unknown[], label: string): T[] {
  const result = z.array(schema).safeParse(value);
  if (!result.success) {
    throw new Error(
      `Контент «${label}» не соответствует схеме: ${result.error.message}`,
    );
  }
  return result.data;
}

const authors = parse(authorSchema, rawAuthors, "авторы");
const themes = parse(themeSchema, rawThemes, "темы");
const materials = parse(materialSchema, rawMaterials, "материалы");
const products = parse(productSchema, rawProducts, "продукты");
const diagnostics = parse(diagnosticSchema, rawDiagnostics, "диагностики");
const testimonials = parse(testimonialSchema, rawTestimonials, "отзывы");
const homeBlocks = parse(homeBlockSchema, rawHomeBlocks, "блоки главной");

const isPublished = <T extends { status: "published" | "draft" }>(item: T) =>
  item.status === "published";

export function getHomeBlocks() {
  return homeBlocks.filter((block) => block.enabled);
}

export function getAuthors() {
  return authors;
}

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug) ?? null;
}

export function getAuthorsIntro() {
  return authorsIntro;
}

export function getThemes() {
  return themes;
}

export function getPublishedThemes() {
  return themes.filter(isPublished);
}

export function getTheme(slug: string): Theme | null {
  return themes.find((theme) => theme.slug === slug) ?? null;
}

export type MaterialFilters = {
  theme?: ThemeSlug;
  format?: MaterialFormat;
  level?: MaterialLevel;
  limit?: number;
};

export function getMaterials(filters: MaterialFilters = {}): Material[] {
  const filtered = materials.filter((material) => {
    if (!isPublished(material)) return false;
    if (filters.theme && !material.themes.includes(filters.theme)) return false;
    if (filters.format && material.format !== filters.format) return false;
    if (filters.level && material.level !== filters.level) return false;
    return true;
  });

  return filters.limit ? filtered.slice(0, filters.limit) : filtered;
}

export function getMaterial(slug: string): Material | null {
  return materials.find((material) => material.slug === slug) ?? null;
}

export function getMaterialsBySlugs(slugs: string[]): Material[] {
  return slugs
    .map((slug) => getMaterial(slug))
    .filter((material): material is Material => material !== null)
    .filter(isPublished);
}

export function getMaterialFacets() {
  const published = materials.filter(isPublished);
  const count = <T extends string>(values: T[]) =>
    values.reduce<Record<string, number>>((acc, value) => {
      acc[value] = (acc[value] ?? 0) + 1;
      return acc;
    }, {});

  return {
    themes: count(published.flatMap((material) => material.themes)),
    formats: count(published.map((material) => material.format)),
    levels: count(published.map((material) => material.level)),
    total: published.length,
  };
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | null {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => product !== null);
}

export function getCatalogProducts(): Product[] {
  return products.filter((product) => product.kind !== "konsultaciya");
}

export function getConsultations(): Product[] {
  return products.filter((product) => product.kind === "konsultaciya");
}

export function getProductLevels() {
  return productLevels;
}

export function getDiagnostic(slug: string) {
  return diagnostics.find((diagnostic) => diagnostic.slug === slug) ?? null;
}

export function getDiagnostics() {
  return diagnostics;
}

export function getTestimonials(productSlug?: string) {
  if (!productSlug) return testimonials;
  return testimonials.filter(
    (testimonial) => testimonial.productSlug === productSlug,
  );
}
