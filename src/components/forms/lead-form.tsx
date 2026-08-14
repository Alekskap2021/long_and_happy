"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Lead } from "@/content/schemas";
import { sendFunnelEvent, submitLead } from "@/lib/api";

/**
 * Одна форма на все точки сбора: лист ожидания, запрос консультации,
 * подписка на библиотеку. Отличается только intent.
 */
export function LeadForm({
  intent,
  productSlug,
  submitLabel,
  successText,
  withNote = false,
}: {
  intent: Lead["intent"];
  productSlug?: string;
  submitLabel: string;
  successText: string;
  withNote?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: submitLead,
    onSuccess: () => {
      void sendFunnelEvent({
        step: "purchase_intent",
        path: typeof window === "undefined" ? "" : window.location.pathname,
        meta: productSlug ? { product: productSlug } : undefined,
      }).catch(() => undefined);
    },
  });

  if (mutation.isSuccess) {
    return (
      <p className="rounded-card border border-forest/20 bg-forest-soft p-5 text-forest">
        {successText}
      </p>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate({
          email: email.trim(),
          intent,
          productSlug,
          note: note.trim() || undefined,
        });
      }}
    >
      <label className="block">
        <span className="text-sm text-ink-soft">Электронная почта</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="vy@example.com"
          className="mt-1.5 w-full rounded-card border border-line bg-paper-card px-4 py-3 outline-none focus:border-accent"
        />
      </label>

      {withNote && (
        <label className="block">
          <span className="text-sm text-ink-soft">
            С чем вы хотите прийти? Необязательно
          </span>
          <textarea
            rows={4}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-paper-card px-4 py-3 outline-none focus:border-accent"
          />
        </label>
      )}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Отправляем…" : submitLabel}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-accent">{mutation.error.message}</p>
      )}

      <p className="text-sm text-ink-muted">
        Адрес нужен только для этого сообщения. Мы не передаём его третьим лицам и
        удаляем по первой просьбе.
      </p>
    </form>
  );
}
