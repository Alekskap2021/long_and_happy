import type { MaterialQuery } from "./api";

export const queryKeys = {
  materials: (query: MaterialQuery) => ["materials", query] as const,
  diagnosticResult: (slug: string) => ["diagnostic-result", slug] as const,
  funnel: () => ["funnel"] as const,
};
