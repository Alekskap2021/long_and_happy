"use client";

import { Form } from "@base-ui/react/form";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextArea, TextField } from "@/components/ui/field";
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
      <p className="flex gap-3 rounded-card border-l-2 border-second/40 bg-second-quiet px-5 py-5 text-ink-soft">
        <Check
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-second"
          strokeWidth={1.75}
        />
        {successText}
      </p>
    );
  }

  return (
    /* Base UI Form перехватывает отправку и запускает валидацию полей:
       вместо браузерного пузыря показываются наши сообщения из Field.Error. */
    <Form
      className="space-y-4"
      onFormSubmit={(values) => {
        const note = String(values.note ?? "").trim();
        mutation.mutate({
          email: String(values.email ?? "").trim(),
          intent,
          productSlug,
          note: note || undefined,
        });
      }}
    >
      <TextField
        name="email"
        label="Электронная почта"
        type="email"
        required
        placeholder="vy@example.com"
        errors={[
          { match: "valueMissing", text: "Нужен адрес, чтобы ответить" },
          { match: "typeMismatch", text: "Похоже, в адресе опечатка" },
        ]}
      />

      {withNote && (
        <TextArea name="note" label="С чем вы хотите прийти? Необязательно" />
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Отправляем…" : submitLabel}
        </Button>

        {mutation.isError && (
          <p className="text-sm text-boundary">{mutation.error.message}</p>
        )}
      </div>

      <p className="text-sm text-ink-muted">
        Адрес нужен только для этого сообщения. Мы не передаём его третьим лицам
        и удаляем по первой просьбе.
      </p>
    </Form>
  );
}
