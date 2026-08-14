"use client";

import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-card border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors duration-200 ease-calm placeholder:text-ink-muted hover:border-line-hover focus:border-accent data-invalid:border-boundary motion-reduce:transition-none";

function Label({ children }: { children: ReactNode }) {
  return (
    <BaseField.Label className="text-[0.92rem] text-ink-soft">
      {children}
    </BaseField.Label>
  );
}

function Messages({
  description,
  errors,
}: {
  description?: string;
  errors?: { match: ComponentProps<typeof BaseField.Error>["match"]; text: string }[];
}) {
  return (
    <>
      {errors?.map((error) => (
        <BaseField.Error
          key={String(error.match)}
          match={error.match}
          className="text-sm text-boundary"
        >
          {error.text}
        </BaseField.Error>
      ))}
      {description && (
        <BaseField.Description className="text-sm text-ink-muted">
          {description}
        </BaseField.Description>
      )}
    </>
  );
}

/**
 * Поля форм на Base UI Field: связка label / control / ошибка и состояние
 * data-invalid приходят из примитива, внешний вид — наши токены.
 */
export function TextField({
  name,
  label,
  description,
  errors,
  className = "",
  ...rest
}: {
  name: string;
  label: string;
  description?: string;
  errors?: { match: ComponentProps<typeof BaseField.Error>["match"]; text: string }[];
  className?: string;
} & Omit<ComponentProps<typeof BaseField.Control>, "className" | "name">) {
  return (
    <BaseField.Root name={name} className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      <BaseField.Control className={control} {...rest} />
      <Messages description={description} errors={errors} />
    </BaseField.Root>
  );
}

export function TextArea({
  name,
  label,
  description,
  errors,
  rows = 4,
  className = "",
  ...rest
}: {
  name: string;
  label: string;
  description?: string;
  errors?: { match: ComponentProps<typeof BaseField.Error>["match"]; text: string }[];
  rows?: number;
  className?: string;
} & Omit<ComponentProps<"textarea">, "className" | "rows" | "name">) {
  return (
    <BaseField.Root name={name} className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      {/* Свойства уходят прямо в textarea: типы Field.Control описывают input. */}
      <BaseField.Control
        render={<textarea rows={rows} {...rest} />}
        className={`${control} resize-y`}
      />
      <Messages description={description} errors={errors} />
    </BaseField.Root>
  );
}
