import { z } from "zod";

import {
  materialFormatSchema,
  materialLevelSchema,
  productAvailabilitySchema,
  productKindSchema,
  publicationStatusSchema,
  themeSlugSchema,
} from "./taxonomy";

const slug = z.string().min(1);

/** Ключ иллюстрации из src/content/data/illustrations.ts. */
const illustrationKey = z.enum([
  "dialog-loop",
  "money-pair",
  "seven-steps",
  "method-core",
  "divergence",
  "library",
]);

export const authorSchema = z.object({
  slug,
  name: z.string(),
  role: z.string(),
  voice: z.string(),
  credentials: z.array(z.string()),
});

/**
 * Материал библиотеки. Таксономия из раздела 12 карты сайта:
 * тема, формат, уровень, связанный продукт, статус публикации.
 */
export const materialSchema = z.object({
  slug,
  title: z.string(),
  excerpt: z.string(),
  format: materialFormatSchema,
  level: materialLevelSchema,
  themes: z.array(themeSlugSchema).min(1),
  relatedProduct: slug.optional(),
  status: publicationStatusSchema,
  readingMinutes: z.number().int().positive(),
  authorSlug: slug,
  illustration: illustrationKey.optional(),
  body: z.array(
    z.object({
      heading: z.string().optional(),
      paragraphs: z.array(z.string()),
      list: z.array(z.string()).optional(),
    }),
  ),
  nextStep: z.object({
    label: z.string(),
    href: z.string(),
    note: z.string().optional(),
  }),
});

/**
 * Тема — территория, а не продукт. Шаблон хаба собирает
 * живую сцену, бесплатный разбор, микроопыт и следующий шаг.
 */
export const themeSchema = z.object({
  slug: themeSlugSchema,
  cardTitle: z.string(),
  title: z.string(),
  scene: z.object({
    lines: z.array(z.string()),
  }),
  analysis: z.array(
    z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
    }),
  ),
  examples: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  diagnosticSlug: slug.optional(),
  materialSlugs: z.array(slug),
  productSlugs: z.array(slug),
  therapyNote: z.string(),
  status: publicationStatusSchema,
  illustration: illustrationKey.optional(),
});

/**
 * Продуктовая страница по единой структуре из раздела 12:
 * ситуация → переопределение → для кого → результат → метод →
 * программа → авторы → границы → цена / CTA.
 */
export const productSchema = z.object({
  slug,
  title: z.string(),
  kind: productKindSchema,
  availability: productAvailabilitySchema,
  tagline: z.string(),
  situation: z.array(z.string()),
  redefinition: z.string(),
  forWhom: z.array(z.string()),
  notForWhom: z.array(z.string()),
  result: z.array(z.string()),
  method: z.array(z.string()),
  program: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  authorSlugs: z.array(slug),
  boundaries: z.array(z.string()),
  price: z.object({
    amount: z.number().int().nonnegative().nullable(),
    currency: z.literal("RUB"),
    note: z.string().optional(),
  }),
  cta: z.object({
    label: z.string(),
    kind: z.enum(["checkout", "waitlist", "contact"]),
  }),
  themes: z.array(themeSlugSchema),
  illustration: illustrationKey.optional(),
});

const diagnosticIntentSchema = z.enum([
  "close",
  "understood",
  "agreement",
  "safety",
  "justice",
]);

const diagnosticActionSchema = z.enum([
  "ask",
  "explain",
  "press",
  "accuse",
  "withdraw",
  "probe",
]);

export const diagnosticSchema = z.object({
  slug,
  title: z.string(),
  subtitle: z.string(),
  promise: z.array(z.string()),
  disclaimer: z.string(),
  privacyNote: z.string(),
  durationMinutes: z.number().int().positive(),
  illustration: illustrationKey.optional(),
  situations: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      scene: z.string(),
      intentQuestion: z.object({
        prompt: z.string(),
        options: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            intent: diagnosticIntentSchema,
          }),
        ),
      }),
      actionQuestion: z.object({
        prompt: z.string(),
        options: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            action: diagnosticActionSchema,
            safetyFlag: z.boolean().optional(),
          }),
        ),
      }),
    }),
  ),
});

export const homeBlockSchema = z.object({
  id: z.string(),
  type: z.enum([
    "hero",
    "situations",
    "diagnostic",
    "method",
    "levels",
    "library",
    "authors",
    "boundaries",
  ]),
  enabled: z.boolean(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
});

export const testimonialSchema = z.object({
  slug,
  quote: z.string(),
  author: z.string(),
  context: z.string(),
  productSlug: slug.optional(),
});

export type Author = z.infer<typeof authorSchema>;
export type Material = z.infer<typeof materialSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type Product = z.infer<typeof productSchema>;
export type Diagnostic = z.infer<typeof diagnosticSchema>;
export type HomeBlock = z.infer<typeof homeBlockSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type DiagnosticIntent = z.infer<typeof diagnosticIntentSchema>;
export type DiagnosticAction = z.infer<typeof diagnosticActionSchema>;

export const diagnosticAnswersSchema = z.object({
  diagnosticSlug: slug,
  answers: z.array(
    z.object({
      situationId: z.string(),
      intent: diagnosticIntentSchema,
      action: diagnosticActionSchema,
      safetyFlag: z.boolean().optional(),
    }),
  ),
});

export const diagnosticResultSchema = z.object({
  dominantIntent: diagnosticIntentSchema,
  dominantAction: diagnosticActionSchema,
  intentLabel: z.string(),
  actionLabel: z.string(),
  divergenceCount: z.number().int().nonnegative(),
  divergenceLevel: z.enum(["aligned", "partial", "wide"]),
  headline: z.string(),
  reading: z.array(z.string()),
  safetyRoute: z.boolean(),
  nextSteps: z.array(
    z.object({
      kind: z.enum(["practicum", "course", "theme", "consultation"]),
      title: z.string(),
      body: z.string(),
      href: z.string(),
      label: z.string(),
    }),
  ),
});

export type DiagnosticAnswers = z.infer<typeof diagnosticAnswersSchema>;
export type DiagnosticResult = z.infer<typeof diagnosticResultSchema>;

export const leadSchema = z.object({
  email: z.string().email("Проверьте, пожалуйста, адрес почты"),
  intent: z.enum(["waitlist", "consultation", "library"]),
  productSlug: slug.optional(),
  note: z.string().max(500).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

export const funnelEventSchema = z.object({
  step: z.enum([
    "source_landing",
    "theme_view",
    "diagnostic_start",
    "diagnostic_complete",
    "product_view",
    "purchase_intent",
    "consultation_view",
  ]),
  path: z.string(),
  ref: z.string().optional(),
  meta: z.record(z.string(), z.string()).optional(),
});

export type FunnelEvent = z.infer<typeof funnelEventSchema>;
