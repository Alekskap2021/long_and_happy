import { NextResponse } from "next/server";

import { funnelEventSchema } from "@/content/schemas";
import { listEvents, saveEvent } from "@/server/store";

/**
 * Аналитика маршрутов (раздел 12): источник → тема → запуск диагностики →
 * завершение → продукт → покупка. В прототипе события складываются в память,
 * позже сюда подключается внешняя аналитика.
 */
export async function POST(request: Request) {
  const parsed = funnelEventSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректное событие" }, { status: 422 });
  }

  saveEvent(parsed.data);
  return new NextResponse(null, { status: 204 });
}

export async function GET() {
  return NextResponse.json({ items: listEvents() });
}
