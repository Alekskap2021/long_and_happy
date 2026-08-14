import { NextResponse } from "next/server";

import { getDiagnostic } from "@/content/repository";
import { diagnosticAnswersSchema } from "@/content/schemas";
import { scoreDiagnostic } from "@/content/scoring";

/**
 * Ответы диагностики не сохраняются: считаем результат и отдаём его
 * обратно. Раздел 12 карты сайта — не собирать лишние данные.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!getDiagnostic(slug)) {
    return NextResponse.json({ error: "Диагностика не найдена" }, { status: 404 });
  }

  const parsed = diagnosticAnswersSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ответы заполнены не полностью" },
      { status: 422 },
    );
  }

  return NextResponse.json({ result: scoreDiagnostic(parsed.data) });
}
