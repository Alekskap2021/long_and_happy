import { NextResponse } from "next/server";
import { z } from "zod";

import { getMaterialFacets, getMaterials } from "@/content/repository";
import {
  materialFormatSchema,
  materialLevelSchema,
  themeSlugSchema,
} from "@/content/taxonomy";

const querySchema = z.object({
  theme: themeSlugSchema.optional(),
  format: materialFormatSchema.optional(),
  level: materialLevelSchema.optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
});

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = querySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные параметры фильтра" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    items: getMaterials(parsed.data),
    facets: getMaterialFacets(),
  });
}
