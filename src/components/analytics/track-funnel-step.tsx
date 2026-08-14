"use client";

import { useEffect, useRef } from "react";

import { sendFunnelEvent } from "@/lib/api";
import type { FunnelEvent } from "@/content/schemas";

/**
 * Отмечает шаг воронки при показе страницы. Вынесено в отдельный
 * компонент, чтобы серверные страницы оставались серверными.
 */
export function TrackFunnelStep({
  step,
  path,
  meta,
}: {
  step: FunnelEvent["step"];
  path: string;
  meta?: Record<string, string>;
}) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const ref = document.referrer || undefined;
    void sendFunnelEvent({ step, path, ref, meta }).catch(() => undefined);
  }, [step, path, meta]);

  return null;
}
