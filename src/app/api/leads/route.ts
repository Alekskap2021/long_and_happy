import { NextResponse } from "next/server";

import { leadSchema } from "@/content/schemas";
import { saveLead } from "@/server/store";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json());

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Проверьте, пожалуйста, поля формы";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  const lead = saveLead(parsed.data);

  return NextResponse.json(
    { id: lead.id, createdAt: lead.createdAt },
    { status: 201 },
  );
}
